import { difficulty } from "~/models/data";

// P1

const leftDSP1 = [{
    lead: 'Trench',
    others: 'Wat, Jango, Nute, Dooku',
    notes: 'Open with Tank Tech on Jango, target droideka, hit auto',
    link: 'https://youtu.be/zLFGIuSzFW0',
    difficulty: difficulty.EASY
},
{
    lead: 'SLKR',
    others: 'DRey',
    notes: 'Any other FO, Poke Droideka, Auto',
    link: 'https://youtu.be/AsoKUJ0UIik',
    difficulty: difficulty.EASY
},
{
    lead: 'SEE',
    others: 'Wat, Malak, +2 Sith',
    notes: 'auto',
    link: 'https://youtu.be/pGSL9U-0rPs',
    difficulty: difficulty.VERY_EASY
}];

const bottomDSP1 = [{
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Doom droideka, bless Morgan, hit auto',
    link: 'https://youtu.be/dVJSaQ_Pwmo',
    difficulty: difficulty.EASY
},
{
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'Target Droideka, hit auto',
    link: 'https://youtu.be/Pk9v02K5wwc',
    difficulty: difficulty.EASY
},
{
    lead: 'SEE',
    others: 'Wat, Malak, Bane, Malgus',
    notes: 'only 1/2 on auto',
    link: 'https://youtu.be/CjxSQ88mlMk',
    difficulty: difficulty.HARD
},
{
    lead: 'E Palpatine',
    others: 'Mara, +3 Empire',
    notes: 'only 1/2 on auto',
    link: 'https://youtu.be/AU0_LBntv9o',
    difficulty: difficulty.HARD
},
];

const topDSP1 = [
    {
        lead: 'SLKR',
        others: 'Hux, KRU, Sith Trooper, any 5th',
        notes: 'Stun droideka first, second phase poke brute, otherwise auto',
        link: 'https://youtu.be/QGui7hJ4ZrQ',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, any 2 mercs',
        notes: 'auto, Marrok Omi',
        link: 'https://youtu.be/y2_S73szIS0',
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },{
        lead: 'Great Mothers',
        others: 'Morgan, Night Trooper, Death Trooper, Merrin',
        notes: 'Doom droideka, bless Morgan, hit auto',
        link: 'https://youtu.be/zjxxsvQos5Y',
        difficulty: difficulty.EASY
    },
];

const lvP1 = [
    {
        lead: 'LV',
        others: '',
        notes: 'Easy full auto',
        link: 'https://youtu.be/YIOTKDpWtRM',
        difficulty: difficulty.VERY_EASY
    }
]

const shipsDSP1 = [
    {
        lead: 'Leviathan',
        others: 'Sith Bomber, MK6 Interceptor, Sith Fighter, Tie Adv, Scimitar',
        notes: 'Not consistent',
        link: 'https://youtu.be/xCuGwcVtd98',
        difficulty: difficulty.HARD
    }
]

const maceKitP1 = [
    {
        lead: 'Mace (JMK)',
        others: 'JMK, GAS, Ahsoka, Kit',
        notes: 'Full auto',
        link: 'https://youtu.be/sC8Srr7-ziM',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Mace (Boys)',
        others: 'Padawan Obi Wan, Master Qui Gon, KAM',
        notes: 'not sure if KAM is necessary. auto',
        link: 'https://youtu.be/bvOjNuJlhVk',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Mace (JKCK)',
        others: 'JKCK, GAS, Ahsoka, Kit',
        notes: 'Only 1/2 on auto',
        link: 'https://youtu.be/AE5XinIdzPE',
        difficulty: difficulty.HARD
    }
]

