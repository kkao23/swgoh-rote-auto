/**
 * Human-readable display names for SWGOH game IDs.
 *
 * Used by the planner to show clean character/ship names in the exclusion UI
 * instead of raw game IDs like "capitalnegotiator" or "glleia".
 *
 * To add or fix a name: add an entry below. The key is the lowercase gameId.
 */
/** Keys from GAME_ID_DISPLAY_NAMES that are ships (capitals + fleet members). */
export const SHIP_GAME_IDS = new Set([
  'capitalnegotiator', 'capitalexecutor', 'capitalprofundity',
  'capitalchimaera', 'capitalstardestroyer', 'capitalmoncalamaricruiser',
  'capitalleviathan', 'capitalmalevolence', 'capitalraddus', 'capitaljedicruiser',
  'thfat', 'rogueoneship', 'razorcrest', 'punishingone', 'millenniumfalcon', 'bwingrebel',
  'scythe',
]);

export const GL_GAME_IDS = new Set([
  'glleia', 'glrey', 'glhondo', 'sithpalpatine', 'jedimasterkenobi', 'lordvader', 'jabbathehutt', 
  'supremeleaderkyloren', 'jedimasterlukeskywalker',
  'glahsokatano'
]);

/** Icon paths keyed by lowercase gameId.  Fill in over time — used as a fallback
 *  when a data entry has no `icon` field. */
export const CHARACTER_ICONS: Record<string, string> = {
  // ── Ship capitals ──────────────────────────────────────────────
  capitalnegotiator: '/icons/ships/tex.charui_negotiator.png',
  capitalexecutor: '/icons/ships/tex.charui_executor.png',
  capitalprofundity: '/icons/ships/tex.charui_profundity.png',
  capitalchimaera: '/icons/ships/tex.charui_chimaera.png',
  capitalstardestroyer: '/icons/ships/tex.charui_stardestroyer.png',
  capitalleviathan: '/icons/ships/tex.charui_leviathan.png',
  capitalmalevolence: '/icons/ships/tex.charui_malevolence.png',
  capitalraddus: '/icons/ships/tex.charui_raddus.png',

  // ── Galactic Legends ───────────────────────────────────────────
  glleia: '/icons/characters/tex.charui_leiaendor.png',
  glrey: '/icons/characters/tex.charui_rey_tros.png',
  glhondo: '/icons/characters/tex.charui_glhondo.png',
  sithpalpatine: '/icons/characters/tex.charui_espalpatine_pre.png',
  jedimasterkenobi: '/icons/characters/tex.charui_globiwan.png',
  lordvader: '/icons/characters/tex.charui_lordvader.png',
  jabbathehutt: '/icons/characters/tex.charui_jabbathehutt.png',
  supremeleaderkyloren: '/icons/characters/tex.charui_kyloren_tros.png',
  jedimasterlukeskywalker: '/icons/characters/tex.charui_luke_jml.png',
  jediknightlukeskywalker: '/icons/characters/tex.charui_luke_jediknight.png',
  jediknightcalkestis: '/icons/characters/tex.charui_calkestis.png',
  commanderlukeskywalker: '/icons/characters/tex.charui_luke_ep4.png',
  generalskywalker: '/icons/characters/tex.charui_generalanakin.png',
  doctoraphra: '/icons/characters/tex.charui_doctoraphra.png',

  // ── Major characters ───────────────────────────────────────────
  emperorpalpatine: '/icons/characters/tex.charui_palpatineemperor.png',
  generalgrievous: '/icons/characters/tex.charui_grievous.png',
  grandinquisitor: '/icons/characters/tex.charui_grandinquisitor.png',
  grandmofftarkin: '/icons/characters/tex.charui_tarkinadmiral.png',
  greatmothers: '/icons/characters/tex.charui_greatmothers.png',
  mothertalzin: '/icons/characters/tex.charui_nightsisters_talzin.png',
  olddaka: '/icons/characters/tex.charui_nightsisters_daka.png',
  padmeamidala: '/icons/characters/tex.charui_padme_geonosis.png',
  queenamidala: '/icons/characters/tex.charui_queenamidala.png',
  darthrevan: '/icons/characters/tex.charui_sithrevan.png',
  sawgerrera: '/icons/characters/tex.charui_sawgerrera.png',
  nightsistermerrin: '/icons/characters/tex.charui_nightsisters_merrin.png',
  admiralraddus: '/icons/characters/tex.charui_admiralraddus.png',
  moffgideons3: '/icons/characters/tex.charui_moffgideons3.png',
  omegas3: '/icons/characters/tex.charui_omegas3.png',
  mauls7: '/icons/characters/tex.charui_maul.png',
  thirdsister: '/icons/characters/tex.charui_thirdsister.png',
  jediknightrevan: '/icons/characters/tex.charui_jedirevan.png',
  sateleshan: '/icons/characters/tex.charui_sateleshan.png',
  baylanskoll: '/icons/characters/tex.charui_baylanskoll.png',
  glahsokatano: '/icons/characters/tex.charui_ahsokatanogray.png',
  bossnass: '/icons/characters/tex.charui_bossnass.png',
  kelleranbeq: '/icons/characters/tex.charui_kelleranbeq.png',
  monmothma: '/icons/characters/tex.charui_monmothma.png',
  darthbane: '/icons/characters/tex.charui_darthbane.png',
  stranger: '/icons/characters/tex.charui_stranger.png',
  maulhatefueled: '/icons/characters/tex.charui_maulhatefueled.png',
  asajjdarkdisciple: '/icons/characters/tex.charui_asajjdarkdisciple.png',
  captainrex: '/icons/characters/tex.charui_captainrex.png',
  commanderahsoka: '/icons/characters/tex.charui_ahsokaadult.png',
  bt1: '/icons/characters/tex.charui_bt1.png',
  disguisedclonetrooper: '/icons/characters/tex.charui_disguisedclonetrooper.png',
  darthmalak: '/icons/characters/tex.charui_darthmalak.png',
  dashrendar: '/icons/characters/tex.charui_dashrendar.png',
  imperialprobedroid: '/icons/characters/tex.charui_probedroid.png',
  kleya: '/icons/characters/tex.charui_kleya.webp',
  krrsantan: '/icons/characters/tex.charui_krrsantan.png',
  kylekatarn: '/icons/characters/tex.charui_kylekatarn.png',
  macewindu: '/icons/characters/tex.charui_macewindu.png',
  luthenrael: '/icons/characters/tex.charui_luthenrael.png',
  masterquigon: '/icons/characters/tex.charui_masterquigon.png',
  merrin: '/icons/characters/tex.charui_merrin.png',
  padawanobiwan: '/icons/characters/tex.charui_padawanobiwan.png',
  qira: '/icons/characters/tex.charui_qira.png',
  scorch: '/icons/characters/tex.charui_scorch.png',
  starkiller: '/icons/characters/tex.charui_starkiller.png',
  vaderduelsend: '/icons/characters/tex.charui_vaderduelsend.webp',
  younghan: '/icons/characters/tex.charui_han_young.png',
  zaalbar: '/icons/characters/tex.charui_zaalbar.png',
  zoriibliss_v2: '/icons/characters/tex.charui_zoriibliss.png',
  scythe: '/icons/ships/tex.charui_scythe.png',
  ahsokatano: '/icons/characters/tex.charui_ahsoka.png'
};

