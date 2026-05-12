const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** "2026-06-16" → "16 juin" */
export function formatEventDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number) as [number, number, number];
  return `${d} ${MONTHS_FR[m - 1]}`;
}

/** "2026-06-16" → { day: "16", month: "Juin" } pour cartes souvenir */
export function splitEventDate(iso: string): { day: string; month: string } {
  const [, m, d] = iso.split('-').map(Number) as [number, number, number];
  const month = MONTHS_FR[m - 1];
  return { day: String(d), month: month.charAt(0).toUpperCase() + month.slice(1) };
}
