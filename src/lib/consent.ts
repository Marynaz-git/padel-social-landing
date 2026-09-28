/* ==========================================================================
   consent.ts — cookie consent + Meta Pixel, in one place.

   GDPR: nothing from Meta (connect.facebook.net / facebook.com) loads until
   the visitor clicks "Accept". The choice is kept in localStorage; "Decline"
   is remembered too, so the banner doesn't come back. The footer
   "Cookie settings" link reopens the banner to change it.

   No <noscript> pixel image on purpose: it would fire without consent.
   Only the ticket value is sent with Lead — never name, phone or contact app.
   ========================================================================== */

import { prices } from '../content/site';

export const META_PIXEL_ID = '4046753072293748';
const KEY = 'pp-consent-v1';
export type Consent = 'granted' | 'denied';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null; // storage blocked: treat as "not chosen", nothing loads
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode etc. — the choice still applies to this page view */
  }
  if (value === 'granted') loadPixel();
}

let loaded = false;

/** Official Meta Pixel base code, only ever called after consent. Fires PageView. */
export function loadPixel() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    } as Fbq;
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

/** Lead after a successful registration — only with consent. */
export function trackLead(participation: 'tournament_after' | 'after_only') {
  if (getConsent() !== 'granted' || !window.fbq) return;
  window.fbq('track', 'Lead', {
    content_name: 'Padel Social Vol. 2',
    value: participation === 'tournament_after' ? prices.tournamentAfter : prices.afterOnly,
    currency: prices.currency,
  });
}

/** Footer "Cookie settings" → reopen the banner. */
export const OPEN_EVENT = 'pp:cookie-settings';
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}
