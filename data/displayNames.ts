// ────────────────────────────────────────────────────────────────────
// Display names, icons, and ship classification.
//
// The single source of truth for name ↔ gameId/base_id ↔ icon is
// data/units.ts (generated from swgoh.gg API data). This file only
// keeps the small curated classification sets that swgoh.gg does not
// expose (Galactic Legend / Journey Guide status).
// ────────────────────────────────────────────────────────────────────

import { UNITS, getUnitIcon } from '~/data/units';

export const SHIP_GAME_IDS = new Set(
  UNITS.filter(u => u.type === 'ship').map(u => u.id),
);

// Curated classification overlays — not available from swgoh.gg unit data.
export const GL_GAME_IDS = new Set([
  'glleia', 'glrey', 'glhondo', 'sithpalpatine', 'jedimasterkenobi',
  'lordvader', 'jabbathehutt', 'supremeleaderkyloren', 'grandmasterluke',
  'glahsokatano',
]);

export const JOURNEY_GUIDE_GAME_IDS = new Set([
  'doctoraphra', 'grandinquisitor', 'baylanskoll', 'starkiller',
  'thirdsister', 'generalskywalker', 'stranger', 'maulhatefueled',
  'jedimastermacewindu', 'jediknightcal', 'mandalorbokatan',
  'cassianundercover',
]);

/** gameId (lowercase) → canonical display name. */
export const GAME_ID_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  UNITS.map(u => [u.id, u.name]),
);

/** gameId (lowercase) → icon path. */
export const CHARACTER_ICONS: Record<string, string> = Object.fromEntries(
  UNITS.map(u => [u.id, u.icon]),
);

/** Icon path for a gameId, if known. Accepts comma-separated team gameIds. */
export function getCharacterIcon(gameId: string | undefined): string | undefined {
  if (!gameId) return undefined;
  return getUnitIcon(gameId);
}

/**
 * Last-resort fallback for ids not present in data/units.ts.
 * Splits camelCase/ALL_CAPS gameIds into Title Case words.
 */
export function formatGameIdForDisplay(key: string): string {
  let name = key.toLowerCase();

  // Insert spaces at camelCase boundaries
  name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Insert spaces between runs of uppercase and a following lowercase
  name = name.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  return name
    .split(/[\s_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
