import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const topWampaP6: dataType[] = [
    {
        lead: 'Ahsoka Tano', gameId: 'GLAHSOKATANO',
        others: 'Ezra Exile, Padawan Sabine, Huyang (omicron), Hera',
        notes: 'Full auto',
        videos: [{ url: 'https://youtu.be/AFC74G68bu8', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'Mar Trepodi',
    },
    {
        lead: 'Boss Nass', gameId: 'BOSSNASS',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto, all platoons filled',
        videos: [{ url: 'https://youtu.be/OXOahw1Dv3Q?si=FmhxosmwDx0DaS4F', creator: 'Boston B' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'Boston B',
    },
    {
    lead: 'Satele Shan',
    gameId: 'SATELESHAN',
    others: 'Bastilla, Juhani, JKR, Jolee',
    notes: 'Auto',
    videos: [],
    difficulty: difficulty.EASY,
    creator: 'Anonymous',
    }
]

export const bottomLeftMixedP6: dataType[] = [
    {
        lead: 'The Stranger', gameId: 'STRANGER',
        others: 'Jedi Knight Revan, Malicos, Ninth Sister, Fulcrum',
        notes: 'Video is on manual, not sure if it can be auto',
        videos: [{ url: 'https://youtu.be/GLK2wslmJHc?si=AhV2AO9xQA3nbYkz', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_stranger.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.MANUAL],
        creator: 'Mar Trepodi',
    }
    ,
    {
        lead: 'Maz', gameId: 'MAZKANATA',
        others: 'Smee, kix, quiggold, and ithano',
        notes: 'Auto',
        videos: [],
        icon: '/icons/characters/tex.charui_mazkanata.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    },
    {
        lead: 'JMMW', gameId: 'JEDIMASTERMACEWINDU, DEPABILLABA',
        others: 'TG, Depa, JN and KB',
        notes: 'Easy win',
        videos: [],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    },
    {
    lead: 'Satele',
    gameId: 'SATELESHAN',
    others: 'Revan, Jolee, Mission, Zalbaar',
    notes: 'Auto',
    videos: [
        { url: 'https://youtu.be/yBqyl8Bft9w' },
    ],
    difficulty: difficulty.EASY,
    creator: 'Mar Trepodi',
    },
    {
    lead: 'Pirate King Hondo Ohnaka',
    gameId: 'GLHONDO',
    others: 'I had Vane, Brutus, Silvo and CWC. Would work even better with other pirate',
    notes: 'Event special good for brutus, silvo and vane irrelevant for pkho.',
    videos: [],
    difficulty: difficulty.EASY,
    creator: 'Karus',
    }
]


export const mixedFleetP6: dataType[] = [
    {
        lead: 'Leviathan', gameId: 'CAPITALLEVIATHAN',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'video is on auto, supposedly this one is really easy and can be autoed though',
        videos: [{ url: 'https://youtu.be/N39_wP8TWm8?si=TEJGtNq7OhFqXSOG', creator: 'Mar Trepodi' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        creator: 'Mar Trepodi',
    },
]

export const jabbaP6: dataType[] = [
    {
        lead: 'Jabba', gameId: 'JABBATHEHUTT',
        others: 'Boushh, Krrsantan, Skiff Lando, Embo',
        notes: 'video is on manual, not sure if it can be autoed',
        videos: [{ url: 'https://youtu.be/BWUClSbN2vg?si=NO-kXu5aafj5gtOp', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        creator: 'Mar Trepodi',
    },
    {
        lead: 'Jabba (GG Omi)',
        gameId: 'JABBATHEHUTT, GAMORREANGUARD',
        others: 'Krrsantan, Boushh, Skiff, Gam Guard',
        notes: 'Auto',
        videos: [{ url: 'https://youtu.be/hsEJuIzbms8?is=xXkBYmtomCxqHzR4', creator: 'Dominus' }],
        difficulty: difficulty.EASY,
        creator: 'Dominus',
        omi: true
    }
]