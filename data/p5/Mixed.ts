import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const mixedFleetP5: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'auto but pause for MK6 Instakill of RC',
        videos: [{ url: 'https://youtu.be/thD2kZHHTOs' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Executor',
        others: 'HT, RC, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/7cTPzAAqRa4' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Executor (no RC)',
        others: 'HT, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto, untarget HT',
        videos: [{ url: 'https://youtu.be/uDfsGkP-cXM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y wing start, Phantom, Ghost, Biggs, Wedge Reinf',
        notes: 'cant auto until you ult',
        videos: [{ url: 'https://youtu.be/LqmP7WGf1m0' }],
        difficulty: difficulty.NO_AUTO
    },
]

export const mixedCombatTopRightP5: dataType[] = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any R9s, Fulcrum and Ezra really speed this up',
        notes: 'Auto, target TFP then Stormtrooper Commander, leave Range Troopers for last to speed things up',
        videos: [{ url: 'https://youtu.be/OCGLZm1SJiM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Lord Vader',
        others: 'Maul, RG, 9S, Darth Vader',
        notes: 'Auto, only 1/2',
        videos: [{url: 'https://youtu.be/1t_aEW7O9Zk?si=th-cDggFM7cPamGZ&t=14', creator: creators.pico}],
        difficulty: difficulty.HARD
    }
]

export const mixedCombatBottomLeftP5: dataType[] = [
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, only 1/2 on full auto',
        videos: [{ url: 'https://youtu.be/uX718augk0M' }],
        difficulty: difficulty.HARD,
        omi: true
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, GAS',
        notes: 'Auto P1 until only one enemy is left, hit box, save CAT instakill for nest in Wave 2',
        videos: [{ url: 'https://youtu.be/3zJzzLSbT1w' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Vane, +2',
        notes: 'auto, the more pirates you have R9, the easier it is. You need Vane though',
        videos: [{ url: 'https://youtu.be/zZhDqdw3PUI' }],
        difficulty: difficulty.EASY,
    },
];

export const jabbaP5:dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boosh, Krrsantan, Gam Guard (omi), Bossk',
        notes: 'auto, replace Bossk with Hutt Cartel if possible',
        videos: [{url: 'https://youtu.be/1t_aEW7O9Zk?si=FZVN2wEADXdQHkT2&t=156', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]