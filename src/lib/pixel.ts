/* ==========================================================================
   pixel.ts — Meta Pixel, in one place.

   Loads on every page view (no consent banner — client's decision).
   Only the ticket value is sent with Lead — never name, phone or contact app.
   ========================================================================== */

import { prices } from '../content/site';

export const META_PIXEL_ID = '4046753072293748';

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

let loaded = false;

/** Official Meta Pixel base code. Fires PageView. */
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

/** Lead after a successful registration. */
export function trackLead(participation: 'tournament_after' | 'after_only') {
  if (!window.fbq) return;
  window.fbq('track', 'Lead', {
    content_name: 'Padel Social Vol. 2',
    value: participation === 'tournament_after' ? prices.tournamentAfter : prices.afterOnly,
    currency: prices.currency,
  });
}