/** Get the icon path for a gameId, if one is registered. */
export function getCharacterIcon(gameId: string | undefined): string | undefined {
  if (!gameId) return undefined;
  const key = gameId.split(',')[0].trim().toLowerCase();
  return CHARACTER_ICONS[key];
}

export const GAME_ID_DISPLAY_NAMES: Record<string, string> = {
  // ── Galactic Legends & journey characters ──────────────────────
  glleia: 'GL Leia',
  glrey: 'GL Rey',
  glahsokatano: 'GL Ahsoka',
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
  capitalchimaera: 'Chimera',
  capitalstardestroyer: 'Executrix',
  capitalmoncalamaricruiser: 'Home One',
  capitalleviathan: 'Leviathan',
  capitalmalevolence: 'Malevolence',
  capitalraddus: 'Raddus',
  capitaljedicruiser: 'Endurance',

  // ── Ship fleet members ─────────────────────────────────────────
  thfat: 'TIE Fighter',
  rogueoneship: 'Rogue One',
  razorcrest: 'Razor Crest',
  punishingone: 'Punishing One',
  millenniumfalcon: 'Millennium Falcon',
  bwingrebel: 'B-Wing',

  // ── Other ──────────────────────────────────────────────────────
  maulhatefueled: 'Hate-Fueled Maul',
  admiralraddus: 'Admiral Raddus',
  appo: 'Appo',
  asajjdarkdisciple: 'Asajj (Dark Disciple)',
  bobafettscion: 'Boba Fett (Scion)',
  bt1: 'BT-1',
  dashrendar: 'Dash Rendar',
  depabillaba: 'Depa Billaba',
  disguisedclonetrooper: 'Disguised Clone Trooper',
  idenversioempire: 'Iden Versio',
  cc2224: 'Cody',
  commanderahsoka: 'Commander Ahsoka',
  darthtraya: 'Darth Traya',
  darthbane: 'Darth Bane',
  captaindrogan: 'Drogan',
  captainrex: 'Captain Rex',
  carthonasi: 'Carth Onasi',
  ig90: 'IG-90',
  imperialprobedroid: 'Imperial Probe Droid',
  vaderduelsend: "Vader (Duel's End)",
  thirdsister: 'Third Sister',
  yodachewbacca: 'Yoda and Chewie',
  younghan: 'Young Han',
  stormtrooperluke: 'Stormtrooper Luke',
  reyjeditraining: 'Rey (Jedi Training)',
  masterquigon: 'Master Qui-Gon',
  kylekatarn: 'Kyle Katarn',
  mazkanata: 'Maz Kanata',
  jedimastermacewindu: 'Jedi Master Mace Windu',
  generalsyndulla: 'General Syndulla',
  inquisitorbarriss: 'Inquisitor Barriss',
  jediknightcal: 'Jedi Knight Cal',
  luthenrael: 'Luthen Rael',
  jediknightrevan: 'Jedi Knight Revan',
  mandalorbokatan: 'Bo Katan (Mandalore)',
  grandmasterluke: 'GL Luke',
  kitfisto: 'Kit Fisto',
  darthmalak: 'Darth Malak',
  jediknightluke: 'Jedi Knight Luke',
  moffgideons3: 'Dark Trooper Moff Gideon',
  omegas3: 'Omega (Fugitive)',
  mauls7: 'Maul',
  padawanobiwan: 'Padawan Obi-Wan',
  darthmalgus: 'Darth Malgus',
  zoriibliss_v2: 'Zorii Bliss',
  ahsokatano: 'Snips'
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
