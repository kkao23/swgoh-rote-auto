import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsBottomRightP5: dataType[] = [
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/Ul8xHc4x-eY', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
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
        icon: '/icons/characters/tex.charui_glhondo.png',
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
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
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
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, The Stranger, Darth Revan, Bane',
        notes: 'easy 1/2, 2/2 not totally consistent',
        videos: [{url: 'https://youtu.be/j_cKE4G_PZ0'}],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
]

export const dsLeftP5: dataType[] = [
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Hondo +1',
        notes: 'auto, but take out fulcrum and zeb in wave 2 once they\'re down to 1 HP',
        videos: [{ url: 'https://youtu.be/LbL5zyS8uno' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
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
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
]