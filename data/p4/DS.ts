import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsInqP4: dataType[] = [
    {
        lead: 'Reva',
        others: 'Marrok, GI, 7S, 5B',
        notes: 'marrok omi, auto',
        videos: [{ url: 'https://youtu.be/2q1SguWa54Y' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const dsMidRightP4: dataType[] = [
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, Dooku, DR, Bane',
        notes: 'auto, Only 1/2',
        videos: [{ url: 'https://youtu.be/JZT1-k2EDIo' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mother Talzin',
        others: 'Asajj, Daka, Zombie, Merrin',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=UX67LlXNtBY', creator: 'avengerObs' }],
        icon: '/icons/characters/tex.charui_nightsisters_talzin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SEE (overrelic Triumvirate)',
        leadFull: 'Sith Eternal Emperor',
        others: 'Traya, Malgus, Nihilus, Sion',
        notes: 'Pico has R9 on SEE, Traya and Sion. Not sure if this is reliable with R8',
        videos: [{url: 'https://youtu.be/ecgbRYyLYn8?si=vXiCr9uxLr9M5eJi', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
    },
    {
        lead: 'Reva',
        others: 'Marrok, GI, 7S, 5B',
        notes: 'marrok omi, auto',
        videos: [{ url: 'https://youtu.be/w8sQ1bMYvew' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper',
        notes: 'Scorch makes this easier but Piett works in his place. Need full platoons',
        videos: [{ url: 'https://youtu.be/zYBou5t9kRI', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        omi: true
    },
    {
        lead: 'Baylan',
        leadFull: 'Baylan Skoll',
        others: 'Shin, Marrok, Malak, +1',
        notes: 'Really want an off tank to reduce the chance Marrok gets killed early',
        videos: [{ url: 'https://youtu.be/p6bhOC6tlEo', }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        omi: true
    },
    {
        lead: 'SEE (requirement chars)',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, Dooku, DR, Bane',
        notes: 'need all platoons, Use stranger instead of Dooku to make this consistent',
        videos: [{url: 'https://youtu.be/oLhPREH3EYs'}],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Jabba',
        others: 'Boba Fett, Krrsantan, Bossk, +1',
        notes: 'auto, replace Bossk and +1 with Hutt Cartel if possible',
        videos: [{url: 'https://youtu.be/62v2RzJYplw'}],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Night Trooper, Death Trooper Peridia, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/T8HbZSubWtI'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Brutus, Silvo',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/r_TERIa2NFQ' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const dsSortie: dataType[] = [
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Brutus, Silvo',
        notes: 'auto, need ult and full platoons',
        videos: [{ url: 'https://youtu.be/8HvKDJaolEU' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Night Trooper, Death Trooper Peridia, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/MAYTTRm1l-c'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    }
]