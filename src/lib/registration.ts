/* ==========================================================================
   registration.ts — all submission logic lives here. The form UI only calls
   `submitRegistration()` and renders the returned state.

   Order:
     1. Supabase (optional) — only if PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY
        are set. A duplicate phone number (unique violation) → "duplicate".
        Any other Supabase failure is logged and we still continue to Formspree.
     2. Formspree (primary) — PUBLIC_FORMSPREE_ID. Sends a readable email.
     3. Dev only: without a Formspree ID a mock provider answers, switchable
        with ?mock=success | duplicate | error. Production never fakes success.
   ========================================================================== */

import { registration, FPP_LEVEL_VALUES, type FppLevel, type ContactVia } from '../content/site';
import { COUNTRY_BY_ISO } from '../content/countries';

export type Participation = 'tournament_after' | 'after_only';

export type RegistrationData = {
  fullName: string;
  phoneCountry: string; // ISO 3166-1 alpha-2, e.g. "PT"
  phoneNumber: string; // national number as typed (spaces allowed)
  contactVia: ContactVia | '';
  instagram: string;
  participation: Participation;
  level: FppLevel | null; // required only for tournament_after
  consent: boolean;
  gotcha: string; // honeypot
};

export type SubmitResult =
  | { status: 'success' }
  | { status: 'duplicate' }
  | { status: 'error'; reason: 'network' | 'server' | 'unavailable' };

export type FieldKey = 'fullName' | 'country' | 'phone' | 'contactVia' | 'participation' | 'level' | 'consent';

/* ---- Phone --------------------------------------------------------------- */
const digitsOf = (s: string) => s.replace(/\s+/g, '');

/** National number is valid when it is 6–14 digits (spaces allowed while typing). */
export const isValidNationalNumber = (s: string) => /^\d{6,14}$/.test(digitsOf(s));

/**
 * E.164, e.g. "+351912345678". A single leading trunk "0" is dropped
 * (UK 07… → +447…), except for Italy where the 0 is part of the number.
 */
export function toE164(iso: string, national: string): string | null {
  const country = COUNTRY_BY_ISO[iso];
  let digits = digitsOf(national);
  if (!country || !/^\d+$/.test(digits)) return null;
  if (iso !== 'IT' && digits.startsWith('0')) digits = digits.slice(1);
  return `+${country.dial}${digits}`;
}

/* ---- Validation ---------------------------------------------------------- */
export function validate(d: RegistrationData): Partial<Record<FieldKey, string>> {
  const e = registration.errors;
  const out: Partial<Record<FieldKey, string>> = {};
  if (!d.fullName.trim()) out.fullName = e.required;
  if (!COUNTRY_BY_ISO[d.phoneCountry]) out.country = e.country;
  if (!d.phoneNumber.trim()) out.phone = e.required;
  else if (!isValidNationalNumber(d.phoneNumber)) out.phone = e.phone;
  if (d.contactVia !== 'telegram' && d.contactVia !== 'whatsapp') out.contactVia = e.contactVia;
  if (d.participation !== 'tournament_after' && d.participation !== 'after_only') out.participation = e.required;
  if (d.participation === 'tournament_after' && (!d.level || !FPP_LEVEL_VALUES.includes(d.level))) out.level = e.level;
  if (!d.consent) out.consent = e.consent;
  return out;
}

/* ---- Env ----------------------------------------------------------------- */
const env = {
  formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID as string | undefined,
  supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL as string | undefined,
  supabaseKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined, // anon key only — never service_role
  dev: import.meta.env.DEV,
};

const f = registration.fields;
export const contactLabel = (v: ContactVia | '') => f.contactOptions.find((o) => o.value === v)?.label ?? '';

/** The readable email Formspree sends (field names are the email's labels). */
export function formspreePayload(d: RegistrationData) {
  const part = f.participationOptions.find((o) => o.value === d.participation);
  return {
    _subject: 'New registration — Padel Social Vol. 2',
    _gotcha: d.gotcha,
    'Full name': d.fullName.trim(),
    Phone: toE164(d.phoneCountry, d.phoneNumber) ?? '',
    'Contact via': contactLabel(d.contactVia),
    Instagram: d.instagram.trim() || '—',
    Participation: part ? `${part.label} — ${part.price}` : d.participation,
    'Playing level':
      d.participation === 'tournament_after' && d.level
        ? d.level === 'none'
          ? f.levelNone.label
          : d.level
        : '— (After Padel only)',
  };
}

/* ---- Providers ----------------------------------------------------------- */
async function sendToFormspree(id: string, d: RegistrationData): Promise<SubmitResult> {
  try {
    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(id)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formspreePayload(d)),
    });
    if (res.ok) return { status: 'success' };
    console.error('[registration] Formspree responded', res.status, await res.text().catch(() => ''));
    return { status: 'error', reason: 'server' };
  } catch (err) {
    console.error('[registration] Formspree network error', err);
    return { status: 'error', reason: 'network' };
  }
}

/** Returns 'duplicate' on a unique-phone violation, 'ok' on insert, 'failed' otherwise. */
async function saveToSupabase(url: string, key: string, d: RegistrationData): Promise<'ok' | 'duplicate' | 'failed'> {
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        full_name: d.fullName.trim(),
        phone: toE164(d.phoneCountry, d.phoneNumber),
        contact_via: d.contactVia,
        instagram: d.instagram.trim() || null,
        participation: d.participation,
        level: d.participation === 'tournament_after' ? d.level : null,
        consent: d.consent,
        source: 'landing-vol2',
      }),
    });
    if (res.ok) return 'ok';
    const body = await res.json().catch(() => ({}) as { code?: string });
    if (res.status === 409 || (body as { code?: string }).code === '23505') return 'duplicate';
    console.error('[registration] Supabase responded', res.status, body);
    return 'failed';
  } catch (err) {
    console.error('[registration] Supabase network error', err);
    return 'failed';
  }
}

async function mockProvider(): Promise<SubmitResult> {
  const mode = new URLSearchParams(location.search).get('mock') ?? 'success';
  await new Promise((r) => setTimeout(r, 700));
  if (mode === 'duplicate') return { status: 'duplicate' };
  if (mode === 'error') return { status: 'error', reason: 'server' };
  return { status: 'success' };
}

/* ---- Entry point --------------------------------------------------------- */
export async function submitRegistration(d: RegistrationData): Promise<SubmitResult> {
  // Optional database copy (skipped silently when not configured)
  let saved: 'ok' | 'duplicate' | 'failed' | 'skipped' = 'skipped';
  if (env.supabaseUrl && env.supabaseKey) {
    saved = await saveToSupabase(env.supabaseUrl, env.supabaseKey, d);
    if (saved === 'duplicate') return { status: 'duplicate' };
  }

  if (env.formspreeId) return sendToFormspree(env.formspreeId, d);

  // No email channel, but the registration is stored in the database
  if (saved === 'ok') return { status: 'success' };

  if (env.dev) return mockProvider();

  console.error('[registration] PUBLIC_FORMSPREE_ID is not set — registration cannot be sent.');
  return { status: 'error', reason: 'unavailable' };
}
