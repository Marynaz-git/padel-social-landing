/* ==========================================================================
   photos.ts — image-slot registry.

   To swap a photo:
     1. drop the file into  src/assets/photos/
     2. set `file` for that slot below (the one reference).
   The <Photo> component serves responsive AVIF/WebP via Astro's image
   pipeline. If the file is missing, a warm placeholder renders instead.

   Crops: `position` = CSS object-position (keeps faces in frame);
          `zoom` = extra crop factor (1 = none), anchored at `position`.
   Sections can override per breakpoint with the CSS vars --pos / --zoom.

   Full shot list: docs/photo-shotlist.md
   ========================================================================== */

export type Tone = 'sunset' | 'dusk' | 'cream' | 'night';

export type PhotoSlot = {
  file: string;
  /** aspect ratio "w/h" for the slot */
  ratio: string;
  alt: string;
  /** what the placeholder says — the intended shot (fallback only) */
  caption: string;
  tone: Tone;
  position?: string;
  zoom?: number;
};

export const photos = {
  /* 01 Hero — W Padel Country Club at sunset (the OG image is a separate file in public/) */
  heroSunsetSocial: {
    file: 'hero-dj-guests-w-padel-sunset.jpg',
    ratio: '16/9',
    alt: 'DJ, padel players and guests with drinks at W Padel Country Club, Lisbon, at sunset',
    caption: 'Hero — DJ, woman in white with a drink, guests at tables, courts and the W sign',
    tone: 'sunset',
    position: '85% 50%',
  },

  /* 03 Experience */
  experiencePlay: {
    file: 'experience-play-woman-backhand.jpg', // v3 A
    ratio: '4/5',
    alt: 'A player hitting a backhand on a padel court',
    caption: 'Play — woman hitting a backhand',
    tone: 'sunset',
    position: '50% 60%',
  },
  experienceStay: {
    file: 'experience-stay-toast-white-wine.jpg', // v3 B
    ratio: '4/5',
    alt: 'Friends toasting with glasses of white wine',
    caption: 'Stay — toasting with white wine, top view',
    tone: 'dusk',
    position: '50% 45%',
  },
  experienceConnect: {
    file: 'experience-connect-friends-w-padel.jpg', // v3 C
    ratio: '4/5',
    alt: 'Four friends with padel rackets and drinks at W Padel Country Club',
    caption: 'Connect — friends with rackets and beers by the W Padel sign',
    tone: 'sunset',
    position: '50% 40%',
  },

  /* 05 Atmosphere — crops differ from where each photo appears elsewhere */
  atmoCourts: {
    file: 'atmosphere-group-celebrating-court.jpg', // atmosphere v2 #1 — banner cropped off at the top of the source
    ratio: '16/10',
    alt: 'Group of players celebrating on the court at W Padel Country Club',
    caption: 'Group photo on the court, arms up',
    tone: 'sunset',
    position: '45% 45%',
  },
  atmoPlayers: {
    file: 'atmosphere-bw-women-playing.jpg', // atmosphere v2 #2
    ratio: '4/5',
    alt: 'Two women playing padel',
    caption: 'Black-and-white rally',
    tone: 'night',
    position: '60% 55%',
  },
  atmoDj: {
    file: 'atmosphere-dj-woman-sunset.jpg', // atmosphere v2 #3
    ratio: '3/4',
    alt: 'DJ playing a set at sunset at W Padel Country Club',
    caption: 'DJ at the decks, W Padel sign behind',
    tone: 'sunset',
    position: '52% 60%',
  },
  atmoCrowd: {
    file: 'atmosphere-bw-beers-bench-court.jpg', // IMG_1814 (sent in chat) — black and white, cups on the bench
    ratio: '16/9',
    alt: 'Cups of beer on a bench by the padel court, a hand reaching for one',
    caption: 'B&W — beers on the bench by the court',
    tone: 'night',
    position: '62% 78%',
  },

  /* 07 Location */
  locationVenue: {
    file: 'location-terrace-courts-sunset.jpg', // v2 #13
    ratio: '3/2',
    alt: 'W Padel Country Club at sunset: lounge terrace overlooking the padel courts',
    caption: 'Venue — terrace and courts, sunset',
    tone: 'sunset',
    position: '50% 55%',
  },
  locationDetail: {
    file: 'location-venue-dusk-lights.jpg', // v2 #14
    ratio: '1/1',
    alt: 'The club at dusk with the court lights and terrace lamps on',
    caption: 'Venue — dusk, lights on',
    tone: 'dusk',
    position: '62% 60%',
  },

  /* 08 Main CTA */
  ctaMacro: {
    file: 'ball-racket-macro.jpg', // photo #3 — macro on the ball felt
    ratio: '1/1',
    alt: '',
    caption: 'Macro — padel ball texture',
    tone: 'cream',
    position: '72% 72%',
    zoom: 1.9,
  },

  /* 10 Final CTA — photo #5 */
  finalSunset: {
    file: 'final-dj-sunset-crowd.jpg',
    ratio: '21/9',
    alt: 'Sunset party by the padel courts: DJ on the left, friends laughing with drinks and players still on court',
    caption: 'Final — after padel, court lights coming on',
    tone: 'dusk',
    position: '50% 45%',
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;
