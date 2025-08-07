import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const dsGenericP3: dataType[] = [
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two are flexible',
        videos: [{ url: 'https://youtu.be/WcYP7j8ooos' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Emp Palpatine',
        leadFull: 'Emperor Palpatine',
        others: 'Wat, SEE, Malak, Bane',
        notes: 'Doable without Wat but slower, weapon tech on SEE, auto',
        videos: [{ url: 'https://youtu.be/eXq1LcioaFE' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'SLKR',
        others: 'DRey, KRU, Kylo Ren, Sith Trooper',
        notes: 'Poke once in each round, auto, inconsistent without DRey',
        videos: [{ url: 'https://youtu.be/grmLuLr-XG0' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'General Grievous',
        others: 'Wat, Dooku, Nute, Jango',
        notes: '2/2 is hard on auto',
        videos: [{ url: 'https://youtu.be/uILyRLFQv-o' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Darth Revan',
        others: 'SEE, Malak, Bane, Malgus',
        notes: 'auto, use tanky sith',
        videos: [{ url: 'https://youtu.be/E3O_nxMHj8A' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'Torture, auto, I personally have not gotten this team to work under 10 minutes',
        videos: [{ url: 'https://www.youtube.com/watch?v=7wqarjgb6x8', creator: creators.egnards }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Trench',
        others: 'Dooku, Wat, Jango, Nute',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/KBeqsI-Xkd0?si=TdjNlW5XNg03AkcP&t=110', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'Lord Vader',
        others: 'Any Empire',
        notes: 'I had LV Thrawn scout trooper Iden Tarkin but I imagine any empire is fine. I would avoid piett. full auto',
        videos: [{ url: 'https://youtu.be/FAunjeobuzM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'DTMG (Enoch omi)',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Night Trooper',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/hpzwWiwI-dE'}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]

export const dsEmpireP3: dataType[] = [
    {
        lead: 'Lord Vader',
        others: 'Any',
        notes: 'auto, Dont use Piett',
        videos: [{ url: 'https://youtu.be/Ap_rIhILZBM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Grand Inquisitor',
        others: 'Reva, 5B, 8B, 7S',
        notes: 'auto, takes forever, can sometimes 1/2',
        videos: [{ url: 'https://youtu.be/_hwmbHfEj_M' }],
        difficulty: difficulty.CAUTION
    }
]

export const drAphraP3: dataType[] = [
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, GG, HK47, Darth Vader',
        notes: 'auto, Use 0-0-0 if you have him, can occasionally 1/2',
        videos: [{ url: 'https://youtu.be/_cLW8lg0kB4' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Aphra (Sith)',
        others: 'Darth Vader, Malak, Bane, Malgus',
        notes: 'if no droids, auto, can occasionally 1/2',
        videos: [{ url: 'https://youtu.be/IsnUq7nxcBU' }],
        difficulty: difficulty.EASY
    }
]

export const merrinP3: dataType[] = [
    {
        lead: 'Great Mothers',
        others: 'Morgan, Death Trooper, Night Trooper, Merrin',
        notes: 'auto but Bless Morgan, doom maul first in P2',
        videos: [{ url: 'https://youtu.be/ldzz1yHeeWY' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Old Daka',
        others: 'Asajj, Zombie, Mother Talzin, Merrin',
        notes: 'auto, R8+ Daka and great mods required',
        videos: [{ url: 'https://www.youtube.com/watch?v=EM3GCo_0XSQ', creator: creators.egnards }],
        difficulty: difficulty.EASY
    }
]