const jediP1 = [
    {
        lead: 'JML',
        others: 'Jedi Luke, HYoda, JKA, GMY',
        notes: 'auto, Almost any other jedi work',
        link: 'https://youtu.be/9l_PmvdNH1U',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JKL',
        others: 'Ezra GMY Hyoda Bastila',
        notes: 'auto, if no JML',
        link: 'https://youtu.be/N3weS_bW_Js',
        difficulty: difficulty.EASY
    },{
        lead: 'JMK',
        others: 'Snips, GK, Shaak Ti, +1 GR',
        notes: 'auto',
        link: 'https://youtu.be/tBhtvOG7WAU',
        difficulty: difficulty.VERY_EASY
    },
]

const shipsLSP1 = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing',
        notes: 'easy auto',
        link: 'https://youtu.be/eInUd3NBMQU',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Outrider, Res Bomber, Poes Xwing, Comeuppance, Res Xwing',
        notes: 'easy auto',
        link: 'https://youtu.be/xPIzAX3WqIs',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Home One',
        others: 'HMF, Outrider, Y wing, Biggs, Wedge',
        notes: 'Outrider 2nd special, auto, biggs then wedge reinf',
        link: 'https://youtu.be/zxW5IOe_w_o',
        difficulty: difficulty.CAUTION
    }
]

const genericLSP1 = [
    {
        lead: 'QA',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        link: 'https://youtu.be/C-2WLaE8Irs',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Saw',
        others: 'Capt Rex, Luthen, Cassian, Baze',
        notes: 'auto, last two can vary',
        link: 'https://youtu.be/Utm6eFHyntU',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'M Mothma',
        others: 'Luthen, Kyle (o), Capt Rex, Cassian',
        notes: 'auto',
        link: 'https://youtu.be/IbBy_vDW6xc',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Ben, Baze',
        notes: 'auto, last two can be any rebels',
        link: 'https://youtu.be/2qBtZzE3ZPU',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Hunter (OG)',
        others: 'Echo, Wrecker, Tech, Shaak',
        notes: 'only 1/2 on auto',
        link: 'https://youtu.be/uVCIpd5pXf4',
        difficulty: difficulty.HARD
    },
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpal omi)',
        notes: 'auto',
        link: 'https://youtu.be/EHYdwMQeFiE',
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]

const qiraMixedP1 = [
    {
        lead: 'Qira (Leia)',
        others: 'Leia, R2, Drogan',
        notes: 'auto',
        link: 'https://youtu.be/iViRHC81yvs',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Qira (JMK)',
        others: 'JMK, CAT, GK',
        notes: 'auto, got a bit dicey at the end',
        link: 'https://youtu.be/uYhZJ3qbU9c',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Qira (Baylan)',
        others: 'Baylan, Marrok (o), Shin',
        notes: 'auto, hope they dont focus Marrok',
        link: 'https://youtu.be/srzybGeCGjw',
        difficulty: difficulty.EASY,
        omi: true
    }
]

const mixedP1 = [
    {
        lead: 'CLS',
        others: 'Han, Chewie, 3PO, Chewpio',
        notes: 'auto, may need to target damage dealers',
        link: 'https://youtu.be/CxIRs8XsEVA',
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'GAS',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto',
        link: 'https://youtu.be/HQBzpbVvYD0',
        difficulty: difficulty.VERY_EASY
    }
]

const jabbaP1 = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'easy auto',
        link: 'https://youtu.be/W_GayJRsWy4',
        difficulty: difficulty.VERY_EASY
    }
]

const drAphraP1 = [
    {
        lead: 'Aphra (Rey)',
        others: 'Rey, JTR, Ben, BB8',
        notes: 'auto',
        link: 'https://youtu.be/dNNTaMIUjD8',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, 000, Darth Vader, IG-88',
        notes: 'auto, can get unlucky if they focus down aphra',
        link: 'https://youtu.be/36sojaFa4uA',
        difficulty: difficulty.EASY
    },
]

const shipsP1 = [
    {
        lead: 'Executor',
        others: 'HT, P1, XB, Slave 1, IG2000',
        notes: 'auto, use RC if not platooned',
        link: 'https://youtu.be/Qzduxv0BJx8',
        difficulty: difficulty.VERY_EASY
    }
]

