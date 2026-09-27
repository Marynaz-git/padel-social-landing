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
| 05 Atmosphere | `atmoCourts` | `atmosphere-bw-five-players-rackets.jpg` (sent in chat) | 1023×1537 | tile | 50% 50% | Five padel players posing with their rackets on the court |
| 05 Atmosphere | `atmoPlayers` | `atmosphere-bw-women-playing.jpg` (atmosphere v2 #2) | 1086×1448 | tile | 60% 55% | Two women playing padel |
| 05 Atmosphere | `atmoDj` | `atmosphere-bw-players-courtside.jpg` (sent in chat) | 1024×1536 | tile | 50% 100%, zoom 1.35× | Players with rackets chatting between the padel courts |
| 05 Atmosphere | `atmoCrowd` | `atmosphere-bw-beers-bench-court.jpg` (IMG_1814, sent in chat) | 2840x3787 | tile | 62% 78% | Cups of beer on a bench by the padel court, a hand reaching for one |
| 07 Location | `locationVenue` | `location-terrace-tables-courts-sunset.jpg` (v4 #2) | 1672×941 | 3:2 | 45% 55% | Terrace and padel courts at W Padel Country Club at sunset |
| 07 Location | `locationDetail` | `location-friends-table-w-sign.jpg` (v4 #3) | 1122×1402 | 1:1 | 50% 55% | Friends with drinks next to the courts at W Padel Country Club |
| 08 Main CTA | `ctaMacro` | `ball-racket-macro.jpg` (#3) | 1122×1402 | 1:1 | 72% 72%, zoom 1.9× | *(decorative, alt="")* |
| 10 Final CTA | `finalSunset` | `final-group-celebrating-court.jpg` (v4 #1, top 33% with the banner cropped off) | 1448×728 | full-bleed | 0% 50% (≥1024), 22% 50% (≥768), 32% 50% (mobile) | Players celebrating together on the court at W Padel Country Club |

**Per-breakpoint overrides**
- Hero `--pos`: 55% 45% (mobile 4:5), 45% 45% (≥640), 30% 40% (≥1024). Keeps both faces clear of the off-white fade.
- Final CTA `--pos`: 32% 50% (mobile portrait), 22% 50% (≥768), 0% 50% (≥1024). The left dark band was strengthened for this brighter photo (small label ≥ 4.5:1).

**Open Graph:** `public/og-image.jpg` is a 1200×630 centre crop of the hero photo (#1).

**Crops that would benefit from a better source photo**
- All sources are ≤ 1672 px wide. The hero and final CTA are full-bleed, so they look slightly soft on retina/2× screens at 1440 px. A long edge of ≥ 2400–2800 px is recommended.
- `atmoCrowd` is a vertical source in a wide desktop tile, so only the lower part (cups and hand) is shown there. `atmoCourts` is a vertical source in a wide desktop tile, so feet and sky are cropped there.
- Atmosphere tiles are 4:5 in the mobile gallery; on desktop their shape comes from the 12-column collage grid.
- Zoomed crops (`ctaMacro` 1.9×) use a smaller part of the source and are the softest.
- Unused files still in `src/assets/photos/` (not on the page): `why-people-friends.jpg`, `why-after-group.jpg`, `location-venue-bridge.jpg`.
