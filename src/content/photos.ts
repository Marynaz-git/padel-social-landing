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
  /* 01 Hero (+ OG image) — photo #1 */
  heroSunsetSocial: {
    file: 'hero-sunset-social.jpg',
    ratio: '16/9',
    alt: 'Friends laughing with spritz and beer on a padel club terrace at sunset, DJ decks in the foreground and players on the courts behind',
    caption: 'Hero — sunset, people socialising, courts behind',
    tone: 'sunset',
    position: '0% 40%',
  },

  /* 03 Experience */
  experiencePlay: {
    file: 'experience-play-lunge.jpg', // photo #7
    ratio: '4/5',
    alt: 'Padel player in a low lunge reaching for the ball at golden hour',
    caption: 'Play — match in action, golden light',
    tone: 'sunset',
    position: '50% 35%',
  },
  experienceStay: {
    file: 'experience-stay-dj.jpg', // photo #9
    ratio: '4/5',
    alt: 'DJ with headphones mixing at sunset while guests hold spritz glasses',
    caption: 'Stay — drinks, bar, DJ booth',
    tone: 'dusk',
    position: '48% 40%',
  },
  experienceConnect: {
    file: 'experience-connect-friends.jpg', // photo #8
    ratio: '4/5',
    alt: 'Four friends with a padel racket and drinks chatting by the courts',
    caption: 'Connect — group talking after matches',
    tone: 'night',
    position: '52% 35%',
  },

  /* 05 Atmosphere — crops differ from where each photo appears elsewhere */
  atmoCourts: {
    file: 'atmosphere-night-dancing-dj.jpg', // v2 #10 — main collage image
    ratio: '16/10',
    alt: 'People dancing next to the DJ on the terrace at night, courts lit up behind',
    caption: 'Night — dancing, DJ',
    tone: 'night',
    position: '50% 30%',
  },
  atmoPlayers: {
    file: 'atmosphere-forehand.jpg', // photo #10
    ratio: '4/5',
    alt: 'Player hitting a forehand with another player ready behind',
    caption: 'Players mid-rally',
    tone: 'sunset',
    position: '30% 45%',
  },
  atmoDj: {
    file: 'experience-stay-dj.jpg', // photo #9 — tight on the decks and spritz
    ratio: '3/4',
    alt: 'Hands on the DJ mixer next to a glass of spritz',
    caption: 'DJ at the decks',
    tone: 'night',
    position: '62% 78%',
    zoom: 1.35,
  },
  atmoCrowd: {
    file: 'atmosphere-friends-table-sunset.jpg', // v2 #11 — main collage image
    ratio: '16/9',
    alt: 'Four friends laughing around a table with drinks and rackets at sunset',
    caption: 'Friends at a table, sunset',
    tone: 'sunset',
    position: '50% 60%',
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
