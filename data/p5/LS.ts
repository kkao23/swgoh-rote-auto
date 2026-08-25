import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsTopLeftP5: dataType[] = [
    {
        lead: 'Queen Amidala', gameId: 'QUEENAMIDALA',
        others: 'POW, MQJ, Snips, GK',
        notes: '1/2 on auto, don\'t target probe droid',
        videos: [{ url: 'https://youtu.be/ofMJ0SXjdCU' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.TARGET_START],
    },
    {
        lead: 'Omega', gameId: 'OMEGAS3',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause auto at the beginning of wave 2. Full platoon required',
        videos: [{ url: 'https://youtu.be/BeYMQVqnVV0' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'Ahsoka Tano', gameId: 'GLAHSOKATANO',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/rKrNwQrNHw4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK', gameId: 'JEDIMASTERKENOBI',
        others: 'GK, CAT, Snips, +1 Galactic Republic',
        notes: 'Auto, CWC Replaceable',
        videos: [{ url: 'https://youtu.be/225Hr3xBRok' }, { url: 'https://youtu.be/8YPqRLYrLZM' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Leia', gameId: 'GLLEIA',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/FwsUlJJgz_o' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW', gameId: 'JEDIMASTERMACEWINDU, DEPABILLABA',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta Nu, Kelleran Beq, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, dont need platoons, very fast. Need platoons for 2/2',
        videos: [{ url: 'https://youtu.be/f1k6giFnvZY' }],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
    lead: 'Padme Amidala', gameId: 'PADMEAMIDALA',
    icon: '/icons/characters/tex.charui_padme_geonosis.png',
    others: 'General Kenobi, general Skywalker, ahsoka (snips), Commander Ahsoka Tano',
    notes: 'This is the Kafrene easiest vs Mob Enforce lead. I\'ve been able to consistently be successful with this team even without having platoons',
    videos: [],
    difficulty: difficulty.EASY,
    creator: 'Anonymous',
    }
]

export const lsTopMidP5: dataType[] = [
    {
        lead: 'Queen Amidala', gameId: 'QUEENAMIDALA',
        others: 'POW, MQJ, Snips, CUP',
        notes: 'auto, hope they dont kill MQG/POW. Needs Platoons',
        videos: [{ url: 'https://youtu.be/2eC85m5HXOA' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW', gameId: 'JEDIMASTERMACEWINDU, DEPABILLABA',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta, Depa, Aayla, Temple Guard',
        notes: 'Depa omi - full auto. Needs platoons to be consistent.',
        videos: [],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Omega', gameId: 'OMEGAS3',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi. Full platoon required',
        videos: [{ url: 'https://youtu.be/GbS9hvNfB3k' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Leia', gameId: 'GLLEIA',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/czbZV5oFunQ' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano', gameId: 'GLAHSOKATANO',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/Y3dadvLoH8o' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK', gameId: 'JEDIMASTERKENOBI',
        others: 'GK, CAT, Snips, +1 Galactic Republic',
        notes: 'Auto, CWC Replaceable',
        videos: [{ url: 'https://youtu.be/qsX88wWIk4Y' },],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },

    {
        lead: 'BKM', gameId: 'MANDALORBOKATAN',
        others: 'Paz, IG12, PSW, Mando',
        notes: 'Paz Omi needed. Was able to auto twice.',
        videos: [],
        icon: '/icons/characters/tex.charui_mandalorbokatan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'zeratul021',
        omi: true
    },
    {
    lead: "BKM",
    others: "Paz, BAM, IG12, Bo-Kryze",
    notes: "Auto. No omicron. Full OPs.",
    videos: [],
    difficulty: difficulty.EASY,
    gameId: "MANDALORBOKATAN",
    creator: "anonymous"
    },
    {
    lead: "Satele Shan",
    others: "JKR, Bastila, Jolee, Juhani",
    notes: "Auto with full platoons. Do not use team if platoons are not full. Good mods on the trio recommended.",
    videos: [],
    difficulty: difficulty.EASY,
    gameId: "SATELESHAN",
    creator: "GalacticLegendRevan"
    }
]

export const lsBottomP5: dataType[] = [
    {
        lead: 'Boss Nass', gameId: 'BOSSNASS',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto. Suggested by avengerObs',
        videos: [{ url: 'https://www.youtube.com/watch?v=5kjc-83PM2s'}],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Omega', gameId: 'OMEGAS3',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause to target Mara at the beginning of wave 2. platoons not required',
        videos: [{ url: 'https://youtu.be/OmM8S6w6l3s' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'Ahsoka Tano (randoms)', gameId: 'GLAHSOKATANO',
        others: 'Ezra, random R9',
        notes: '1/2 on auto, need more Spectres to 2/2',
        videos: [{ url: 'https://youtu.be/xruQGASpTP4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano (spectres)', gameId: 'GLAHSOKATANO',
        others: 'Ezra, Sabine, Hera, Fulcrum',
        notes: 'auto but need some luck on who takes the opening mass assist',
        videos: [{ url: 'https://youtu.be/Q9fG6WCUjE4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW', gameId: 'JEDIMASTERMACEWINDU, DEPABILLABA',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta Nu, Kelleran Beq, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, platoons help, very fast',
        videos: [{ url: 'https://youtu.be/wkwaWPW3ugE' }],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
    ,
    {
        lead: 'Ahsoka Tano', gameId: 'GLAHSOKATANO',
        others: 'Ezra, Padawan Sabine +2',
        notes: 'Sabine can nuke nest, probably inconsistent',
        videos: [],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.EASY,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    }
    ,
]

export const lsShipsP5: dataType[] = [
    {
        lead: 'Profundity (Rogue One)', gameId: 'CAPITALPROFUNDITY, ROGUEONESHIP, MILLENNIUMFALCON',
        others: 'MF, Outrider, Y Wing, Rogue One',
        notes: 'Keep reticule on Scythe, auto',
        videos: [{ url: 'https://youtu.be/qpNtrNGpeKI' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity (No Rogue One)', gameId: 'CAPITALPROFUNDITY, MILLENNIUMFALCON',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'can\'t auto. Go after Scythe, Phantom first reinforcement',
        videos: [{ url: 'https://youtu.be/9HiGycdlf4E' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
    },
    {
        lead: 'Home One (B wing)', gameId: 'CAPITALMONCALAMARICRUISER, BWINGREBEL',
        others: 'Bistan, Cassian, Ravens claw, B wing in reinforcements',
        notes: 'can\'t auto. Go after Scythe first. Bistan special then basics (guaranteed crits). Cassian should do Tenacity down then call Bistan if stealthed, B Wing if not. Alternatively call B Wing with all assists',
        videos: [{ url: 'https://youtu.be/kLN6a-_1yO4' }],
        icon: '/icons/ships/tex.charui_moncalamarilibertycruiser.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.MANUAL]
    },
]

export const lsCassianP5: dataType[] = [
        {
        lead: 'JKCK (omi) JML', gameId: 'JEDIKNIGHTCAL, GRANDMASTERLUKE',
        others: 'Okk, K2, cassian, (Jml/jkl/gmy as 5th)',
        notes: 'Full auto',
        videos: [],
        icon: '/icons/characters/tex.charui_calkestis.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous',
        omi: true
    },
    {
    lead: 'JKCK (omi) Rey', gameId: 'JEDIKNIGHTCAL, GLREY',
    others: "Cassian, K2SO, Rey, {+1, attacker makes it quicker but really anything}",
    notes: "(No remod, jkck omis required, cassian omi not required)",
    videos: [{ url: 'https://youtu.be/BokM9NxDhFo' }],
    difficulty: difficulty.EASY,
    creator: "anonymous"
    },
    {
        lead: 'Admiral Raddus', gameId: 'ADMIRALRADDUS, K2SO, CASSIANANDOR',
        others: 'Jyn Erso, +1 Rogue One',
        notes: 'Can\'t auto, challenging mission',
        videos: [{url: 'https://youtu.be/Ow9hmHcUhQE?si=MGP3GHLfu1gtpTFG', creator: 'Panda Bear'}],
        icon: '/icons/characters/tex.charui_admiralraddus.png',
        difficulty: difficulty.HARD,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
    }
]