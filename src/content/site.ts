/* ==========================================================================
   site.ts — single source of truth for ALL copy, event facts, links, FAQ, nav.
   Edit text here; components never hard-code copy.

   Values marked `TODO` are unknown on purpose — do NOT invent them.
   A link whose href is `null` renders as plain text (not clickable) until filled.
   ========================================================================== */

export type Link = { label: string; href: string | null; external?: boolean };

/* ---- FPP playing levels (registration) ---------------------------------
   Allowed values for the `level` field everywhere: form, validation,
   providers and the database check constraint. 1 = highest, 6 = entry. */
export const FPP_LEVELS = {
  men: ['M6', 'M5', 'M4', 'M3', 'M2', 'M1'],
  women: ['F6', 'F5', 'F4', 'F3', 'F2', 'F1'],
} as const;
export type FppLevel =
  | (typeof FPP_LEVELS.men)[number]
  | (typeof FPP_LEVELS.women)[number];
export const FPP_LEVEL_VALUES: readonly FppLevel[] = [...FPP_LEVELS.men, ...FPP_LEVELS.women];

/** Marker for unknown content. Search the repo for `TODO(` to find all. */
const TODO = null;

/* ---- Event facts (do not change without the organiser) ------------------ */
export const event = {
  name: 'PADEL SOCIAL',
  edition: 'Vol. 2',
  brand: 'Play Padel Club',
  dateISO: '2026-10-03',
  dateLabel: '03 October 2026',
  dayLabel: 'Saturday',
  dateShort: '03 October',
  city: 'Lisbon',
  venue: 'W Padel Country Club',
  schedule: [
    { start: '15:00', end: '17:00', startISO: '2026-10-03T15:00:00+01:00', label: 'Tournament' },
    { start: '17:00', end: '21:00', endISO: '2026-10-03T21:00:00+01:00', label: 'After Padel' },
  ],
  idea: 'PADEL × PEOPLE × SOCIAL LIFE',

  // ---- Unknown — fill in, never guess ----
  capacity: TODO,           // TODO(capacity)
  streetAddress: TODO,      // TODO(address)
  ticketIncludes: TODO,     // TODO(inclusions)
} as const;

/* ---- Contacts & prices --------------------------------------------------- */
/** Paste the real Instagram profile URL here; the footer link appears as soon as it's set. */
export const INSTAGRAM_URL: string | null = null; // TODO(instagram)
export const CONTACT_TELEGRAM_URL = 'https://t.me/playpadelclub';
export const CONTACT_EMAIL = 'playpadelcamp@gmail.com';
export const MAPS_URL = 'https://maps.app.goo.gl/zxyNLMRapNWhq9pm8';

export const prices = {
  currency: 'EUR',
  symbol: '€',
  tournamentAfter: 40, // Tournament + After Padel
  afterOnly: 22, // After Padel only
} as const;

