import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const leftDSP1: dataType[] = [{
    lead: 'Trench',
    others: 'Wat, Jango, Nute, Dooku',
    notes: 'Open with Tank Tech on Jango, target droideka, hit auto',
    videos: [{ url: 'https://youtu.be/zLFGIuSzFW0' }],
    difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
    targeted: true
},
{
    lead: 'SLKR',
    others: 'DRey',
    notes: 'Any other FO, Poke Droideka, Auto',
    videos: [{ url: 'https://youtu.be/AsoKUJ0UIik' }],
    difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
},
{
    lead: 'SEE',
    leadFull: 'Sith Eternal Emperor',
    others: 'Wat, Malak, +2 Sith',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/pGSL9U-0rPs' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
},
// {
//     lead: 'Mother Talzin',
//     others: 'Merrin, Asajj, Daka, Zombie',
//     notes: 'auto',
//     videos: [{ url: 'https://www.youtube.com/watch?v=yPPfk6jXukU', creator: creators.egnards }],
//     difficulty: difficulty.EASY,
//         successRate: successRate.NINETY_PERCENT,
//         interactionType: [interactionType.AUTO]
// }, 
{
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Auto, can bless morgan manually if you want to be totally safe',
    videos: [{ url: 'https://youtu.be/YUMJjeD6k5A' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
}, {
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/kibKGIAfVf4' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
},
{
    lead: 'General Grievous',
    others: 'Magna, STAP, B2, B1',
    notes: 'auto, I have most of them at R7, may be harder at R5',
    videos: [{ url: 'https://youtu.be/H8crYJOOfd8' }],
    difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
},
{
    lead: 'DTMG (Enoch omi)',
    leadFull: 'Dark Trooper Moff Gideon',
    others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Death Trooper',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/qSHFMblMpXs' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    omi: true,
},];

export const bottomDSP1: dataType[] = [{
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Doom droideka, bless Morgan, hit auto',
    videos: [{ url: 'https://youtu.be/dVJSaQ_Pwmo' }],
    difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
},
{
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'Target Droideka, hit auto',
    videos: [{ url: 'https://youtu.be/Pk9v02K5wwc' }],
    difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START],
    targeted: true
},
{
    lead: 'SEE',
    leadFull: 'Sith Eternal Emperor',
    others: 'Wat, Malak, Bane, Malgus',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/CjxSQ88mlMk' }],
    difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
},
{
    lead: 'E Palpatine',
    leadFull: 'Emperor Palpatine',
    others: 'Mara, +3 Empire',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/AU0_LBntv9o' }],
    difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
},
// {
//     lead: 'Mother Talzin',
//     others: 'Merrin, Asajj, Daka, Zombie',
//     notes: 'auto',
//     videos: [{ url: 'https://www.youtube.com/watch?v=WNhnP7qjZgQ', creator: creators.egnards }],
//     difficulty: difficulty.EASY,
//         successRate: successRate.NINETY_PERCENT,
//         interactionType: [interactionType.AUTO]
// },
{
    lead: 'DTMG (Enoch omi)',
    leadFull: 'Dark Trooper Moff Gideon',
    others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Death Trooper',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/I6J9XHpBIrc' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    omi: true,
},
{
    lead: 'SLKR',
    others: 'DRey, Hux, KRU, Sith Trooper',
    notes: 'Auto',
    videos: [{ url: 'https://youtu.be/BTWI-B8Oc-Q' }],
    difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
},
{
    lead: 'GG',
    leadFull: 'General Grievous',
    others: 'B1, B2, STAP, Magna Guard',
    notes: 'Only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/ZE009t8VImc' }],
    difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
},
{
    lead: 'Baylan',
    others: 'Marrok, Shin, any 2 mercs',
    notes: 'auto, Marrok Omi',
    videos: [{ url: 'https://youtu.be/IgwTIlI2T64' }],
    difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    omi: true,
},
{
    lead: 'Maul',
    others: 'Jango, ISC, Gar Saxon, Canderous',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/-Uhr-v_0zdQ' }],
    difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
}
];

export const topDSP1: dataType[] = [
    {
        lead: 'SLKR',
        others: 'Hux, KRU, Sith Trooper, any 5th',
        notes: 'Stun droideka first, second phase poke brute, otherwise auto',
        videos: [{ url: 'https://youtu.be/QGui7hJ4ZrQ' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START, interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, any 2 mercs',
        notes: 'auto, Marrok Omi, can get unlucky if they focus down marrok',
        videos: [{ url: 'https://youtu.be/y2_S73szIS0' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    }, {
        lead: 'Great Mothers',
        others: 'Morgan, Night Trooper, Death Trooper, Merrin',
        notes: 'Doom droideka, bless Morgan, hit auto',
        videos: [{ url: 'https://youtu.be/zjxxsvQos5Y' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 2S, 8B',
        notes: 'Target B2, hit auto',
        videos: [{ url: 'https://youtu.be/V75J-k6i40s?si=uX_YUqMZEuQr7VIN&t=145', creator: creators.pico }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Wat, Malak, Bane, Darth Revan',
        notes: 'Tank Tech on SEE, auto, may not be totally consistent',
        videos: [{ url: 'https://youtu.be/usKjKU8tLHo' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Trench',
        others: 'Wat, Jango, Nute, Dooku',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/Xi75-aTjxmI' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'DTMG (Enoch omi)',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Tie Fighter Pilot',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/jbXA0XrS9Bk' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
];

export const lvP1: dataType[] = [
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: '',
        notes: 'Easy full auto',
        videos: [{ url: 'https://youtu.be/YIOTKDpWtRM' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const shipsDSP1 = [
    {
        lead: 'Leviathan',
        others: 'Sith Bomber, MK6 Interceptor, Sith Fighter, Tie Adv, Scimitar',
        notes: 'Not consistent',
        videos: [{ url: 'https://youtu.be/xCuGwcVtd98' },
        ],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY
    },
    {
        lead: 'Chimera',
        others: 'Scythe, Mk6, Tie Adv, Defender, Interceptor, Sith Fighter, TIE Fighter',
        notes: 'cant auto',
        videos: [
            { url: 'https://www.youtube.com/watch?v=4skhcZSGAoQ', creator: creators.kahzgul },
        ],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    }
]
