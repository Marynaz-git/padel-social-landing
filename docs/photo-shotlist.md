# Photo shot list — Padel Social Vol. 2

Every slot uses a real photo. `#1–#10` = first photo set (order supplied); `v2 NN` = files from `padel-photos-v2` (08/09 are duplicates of 14/13 and are not used). Some photos appear in more than one slot with a **different crop**. Crops are set per slot in `src/content/photos.ts` (`position` = CSS object-position, `zoom` = extra crop), and sections can override them per breakpoint with the CSS variables `--pos` / `--zoom`.

**To replace a photo:** drop the new file into `src/assets/photos/` and change `file` for that slot in `src/content/photos.ts`. If a file is missing, a warm placeholder renders instead.

**Art direction for future shots**
- Warm golden hour / early evening in Lisbon. Candid, cinematic, premium, no cold grading.
- Balance across the page: ~40% sport / 60% lifestyle–social.
- Export sRGB JPG, long edge **≥ 2400 px** (current sources are 1122–1672 px; see notes).

| Section | Slot | Final file | Source px | Slot ratio | Crop | Alt text |
|---|---|---|---|---|---|---|
| 01 Hero | `heroSunsetSocial` | `hero-sunset-social.jpg` (#1) | 1672×941 | 16:9 | 0% 40% | Friends laughing with spritz and beer on a padel club terrace at sunset, DJ decks in the foreground and players on the courts behind |
| 03 Experience | `experiencePlay` | `experience-play-woman-backhand.jpg` (v3 A) | 1024×1536 | 4:5 | 50% 60% | A player hitting a backhand on a padel court |
| 03 Experience | `experienceStay` | `experience-stay-toast-white-wine.jpg` (v3 B) | 1122×1402 | 4:5 | 50% 45% | Friends toasting with glasses of white wine |
| 03 Experience | `experienceConnect` | `experience-connect-friends-w-padel.jpg` (v3 C) | 1122×1402 | 4:5 | 50% 40% | Four friends with padel rackets and drinks at W Padel Country Club |
| 04 Why come | `whyGame` | `why-game-net-rally.jpg` (v2 02) | 1122×1402 | 3:4 | 62% 50% | Man and woman playing padel at the net at sunset, the woman reaching for the ball |
| 04 Why come | `whyPeople` | `why-people-group-medals.jpg` (v2 05) | 1122×1402 | 3:4 | 50% 48% | Big group of players with medals and rackets smiling together on the terrace at sunset |
| 04 Why come | `whyAfter` | `why-after-night-party.jpg` (v2 07) | 1122×1402 | 3:4 | 50% 45% | Night party by the courts: DJ, crowd and warm string lights |
| 05 Atmosphere | `atmoCourts` | `atmosphere-night-dancing-dj.jpg` (v2 10) | 1122×1402 | 16:10 | 50% 30% | People dancing next to the DJ on the terrace at night, courts lit up behind |
| 05 Atmosphere | `atmoPlayers` | `atmosphere-forehand.jpg` (#10) | 1448×1086 | 4:5 | 30% 45% | Player hitting a forehand with his partner ready behind |
| 05 Atmosphere | `atmoDj` | `experience-stay-toast-white-wine.jpg` (v3 B, same file as `experienceStay`) | 1122×1402 | 3:4 | 47% 45%, zoom 1.2× | Friends toasting with glasses of white wine |
| 05 Atmosphere | `atmoCrowd` | `atmosphere-friends-table-sunset.jpg` (v2 11) | 1122×1402 | 16:9 | 50% 60% | Four friends laughing around a table with drinks and rackets at sunset |
| 07 Location | `locationVenue` | `location-terrace-courts-sunset.jpg` (v2 13) | 1672×941 | 3:2 | 50% 55% | W Padel Country Club at sunset: lounge terrace overlooking the padel courts |
| 07 Location | `locationDetail` | `location-venue-dusk-lights.jpg` (v2 14) | 1672×941 | 1:1 | 62% 60% | The club at dusk with the court lights and terrace lamps on |
| 08 Main CTA | `ctaMacro` | `ball-racket-macro.jpg` (#3) | 1122×1402 | 1:1 | 72% 72%, zoom 1.9× | *(decorative, alt="")* |
| 10 Final CTA | `finalSunset` | `final-dj-sunset-crowd.jpg` (#5) | 1672×941 | 21:9 | 50% 45% | Sunset party by the padel courts: DJ on the left, friends laughing with drinks and players still on court |

**Per-breakpoint overrides**
- Hero `--pos`: 55% 45% (mobile 4:5), 45% 45% (≥640), 30% 40% (≥1024). Keeps both faces clear of the off-white fade.
- Final CTA `--pos`: 58% 45% (mobile portrait), 50% 45% (≥768).

**Open Graph:** `public/og-image.jpg` is a 1200×630 centre crop of the hero photo (#1).

**Crops that would benefit from a better source photo**
- All sources are ≤ 1672 px wide. The hero and final CTA are full-bleed, so they look slightly soft on retina/2× screens at 1440 px. A long edge of ≥ 2400–2800 px is recommended.
- `atmoCourts` / `atmoCrowd` (v2 10 / 11) are vertical 4:5 sources shown in wide collage tiles, so the top and bottom get cropped.
- Zoomed crops (`atmoDj` 1.2×, `ctaMacro` 1.9×) use a smaller part of the source and are the softest.
- Unused files still in `src/assets/photos/` (not on the page): `why-people-friends.jpg`, `why-after-group.jpg`, `location-venue-bridge.jpg`.
