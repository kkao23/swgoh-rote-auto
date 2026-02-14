import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const maceKitP1 = [
    {
        lead: 'Mace (JMK)',
        others: 'JMK, GAS, Ahsoka, Kit',
        notes: 'Full auto',
        videos: [{ url: 'https://youtu.be/sC8Srr7-ziM' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mace (Boys)',
        leadFull: 'Mace with Padawan Obi Wan and Master Qui Gon',
        others: 'Padawan Obi Wan, Master Qui Gon, KAM',
        notes: 'not sure if KAM is necessary. auto. can get unlucky when taunt drops',
        videos: [{ url: 'https://youtu.be/bvOjNuJlhVk' }],
        icon: '/icons/characters/tex.charui_macewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mace (JKCK)',
        leadFull: 'Mace with Jedi Knight Cal Kestis',
        others: 'JKCK, GAS, Ahsoka, Kit',
        notes: 'Only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/AE5XinIdzPE' }],
        icon: '/icons/characters/tex.charui_calkestis.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mace (JML)',
        leadFull: 'Mace with Jedi Master Luke',
        others: 'JML, JKCK, Kyle, Kit',
        notes: 'Two non lead omis on Cal, omi on Kyle',
        videos: [{ url: 'https://youtu.be/IOnWj4Wt9ws' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        omi: true
    },
    {
        lead: 'Mace (Depa Omi)',
        leadFull: 'Mace with Depa Billaba Omicron',
        others: 'Depa Billaba (omi), Temple Guard, Kelleran Beq, Kit',
        notes: 'Omicron on Depa, full auto',
        videos: [{ url: 'https://youtu.be/iFaam9IXmLU' }],
        icon: '/icons/characters/tex.charui_depabillaba.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const jediP1: dataType[] = [
    {
        lead: 'JML',
        leadFull: 'Jedi Master Luke',
        others: 'Jedi Luke, HYoda, JKA, GMY',
        notes: 'auto, Almost any other jedi work',
        videos: [{ url: 'https://youtu.be/9l_PmvdNH1U' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Temple Guard, Aayla, Depa, Jocasta',
        notes: 'Full auto',
        videos: [],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true,
        creator: 'anonymous',
    },
    {
        lead: 'JKL (Ezra)',
        leadFull: 'Jedi Knight Luke with Ezra Exile',
        others: 'Ezra GMY Hyoda Bastila',
        notes: 'auto, if no JML',
        videos: [{ url: 'https://youtu.be/N3weS_bW_Js' }],
        icon: '/icons/characters/tex.charui_luke_jediknight.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    }, {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Shaak Ti, +1 GR',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/tBhtvOG7WAU' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }, 
    {
        lead: 'JKCK (Lead Omi)',
        leadFull: 'Jedi Knight Cal Kestis (Lead Omi)',
        others: 'any 4 Jedi',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=KorRjRRh6k0', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_calkestis.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        others: 'Jocasta Nu, Shaak Ti, Aayla, Temple Guard',
        notes: 'auto, really want Temple Guard here to tank',
        videos: [{ url: 'https://youtu.be/n15kElqRyyc' }],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    }
]

export const shipsLSP1: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/eInUd3NBMQU' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Outrider, Res Bomber, Poes Xwing, Comeuppance, Res Xwing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/xPIzAX3WqIs' }],
        icon: '/icons/ships/tex.charui_raddus.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Home One',
        others: 'HMF, Outrider, Y wing, Biggs, Wedge',
        notes: 'Outrider 2nd special, auto, biggs then wedge reinf. wont work without MF',
        videos: [{ url: 'https://youtu.be/zxW5IOe_w_o' }],
        icon: '/icons/ships/tex.charui_moncalamarilibertycruiser.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Negotiator',
        others: 'JKA, Marauder, Outrider, Y Wing, Ahsoka, Fives',
        notes: 'marauder likely mandatory, easy auto',
        videos: [{ url: 'https://youtu.be/LcxipBi044A' }],
        icon: '/icons/ships/tex.charui_negotiator.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Endurance',
        others: 'Fives, Marauder, Outrider, Clone Sarge, Y Wing, Ahsoka, Anakin',
        notes: 'marauder likely mandatory, auto',
        videos: [{ url: 'https://youtu.be/EEmfeYfr56Y' }],
        icon: '/icons/ships/tex.charui_venator.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    }
]

export const genericLSP1: dataType[] = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any spectre',
        notes: 'auto, dont need ezra',
        videos: [{ url: 'https://youtu.be/lGY7TLSTCMA' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, JKA, Padme',
        notes: 'auto, can sub CAT in for JKA if you have her available',
        videos: [{ url: 'https://youtu.be/BJ-vunYNBIg' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/C-2WLaE8Irs' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Ben, Baze',
        notes: 'auto, last two can be any rebels',
        videos: [{ url: 'https://youtu.be/2qBtZzE3ZPU' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EHYdwMQeFiE' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy full auto with Wrecker Omi',
        videos: [{ url: 'https://youtu.be/2KR762GY7PU' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Saw',
        others: 'Capt Rex, Luthen, Cassian, Baze',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/Utm6eFHyntU' }],
        icon: '/icons/characters/tex.charui_sawgerrera.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'M Mothma',
        leadFull: 'Mon Mothma',
        others: 'Luthen, Kyle (o), Capt Rex, Cassian',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/IbBy_vDW6xc' }],
        icon: '/icons/characters/tex.charui_monmothma.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },

    {
        lead: 'Hunter (OG)',
        others: 'Echo, Wrecker, Tech, Shaak',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/uVCIpd5pXf4' }],
        icon: '/icons/characters/tex.charui_bb_hunter.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Padme (Bad Batch)',
        others: 'Hunter, Wrecker, Tech, Echo',
        notes: 'auto, can get unlucky in 2nd wave',
        videos: [{ url: 'https://www.youtube.com/watch?v=TT9Au4z9hcs', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_padme_geonosis.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Padme (CAT)',
        others: 'Snips, JKA, CAT, Mace',
        notes: 'auto, can swap mace for GK',
        videos: [{ url: 'https://youtu.be/zwCGO6aeGNY' }],
        icon: '/icons/characters/tex.charui_padme_geonosis.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Admiral Raddus',
        others: 'Jyn, K2SO, Cassian, Chirrut',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/-2mnwclkwp0' }],
        icon: '/icons/characters/tex.charui_admiralraddus.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Finn (Zorii)',
        others: 'RH Finn, RH Poe, Poe, Zorii',
        notes: 'only 1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/5vdRQTBlVmY' }],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JTR (Rey)',
        leadFull: 'Jedi Training Rey with GL Rey',
        others: 'Rey, Resistance Trooper, BB8, Ben Solo',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/GfbtAwrGAAI' }],
        icon: '/icons/characters/tex.charui_rey_tlj.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: '2/2 on full auto but not super smooth. Marked enemy leader first before auto',
        videos: [{ url: 'https://youtu.be/wp-v3OwyreQ' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START, interactionType.PAUSE_WAVE2],
    },
]