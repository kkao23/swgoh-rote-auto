import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const hondoMixedP2: dataType[] = [
    {
        lead: 'Baylan',
        others: 'Hondo, Shin, Marrok (omicron), L3',
        notes: 'Need to pause and target Tarkin wave 2',
        videos: [{ url: 'https://youtu.be/U09oOAmFQRQ' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true,
        omi: true
    },
    {
        lead: 'Boss Nass',
        others: 'Tarpals (omi), Phalanx, Jar Jar',
        notes: 'post tarkin buff, auto, target range trooper first in both waves, leave Tarkin for last. I had R8 gungans',
        videos: [{ url: 'https://youtu.be/wnXeT0sUQdA'}],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        omi: true,
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Hunter',
        notes: 'easy full auto with Wrecker Omi, leave Batcher out, R7+ Recommended',
        videos: [{ url: 'https://youtu.be/OS-6bEChQHo' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Brutus, Vane, Silvo',
        notes: 'easy full auto, R7+ Recommended',
        videos: [{ url: 'https://youtu.be/M9r_x_gJlr0' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const shipsMixedP2: dataType[] = [
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Sun Fac, Spy, Soldier',
        notes: 'If you had to platoon exec, auto',
        videos: [{ url: 'https://youtu.be/ssTdWAi0jOs' }],
        icon: '/icons/ships/tex.charui_malevolence.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Executor',
        others: 'Hounds Tooth, XB, RC, Slave 1, IG2000',
        notes: 'auto, you need RC, youll lose if RC is platooned',
        videos: [{ url: 'https://www.youtube.com/watch?v=TMQZ4iO_V4w', creator: 'egnards' }],
        icon: '/icons/ships/tex.charui_executor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Profundity',
        others: 'Outrider, MF, Y wing, Ghost, Phantom',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=-q6P7kJP39c', creator: 'egnards' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },{
        lead: 'Leviathan',
        others: 'Sith Bomber, Fury Class Interceptor, Tie Dagger, Sith Fighter, MK6 Interceptor',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/mtWX2K3NmDk' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
]

export const mixedP2: dataType[] = [
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Ahsoka, Padme, GK',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/EaX496Y45Vc' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'GAS',
        leadFull: 'General Anakin Skywalker',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/kxJYqcbYgDQ' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Hera (Phoenix)',
        others: 'Kanan, Sabine, Chopper, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=Hf_-_PGj3rk', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_hera_s3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/iSa_DMH0S3Y' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'BK Mandalore (Rey)',
        leadFull: 'Bo Katan Mandalore',
        others: 'Paz, Beskar Mando, IG12/Grogu, Rey',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/raru9eDGYqk' }],
        icon: '/icons/characters/tex.charui_mandalorbokatan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Queen Amidala (CUP)',
        others: 'CUP, POW, MQG, JKA',
        notes: 'auto, 5th flexible',
        videos: [{url: 'https://youtu.be/YTkdcZLEnaw'}],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Baylan',
        others: 'Shin, Marrok, Qira, L3',
        notes: 'L3 for the pretaunt makes this easy, auto',
        videos: [{ url: 'https://youtu.be/qy4IhX1vf7s' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/SF9oCVi1fuw' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Aayla, Temple Guard',
        notes: 'auto, prob need R8+ on Temple Guard',
        videos: [{ url: 'https://youtu.be/us8-AXQx2jw' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML',
        leadFull: 'Jedi Master Luke',
        others: 'Jedi Knight Luke, Anakin, Bastila, Aayla',
        notes: 'auto, Use better jedi for more consistency. JKL wants fast mods',
        videos: [{ url: 'https://youtu.be/tmWmnc0eoPU' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/XlSEmf82fu4', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'The Stranger',
        leadFull: 'The Stranger',
        others: 'Starkiller, Malicos, Scavenger Rey, Plo Koon',
        notes: 'full auto, last two replaceable',
        videos: [{ url: 'https://youtu.be/jlF8EHzwTck' }],
        icon: '/icons/characters/tex.charui_stranger.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const jabbaP2: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'Boba can be any hutt cartel, easy auto',
        videos: [{ url: 'https://youtu.be/1Cu754InVBc' }],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const youngLandoP2: dataType[] = [
    {
        lead: 'Rey',
        others: 'Ben, JTR, BB8',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/_nNRPjVgX9U' }],
        icon: '/icons/characters/tex.charui_rey_tlj.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    }, {
        lead: 'Baylan',
        others: 'Shin, Marrok, +1 Merc',
        notes: '2nd wave very hard, only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/pfpK6MA_uRM' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra Exile, Hera, Sabine',
        notes: 'Auto',
        videos: [{url: 'https://youtu.be/WnBhCQ580s0'}],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Admiral Raddus',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/hbifGXqcEB0' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Reva',
        others: 'Marrok (omi), GI, 7S',
        notes: 'only 1/2 on auto',
        videos: [{url: 'https://youtu.be/78qD1ZKy2BQ'}],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Baylan (Kyle & Marrok omis)',
        others: 'Shin, Marrok, Kyle, Young Lando',
        notes: 'auto, pause at the end of wave 1, target iden wave 2 and auto. hope they don\'t target Marrok',
        videos: [{ url: 'https://youtu.be/qy4IhX1vf7s' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true
    },
]