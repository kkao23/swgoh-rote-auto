import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const leftDSP1: dataType[] = [{
    lead: 'Trench',
    others: 'Wat, Jango, Nute, Dooku',
    notes: 'Open with Tank Tech on Jango, target droideka, hit auto',
    videos: [{ url: 'https://youtu.be/zLFGIuSzFW0' }],
    difficulty: difficulty.EASY
},
{
    lead: 'SLKR',
    others: 'DRey',
    notes: 'Any other FO, Poke Droideka, Auto',
    videos: [{ url: 'https://youtu.be/AsoKUJ0UIik' }],
    difficulty: difficulty.EASY
},
{
    lead: 'SEE',
    leadFull: 'Sith Eternal Emperor',
    others: 'Wat, Malak, +2 Sith',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/pGSL9U-0rPs' }],
    difficulty: difficulty.VERY_EASY
},
{
    lead: 'Mother Talzin',
    others: 'Merrin, Asajj, Daka, Zombie',
    notes: 'auto',
    videos: [{ url: 'https://www.youtube.com/watch?v=yPPfk6jXukU', creator: creators.egnards }],
    difficulty: difficulty.EASY
}, {
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Auto, can bless morgan manually if you want to be totally safe',
    videos: [{ url: 'https://youtu.be/YUMJjeD6k5A' }],
    difficulty: difficulty.VERY_EASY
},{
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/kibKGIAfVf4' }],
    difficulty: difficulty.VERY_EASY
},
{
    lead: 'General Grievous',
    others: 'Magna, STAP, B2, B1',
    notes: 'auto, I have most of them at R7, may be harder at R5',
    videos: [{ url: 'https://youtu.be/H8crYJOOfd8' }],
    difficulty: difficulty.EASY
},];

export const bottomDSP1: dataType[] = [{
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Doom droideka, bless Morgan, hit auto',
    videos: [{ url: 'https://youtu.be/dVJSaQ_Pwmo' }],
    difficulty: difficulty.EASY
},
{
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'Target Droideka, hit auto',
    videos: [{ url: 'https://youtu.be/Pk9v02K5wwc' }],
    difficulty: difficulty.EASY
},
{
    lead: 'SEE',
    leadFull: 'Sith Eternal Emperor',
    others: 'Wat, Malak, Bane, Malgus',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/CjxSQ88mlMk' }],
    difficulty: difficulty.HARD
},
{
    lead: 'E Palpatine',
    leadFull: 'Emperor Palpatine',
    others: 'Mara, +3 Empire',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/AU0_LBntv9o' }],
    difficulty: difficulty.HARD
},
{
    lead: 'Mother Talzin',
    others: 'Merrin, Asajj, Daka, Zombie',
    notes: 'auto',
    videos: [{ url: 'https://www.youtube.com/watch?v=WNhnP7qjZgQ', creator: creators.egnards }],
    difficulty: difficulty.EASY
},
{
    lead: 'Captain Enoch (omi)',
    others: 'Death Trooper Peridia, Tie Fighter Pilot, Night Trooper, Stormtrooper',
    notes: 'target B2, auto',
    videos: [{url: 'https://youtu.be/V75J-k6i40s?si=6pWLh-5BQIDC5fJ-&t=264', creator: creators.pico}],
    difficulty: difficulty.VERY_EASY,
    omi: true,
},
{
    lead: 'SLKR',
    others: 'DRey, Hux, KRU, Sith Trooper',
    notes: 'Auto',
    videos: [{ url: 'https://youtu.be/BTWI-B8Oc-Q' }],
    difficulty: difficulty.EASY
},
{
    lead: 'GG',
    leadFull: 'General Grievous',
    others: 'B1, B2, STAP, Magna Guard',
    notes: 'Only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/ZE009t8VImc' }],
    difficulty: difficulty.HARD
},
{
    lead: 'Baylan',
    others: 'Marrok, Shin, any 2 mercs',
    notes: 'auto, Marrok Omi',
    videos: [{ url: 'https://youtu.be/IgwTIlI2T64' }],
    difficulty: difficulty.VERY_EASY,
    omi: true,
},
{
    lead: 'Maul',
    others: 'Jango, ISC, Gar Saxon, Canderous',
    notes: 'only 1/2 on auto',
    videos: [{ url: 'https://youtu.be/-Uhr-v_0zdQ' }],
    difficulty: difficulty.HARD,
}
];

export const topDSP1: dataType[] = [
    {
        lead: 'SLKR',
        others: 'Hux, KRU, Sith Trooper, any 5th',
        notes: 'Stun droideka first, second phase poke brute, otherwise auto',
        videos: [{ url: 'https://youtu.be/QGui7hJ4ZrQ' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, any 2 mercs',
        notes: 'auto, Marrok Omi',
        videos: [{ url: 'https://youtu.be/y2_S73szIS0' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }, {
        lead: 'Great Mothers',
        others: 'Morgan, Night Trooper, Death Trooper, Merrin',
        notes: 'Doom droideka, bless Morgan, hit auto',
        videos: [{ url: 'https://youtu.be/zjxxsvQos5Y' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 2S, 8B',
        notes: 'Target B2, hit auto',
        videos: [{ url: 'https://youtu.be/V75J-k6i40s?si=uX_YUqMZEuQr7VIN&t=145', creator: creators.pico }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Wat, Malak, Bane, Darth Revan',
        notes: 'Tank Tech on SEE, auto, may not be totally consistent',
        videos: [{ url: 'https://youtu.be/usKjKU8tLHo' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Trench',
        others: 'Wat, Jango, Nute, Dooku',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/Xi75-aTjxmI' }],
        difficulty: difficulty.HARD
    },
];

export const lvP1: dataType[] = [
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: '',
        notes: 'Easy full auto',
        videos: [{ url: 'https://youtu.be/YIOTKDpWtRM' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const shipsDSP1 = [
    {
        lead: 'Leviathan',
        others: 'Sith Bomber, MK6 Interceptor, Sith Fighter, Tie Adv, Scimitar',
        notes: 'Not consistent',
        videos: [{ url: 'https://youtu.be/xCuGwcVtd98' },
        { url: 'https://www.youtube.com/watch?v=ahVD4QBYne4', creator: creators.egnards },
        ],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Chimera',
        others: 'Scythe, Mk6, Tie Adv, Defender, Interceptor, Sith Fighter, TIE Fighter',
        notes: 'cant auto',
        videos: [
        { url: 'https://www.youtube.com/watch?v=4skhcZSGAoQ', creator: creators.kahzgul },
        ],
        difficulty: difficulty.NO_AUTO
    }
]