// P2

const hondoMixedP2 = [
    {
        lead: 'Baylan',
        others: 'Hondo, Shin, Marrok, Jango',
        notes: 'Fifth can be any mercenary, omi marrok, auto, can get unlucky if marrok gets killed',
        link: 'https://youtu.be/9FarHhCvPb8',
        difficulty: difficulty.EASY,
        omi: true
    },
    {
        lead: 'Rey',
        others: 'JTR, BB8, 3PO',
        notes: 'auto, not consistent 2/2',
        link: 'https://youtu.be/Pws01j8kXn0',
        difficulty: difficulty.CAUTION
    },{
        lead: 'JMK',
        others: 'CAT, GK, Snips',
        notes: 'can get unlucky if they focus CAT',
        link: 'https://youtu.be/nClssdqkjb0',
        difficulty: difficulty.EASY,
    },
]

const shipsMixedP2 = [
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Sun Fac, Spy, Soldier',
        notes: 'If you had to platoon exec, auto',
        link: 'https://youtu.be/ssTdWAi0jOs',
        difficulty: difficulty.VERY_EASY
    }
]

const mixedP2 = [
    {
        lead: 'JMK',
        others: 'CAT, Ahsoka, Padme, GK',
        notes: 'easy auto',
        link: 'https://youtu.be/EaX496Y45Vc',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'GAS',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto',
        link: 'https://youtu.be/kxJYqcbYgDQ',
        difficulty: difficulty.VERY_EASY
    }
]

const jabbaP2 = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'Boba can be any hutt cartel, easy auto',
        link: 'https://youtu.be/1Cu754InVBc',
        difficulty: difficulty.VERY_EASY
    }
]

const youngLandoP2 = [
    {
        lead: 'Rey',
        others: 'Ben, JTR, BB8',
        notes: 'only 1/2 on auto',
        link: 'https://youtu.be/_nNRPjVgX9U',
        difficulty: difficulty.HARD
    },{
        lead: 'Baylan',
        others: 'Shin, Marrok, +1 Merc',
        notes: '2nd wave very hard, only 1/2 on auto',
        link: 'https://youtu.be/pfpK6MA_uRM',
        difficulty: difficulty.HARD,
        omi: true
    },
]

const shipsLSP2 = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'auto',
        link: 'https://youtu.be/dD9Eey116EY',
        difficulty: difficulty.VERY_EASY
    }
]

const jediLSP2 = [
    {
        lead: 'JML',
        others: 'Ezra exile, JKL, Kyle Katarn, Shaak Ti',
        notes: 'auto with KK omi',
        link: 'https://youtu.be/wom3RZrx9VQ',
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'JMK',
        others: 'Shaak, Ahsoka, Ezra exile, GK',
        notes: 'auto, long, not reliable 2/2',
        link: 'https://youtu.be/_0J9LtUwj4U',
        difficulty: difficulty.CAUTION
    }
]

const leftLSP2 = [
    {
        lead: 'BK Mandalore',
        others: 'Rey, Paz, Beskar Mando, IG12',
        notes: 'not reliable on auto, only 1/2',
        link: 'https://youtu.be/W_AfGpB5RxY',
        difficulty: difficulty.HARD
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        link: 'https://youtu.be/2epBiIcFaG0',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Han, Chewie',
        notes: 'auto, last two replaceable, can occasionally get unlucky if Leia < R8',
        link: 'https://youtu.be/fFO75yKREfA',
        difficulty: difficulty.EASY
    },
]

