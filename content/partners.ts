export type Partner = {
  name: string;
  logo: string;
  /** Size of the image file (trimmed to the drawing), used to give every logo the same visual weight. */
  width: number;
  height: number;
};

/**
 * Success partners, in the same order and with the same logo files as the
 * "Success Partners" section of the HADARA Real Estate website (repository
 * kerimalastal-source/-kinci_BYHADARA, src/data/partners.ts). Keep the two lists in sync.
 * Logos whose files changed there carry a new name here ("-trim"), since Next's image
 * cache cannot be invalidated.
 */
export const partners: Partner[] = [
  { name: 'DTC', logo: 'partners/dtc.png', width: 771, height: 784 },
  { name: 'Faisal Holding', logo: 'partners/faisal-holding-trim.png', width: 510, height: 144 },
  { name: 'DAG Holding', logo: 'partners/dag-holding-trim.png', width: 304, height: 124 },
  { name: 'WUJHA Development', logo: 'partners/wujha-trim.png', width: 226, height: 94 },
  { name: 'Lotus', logo: 'partners/lotus.png', width: 1417, height: 401 },
  { name: 'Studio Vertebra', logo: 'partners/studio-vertebra-trim.png', width: 756, height: 157 },
];

const LOGO_AREA = 7200; // px² each logo covers on a wide screen
const LOGO_MAX_H = 64;
const LOGO_MAX_W = 168;

/**
 * Display size giving every logo about the same area, so a square logo and a long wordmark
 * look equally heavy instead of one towering over the other (same rule as the real estate site).
 */
export function partnerLogoSize(p: Partner) {
  const ratio = p.width / p.height;
  let height = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / ratio));
  if (height * ratio > LOGO_MAX_W) height = LOGO_MAX_W / ratio;
  return { width: Math.round(height * ratio), height: Math.round(height) };
}
