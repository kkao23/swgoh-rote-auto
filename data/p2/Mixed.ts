import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const hondoMixedP2: dataType[] = [
    {
        lead: 'Baylan',
        others: 'Hondo, Shin, Marrok (omicron), L3',
        notes: 'Need to pause and target Tarkin wave 2',
        videos: [{ url: 'https://youtu.be/U09oOAmFQRQ' }],
        difficulty: difficulty.CAUTION,
        omi: true
    },
    {
        lead: 'Boss Nass',
        others: 'Tarpals (omi), Phalanx, Jar Jar',
        notes: 'post tarkin buff, auto, target range trooper first in both waves, leave Tarkin for last. I had R8 gungans',
        videos: [{ url: 'https://youtu.be/wnXeT0sUQdA'}],
        difficulty: difficulty.CAUTION,
        omi: true,
    },
    {
        lead: 'Omega (Mercenary) (Omi)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Hunter',
        notes: 'easy full auto with Wrecker Omi, leave Batcher out, R7+ Recommended',
        videos: [{ url: 'https://youtu.be/OS-6bEChQHo' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Brutus, Vane, Silvo',
        notes: 'easy full auto, R7+ Recommended',
        videos: [{ url: 'https://youtu.be/M9r_x_gJlr0' }],
        difficulty: difficulty.VERY_EASY,
    },
]

export const shipsMixedP2: dataType[] = [
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Sun Fac, Spy, Soldier',
        notes: 'If you had to platoon exec, auto',
        videos: [{ url: 'https://youtu.be/ssTdWAi0jOs' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Executor',
        others: 'Hounds Tooth, XB, RC, Slave 1, IG2000',
        notes: 'auto, you need RC, youll lose if RC is platooned',
        videos: [{ url: 'https://www.youtube.com/watch?v=TMQZ4iO_V4w', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Profundity',
        others: 'Outrider, MF, Y wing, Ghost, Phantom',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=-q6P7kJP39c', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },{
        lead: 'Leviathan',
        others: 'Sith Bomber, Fury Class Interceptor, Tie Dagger, Sith Fighter, MK6 Interceptor',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=REBjxUTyzvc', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
]

export const mixedP2: dataType[] = [
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Ahsoka, Padme, GK',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/EaX496Y45Vc' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'GAS',
        leadFull: 'General Anakin Skywalker',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/kxJYqcbYgDQ' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Hera (Phoenix)',
        others: 'Kanan, Sabine, Chopper, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=Hf_-_PGj3rk', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/j6c_GgoPyws?si=Hx1_pMIyDumR1mIX', creator: creators.pico }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'BK Mandalore (Rey)',
        leadFull: 'Bo Katan Mandalore',
        others: 'Paz, Beskar Mando, IG12/Grogu, Rey',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/raru9eDGYqk' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Queen Amidala (CUP)',
        others: 'CUP, POW, MQG, JKA',
        notes: 'auto, 5th flexible',
        videos: [{url: 'https://youtu.be/YTkdcZLEnaw'}],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Baylan',
        others: 'Shin, Marrok, Qira, L3',
        notes: 'L3 for the pretaunt makes this easy, auto',
        videos: [{ url: 'https://youtu.be/qy4IhX1vf7s' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/SF9oCVi1fuw' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Aayla, Temple Guard',
        notes: 'auto, prob need R8+ on Temple Guard',
        videos: [{ url: 'https://youtu.be/us8-AXQx2jw' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'JML',
        leadFull: 'Jedi Master Luke',
        others: 'Jedi Knight Luke, Anakin, Bastila, Aayla',
        notes: 'auto, Use better jedi for more consistency. JKL wants fast mods',
        videos: [{ url: 'https://youtu.be/tmWmnc0eoPU' }],
        difficulty: difficulty.EASY,
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/XlSEmf82fu4', }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'The Stranger',
        leadFull: 'The Stranger',
        others: 'Starkiller, Malicos, Scavenger Rey, Plo Koon',
        notes: 'full auto, last two replaceable',
        videos: [{ url: 'https://youtu.be/jlF8EHzwTck' }],
        difficulty: difficulty.VERY_EASY,
    },
]

export const jabbaP2: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'Boba can be any hutt cartel, easy auto',
        videos: [{ url: 'https://youtu.be/1Cu754InVBc' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const youngLandoP2: dataType[] = [
    {
        lead: 'Rey',
        others: 'Ben, JTR, BB8',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/_nNRPjVgX9U' }],
        difficulty: difficulty.HARD
    }, {
        lead: 'Baylan',
        others: 'Shin, Marrok, +1 Merc',
        notes: '2nd wave very hard, only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/pfpK6MA_uRM' }],
        difficulty: difficulty.HARD,
        omi: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra Exile, Hera, Sabine',
        notes: 'Ezra mandatory. Need R8 minimum, preferably R9.',
        videos: [{url: 'https://youtu.be/j6c_GgoPyws?si=Hxm-IELtfWIbZqQH&t=470', creator: creators.pico}],
        difficulty: difficulty.EASY,
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Admiral Raddus',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/hbifGXqcEB0' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Reva',
        others: 'Marrok (omi), GI, 7S',
        notes: 'only 1/2 on auto',
        videos: [{url: 'https://youtu.be/78qD1ZKy2BQ'}],
        difficulty: difficulty.HARD,
        omi: true,
    },
    {
        lead: 'Baylan (Kyle & Marrok omis)',
        others: 'Shin, Marrok, Kyle, Young Lando',
        notes: 'auto, pause at the end of wave 1, target iden wave 2 and auto. hope they don\'t target Marrok',
        videos: [{ url: 'https://youtu.be/qy4IhX1vf7s' }],
        difficulty: difficulty.NO_AUTO,
        omi: true
    },
]