import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const boKatanP3: dataType[] = [
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'IG12',
        notes: 'IG call bo to assist, BAM birds, auto. pause to use ballista if Bo gets eaten',
        videos: [{ url: 'https://youtu.be/x2D1hwUiHjw' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: interactionType.PAUSE_WAVE2,
        targeted: true
    }
]

export const revaP3: dataType[] = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'basics until you get 6 stacks of purge, hit Auto',
        videos: [{ url: 'https://youtu.be/q1lYPCfhpUA' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'GI',
        leadFull: 'Grand Inquisitor',
        others: 'Marrok (omi), +3',
        notes: 'if no Reva. easy auto with omi',
        videos: [{ url: 'https://youtu.be/fpPe_Damg9I' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },
]

export const jabbaP3: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Any',
        notes: 'auto basic if no R7 Hutt Cartel',
        videos: [{ url: 'https://youtu.be/NpWgXSXi9pw' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    }
]

export const fennecP3: dataType[] = [
    {
        lead: 'Rey',
        others: 'Fennec, any 3 resistance',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/ydm8T8Jvpyc' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'GK, Shaak Ti, Padme',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/6CN70UAKHSU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Bossk',
        others: 'Boba, Greef, Mando',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/R7zqN2V0kQo?si=JDJovWknr8nAx7_t&t=267', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'leftover sith',
        notes: 'I had Darth maul, Darth sidious and sith marauder. full auto',
        videos: [{url: 'https://youtu.be/CF5lIXEvEzc'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Bane',
        leadFull: 'Darth Bane',
        others: 'leftover sith',
        notes: 'I had Darth maul, Darth sidious and sith empire trooper. can be dicey, add malak for guarantee win',
        videos: [{url: 'https://youtube.com/shorts/EDQDXz6uwnE?feature=share'}],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
    },
    {
        lead: 'SLKR',
        others: 'DRey, KRU, Sith Trooper',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/qtWOgArbEX0' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Omega (omicron)',
        others: 'Wrecker (omicron), Hunter, Crosshair, Fennec',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/Sv1SbpTmcWI' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Death Trooper, Moff Gideon, Fennec',
        notes: 'auto. Enoch omi makes it easier but not required',
        videos: [{url: 'https://youtu.be/2CeDdqWnyIE'}],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Silvo, Hondo, Vane',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/D6P6TlN3oic' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
]

export const mixedTopLeftP3: dataType[] = [
    {
        lead: 'GAS',
        leadFull: 'General Anakin Skywalker',
        others: '501st Clones',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/R3LzrCTN_SU' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'CLS',
        leadFull: 'Commander Luke Skywalker',
        others: 'Han, Chewie, Chewpio, Admiral Raddus',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/GEsQiDuewto' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Mother Talzin',
        others: 'Asajj, Daka, Zombie, Merrin',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=9I7t5cDbZRU', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Hera (Phoenix)',
        others: 'Chopper, Kanan, Sabine, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=TK71MGKC2Ho', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Finn (omi)',
        others: 'Poe, Zorii, RH Finn, Resistance Pilot',
        notes: 'auto, i imagine Resistance Pilot is replaceable',
        videos: [{url: 'https://youtu.be/R7zqN2V0kQo?si=urjbrnVAjSeaOTHa&t=387', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Cere',
        leadFull: 'Cere Junda',
        others: 'UFUs',
        notes: 'auto, I had Cere JTR Scav Rey Malicos Starkiller but you can probably use whatever leftover UFUs you have',
        videos: [{ url: 'https://youtu.be/UIaEDFP-jd8' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, JKA, CUP',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtube.com/shorts/yYyHdBfnblc?feature=share' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Rey',
        others: 'any resistance. I had JTR, Scav Rey, BB8 and 3PO',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/jVRGTzX_4Ww' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/-lbUh4kH5cE' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Qira, L3',
        notes: 'omi Marrok, auto, last two are flexible',
        videos: [{ url: 'https://youtu.be/yn70eqOYuIU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'auto, Tarpals Omi',
        videos: [{ url: 'https://youtu.be/d1odTRywhfc'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: 'Looked a bit dicey but super quick',
        videos: [{ url: 'https://youtu.be/3ZbDFkDzkSc', }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        omi: true
    },
    {
        lead: 'Maz Kanata',
        others: 'Ithano, Quiggold, Kix, SM-33',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/NS5C8WNMKxs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'The Stranger',
        leadFull: 'The Stranger',
        others: 'Starkiller, Malicos, Scavenger Rey, Plo Koon',
        notes: 'full auto, last two replaceable',
        videos: [{ url: 'https://youtu.be/f7t81oDKdu0' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Silvo, Hondo, Vane, Brutus',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/XnWuowuHdZY' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
]

export const mixedP3Ships: dataType[] = [
    {
        lead: 'Executor (P1)',
        leadFull: 'Executor with Punishing One',
        others: 'HT, XB, Punishing One, IG2000',
        notes: 'auto, use other BH ships if not platooned',
        videos: [{ url: 'https://youtu.be/rcqIa6VlXHs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Executor (no P1)',
        leadFull: 'Executor without Punishing One',
        others: 'RC, HT, XB, Slave 1',
        notes: 'If no Punishing One, auto',
        videos: [{ url: 'https://youtu.be/MoaMRXXAMqw' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    }
]