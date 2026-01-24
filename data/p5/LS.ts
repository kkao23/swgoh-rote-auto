import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const lsTopLeftP5: dataType[] = [
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Snips, GK',
        notes: '1/2 on auto, don\'t target probe droid',
        videos: [{ url: 'https://youtu.be/ofMJ0SXjdCU' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause auto at the beginning of wave 2. Full platoon required',
        videos: [{ url: 'https://youtu.be/BeYMQVqnVV0' }],
        difficulty: difficulty.EASY,
        omi: true,
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/rKrNwQrNHw4' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, +1 Galactic Republic',
        notes: 'Auto, CWC Replaceable',
        videos: [{ url: 'https://youtu.be/225Hr3xBRok' }, { url: 'https://youtu.be/8YPqRLYrLZM' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/FwsUlJJgz_o' }],
        difficulty: difficulty.EASY
    },
]

export const lsTopMidP5: dataType[] = [
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Snips, CUP',
        notes: 'auto, hope they dont kill MQG/POW',
        videos: [{ url: 'https://youtu.be/2eC85m5HXOA' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi. Full platoon required',
        videos: [{ url: 'https://youtu.be/GbS9hvNfB3k' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/czbZV5oFunQ' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/Y3dadvLoH8o' }],
        difficulty: difficulty.VERY_EASY
    },
]

export const lsBottomP5: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=5kjc-83PM2s', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause to target Mara at the beginning of wave 2. Full platoon required',
        videos: [{ url: 'https://youtu.be/OmM8S6w6l3s' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Ahsoka Tano (randoms)',
        others: 'Ezra, random R9',
        notes: '1/2 on auto, need more Spectres to 2/2',
        videos: [{ url: 'https://youtu.be/xruQGASpTP4' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Ahsoka Tano (spectres)',
        others: 'Ezra, Sabine, Hera, Fulcrum',
        notes: 'auto but need some luck on who takes the opening mass assist',
        videos: [{ url: 'https://youtu.be/Q9fG6WCUjE4' }],
        difficulty: difficulty.CAUTION
    }
]

export const lsShipsP5: dataType[] = [
    {
        lead: 'Profundity (Rogue One)',
        others: 'MF, Outrider, Y Wing, Rogue One',
        notes: 'Keep reticule on Scythe, auto',
        videos: [{ url: 'https://youtu.be/qpNtrNGpeKI' }],
        difficulty: difficulty.EASY,
        targeted: true
    },
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'can\'t auto. Go after Scythe, Phantom first reinforcement',
        videos: [{ url: 'https://youtu.be/9HiGycdlf4E' }],
        difficulty: difficulty.NO_AUTO
    },
]