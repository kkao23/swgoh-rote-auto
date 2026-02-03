import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const boKatanP3: dataType[] = [
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'IG12',
        notes: 'IG call bo to assist, don\'t use Birds with BAM. Ballista if someone gets eaten.',
        videos: [{ url: 'https://youtu.be/x2D1hwUiHjw' }],
        icon: '/icons/characters/tex.charui_mandalorbokatan.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL],
        targeted: true
    }
]

export const revaP3: dataType[] = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'basics until you get 6 stacks of purge, hit Auto',
        videos: [{ url: 'https://youtu.be/q1lYPCfhpUA' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'GI',
        leadFull: 'Grand Inquisitor',
        others: 'Marrok (omi), +3',
        notes: 'if no Reva. easy auto with omi',
        videos: [{ url: 'https://youtu.be/fpPe_Damg9I' }],
        icon: '/icons/characters/tex.charui_grandinquisitor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
]

export const jabbaP3: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Any',
        notes: 'auto basic if no R7 Hutt Cartel',
        videos: [{ url: 'https://youtu.be/NpWgXSXi9pw' }],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const fennecP3: dataType[] = [
    {
        lead: 'Rey',
        others: 'Fennec, any 3 resistance',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/ydm8T8Jvpyc' }],
        icon: '/icons/characters/tex.charui_rey_tlj.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'GK, Shaak Ti, Padme',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/6CN70UAKHSU' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Bossk',
        others: 'Boba, Greef, Mando',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/R7zqN2V0kQo?si=JDJovWknr8nAx7_t&t=267', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_bossk.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'leftover sith',
        notes: 'I had Darth maul, Darth sidious and sith marauder. full auto',
        videos: [{url: 'https://youtu.be/CF5lIXEvEzc'}],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Bane',
        leadFull: 'Darth Bane',
        others: 'leftover sith',
        notes: 'I had Darth maul, Darth sidious and sith empire trooper. can be dicey, add malak for guarantee win',
        videos: [{url: 'https://youtube.com/shorts/EDQDXz6uwnE?feature=share'}],
        icon: '/icons/characters/tex.charui_darthbane.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
    },
    {
        lead: 'SLKR',
        others: 'DRey, KRU, Sith Trooper',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/qtWOgArbEX0' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (omicron)',
        others: 'Wrecker (omicron), Hunter, Crosshair, Fennec',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/Sv1SbpTmcWI' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Death Trooper, Moff Gideon, Fennec',
        notes: 'auto. Enoch omi makes it easier but not required',
        videos: [{url: 'https://youtu.be/2CeDdqWnyIE'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Silvo, Hondo, Vane',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/D6P6TlN3oic' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const mixedTopLeftP3: dataType[] = [
    {
        lead: 'GAS',
        leadFull: 'General Anakin Skywalker',
        others: '501st Clones',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/R3LzrCTN_SU' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'CLS',
        leadFull: 'Commander Luke Skywalker',
        others: 'Han, Chewie, Chewpio, Admiral Raddus',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/GEsQiDuewto' }],
        icon: '/icons/characters/tex.charui_lukebespin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    // {
    //     lead: 'Mother Talzin',
    //     others: 'Asajj, Daka, Zombie, Merrin',
    //     notes: 'auto',
    //     videos: [{ url: 'https://www.youtube.com/watch?v=9I7t5cDbZRU', creator: 'avengerObs' }],
    //     difficulty: difficulty.VERY_EASY,
    //     successRate: successRate.CONSISTENT,
    //     interactionType: [interactionType.AUTO]
    // },
    // {
    //     lead: 'Hera (Phoenix)',
    //     others: 'Chopper, Kanan, Sabine, Capt Rex',
    //     notes: 'auto',
    //     videos: [{ url: 'https://www.youtube.com/watch?v=TK71MGKC2Ho', creator: 'avengerObs' }],
    //     difficulty: difficulty.VERY_EASY,
    //     successRate: successRate.CONSISTENT,
    //     interactionType: [interactionType.AUTO]
    // },
    {
        lead: 'Finn (omi)',
        others: 'Poe, Zorii, RH Finn, Resistance Pilot',
        notes: 'auto, i imagine Resistance Pilot is replaceable',
        videos: [{url: 'https://youtu.be/R7zqN2V0kQo?si=urjbrnVAjSeaOTHa&t=387', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Cere',
        leadFull: 'Cere Junda',
        others: 'UFUs',
        notes: 'auto, I had Cere JTR Scav Rey Malicos Starkiller but you can probably use whatever leftover UFUs you have',
        videos: [{ url: 'https://youtu.be/UIaEDFP-jd8' }],
        icon: '/icons/characters/tex.charui_cerejunda.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, JKA, CUP',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtube.com/shorts/yYyHdBfnblc?feature=share' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Rey',
        others: 'any resistance. I had JTR, Scav Rey, BB8 and 3PO',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/jVRGTzX_4Ww' }],
        icon: '/icons/characters/tex.charui_rey_tlj.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/-lbUh4kH5cE' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Qira, L3',
        notes: 'omi Marrok, auto, last two are flexible',
        videos: [{ url: 'https://youtu.be/yn70eqOYuIU' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'auto, Tarpals Omi',
        videos: [{ url: 'https://youtu.be/d1odTRywhfc'}],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: 'Looked a bit dicey but super quick',
        videos: [{ url: 'https://youtu.be/3ZbDFkDzkSc', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        omi: true
    },
    {
        lead: 'Maz Kanata',
        others: 'Ithano, Quiggold, Kix, SM-33',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/NS5C8WNMKxs' }],
        icon: '/icons/characters/tex.charui_mazkanata.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'The Stranger',
        leadFull: 'The Stranger',
        others: 'Starkiller, Malicos, Scavenger Rey, Plo Koon',
        notes: 'full auto, last two replaceable',
        videos: [{ url: 'https://youtu.be/f7t81oDKdu0' }],
        icon: '/icons/characters/tex.charui_stranger.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Silvo, Hondo, Vane, Brutus',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/XnWuowuHdZY' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const mixedP3Ships: dataType[] = [
    {
        lead: 'Executor (P1)',
        leadFull: 'Executor with Punishing One',
        others: 'HT, XB, Punishing One, IG2000',
        notes: 'auto, use other BH ships if not platooned',
        videos: [{ url: 'https://youtu.be/rcqIa6VlXHs' }],
        icon: '/icons/ships/tex.charui_executor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Executor (no P1)',
        leadFull: 'Executor without Punishing One',
        others: 'RC, HT, XB, Slave 1',
        notes: 'If no Punishing One, auto',
        videos: [{ url: 'https://youtu.be/MoaMRXXAMqw' }],
        icon: '/icons/ships/tex.charui_executor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    }
]