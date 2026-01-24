import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsGenericP3: dataType[] = [
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two are flexible',
        videos: [{ url: 'https://youtu.be/WcYP7j8ooos' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    },
    {
        lead: 'Emp Palpatine',
        leadFull: 'Emperor Palpatine',
        others: 'Wat, SEE, Malak, Bane',
        notes: 'Doable without Wat but slower, weapon tech on SEE, auto',
        videos: [{ url: 'https://youtu.be/eXq1LcioaFE' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'SLKR',
        others: 'DRey, KRU, Kylo Ren, Sith Trooper',
        notes: 'Poke once in each round, auto, inconsistent without DRey',
        videos: [{ url: 'https://youtu.be/grmLuLr-XG0' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'General Grievous',
        others: 'Wat, Dooku, Nute, Jango',
        notes: '2/2 is hard on auto',
        videos: [{ url: 'https://youtu.be/uILyRLFQv-o' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Darth Revan',
        others: 'SEE, Malak, Bane, Malgus',
        notes: 'auto, use tanky sith',
        videos: [{ url: 'https://youtu.be/E3O_nxMHj8A' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'Torture, auto, I personally have not gotten this team to work under 10 minutes',
        videos: [{ url: 'https://www.youtube.com/watch?v=7wqarjgb6x8', creator: creators.egnards }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Trench',
        others: 'Dooku, Wat, Jango, Nute',
        notes: 'auto, dicey',
        videos: [{url: 'https://youtu.be/9MoHoNzgNYw'}],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO,
    },
    {
        lead: 'Lord Vader',
        others: 'Any Empire',
        notes: 'I had LV Thrawn scout trooper Iden Tarkin but I imagine any empire is fine. I would avoid piett. full auto',
        videos: [{ url: 'https://youtu.be/FAunjeobuzM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'DTMG (Enoch omi)',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Night Trooper',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/hpzwWiwI-dE'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true,
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper',
        notes: 'Scorch makes this easier but Thrawn works in his place',
        videos: [{ url: 'https://youtu.be/SHb_ZfMj6Bk', }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        omi: true
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Brutus, Vane, Silvo',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/40THp58CUfI' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
    },
]

export const dsEmpireP3: dataType[] = [
    {
        lead: 'Lord Vader',
        others: 'Any',
        notes: 'auto, Dont use Piett',
        videos: [{ url: 'https://youtu.be/Ap_rIhILZBM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Grand Inquisitor',
        others: 'Reva, 5B, 8B, 7S',
        notes: 'auto, takes forever, can sometimes 1/2',
        videos: [{ url: 'https://youtu.be/_hwmbHfEj_M' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, +1',
        notes: 'I had Piett as 5th but Scorch is ideal',
        videos: [{ url: 'https://youtu.be/ydXVr7yHHyY', }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        omi: true
    },
]

export const drAphraP3: dataType[] = [
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, GG, HK47, Darth Vader',
        notes: 'auto, Use 0-0-0 if you have him, can occasionally 1/2',
        videos: [{ url: 'https://youtu.be/_cLW8lg0kB4' }],
        difficulty: difficulty.EASY,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Aphra (Sith)',
        others: 'Darth Vader, Malak, Bane, Malgus',
        notes: 'if no droids, auto, can occasionally 1/2',
        videos: [{ url: 'https://youtu.be/IsnUq7nxcBU' }],
        difficulty: difficulty.EASY,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Aphra (IPD Omicron)',
        others: 'Darth Vader, BT1, IPD (omicron), 0-0-0',
        notes: 'auto, expensive',
        videos: [{ url: 'https://youtu.be/MTkMzJMayUA?si=FfDoECPNw7uALL_n' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: interactionType.AUTO,
        omi: true
    }
]

export const merrinP3: dataType[] = [
    {
        lead: 'Great Mothers',
        others: 'Morgan, Death Trooper, Night Trooper, Merrin',
        notes: 'auto but Bless Morgan, doom maul first in P2',
        videos: [{ url: 'https://youtu.be/ldzz1yHeeWY' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    },
    {
        lead: 'Old Daka',
        others: 'Asajj, Zombie, Mother Talzin, Merrin',
        notes: 'auto, R8+ Daka and great mods required',
        videos: [{ url: 'https://www.youtube.com/watch?v=EM3GCo_0XSQ', creator: creators.egnards }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: interactionType.AUTO
    }
]