const rightLSP2 = [
    {
        lead: 'Leia',
        others: 'Drogan, R2, Baze, Capt Rex',
        notes: 'auto, last two replaceable, can occasionally get unlucky',
        link: 'https://youtu.be/Od4-cr8woO8',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Saw',
        others: 'Luthen, Kyle (o), Cassian, Capt Rex',
        notes: 'only 1/2 auto',
        link: 'https://youtu.be/jX-X3SfQGUI',
        difficulty: difficulty.HARD,
        omi: true
    },{
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +any',
        notes: 'auto, use Ezra and or Hera if available',
        link: 'https://youtu.be/aP8-BIqw0jk',
        difficulty: difficulty.VERY_EASY
    },
]

const zeffoUnlock = [
    {
        lead: 'Cere',
        others: 'JKCK',
        notes: 'Two non lead omis on Cal',
        link: 'https://youtu.be/Ad_cJiVLLY0',
        difficulty: difficulty.NO_AUTO,
        omi: true
    }
]

const acklayDSP2 = [
    {
        lead: 'Lord Vader',
        others: 'Wat, any 3 empire',
        notes: 'Health/Prot tech on LV, hit auto',
        link: 'https://youtu.be/IfeFkchU5fA',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'auto',
        link: 'https://youtu.be/EYvM-YOI6Zk',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, easy auto',
        link: 'https://youtu.be/EssSASzT2qo',
        difficulty: difficulty.EASY
    }
]

const reekDSP2 = [
    {
        lead: 'SEE',
        others: 'Darth Vader, Bane, Malak, any 5th',
        notes: 'auto, Vader and malak are nice, others dont matter',
        link: 'https://youtu.be/ZSa1T0vsPYE',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'easy auto',
        link: 'https://youtu.be/H4r1Qyq-cr0',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        others: 'D Rey, KRU, +2 First Order',
        notes: 'auto',
        link: 'https://youtu.be/Ynmm55msvFo',
        difficulty: difficulty.VERY_EASY
    },
]

const nexuDSP2 = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: '2nd special, Auto',
        link: 'https://youtu.be/x3lQbmRbC0U',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        others: 'Hux, KRU, Sith Trooper, D Rey',
        notes: 'Poke, auto, DRey makes it easier',
        link: 'https://youtu.be/FW60H6-v6wM',
        difficulty: difficulty.EASY
    },
    {
        lead: 'LV',
        others: 'Darth Vader, +3 Empire',
        notes: 'I had Piett Tarkin Thrawn',
        link: 'https://youtu.be/x19YcfeL9_4',
        difficulty: difficulty.VERY_EASY
    },
]

// P3
const boKatanP3 = [
    {
        lead: 'Bo Katan',
        others: 'IG12',
        notes: 'IG call bo to assist, BAM birds, auto. pause to use ballista if Bo gets eaten',
        link: 'https://youtu.be/x2D1hwUiHjw',
        difficulty: difficulty.CAUTION
    }
]

const revaP3 = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'basics until you get 6 stacks of purge, hit Auto',
        link: 'https://youtu.be/q1lYPCfhpUA',
        difficulty: difficulty.EASY
    },
    {
        lead: 'GI',
        others: 'Marrok (omi), +3',
        notes: 'if no Reva. easy auto with omi',
        link: 'https://youtu.be/fpPe_Damg9I',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
]

const jabbaP3 = [
    {
        lead: 'Jabba',
        others: 'Any',
        notes: 'auto basic if no R7 Hutt Cartel',
        link: 'https://youtu.be/NpWgXSXi9pw',
        difficulty: difficulty.VERY_EASY
    }
]

const fennecP3 = [
    {
        lead: 'Rey',
        others: 'Fennec, any 3 resistance',
        notes: 'easy auto',
        link: 'https://youtu.be/ydm8T8Jvpyc',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK',
        others: 'GK, Shaak Ti, Padme',
        notes: 'easy auto',
        link: 'https://youtu.be/6CN70UAKHSU',
        difficulty: difficulty.VERY_EASY
    }
]

