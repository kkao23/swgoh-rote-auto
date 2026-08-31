import { getUnitName } from '~/data/units';

// ────────────────────────────────────────────────────────────────────
// Curated lead alias overlay.
//
// data/units.ts is the single source of truth for names/icons. This file
// only adds the community shorthand aliases (SLKR, JML, Palp, ...) that
// swgoh.gg does not carry. `fullName` is derived from data/units.ts.
// ────────────────────────────────────────────────────────────────────

type lead = {
    id: string;        // Actual SWGOH base id (matches data file gameId values)
    fullName: string;  // Derived from data/units.ts
    aliases: string[];
}

const LEAD_ALIASES: { id: string; aliases: string[] }[] = [
  // ── Ship Capitals ──────────────────────────────────────────────
  { id: "CAPITALCHIMAERA", aliases: [] },
  { id: "CAPITALEXECUTOR", aliases: [] },
  { id: "CAPITALSTARDESTROYER", aliases: [] },
  { id: "CAPITALMONCALAMARICRUISER", aliases: ["Home one"] },
  { id: "CAPITALLEVIATHAN", aliases: ["Levi"] },
  { id: "CAPITALMALEVOLENCE", aliases: ["Mal"] },
  { id: "CAPITALNEGOTIATOR", aliases: ["Neg"] },
  { id: "CAPITALPROFUNDITY", aliases: ["Prof"] },
  { id: "CAPITALRADDUS", aliases: ["Holdo"] },
  { id: "CAPITALJEDICRUISER", aliases: [] },

  // ── Galactic Legends ───────────────────────────────────────────
  { id: "AHSOKATANO", aliases: ["GLAT", "GL Ahsoka", "Glat"] },
  { id: "GLLEIA", aliases: ["Leia", "Gl leia"] },
  { id: "GLREY", aliases: ["Rey"] },
  { id: "GRANDMASTERLUKE", aliases: ["JML", "JMLS", "Jedi master Luke"] },
  { id: "JABBATHEHUTT", aliases: ["Jabba"] },
  { id: "JEDIMASTERKENOBI", aliases: ["JMK"] },
  { id: "LORDVADER", aliases: ["LV"] },
  { id: "SITHPALPATINE", aliases: ["SEE"] },
  { id: "SUPREMELEADERKYLOREN", aliases: ["SLKR"] },

  // ── Journey Guide / Conquest ───────────────────────────────────
  { id: "BAYLANSKOLL", aliases: ["Baylan"] },
  { id: "BOBAFETTSCION", aliases: ["DBB", "Dad Bod Boba", "BFSOJ"] },
  { id: "DARTHBANE", aliases: ["Bane"] },
  { id: "DARTHREVAN", aliases: ["DR"] },
  { id: "DOCTORAPHRA", aliases: ["Aphra", "Dr Aphra", "Dr. Aphra"] },
  { id: "GENERALSKYWALKER", aliases: ["GAS"] },
  { id: "GLHONDO", aliases: ["Hondo", "PK Hondo", "GL Hondo", "PKHO", "Pirate King Hondo"] },
  { id: "GRANDINQUISITOR", aliases: ["GI"] },
  { id: "JEDIKNIGHTCAL", aliases: ["JKCK"] },
  { id: "JEDIKNIGHTLUKE", aliases: ["JKL"] },
  { id: "JEDIKNIGHTREVAN", aliases: [] },
  { id: "JEDIMASTERMACEWINDU", aliases: ["JMMW", "Mace", "Mace Windu"] },
  { id: "MANDALORBOKATAN", aliases: ["BK Mandalore", "BKM", "Bo-Katan", "Bo Katan", "BK"] },
  { id: "MAULS7", aliases: [] },
  { id: "REYJEDITRAINING", aliases: ["JTR"] },
  { id: "STARKILLER", aliases: [] },
  { id: "STRANGER", aliases: ["Stranger"] },
  { id: "THIRDSISTER", aliases: ["Reva"] },

  // ── Legendary / Assault Battle ─────────────────────────────────
  { id: "ADMIRALRADDUS", aliases: ["Raddus"] },
  { id: "BOSSNASS", aliases: [] },
  { id: "CAPTAINENOCH", aliases: ["Enoch"] },
  { id: "CASSIANUNDERCOVER", aliases: ["Cassian (Undercover)"] },
  { id: "CEREJUNDA", aliases: ["Cere"] },
  { id: "COMMANDERLUKESKYWALKER", aliases: ["CLS"] },
  { id: "EMPERORPALPATINE", aliases: ["E Palpatine", "Emp Palpatine", "Palp", "Palpatine"] },
  { id: "FINN", aliases: ["Finn (omi)", "oFinn", "Finn (o)", "Finn (Zorii)"] },
  { id: "GENERALSYNDULLA", aliases: [] },
  { id: "GREATMOTHERS", aliases: ["GM", "Gm"] },
  { id: "GRIEVOUS", aliases: ["GG"] },
  { id: "HERASYNDULLAS3", aliases: ["Hera"] },
  { id: "IDENVERSIOEMPIRE", aliases: ["Iden"] },
  { id: "KELLERANBEQ", aliases: ["KB"] },
  { id: "MOTHERTALZIN", aliases: ["MT"] },
  { id: "PADMEAMIDALA", aliases: ["Padme"] },
  { id: "QIRA", aliases: ["Qira"] },
  { id: "QUEENAMIDALA", aliases: ["QA"] },
  { id: "SATELESHAN", aliases: ["Satele"] },
  { id: "SAWGERRERA", aliases: ["Saw"] },
  { id: "STORMTROOPERLUKE", aliases: [] },
  { id: "TARFFUL", aliases: ["Tarfull"] },
  { id: "TRENCH", aliases: ["Trench", "Admiral Bench"] },

  // ── Regular Characters ─────────────────────────────────────────
  { id: "BADBATCHHUNTER", aliases: [] },
  { id: "BOSSK", aliases: [] },
  { id: "CC2224", aliases: [] },
  { id: "COBBVANTH", aliases: ["Cobb"] },
  { id: "CT7567", aliases: [] },
  { id: "DAKA", aliases: ["Daka"] },
  { id: "FIFTHBROTHER", aliases: ["5B"] },
  { id: "GEONOSIANBROODALPHA", aliases: ["GBA"] },
  { id: "GRANDMOFFTARKIN", aliases: ["Grand Moff Tarkin", "GMT"] },
  { id: "MAZKANATA", aliases: ["Maz"] },
  { id: "MOFFGIDEONS3", aliases: ["DTMG"] },
  { id: "MONMOTHMA", aliases: ["M Mothma", "MM"] },
  { id: "OMEGAS3", aliases: [] },
  { id: "VADER", aliases: [] },
  { id: "ZUCKUSS", aliases: [] },

  // ── Fringe / Secondary ─────────────────────────────────────────
  { id: "50RT", aliases: [] },
  { id: "BOKATAN", aliases: [] },
]

export const leads: lead[] = LEAD_ALIASES.map(l => ({
  id: l.id,
  fullName: getUnitName(l.id) ?? l.id,
  aliases: l.aliases,
}));
