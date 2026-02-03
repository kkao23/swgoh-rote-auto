import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const mixedFleetP5: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'auto but pause for MK6 Instakill of RC',
        videos: [{ url: 'https://youtu.be/thD2kZHHTOs' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true
    },
    {
        lead: 'Executor',
        others: 'HT, RC, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/7cTPzAAqRa4' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Executor (no RC)',
        others: 'HT, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto, untarget HT',
        videos: [{ url: 'https://youtu.be/uDfsGkP-cXM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y wing start, Phantom, Ghost, Biggs, Wedge Reinf',
        notes: 'cant auto until you ult',
        videos: [{ url: 'https://youtu.be/LqmP7WGf1m0' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    },
]

export const mixedCombatTopRightP5: dataType[] = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any R9s, Fulcrum and Ezra really speed this up',
        notes: 'Auto, target TFP then Stormtrooper Commander, leave Range Troopers for last to speed things up',
        videos: [{ url: 'https://youtu.be/OCGLZm1SJiM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Fulcrum, Admiral Raddus',
        notes: 'auto, pause at the end of wave 1 to hit the box if poss',
        videos: [{ url: 'https://youtu.be/GdepqEwdaqw' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true
    },
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: 'Appo (omicron), DCT, CX-2, Scorch',
        notes: 'Easy full auto',
        videos: [{ url: 'https://youtu.be/uQ6HKrrI7uc' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, GAS',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/XNcU95MEEIs' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Vane, +2',
        notes: 'auto, the more pirates you have R9, the easier it is. You need Vane though. Very laggy',
        videos: [{ url: 'https://youtu.be/gXpYAR1XrUQ' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'auto, can get 2/2 sometimes but not consistently. Pause to target someone at the start of Wave 2',
        videos: [{ url: 'https://youtu.be/XkhNW3ccawU' }],
        difficulty: difficulty.HARD,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
        targeted: true
    },
]

export const mixedCombatBottomLeftP5: dataType[] = [
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, only 1/2 on full auto',
        videos: [{ url: 'https://youtu.be/uX718augk0M' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, GAS',
        notes: 'Auto P1 until only one enemy is left, hit box, save CAT instakill for nest in Wave 2',
        videos: [{ url: 'https://youtu.be/3zJzzLSbT1w' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Vane, +2',
        notes: 'auto, the more pirates you have R9, the easier it is. You need Vane though',
        videos: [{ url: 'https://youtu.be/zZhDqdw3PUI' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Fulcrum, Admiral Raddus',
        notes: 'auto, pause at the end of wave 1 to hit the box if possible',
        videos: [{ url: 'https://youtu.be/2_pnO482ksw' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true
    },
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: 'Appo (omicron), DCT, CX-2, Scorch',
        notes: 'Easy full auto',
        videos: [{ url: 'https://youtu.be/uKpZmmIcmT4' }],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, +2 Galactic Republic',
        notes: '1/2 on auto, can\'t get 2/2',
        videos: [{ url: 'https://youtu.be/feUjL88H_b8' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
    },
];

export const jabbaP5:dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boosh, Krrsantan, Gam Guard (omi), Bossk',
        notes: 'auto, replace Bossk with Hutt Cartel if possible',
        videos: [{url: 'https://youtu.be/1t_aEW7O9Zk?si=FZVN2wEADXdQHkT2&t=156', creator: 'pico'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    }
]