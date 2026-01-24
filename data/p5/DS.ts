import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsBottomRightP5: dataType[] = [
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/Ul8xHc4x-eY', }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Hondo +1',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/yALIZ_CCXhc' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
    },
]

export const dsTopMidP5: dataType[] = [
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: 'auto, may want to target Sabine wave 2',
        videos: [{ url: 'https://youtu.be/w23Nh5aFKJs', }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true,
        omi: true
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Hondo +1',
        notes: 'auto, but take out fulcrum and zeb in wave 2 once they\'re down to 1 HP',
        videos: [{ url: 'https://youtu.be/LbL5zyS8uno' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
]

export const dsLeftP5: dataType[] = [
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Hondo +1',
        notes: 'auto, but take out fulcrum and zeb in wave 2 once they\'re down to 1 HP',
        videos: [{ url: 'https://youtu.be/LbL5zyS8uno' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/DgJ-xZk7ttA', }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
]