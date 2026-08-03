type lead = {
    id: string;        // Actual SWGOH gameId (matches data file gameId values)
    fullName: string;
    aliases: string[];
}

export const leads: lead[] = [
  // ── Ship Capitals ──────────────────────────────────────────────
  { id: "CAPITALCHIMAERA", fullName: "Chimera", aliases: [] },
  { id: "CAPITALEXECUTOR", fullName: "Executor", aliases: [] },
  { id: "CAPITALSTARDESTROYER", fullName: "Executrix", aliases: [] },
  { id: "CAPITALMONCALAMARICRUISER", fullName: "Home One", aliases: ["Home one"] },
  { id: "CAPITALLEVIATHAN", fullName: "Leviathan", aliases: ["Levi"] },
  { id: "CAPITALMALEVOLENCE", fullName: "Malevolence", aliases: ["Mal"] },
  { id: "CAPITALNEGOTIATOR", fullName: "Negotiator", aliases: ["Neg"] },
  { id: "CAPITALPROFUNDITY", fullName: "Profundity", aliases: ["Prof"] },
  { id: "CAPITALRADDUS", fullName: "Raddus", aliases: ["Holdo"] },
  { id: "CAPITALJEDICRUISER", fullName: "Endurance", aliases: [] },

  // ── Galactic Legends ───────────────────────────────────────────
  { id: "AHSOKATANO", fullName: "Ahsoka Tano", aliases: ["GLAT", "GL Ahsoka", "Glat"] },
  { id: "GLLEIA", fullName: "Leia Organa", aliases: ["Leia", "Gl leia"] },
  { id: "GLREY", fullName: "Rey", aliases: ["Rey"] },
  { id: "GRANDMASTERLUKE", fullName: "Jedi Master Luke Skywalker", aliases: ["JML", "JMLS", "Jedi master Luke"] },
  { id: "JABBATHEHUTT", fullName: "Jabba the Hutt", aliases: ["Jabba"] },
  { id: "JEDIMASTERKENOBI", fullName: "Jedi Master Kenobi", aliases: ["JMK"] },
  { id: "LORDVADER", fullName: "Lord Vader", aliases: ["LV"] },
  { id: "SITHPALPATINE", fullName: "Sith Eternal Emperor", aliases: ["SEE"] },
  { id: "SUPREMELEADERKYLOREN", fullName: "Supreme Leader Kylo Ren", aliases: ["SLKR"] },

  // ── Journey Guide / Conquest ───────────────────────────────────
  { id: "BAYLANSKOLL", fullName: "Baylan Skoll", aliases: ["Baylan"] },
  { id: "BOBAFETTSCION", fullName: "Boba Fett Scion of Jango", aliases: ["DBB", "Dad Bod Boba", "BFSOJ"] },
  { id: "DARTHBANE", fullName: "Darth Bane", aliases: ["Bane"] },
  { id: "DARTHREVAN", fullName: "Darth Revan", aliases: ["DR"] },
  { id: "DOCTORAPHRA", fullName: "Doctor Aphra", aliases: ["Aphra", "Dr Aphra", "Dr. Aphra"] },
  { id: "GENERALSKYWALKER", fullName: "General Skywalker", aliases: ["GAS"] },
  { id: "GLHONDO", fullName: "Pirate King Hondo Onaka", aliases: ["Hondo", "PK Hondo", "GL Hondo", "PKHO", "Pirate King Hondo"] },
  { id: "GRANDINQUISITOR", fullName: "Grand Inquisitor", aliases: ["GI"] },
  { id: "JEDIKNIGHTCAL", fullName: "Jedi Knight Cal Kestis", aliases: ["JKCK"] },
  { id: "JEDIKNIGHTLUKE", fullName: "Jedi Knight Luke Skywalker", aliases: ["JKL"] },
  { id: "JEDIKNIGHTREVAN", fullName: "Jedi Knight Revan", aliases: [] },
  { id: "JEDIMASTERMACEWINDU", fullName: "Jedi Master Mace Windu", aliases: ["JMMW", "Mace", "Mace Windu"] },
  { id: "MANDALORBOKATAN", fullName: "Bo-Katan Kryze (Mandalore)", aliases: ["BK Mandalore", "BKM", "Bo-Katan", "Bo Katan", "BK"] },
  { id: "MAULS7", fullName: "Maul", aliases: [] },
  { id: "REYJEDITRAINING", fullName: "Jedi Training Rey", aliases: ["JTR"] },
  { id: "STARKILLER", fullName: "Starkiller", aliases: [] },
  { id: "STRANGER", fullName: "The Stranger", aliases: ["Stranger"] },
  { id: "THIRDSISTER", fullName: "Reva", aliases: ["Reva"] },

  // ── Legendary / Assault Battle ─────────────────────────────────
  { id: "ADMIRALRADDUS", fullName: "Admiral Raddus", aliases: ["Raddus"] },
  { id: "BOSSNASS", fullName: "Boss Nass", aliases: [] },
  { id: "CAPTAINENOCH", fullName: "Captain Enoch", aliases: ["Enoch"] },
  { id: "CASSIANUNDERCOVER", fullName: "Cassian Andor (Undercover)", aliases: ["Cassian (Undercover)"] },
  { id: "CEREJUNDA", fullName: "Cere Junda", aliases: ["Cere"] },
  { id: "COMMANDERLUKESKYWALKER", fullName: "Commander Luke Skywalker", aliases: ["CLS"] },
  { id: "EMPERORPALPATINE", fullName: "Emperor Palpatine", aliases: ["E Palpatine", "Emp Palpatine", "Palp", "Palpatine"] },
  { id: "FINN", fullName: "Finn", aliases: ["Finn (omi)", "oFinn", "Finn (o)", "Finn (Zorii)"] },
  { id: "GENERALSYNDULLA", fullName: "General Syndulla", aliases: [] },
  { id: "GREATMOTHERS", fullName: "Great Mothers", aliases: ["GM", "Gm"] },
  { id: "GRIEVOUS", fullName: "General Grievous", aliases: ["GG"] },
  { id: "HERASYNDULLAS3", fullName: "Hera Syndulla", aliases: ["Hera"] },
  { id: "IDENVERSIOEMPIRE", fullName: "Iden Versio", aliases: ["Iden"] },
  { id: "KELLERANBEQ", fullName: "Kelleran Beq", aliases: ["KB"] },
  { id: "MOTHERTALZIN", fullName: "Mother Talzin", aliases: ["MT"] },
  { id: "PADMEAMIDALA", fullName: "Padmé Amidala", aliases: ["Padme"] },
  { id: "QIRA", fullName: "Qi'ra", aliases: ["Qira"] },
  { id: "QUEENAMIDALA", fullName: "Queen Amidala", aliases: ["QA"] },
  { id: "SATELESHAN", fullName: "Satele Shan", aliases: ["Satele"] },
  { id: "SAWGERRERA", fullName: "Saw Gerrera", aliases: ["Saw"] },
  { id: "STORMTROOPERLUKE", fullName: "Stormtrooper Luke", aliases: [] },
  { id: "TARFFUL", fullName: "Tarfful", aliases: ["Tarfull"] },
  { id: "TRENCH", fullName: "Admiral Trench", aliases: ["Trench", "Admiral Bench"] },

  // ── Regular Characters ─────────────────────────────────────────
  { id: "BADBATCHHUNTER", fullName: "Hunter", aliases: [] },
  { id: "BOSSK", fullName: "Bossk", aliases: [] },
  { id: "CC2224", fullName: "Cody", aliases: [] },
  { id: "COBBVANTH", fullName: "Cobb Vanth", aliases: ["Cobb"] },
  { id: "CT7567", fullName: "Rex", aliases: [] },
  { id: "DAKA", fullName: "Old Daka", aliases: ["Daka"] },
  { id: "FIFTHBROTHER", fullName: "Fifth Brother", aliases: ["5B"] },
  { id: "GEONOSIANBROODALPHA", fullName: "Geonosian Brood Alpha", aliases: ["GBA"] },
  { id: "GRANDMOFFTARKIN", fullName: "Tarkin", aliases: ["Grand Moff Tarkin", "GMT"] },
  { id: "MAZKANATA", fullName: "Maz Kanata", aliases: ["Maz"] },
  { id: "MOFFGIDEONS3", fullName: "Dark Trooper Moff Gideon", aliases: ["DTMG"] },
  { id: "MONMOTHMA", fullName: "Mon Mothma", aliases: ["M Mothma", "MM"] },
  { id: "OMEGAS3", fullName: "Omega", aliases: [] },
  { id: "VADER", fullName: "Darth Vader", aliases: [] },
  { id: "ZUCKUSS", fullName: "Zuckuss", aliases: [] },

  // ── Fringe / Secondary ─────────────────────────────────────────
  { id: "50RT", fullName: "50R-T", aliases: [] },
  { id: "BOKATAN", fullName: "Bo-Katan Kryze", aliases: [] },
]