const mixedTopLeftP3 = [
    {
        lead: 'GAS',
        others: '501st Clones',
        notes: 'auto',
        link: 'https://youtu.be/R3LzrCTN_SU',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'CLS',
        others: 'Han, Chewie, Chewpio, Admiral Raddus',
        notes: 'auto',
        link: 'https://youtu.be/GEsQiDuewto',
        difficulty: difficulty.VERY_EASY
    }
]

const mixedP3Ships = [
    {
        lead: 'Executor (P1)',
        others: 'HT, XB, Punishing One, IG2000',
        notes: 'auto, use other BH ships if not platooned',
        link: 'https://youtu.be/rcqIa6VlXHs',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Executor (no P1)',
        others: 'RC, HT, XB, Slave 1',
        notes: 'If no Punishing One, auto',
        link: 'https://youtu.be/MoaMRXXAMqw',
        difficulty: difficulty.VERY_EASY
    }
]

const dsGenericP3 = [
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two are flexible',
        link: 'https://youtu.be/WcYP7j8ooos',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Emp Palpatine',
        others: 'Wat, SEE, Malak, Bane',
        notes: 'Doable without Wat but slower, weapon tech on SEE, auto',
        link: 'https://youtu.be/eXq1LcioaFE',
        difficulty: difficulty.EASY
    },
    {
        lead: 'SLKR',
        others: 'DRey, KRU, Kylo Ren, Sith Trooper',
        notes: 'Poke once in each round, auto, inconsistent without DRey',
        link: 'https://youtu.be/grmLuLr-XG0',
        difficulty: difficulty.EASY
    },
    {
        lead: 'General Grievous',
        others: 'Wat, Dooku, Nute, Jango',
        notes: '2/2 is hard on auto',
        link: 'https://youtu.be/uILyRLFQv-o',
        difficulty: difficulty.HARD
    },
    {
        lead: 'Darth Revan',
        others: 'SEE, Malak, Bane, Malgus',
        notes: 'auto, use tanky sith',
        link: 'https://youtu.be/E3O_nxMHj8A',
        difficulty: difficulty.EASY
    },
]

const dsEmpireP3 = [
    {
        lead: 'Lord Vader',
        others: 'Any',
        notes: 'auto, Dont use Piett',
        link: 'https://youtu.be/Ap_rIhILZBM',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Grand Inquisitor',
        others: 'Reva, 5B, 8B, 7S',
        notes: 'auto, takes forever',
        link: 'https://youtu.be/_hwmbHfEj_M',
        difficulty: difficulty.EASY
    }
]

const drAphraP3 = [
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, GG, HK47, Darth Vader',
        notes: 'auto, Use 0-0-0 if you have him, can occasionally 1/2',
        link: 'https://youtu.be/_cLW8lg0kB4',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Aphra (Sith)',
        others: 'Darth Vader, Malak, Bane, Malgus',
        notes: 'if no droids, auto, can occasionally 1/2',
        link: 'https://youtu.be/IsnUq7nxcBU',
        difficulty: difficulty.EASY
    }
]

const merrinP3 = [
    {
        lead: 'Great Mothers',
        others: 'Morgan, Death Trooper, Night Trooper, Merrin',
        notes: 'auto but Bless Morgan, doom maul first in P2',
        link: 'https://youtu.be/ldzz1yHeeWY',
        difficulty: difficulty.EASY
    }
]

const lsLeftP3 = [
    {
        lead: 'JMK',
        others: 'CAT, Snips, Padme, GK',
        notes: 'auto, not consistent 2/2',
        link: 'https://youtu.be/DiSqzfNlNww',
        difficulty: difficulty.EASY
    },
    {
        lead: 'JML',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory',
        link: 'https://youtu.be/R_3rOQK49XQ',
        difficulty: difficulty.VERY_EASY
    }
]

const lsRightP3 = [
    {
        lead: 'Leia',
        others: 'R2, Drogan +2',
        notes: 'auto, focus mara wave 2',
        link: 'https://youtu.be/xrl2EVOFLxQ',
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +1',
        notes: 'auto, use Ezra and Hera if available',
        link: 'https://youtu.be/3T8M7wuyTuI',
        difficulty: difficulty.EASY
    }
]

