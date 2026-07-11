/**
 * Human-readable display names for SWGOH game IDs.
 *
 * Used by the planner to show clean character/ship names in the exclusion UI
 * instead of raw game IDs like "capitalnegotiator" or "glleia".
 *
 * To add or fix a name: add an entry below. The key is the lowercase gameId.
 */

export const GAME_ID_DISPLAY_NAMES: Record<string, string> = {
  // ── Galactic Legends & journey characters ──────────────────────
  glleia: 'GL Leia',
  glrey: 'GL Rey',
  glhondo: 'Pirate King Hondo Onaka',
  sithpalpatine: 'Sith Eternal Emperor',
  jedimasterkenobi: 'Jedi Master Kenobi',
  lordvader: 'Lord Vader',
  jabbathehutt: 'Jabba the Hutt',
  supremeleaderkyloren: 'Supreme Leader Kylo Ren',
  jedimasterlukeskywalker: 'Jedi Master Luke Skywalker',
  jediknightlukeskywalker: 'Jedi Knight Luke Skywalker',
  jediknightcalkestis: 'Jedi Knight Cal Kestis',
  jeditrainingrey: 'Jedi Training Rey',
  commanderlukeskywalker: 'Commander Luke Skywalker',
  generalskywalker: 'General Skywalker',
  doctoraphra: 'Doctor Aphra',

  // ── Major characters ───────────────────────────────────────────
  emperorpalpatine: 'Emperor Palpatine',
  generalgrievous: 'General Grievous',
  grandinquisitor: 'Grand Inquisitor',
  grandmofftarkin: 'Grand Moff Tarkin',
  greatmothers: 'Great Mothers',
  nightsistermerrin: 'Merrin',
  mothertalzin: 'Mother Talzin',
  olddaka: 'Old Daka',
  padmeamidala: 'Padmé Amidala',
  queenamidala: 'Queen Amidala',
  jediconsular: 'Jedi Consular',
  darthrevan: 'Darth Revan',
  sithtriumviratemember: 'Sith Triumvirate',
  sawgerrera: 'Saw Gerrera',
  badbatchhunter: 'Hunter',
  herasyndullas3: 'Hera Syndulla',
  cassianundercover: 'Cassian (Undercover)',

  // ── Ship capitals ──────────────────────────────────────────────
  capitalnegotiator: 'Negotiator',
  capitalexecutor: 'Executor',
  capitalprofundity: 'Profundity',
  capitalchimera: 'Chimera',
  capitalexecutrix: 'Executrix',
  capitalhomeone: 'Home One',
  capitalleviathan: 'Leviathan',
  capitalmalevolence: 'Malevolence',
  capitalraddus: 'Raddus',

  // ── Other ──────────────────────────────────────────────────────
  thfat: 'TIE Fighter',
  rogueoneship: 'Rogue One',
  maulhatefueled: 'Hate-Fueled Maul',
};

/**
 * Last-resort: format a raw gameId like "moffgideons3" into
 * "Moff Gideon S3" using camelCase / ALL_CAPS splitting.
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
