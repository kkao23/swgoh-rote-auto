import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const maceKitP1 = [
    {
        lead: 'Mace (JMK)',
        others: 'JMK, GAS, Ahsoka, Kit',
        notes: 'Full auto',
        videos: [{ url: 'https://youtu.be/sC8Srr7-ziM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Mace (Boys)',
        leadFull: 'Mace with Padawan Obi Wan and Master Qui Gon',
        others: 'Padawan Obi Wan, Master Qui Gon, KAM',
        notes: 'not sure if KAM is necessary. auto. can get unlucky when taunt drops',
        videos: [{ url: 'https://youtu.be/bvOjNuJlhVk' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Mace (JKCK)',
        leadFull: 'Mace with Jedi Knight Cal Kestis',
        others: 'JKCK, GAS, Ahsoka, Kit',
        notes: 'Only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/AE5XinIdzPE' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Mace (JML)',
        leadFull: 'Mace with Jedi Master Luke',
        others: 'JML, JKCK, Kyle, Kit',
        notes: 'Two non lead omis on Cal, omi on Kyle',
        videos: [{ url: 'https://youtu.be/IOnWj4Wt9ws' }],
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
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
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
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'JKL (Ezra)',
        leadFull: 'Jedi Knight Luke with Ezra Exile',
        others: 'Ezra GMY Hyoda Bastila',
        notes: 'auto, if no JML',
        videos: [{ url: 'https://youtu.be/N3weS_bW_Js' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    }, {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Shaak Ti, +1 GR',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/tBhtvOG7WAU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    }, {
        lead: 'JKCK (Lead Omi)',
        leadFull: 'Jedi Knight Cal Kestis (Lead Omi)',
        others: 'any 4 Jedi',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=KorRjRRh6k0', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Aayla, Temple Guard',
        notes: 'auto, really want Temple Guard here to tank',
        videos: [{ url: 'https://youtu.be/n15kElqRyyc' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    }
]

export const shipsLSP1: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/eInUd3NBMQU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Outrider, Res Bomber, Poes Xwing, Comeuppance, Res Xwing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/xPIzAX3WqIs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Home One',
        others: 'HMF, Outrider, Y wing, Biggs, Wedge',
        notes: 'Outrider 2nd special, auto, biggs then wedge reinf. wont work without MF',
        videos: [{ url: 'https://youtu.be/zxW5IOe_w_o' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Negotiator',
        others: 'JKA, Marauder, Outrider, Y Wing, Ahsoka, Fives',
        notes: 'marauder likely mandatory, easy auto',
        videos: [{ url: 'https://youtu.be/LcxipBi044A' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Endurance',
        others: 'Fives, Marauder, Outrider, Clone Sarge, Y Wing, Ahsoka, Anakin',
        notes: 'marauder likely mandatory, auto',
        videos: [{ url: 'https://youtu.be/EEmfeYfr56Y' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    }
]

export const genericLSP1: dataType[] = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any spectre',
        notes: 'auto, dont need ezra',
        videos: [{ url: 'https://youtu.be/lGY7TLSTCMA' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, JKA, Padme',
        notes: 'auto, can sub CAT in for JKA if you have her available',
        videos: [{ url: 'https://youtu.be/BJ-vunYNBIg' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/C-2WLaE8Irs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Ben, Baze',
        notes: 'auto, last two can be any rebels',
        videos: [{ url: 'https://youtu.be/2qBtZzE3ZPU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EHYdwMQeFiE' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy full auto with Wrecker Omi',
        videos: [{ url: 'https://youtu.be/2KR762GY7PU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Saw',
        others: 'Capt Rex, Luthen, Cassian, Baze',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/Utm6eFHyntU' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'M Mothma',
        leadFull: 'Mon Mothma',
        others: 'Luthen, Kyle (o), Capt Rex, Cassian',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/IbBy_vDW6xc' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },

    {
        lead: 'Hunter (OG)',
        others: 'Echo, Wrecker, Tech, Shaak',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/uVCIpd5pXf4' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Padme (Bad Batch)',
        others: 'Hunter, Wrecker, Tech, Echo',
        notes: 'auto, can get unlucky in 2nd wave',
        videos: [{ url: 'https://www.youtube.com/watch?v=TT9Au4z9hcs', creator: creators.egnards }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Padme (CAT)',
        others: 'Snips, JKA, CAT, Mace',
        notes: 'auto, can swap mace for GK',
        videos: [{ url: 'https://youtu.be/zwCGO6aeGNY' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Admiral Raddus',
        others: 'Jyn, K2SO, Cassian, Chirrut',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/-2mnwclkwp0' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Finn (Zorii)',
        others: 'RH Finn, RH Poe, Poe, Zorii',
        notes: 'only 1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/5vdRQTBlVmY' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'JTR (Rey)',
        leadFull: 'Jedi Training Rey with GL Rey',
        others: 'Rey, Resistance Trooper, BB8, Ben Solo',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/GfbtAwrGAAI' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: '2/2 on full auto but not super smooth. Marked enemy leader first before auto',
        videos: [{ url: 'https://youtu.be/wp-v3OwyreQ' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },

]