const sawP3 = [
    {
        lead: 'Saw (Drogan)',
        others: 'Capt Rex, Luthen, Cassian, Drogan',
        notes: 'auto, target purge troopers',
        link: 'https://youtu.be/K4HObnZm0TU',
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Saw (Kyle)',
        others: 'Capt Rex, Luthen, Cassian, Kyle (o)',
        notes: 'auto, target purge troopers',
        link: 'https://youtu.be/FCEEsGXMtOA',
        difficulty: difficulty.CAUTION,
        omi: true
    }
]

// P4

const lsShipsP4 = [
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'auto, Dont use Ghost if required in Mixed',
        link: 'https://youtu.be/-AZjA6D9sK4',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Negotiator',
        others: 'JKA, Y Wing, Marauder, Plo, Ahsoka, Fives, Rex',
        notes: 'auto',
        link: 'https://youtu.be/D30RG8s3HDQ',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Poe XWing, Res Bomber, Comeuppance, Res X Wing',
        notes: 'Only if no Prof/Neg, cannot auto until Comeuppance comes in',
        link: 'https://youtu.be/aCzlG6jGH0M',
        difficulty: difficulty.NO_AUTO
    }
]

const lsGenericP4 = [
    {
        lead: 'Leia',
        others: 'Han, Cassian, Raddus, R2-D2',
        notes: 'auto, Drogan if you have him',
        link: 'https://youtu.be/C6F4fIWlP-I',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'QA',
        others: 'POW, MQG, Yoda, Padme',
        notes: 'auto, other two can be any GR',
        link: 'https://youtu.be/6YzDrnBGFvw',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK',
        others: 'Padme, Snips, GK, CAT',
        notes: 'auto',
        link: 'https://youtu.be/qPc-UJDjAt0',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'Tarpals omi, auto',
        link: 'https://youtu.be/xCacWaNrwto',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Any',
        notes: 'auto',
        link: 'https://youtu.be/nNTovvlMApI',
        difficulty: difficulty.VERY_EASY
    }
]

const jediLSP4 = [
    {
        lead: 'JMK',
        others: 'GAS, Ahsoka, Ezra Exile, GK',
        notes: 'auto',
        link: 'https://youtu.be/nVtmzJh4xlk0',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JML',
        others: 'Ezra Exile, GAS, GMY, Plo',
        notes: 'auto, replace Plo if possible',
        link: 'https://youtu.be/OcVbpC8FHmE',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK (no Ezra)',
        others: 'GAS, Ahsoka, GK, Plo',
        notes: 'auto, only 1/2',
        link: 'https://youtu.be/nzJ8oUrygqc',
        difficulty: difficulty.HARD
    },
]

const mixedQiraP4 = [
    {
        lead: 'Leia',
        others: 'R2, Drogan, Qira, L3',
        notes: 'auto',
        link: 'https://youtu.be/rnj73wSUTrE',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Baylan',
        others: 'Shin, Marrok (omi), Qira, L3',
        notes: 'auto',
        link: 'https://youtu.be/nBP08l-0Lj4',
        difficulty: difficulty.VERY_EASY,
        omi: true
    }
]

const mixedGenericP4 = [
    {
        lead: 'QA',
        others: 'MQG, POW, GMY, Ahsoka',
        notes: 'auto, Last two are flexible',
        link: 'https://youtu.be/LpchaAwpVuk',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SEE',
        others: 'Malak, Malgus, DR, Malicos',
        notes: 'auto, use sith instead of Malicos if possible',
        link: 'https://youtu.be/1LnWy0zcAWA',
        difficulty: difficulty.EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Fulcrum +3',
        notes: 'auto, Ezra or spectre speeds things up',
        link: 'https://youtu.be/t6bxMOvhWdY',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        others: 'DRey, Starkiller, Malicos',
        notes: 'auto, use FO if possible',
        link: 'https://youtu.be/cggvycdd5iI',
        difficulty: difficulty.EASY
    },
]