/* ---- Links -------------------------------------------------------------- */
export const links = {
  register: '#register',
  details: '#experience',
  directions: {
    label: 'Get directions ↗',
    href: MAPS_URL,
    external: true,
  } satisfies Link,
  instagram: { label: 'Instagram', href: INSTAGRAM_URL, external: true } satisfies Link,
  contact: { label: 'Contact', href: CONTACT_TELEGRAM_URL, external: true } satisfies Link,
  email: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` } satisfies Link,
  privacy: { label: 'Privacy note', href: '/privacy' } satisfies Link,
};

/* ---- SEO ---------------------------------------------------------------- */
export const seo = {
  title: 'Padel Social Vol. 2 — Play Padel Club · 03 October 2026, Lisbon',
  description:
    'Padel events for people who come for the game and stay for the people. Tournament, drinks and DJ at W Padel Country Club, Lisbon — Saturday, 03 October 2026.',
  ogImage: '/og-image.jpg', // 1200×630 — replace with a crop of the hero photo
  ogImageAlt: 'Padel Social Vol. 2 by Play Padel Club — 03 October 2026, Lisbon',
};

/* ---- Header ------------------------------------------------------------- */
export const nav = {
  wordmark: 'Play Padel Club',
  cta: { lead: 'Join', rest: ' the event' }, // "Join the event"; below 480px only "Join" shows (rest stays for screen readers)
};

/* ---- 01 Hero ------------------------------------------------------------ */
export const hero = {
  label: ['PADEL', 'PEOPLE', 'SOCIAL'],
  headline: { lines: ['PADEL', 'SOCIAL'], accent: 'Vol. 2' },
  headlineLabel: 'Padel Social Vol. 2, 03 October 2026, Lisbon', // what screen readers hear for the h1
  copy: 'Padel events for people who come for the game and stay for the people.',
  primaryCta: 'Join the event',
  secondaryCta: 'See details',
  badge: {
    monogram: 'PPC',
    ring: 'PLAY PADEL CLUB · PEOPLE · PADEL · ALWAYS A GOOD TIME · ',
  },
  // Bottom strip — copy taken from hero-reference.png (not in brief)
  strip: {
    items: [
      { num: '01', title: 'Tournament', text: 'Friendly matches for all levels' },
      { num: '02', title: 'Drinks & DJ', text: 'Good music, better people' },
      { num: '03', title: 'Community', text: 'A club for players, by players' },
    ],
  },
};

/* ---- Marquee ------------------------------------------------------------ */
export const marquee = ['PADEL', 'PEOPLE', 'SOCIAL', 'MUSIC'];

/* ---- 02 Manifesto ------------------------------------------------------- */
export const manifesto = {
  headline: { lines: ['MORE'], accentLine: ['THAN ', 'PADEL.'] },
  body: 'Padel Social brings together sport, music and people. Play your matches, meet someone new, grab a drink and stay for the evening.',
  statement: ['COME FOR THE GAME.', 'STAY FOR THE PEOPLE.'],
};

/* ---- 03 Experience ------------------------------------------------------ */
export const experience = {
  label: 'THE EXPERIENCE',
  rows: [
    { num: '01', time: '15:00', title: 'PLAY', items: ['Tournament', 'Friendly matches', 'All levels'], photo: 'experiencePlay' },
    { num: '02', time: '17:00', title: 'STAY', items: ['Drinks', 'DJ', 'Open bar', 'Good vibes'], photo: 'experienceStay' },
    { num: '03', time: 'UNTIL 21:00', title: 'CONNECT', items: ['Meet players', 'Community', 'Social atmosphere'], photo: 'experienceConnect' },
  ],
} as const;

/* ---- 04 Why come -------------------------------------------------------- */
export const whyCome = {
  label: 'WHY COME',
  columns: [
    { num: '01', title: 'THE GAME', text: ['Competitive enough to be exciting.', 'Social enough to actually enjoy it.'] },
    { num: '02', title: 'THE PEOPLE', text: ['Meet players you’ll actually', 'want to play with again.'] },
    { num: '03', title: 'THE AFTER', text: ['The match ends.', 'The event doesn’t.'] },
  ],
} as const;

/* ---- 05 Atmosphere ------------------------------------------------------ */
export const atmosphere = {
  label: 'THE ATMOSPHERE',
  statement: { line1: 'GOOD PEOPLE.', line2: { plain: 'BETTER ', accent: 'PADEL.' } },
  support: ['SPORT', 'DRINKS', 'MUSIC', 'PEOPLE'],
};

/* ---- 06 Who it's for ---------------------------------------------------- */
export const whoFor = {
  label: 'WHO IT’S FOR',
  headline: ['YOU DON’T NEED', 'TO KNOW EVERYONE.'],
  small: 'That’s kind of the point.',
  statements: [
    ['Come solo', 'or with friends.'],
    ['Meet players from the', 'Lisbon padel community.'],
    ['Play first.', 'Socialize after.'],
  ],
};

/* ---- 07 Location -------------------------------------------------------- */
export const location = {
  label: 'THE LOCATION',
  title: ['W PADEL', 'COUNTRY CLUB'],
  city: 'Lisbon',
  text: 'A premium padel setting for a day of sport, music and connection.',
};

/* ---- 07b Tickets (directly before the registration CTA) ---------------- */
export const tickets = {
  label: 'CHOOSE YOUR EXPERIENCE',
  headline: { line1: 'ONE EVENT.', accent: 'TWO', rest: ' WAYS TO JOIN.' },
  intro: ['Play from 15:00 or join the party from 17:00.', 'Either way, you’re part of Padel Social.'],
  aside: ['SPORT', 'MUSIC', 'DRINKS', 'OPEN COURTS', 'PEOPLE'],
  cards: [
    {
      num: '01',
      title: ['TOURNAMENT', '+ AFTER PADEL'],
      price: `${prices.symbol}${prices.tournamentAfter}`,
      text: 'Play in the tournament, compete for prizes and stay for the full After Padel experience.',
      sub: { label: 'TOURNAMENT', time: '15:00 – 17:00' },
      items: [
        { icon: 'racket', text: 'Tournament entry' },
        { icon: 'trophy', text: 'Awards for tournament winners' },
      ],
      plus: { label: 'PLUS EVERYTHING IN AFTER PADEL', time: '17:00 — 21:00' },
      cta: 'Join Tournament + After Padel',
      participation: 'tournament_after',
    },
    {
      num: '02',
      title: ['AFTER PADEL', 'ONLY'],
      price: `${prices.symbol}${prices.afterOnly}`,
      text: 'Join the main evening part — music, drinks, open courts and great people.',
      sub: { label: 'YOUR AFTER PADEL EXPERIENCE', time: '17:00 – 21:00' },
      items: [
        { icon: 'music', text: 'DJ sets — 4 hours of music' },
        { icon: 'glass', text: 'Unlimited open bar — beer, cider, soft drinks, water' },
        { icon: 'court', text: 'Open courts — play as much as you want' },
        { icon: 'camera', text: 'Professional event photos' },
        { icon: 'people', text: 'Great atmosphere and new connections' },
      ],
      plus: null,
      cta: 'Join After Padel',
      participation: 'after_only',
    },
  ],
} as const;

/* ---- 08 Main CTA + registration ---------------------------------------- */
export const mainCta = {
  small: '03 OCTOBER · LISBON',
  headline: ['SEE YOU', 'ON COURT?'],
  cta: 'Join Padel Social',
};

export type ContactVia = 'telegram' | 'whatsapp';

export const registration = {
  title: 'Register',
  intro: 'Leave your details and we’ll confirm your spot on Telegram or WhatsApp.',
  fields: {
    fullName: 'Full name',
    phone: 'Phone',
    phoneCountry: 'Country code',
    phoneNumber: 'Phone number',
    phonePinnedGroup: 'Popular',
    phoneAllGroup: 'All countries',
    contactVia: 'Contact me via',
    contactOptions: [
      { value: 'telegram' as ContactVia, label: 'Telegram' },
      { value: 'whatsapp' as ContactVia, label: 'WhatsApp' },
    ],
    participation: 'Participation',
    participationOptions: [
      { value: 'tournament_after', label: 'Tournament + After Padel', price: `${prices.symbol}${prices.tournamentAfter}` },
      { value: 'after_only', label: 'After Padel only', price: `${prices.symbol}${prices.afterOnly}` },
    ],
    level: 'Playing level',
    levelHelp: 'FPP level — 1 is the highest, 6 is entry level.',
    levelPlaceholder: 'Choose your level',
    // Official Portuguese Padel Federation (FPP) levels, listed 6 → 1 (entry levels first)
    levelGroups: [
      { label: 'Men', options: FPP_LEVELS.men.map((v) => ({ value: v, label: v })) },
      { label: 'Women', options: FPP_LEVELS.women.map((v) => ({ value: v, label: v })) },
    ],
    consent: 'I agree to Play Padel Club processing my details to manage my registration for this event.', // DRAFT — review
  },
  submit: 'Join Padel Social',
  submitting: 'Sending…',
  // DRAFT — review all messages below
  errors: {
    required: 'This field is required.',
    country: 'Please choose your country code.',
    phone: 'Please enter a valid phone number (6–14 digits).',
    contactVia: 'Please choose Telegram or WhatsApp.',
    level: 'Please choose your playing level.',
    consent: 'Please agree so we can process your registration.',
  },
  // {app} is replaced with Telegram / WhatsApp
  success: { title: 'You’re on the list.', text: 'Thanks for joining Padel Social. We’ll confirm your spot on {app}.' },
  duplicate: { title: 'You’re already on the list.', text: 'We already have a registration with this phone number. See you on court.' },
  error: { title: 'Something went wrong.', text: 'Your details are still here. Please try again.', retry: 'Try again' },
  // registration channel not configured in production (no PUBLIC_FORMSPREE_ID)
  unavailable: { title: 'Something went wrong.', text: 'Please try again later.' },
  checkFields: 'Please check the highlighted fields.',
};

/* ---- 09 FAQ ------------------------------------------------------------- */
export type FaqItem = { q: string; a: string | string[]; lead?: string };

export const faq: { title: string; items: FaqItem[] } = {
  title: 'FAQ',
  items: [
    {
      q: 'Do I need to come with a partner?',
      a: 'No. The tournament is played as a Winners Court — you register on your own, partners rotate between games, and winners move up. Come solo or with friends.', // DRAFT — review
    },
    {
      q: 'What level do I need to play?',
      a: 'All levels are welcome — you just need at least 2 months of regular play. Choose your level when you register so we can set up friendly, balanced matches.',
    },
    {
      q: 'Can I come only for After Padel?',
      a: 'Yes. Select “After Padel only” in the registration form and join us from 17:00.', // DRAFT — review
    },
    {
      q: 'What’s included in the ticket?',
      // first paragraph is shown emphasised — DRAFT — review
      lead: 'Both tickets include the After Padel evening, 17:00–21:00: unlimited open bar, DJ sets, open courts and professional event photos.',
      a: [
        `Tournament + After Padel — ${prices.symbol}${prices.tournamentAfter}: the tournament from 15:00 to 17:00 with awards for the winners, then the full After Padel evening.`,
        `After Padel only — ${prices.symbol}${prices.afterOnly}: join us from 17:00 for the open bar, music, open courts and the social evening.`,
        'Payment details are sent with your registration confirmation.',
      ], // DRAFT — review
    },
    {
      q: 'What should I bring?',
      a: 'If you’re playing: your racket, sports shoes and clothes, and water. For After Padel: just yourself and good energy.', // DRAFT — review
    },
  ],
};

/* ---- 10 Final CTA ------------------------------------------------------- */
export const finalCta = {
  label: 'PADEL SOCIAL · VOL. 2',
  lines: ['PLAY.', 'MEET.'],
  accent: 'STAY.',
  cta: 'Join the event',
};

/* ---- 11 Footer ---------------------------------------------------------- */
export const footer = {
  wordmark: 'Play Padel Club',
  tagline: 'PADEL · PEOPLE · SOCIAL',
  // Instagram shows once INSTAGRAM_URL is set; only real links are rendered
  links: [links.instagram, links.contact, links.email].filter((l): l is Link & { href: string } => Boolean(l.href)),
  legal: `© ${new Date(event.dateISO).getFullYear()} Play Padel Club`,
};
