import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsGenericLeftP6: dataType[] = [
    {
        lead: 'SLKR', gameId: 'SUPREMELEADERKYLOREN',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'KRU, Dark Rey, +2',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/hfhl-xrh0KM?si=6-x4v7fCowHuLvKU', creator: 'Därth Nebula' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.MANUAL],
    },
    {
        lead: 'Pirate King Hondo', gameId: 'GLHONDO',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Vane, Hondo, Brutus',
        notes: 'Auto but I did do some targeting at the beginning so Hondo wouldn\'t immediately flee',
        videos: [{ url: 'https://youtu.be/_tqOpolQE1E' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
    },
]

export const dsGenericRightP6: dataType[] = [
]

export const darthVaderP6: dataType[] = [
    {
        lead: 'Darth Vader', gameId: 'VADER',
        leadFull: 'Darth Vader',
        others: 'None allowed',
        notes: 'video is on manual, looks like only 1/2 is possible',
        videos: [{ url: 'https://youtu.be/W-2HoooGXlM?si=PXMqIXK9AH4wBmgD', creator: 'HanZmaN' }],
        icon: '/icons/characters/tex.charui_vader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.MANUAL],
        targeted: true,
    },
]

export const idenP6: dataType[] = [
    {
        lead: 'Iden Versio', gameId: 'IDENVERSIOEMPIRE',
        leadFull: 'Iden Versio',
        others: 'SLKR, Nightsister Zombie, Night Trooper, Death Trooper Peridia',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/hl4pylqJRh4?si=11tf-di2MbMv4L9j', creator: 'HanZmaN' }],
        icon: '/icons/characters/tex.charui_idenversioempire.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
]

export const shipsDSP6: dataType[] = [
    {
        lead: 'Executrix', gameId: 'CAPITALSTARDESTROYER',
        others: 'Tie Fighter, Tie Advanced, Scythe, Tie Interceptor, Tie Defender, Tie Bomber',
        notes: 'not an easy mission. I did win even though scythe was destroyed though. don\'t think you can auto this, but maybe with a lot of tries you could get lucky',
        videos: [{ url: 'https://youtu.be/bMyoCDaycQY' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
        targeted: true
    },
]