const mixedFleetP4 = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar, Emp Shuttle',
        notes: 'Tedious, but works, semi auto',
        link: 'https://youtu.be/5rZYEDKdxCo',
        difficulty: difficulty.NO_AUTO,
    }
]

const dsInqP4 = [
    {
        lead: 'Reva',
        others: 'Marrok, GI, 7S, 5B',
        notes: 'marrok omi, auto',
        link: 'https://youtu.be/2q1SguWa54Y',
        difficulty: difficulty.VERY_EASY,
        omi: true
    }
]

const dsRightP4 = [
    {
        lead: 'SEE',
        others: 'Malak, Dooku, DR, Bane',
        notes: 'auto, Only 1/2',
        link: 'https://youtu.be/JZT1-k2EDIo',
        difficulty: difficulty.HARD
    }
]

// P5

const mixedFleetP5 = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'auto but pause for MK6 Instakill',
        link: 'https://youtu.be/RnCTLQJblO8',
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Executor',
        others: 'HT, RC, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto',
        link: 'https://youtu.be/7cTPzAAqRa4',
        difficulty: difficulty.VERY_EASY
    }
]

const mixedGenericP5 = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any R9s',
        notes: 'Auto',
        link: 'https://youtu.be/OCGLZm1SJiM', 
        difficulty: difficulty.VERY_EASY
    }
]

// zeffo
const clonesSM = [
    {
        lead: 'Rex',
        others: 'Capt Rex, Echo, Arc Trooper, Fives',
        notes: 'Auto, Reticule on Consular in P2',
        link: 'https://youtu.be/SvUzVopG8a4', 
        difficulty: difficulty.CAUTION
    }
]

const zeffoFleets = [
    {
        lead: 'Negotiator',
        others: 'JKA, Marauder, Y wing, Ahsoka, Fives, Rex',
        notes: 'Auto',
        link: 'https://youtu.be/h4nS7Flp4Zk', 
        difficulty: difficulty.VERY_EASY
    },
]

const zeffoJedi = [
    {
        lead: 'JKCK (JMK)',
        others: 'JMK, Jedi Knight Luke, Ezra Exile, Kyle',
        notes: 'Omi Kyle, auto',
        link: 'https://youtu.be/bBgHB0q5hmo', 
        difficulty: difficulty.EASY,
        omi: true
    },
    {
        lead: 'JKCK (GLAT)',
        others: 'GLAT, Sabine, Hera, Huyang',
        notes: 'Use ezra if possible, auto',
        link: 'https://youtu.be/V_u2XK-W8mA', 
        difficulty: difficulty.EASY
    },
    {
        lead: 'JKCK (JML)',
        others: 'JML, Ezra Exile, JKL, Shaak',
        notes: 'auto, target purge trooper wave 1 then 2S wave 2',
        link: 'https://youtu.be/LqJsWBb5S88', 
        difficulty: difficulty.CAUTION
    }
]

const zeffoUFU = [
    {
        lead: 'Rey',
        others: 'CAT, Ben, Cere, JTR',
        notes: 'auto, not consistent 2/2',
        link: 'https://youtu.be/LQbMxA3Oqcs', 
        difficulty: difficulty.EASY
    },
]

// mandalore

const mandaloreFleets = [
    {
        lead: 'Chimera',
        others: 'Scythe, Tie Adv start, Tie interceptor, Tie Defender, Tie Fighter, Emp Shuttle',
        notes: 'not auto for the first moves',
        link: 'https://youtu.be/5dZTKfblLvM',
        difficulty: difficulty.NO_AUTO
    },
    {
        lead: 'Leviathan',
        others: 'Gauntlet (mandatory), Bomber, FCI, Assassin, Dorito, MK6 Interceptor, Scimitar',
        notes: 'semi auto, isolate anakin, hold the instakill for Marauder',
        link: 'https://youtu.be/-Xqd1DYrdUA',
        difficulty: difficulty.CAUTION
    }
]

