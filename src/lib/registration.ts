/* ==========================================================================
   registration.ts — all submission logic lives here. The form UI only calls
   `submitRegistration()` and renders the returned state.

   Order:
     1. Supabase (optional) — only if PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY
        are set. A unique-email violation → "duplicate". Any other Supabase
        failure is logged and we still continue to Formspree.
     2. Formspree (primary) — PUBLIC_FORMSPREE_ID. Sends a readable email.
     3. Dev only: without a Formspree ID a mock provider answers, switchable
        with ?mock=success | duplicate | error. Production never fakes success.
   ========================================================================== */

import { registration, FPP_LEVEL_VALUES, event, type FppLevel } from '../content/site';

export type Participation = 'tournament_after' | 'after_only';

export type RegistrationData = {
  fullName: string;
  email: string;
  phone: string;
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

export type FieldKey = 'fullName' | 'email' | 'phone' | 'participation' | 'level' | 'consent';

/* ---- Validation ---------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

export function validate(d: RegistrationData): Partial<Record<FieldKey, string>> {
  const e = registration.errors;
  const out: Partial<Record<FieldKey, string>> = {};
  if (!d.fullName.trim()) out.fullName = e.required;
  if (!d.email.trim()) out.email = e.required;
  else if (!EMAIL_RE.test(d.email.trim())) out.email = e.email;
  if (d.phone.trim() && !PHONE_RE.test(d.phone.trim())) out.phone = e.phone;
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

const labelOf = (value: string, options: readonly { value: string; label: string }[]) =>
  options.find((o) => o.value === value)?.label ?? value;

/* ---- Providers ----------------------------------------------------------- */
async function sendToFormspree(id: string, d: RegistrationData): Promise<SubmitResult> {
  const f = registration.fields;
  const payload = {
    _subject: 'New registration — Padel Social Vol. 2',
    _replyto: d.email.trim(),
    _gotcha: d.gotcha,
    'Full name': d.fullName.trim(),
    Email: d.email.trim(),
    Phone: d.phone.trim() || '—',
    Instagram: d.instagram.trim() || '—',
    Participation: labelOf(d.participation, f.participationOptions),
    'Playing level':
      d.participation === 'tournament_after' && d.level
        ? d.level === 'none'
          ? f.levelNone.label
          : d.level
        : '— (After Padel only)',
    Event: `${event.name} ${event.edition} · ${event.dateLabel} · ${event.venue}, ${event.city}`,
  };
  try {
    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(id)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { status: 'success' };
    console.error('[registration] Formspree responded', res.status, await res.text().catch(() => ''));
    return { status: 'error', reason: 'server' };
  } catch (err) {
    console.error('[registration] Formspree network error', err);
    return { status: 'error', reason: 'network' };
  }
}

/** Returns 'duplicate' on a unique-email violation, 'ok' on insert, 'failed' otherwise. */
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
        email: d.email.trim(),
        phone: d.phone.trim() || null,
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
