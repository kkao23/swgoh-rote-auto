import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const maceKitP1 = [
    {
        lead: 'Mace (JMK)',
        others: 'JMK, GAS, Ahsoka, Kit',
        notes: 'Full auto',
        videos: [{ url: 'https://youtu.be/sC8Srr7-ziM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Mace (Boys)',
        leadFull: 'Mace with Padawan Obi Wan and Master Qui Gon',
        others: 'Padawan Obi Wan, Master Qui Gon, KAM',
        notes: 'not sure if KAM is necessary. auto',
        videos: [{ url: 'https://youtu.be/bvOjNuJlhVk' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Mace (JKCK)',
        leadFull: 'Mace with Jedi Knight Cal Kestis',
        others: 'JKCK, GAS, Ahsoka, Kit',
        notes: 'Only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/AE5XinIdzPE' }],
        difficulty: difficulty.HARD
    }
]

export const jediP1: dataType[] = [
    {
        lead: 'JML',
        leadFull: 'Jedi Master Luke',
        others: 'Jedi Luke, HYoda, JKA, GMY',
        notes: 'auto, Almost any other jedi work',
        videos: [{ url: 'https://youtu.be/9l_PmvdNH1U' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JKL (Ezra)',
        leadFull: 'Jedi Knight Luke with Ezra Exile',
        others: 'Ezra GMY Hyoda Bastila',
        notes: 'auto, if no JML',
        videos: [{ url: 'https://youtu.be/N3weS_bW_Js' }],
        difficulty: difficulty.EASY
    }, {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Shaak Ti, +1 GR',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/tBhtvOG7WAU' }],
        difficulty: difficulty.VERY_EASY
    }, {
        lead: 'JKCK (Lead Omi)',
        leadFull: 'Jedi Knight Cal Kestis (Lead Omi)',
        others: 'any 4 Jedi',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=KorRjRRh6k0', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
]

export const shipsLSP1: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/eInUd3NBMQU' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Outrider, Res Bomber, Poes Xwing, Comeuppance, Res Xwing',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/xPIzAX3WqIs' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Home One',
        others: 'HMF, Outrider, Y wing, Biggs, Wedge',
        notes: 'Outrider 2nd special, auto, biggs then wedge reinf. wont work without Home One',
        videos: [{ url: 'https://youtu.be/zxW5IOe_w_o' }],
        difficulty: difficulty.CAUTION
    }
]

export const genericLSP1: dataType[] = [
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/C-2WLaE8Irs' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Saw',
        others: 'Capt Rex, Luthen, Cassian, Baze',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/Utm6eFHyntU' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'M Mothma',
        leadFull: 'Mon Mothma',
        others: 'Luthen, Kyle (o), Capt Rex, Cassian',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/IbBy_vDW6xc' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Ben, Baze',
        notes: 'auto, last two can be any rebels',
        videos: [{ url: 'https://youtu.be/2qBtZzE3ZPU' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Hunter (OG)',
        others: 'Echo, Wrecker, Tech, Shaak',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/uVCIpd5pXf4' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EHYdwMQeFiE' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Padme (Bad Batch)',
        others: 'Hunter, Wrecker, Tech, Echo',
        notes: 'auto, can get unlucky in 2nd wave',
        videos: [{ url: 'https://www.youtube.com/watch?v=TT9Au4z9hcs', creator: creators.egnards }],
        difficulty: difficulty.CAUTION,
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Any spectre',
        notes: 'auto, dont need ezra',
        videos: [{url: 'https://youtu.be/lGY7TLSTCMA'}],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'Padme (CAT)',
        others: 'Snips, JKA, CAT, Mace',
        notes: 'auto, can swap mace for GK',
        videos: [{url: 'https://youtu.be/zwCGO6aeGNY'}],
        difficulty: difficulty.EASY,
    }
]