# Asset register

Photographs downloaded 2026-09-22 from verified Unsplash photo pages, under the [Unsplash License](https://unsplash.com/license), which permits commercial website use and cropping. These are illustrative images, not BYHADARA-owned properties or projects.

| Local asset                            | Photographer | Source                                                    |
| -------------------------------------- | ------------ | --------------------------------------------------------- |
| `public/images/istanbul-bosphorus.jpg` | Kaan Kosemen | https://unsplash.com/photos/skyline-city-view-mm1bIXfNfaE |

HADARA Hospitality product photographs, copied from that company's website repository (`public/assets/products/`) and resized to 1400 px. They are Unsplash-licensed stock stand-ins chosen by the owner until real product photography exists; the Unsplash photo IDs are recorded in that repository:

| Local asset                                       | Unsplash photo ID |
| ------------------------------------------------- | ----------------- |
| `public/images/hospitality/rolled-towels.jpg`     | `0Qv4fUvlSrI`     |
| `public/images/hospitality/hotel-bath-sheet.jpg`  | `7GCHCT-y1HI`     |
| `public/images/hospitality/fitted-sheet.jpg`      | `lTrbjFd8Iwo`     |
| `public/images/hospitality/pillow-protector.jpg`  | `LFMNXcFd0SA`     |
| `public/images/hospitality/blackout-curtains.jpg` | `GbYmKICa4H4`     |

`public/images/hadara-mark.png` is the gold HADARA monogram used by both group companies, trimmed and resized from the HADARA Real Estate website repository. HADARA Real Estate project photographs are not stored here: they load from that company's own image host (`static.wixstatic.com`, allowed in `next.config.ts`), exactly as on hadararealestate.com.

Success partner logos in `public/images/partners/` (DTC, Faisal Holding, DAG Holding, WUJHA Development, Lotus, Studio Vertebra) are unmodified, byte-identical copies of `public/partners/` in the HADARA Real Estate website repository (`kerimalastal-source/-kinci_BYHADARA`, commit `5ce13a7`), where the same partners are shown. The logos remain the property of their respective companies; keep `content/partners.ts` in sync with that site.

Insights and news visuals in `public/images/insights/` are unmodified copies of the project visuals on the HADARA Real Estate website repository (`kerimalastal-source/-kinci_BYHADARA`, `public/images/projects/`), taken there from the developers' own project catalogues. Each article credits the developer under its main image:

| Local asset                        | Source in that repository                 | Developer           |
| ---------------------------------- | ----------------------------------------- | ------------------- |
| `lotus-yasam-courtyard.jpg`        | `beylikduzu-living/courtyard-gardens.jpg` | Lotus Yapı Proje    |
| `lotus-yasam-garden-terrace.jpg`   | `beylikduzu-living/garden-terrace.jpg`    | Lotus Yapı Proje    |
| `lotus-yasam-living-room.jpg`      | `beylikduzu-living/living-room.jpg`       | Lotus Yapı Proje    |
| `diamond-marin-facade.jpg`         | `diamond-marin/facade.jpg`                | Yıltaş × Lotus Yapı |
| `diamond-marin-living-room.jpg`    | `diamond-marin/living-room.jpg`           | Yıltaş × Lotus Yapı |
| `diamond-marin-master-bedroom.jpg` | `diamond-marin/master-bedroom.jpg`        | Yıltaş × Lotus Yapı |

HADARA Real Estate imagery (2026-09-26, replacing an Unsplash office tower): the homepage panel uses `public/images/real-estate/lotus-manzara-villa.jpg`, an unmodified copy of `lotus-manzara-beylikduzu/villa-type-a.jpg` from the same repository (Lotus Manzara Beylikdüzü, visualisation by Lotus Yapı Proje), and the company page reuses `insights/lotus-yasam-courtyard.jpg`. Both are credited under the image as visualisations by Lotus Yapı Proje.

`diamond-marin/aerial-sea-view.jpg` in that repository was not used: its lower corner carries what looks like an AI image tool's watermark.

`istanbul-bosphorus.jpg` is cropped to 2200×1300 (bottom 350 px removed) so that third-party developer signage and a construction site in the original frame are not shown.

Images are hosted locally and served with Next Image sizing, AVIF/WebP support and reserved dimensions. Original downloaded assets retained for future crops.

Typography: Inter and IBM Plex Sans Arabic, installed via Fontsource and served locally. Both use the SIL Open Font License, included in their installed packages. Brand wordmark is a replaceable text treatment, not an asserted official logo. Favicon is an original simple H monogram; `public/apple-touch-icon.png`, `public/icon-192.png` and `public/icon-512.png` are full-bleed PNG renders of the same monogram.

Share images `public/og/byhadara-{en,ar,tr}.jpg` (1200×630) are original compositions of the cropped `istanbul-bosphorus.jpg` photograph with the text wordmark and a localized tagline set in Inter and IBM Plex Sans Arabic.

No third-party analytics, advertising trackers or remote font requests are included. Turnstile is only loaded if online inquiries are fully configured and enabled.
