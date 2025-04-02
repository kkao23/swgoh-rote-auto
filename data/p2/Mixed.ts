import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const hondoMixedP2: dataType[] = [
    {
        lead: 'Baylan',
        others: 'Hondo, Shin, Marrok, Jango',
        notes: 'Fifth can be any mercenary, omi marrok, auto, can get unlucky if marrok gets killed',
        videos: [{ url: 'https://youtu.be/9FarHhCvPb8' }, { url: 'https://www.youtube.com/watch?v=LEEZGJdl1ps', creator: creators.egnards }],
        difficulty: difficulty.EASY,
        omi: true
    },
    {
        lead: 'Rey',
        others: 'JTR, BB8, 3PO',
        notes: 'auto, not consistent 2/2',
        videos: [{ url: 'https://youtu.be/Pws01j8kXn0' }],
        difficulty: difficulty.CAUTION
    }, {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, GK, Snips',
        notes: 'can get unlucky if they focus CAT',
        videos: [{ url: 'https://youtu.be/nClssdqkjb0' }],
        difficulty: difficulty.EASY,
    },{
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum',
        notes: 'auto, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/otXD7ulJ7rY' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Leia Organa',
        others: 'R2, Drogan, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ap-GQ_b3uA4'}],
        difficulty: difficulty.VERY_EASY
    }
]

export const shipsMixedP2: dataType[] = [
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Sun Fac, Spy, Soldier',
        notes: 'If you had to platoon exec, auto',
        videos: [{ url: 'https://youtu.be/ssTdWAi0jOs' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Executor',
        others: 'Hounds Tooth, XB, RC, Slave 1, IG2000',
        notes: 'auto, you need RC, youll lose if platooned',
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
    }
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
        others: 'Ezra Exile, Huyang, Hera',
        notes: 'Ezra mandatory. May be able to sub Hera for Sabine?',
        videos: [{url: 'https://youtu.be/j6c_GgoPyws?si=Hxm-IELtfWIbZqQH&t=470', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
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
    }
]