const mandaloreGeneric = [
    {
        lead: 'Boss Nass',
        others: 'The other gungans',
        notes: 'easy auto with Tarpal Omi',
        link: 'https://youtu.be/fLPilo3n-gw',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, Marrok',
        notes: 'Marrok Omi, easy auto',
        link: 'https://youtu.be/ke-l_Xxu0p4',
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Baylan',
        others: 'Marrok (o), Shin, Han, Boba',
        notes: '1/2 if Marrok gets popped, use Merc instead of Boba if possible',
        link: 'https://youtu.be/h8_04P6rr8Q',
        difficulty: difficulty.HARD,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, +2 Rebels',
        notes: '1/2 on auto',
        link: 'https://youtu.be/5VAQS5EqLGE',
        difficulty: difficulty.HARD
    },
    {
        lead: 'QA',
        others: 'MQJ, POW, Padme, GMY',
        notes: '1/2 on auto',
        link: 'https://youtu.be/inP-FwCeOn0',
        difficulty: difficulty.HARD
    },
]

export const data = {
    phase1: {
        ds: {
            left: leftDSP1,
            bottom: bottomDSP1,
            top: topDSP1,
            lv: lvP1,
            ships: shipsDSP1,
        },
        mixed: {
            qira: qiraMixedP1,
            mixed: mixedP1,
            jabba: jabbaP1,
            aphra: drAphraP1,
            ships: shipsP1,
        },
        ls: {
            ships: shipsLSP1,
            generic: genericLSP1,
            maceKitP1: maceKitP1,
            jediP1: jediP1
        },
    },
    phase2: {
        ds: {
            acklay: acklayDSP2,
            reek: reekDSP2,
            nexu: nexuDSP2
        },
        mixed: {
            hondo: hondoMixedP2,
            ships: shipsMixedP2,
            jabba: jabbaP2,
            youngLando: youngLandoP2,
            combat: mixedP2
        },
        ls: {
            ships: shipsLSP2,
            jedi: jediLSP2,
            left: leftLSP2,
            right: rightLSP2,
            zeffo: zeffoUnlock
        },
    },
    phase3: {
        ds: {
            generic: dsGenericP3,
            empire: dsEmpireP3,
            aphra: drAphraP3,
            merrin: merrinP3,
        },
        ls: {
            saw: sawP3,
            left: lsLeftP3,
            right: lsRightP3
        },
        mixed: {
            boKatan: boKatanP3,
            reva: revaP3,
            topLeft: mixedTopLeftP3,
            jabba: jabbaP3,
            fennec: fennecP3,
            fleet: mixedP3Ships,
        },
        zeffo: {
            fleets: zeffoFleets,
            jedi: zeffoJedi,
            clones: clonesSM,
            ufu: zeffoUFU,
        }
    },
    phase4: {
        ds: {
            inqs: dsInqP4,
            right: dsRightP4
        },
        mixed: {
            fleet: mixedFleetP4,
            generic: mixedGenericP4,
            qira: mixedQiraP4,
        },
        ls: {
            ships: lsShipsP4,
            generic: lsGenericP4,
            jedi: jediLSP4,
        },
        mandalore: {
            fleets: mandaloreFleets,
            generic: mandaloreGeneric
        }
    },
    phase5: {
        mixed: {
            generic: mixedGenericP5,
            fleet: mixedFleetP5
        },
    },
    special: {
        all: {
            qiraP1: qiraMixedP1,
            zeffo: zeffoUnlock,
            clones: clonesSM,
            boKatan: boKatanP3,
            merrin: merrinP3,
            saw: sawP3,
            inqs: dsInqP4,
            qiraP4: mixedQiraP4,
        }
    }
}