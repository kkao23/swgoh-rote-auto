import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const leftDSP1: dataType[] = [{
    lead: 'Trench',
    others: 'Wat, Jango, Nute, Dooku',
    notes: 'Open with Tank Tech on Jango, target droideka, hit auto',
    videos: [{ url: 'https://youtu.be/zLFGIuSzFW0' }],
    icon: '/icons/characters/tex.charui_admiraltrench.png',
    difficulty: difficulty.EASY,
    successRate: successRate.USUALLY,
    interactionType: [interactionType.TARGET_START],
    targeted: true,
},
{
    lead: 'SLKR',
    others: 'DRey',
    notes: 'Any other FO, Poke Droideka, Auto',
    videos: [{ url: 'https://youtu.be/AsoKUJ0UIik' }],
    icon: '/icons/characters/tex.charui_kyloren_tros.png',
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
    icon: '/icons/characters/tex.charui_espalpatine_pre.png',
    difficulty: difficulty.VERY_EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'Mother Talzin',
    others: 'Merrin, Asajj, Daka, Zombie',
    notes: 'auto',
    videos: [{ url: 'https://www.youtube.com/watch?v=yPPfk6jXukU', creator: 'egnards' }],
    icon: '/icons/characters/tex.charui_nightsisters_talzin.png',
    difficulty: difficulty.EASY,
    successRate: successRate.NINETY_PERCENT,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'Great Mothers',
    others: 'Morgan, Night Trooper, Death Trooper, Merrin',
    notes: 'Auto, can bless morgan manually if you want to be totally safe',
    videos: [{ url: 'https://youtu.be/YUMJjeD6k5A' }],
    icon: '/icons/characters/tex.charui_greatmothers.png',
    difficulty: difficulty.VERY_EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO]
}, {
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/kibKGIAfVf4' }],
    icon: '/icons/characters/tex.charui_thirdsister.png',
    difficulty: difficulty.VERY_EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'General Grievous',
    others: 'Magna, STAP, B2, B1',
    notes: 'auto, I have most of them at R7, may be harder at R5',
    videos: [{ url: 'https://youtu.be/H8crYJOOfd8' }],
    icon: '/icons/characters/tex.charui_grievous.png',
    difficulty: difficulty.EASY,
    successRate: successRate.NINETY_PERCENT,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'DTMG',
    leadFull: 'Dark Trooper Moff Gideon',
    others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Death Trooper',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/qSHFMblMpXs' }],
    icon: '/icons/characters/tex.charui_moffgideons3.png',
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
    icon: '/icons/characters/tex.charui_greatmothers.png',
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.TARGET_START]
},
{
    lead: 'Reva',
    others: 'GI, 7S, 5B, 8B',
    notes: 'Target Droideka, hit auto',
    videos: [{ url: 'https://youtu.be/Pk9v02K5wwc' }],
    icon: '/icons/characters/tex.charui_thirdsister.png',
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
    icon: '/icons/characters/tex.charui_espalpatine_pre.png',
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
    icon: '/icons/characters/tex.charui_palpatineemperor.png',
    difficulty: difficulty.HARD,
    successRate: successRate.FIFTY_FIFTY,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'Mother Talzin',
    others: 'Merrin, Asajj, Daka, Zombie',
    notes: 'auto',
    videos: [{ url: 'https://www.youtube.com/watch?v=WNhnP7qjZgQ', creator: 'egnards' }],
    icon: '/icons/characters/tex.charui_nightsisters_talzin.png',
    difficulty: difficulty.EASY,
    successRate: successRate.NINETY_PERCENT,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'DTMG',
    leadFull: 'Dark Trooper Moff Gideon',
    others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Death Trooper',
    notes: 'auto',
    videos: [{ url: 'https://youtu.be/I6J9XHpBIrc' }],
    icon: '/icons/characters/tex.charui_moffgideons3.png',
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
    icon: '/icons/characters/tex.charui_kyloren_tros.png',
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
    icon: '/icons/characters/tex.charui_grievous.png',
    difficulty: difficulty.HARD,
    successRate: successRate.FIFTY_FIFTY,
    interactionType: [interactionType.AUTO]
},
{
    lead: 'Baylan',
    others: 'Marrok, Shin, any 2 mercs',
    notes: 'auto, Marrok Omi',
    videos: [{ url: 'https://youtu.be/IgwTIlI2T64' }],
    icon: '/icons/characters/tex.charui_baylanskoll.png',
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
    icon: '/icons/characters/tex.charui_maul.png',
    difficulty: difficulty.HARD,
    successRate: successRate.FIFTY_FIFTY,
    interactionType: [interactionType.AUTO],
},
{
    lead: 'Tarkin',
    leadFull: 'Tarkin (Clones)',
    others: 'DS Clones (Appo Omi)',
    notes: 'Auto',
    videos: [],
    icon: '/icons/characters/tex.charui_tarkinadmiral.png',
    difficulty: difficulty.VERY_EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    omi: true,
    creator: 'anonymous',
},
{
    lead: 'Pirate King Hondo',
    leadFull: 'Pirate King Hondo Onaka',
    others: 'Smee, vane, any',
    notes: 'Do not use baylan mercs on auto',
    videos: [],
    icon: '/icons/characters/tex.charui_glhondo.png',
    difficulty: difficulty.VERY_EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous',
},
];

export const topDSP1: dataType[] = [
    {
        lead: 'SLKR',
        others: 'Hux, KRU, Sith Trooper, any 5th',
        notes: 'Stun droideka first, second phase poke brute, otherwise auto',
        videos: [{ url: 'https://youtu.be/QGui7hJ4ZrQ' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START, interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, any 2 mercs',
        notes: 'auto, Marrok Omi, can get unlucky if they focus down marrok',
        videos: [{ url: 'https://youtu.be/y2_S73szIS0' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    }, {
        lead: 'Great Mothers',
        others: 'Morgan, Night Trooper, Death Trooper, Merrin',
        notes: 'Doom droideka, bless Morgan, hit auto',
        videos: [{ url: 'https://youtu.be/zjxxsvQos5Y' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 2S, 8B',
        notes: 'Target B2, hit auto',
        videos: [{ url: 'https://youtu.be/V75J-k6i40s?si=uX_YUqMZEuQr7VIN&t=145', creator: 'pico' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
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
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Trench',
        others: 'Wat, Jango, Nute, Dooku',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/Xi75-aTjxmI' }],
        icon: '/icons/characters/tex.charui_admiraltrench.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Moff Gideon, Tie Fighter Pilot',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/jbXA0XrS9Bk' }],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
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
        icon: '/icons/characters/tex.charui_lordvader.png',
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
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY
    },
    {
        lead: 'Chimera',
        others: 'Scythe, Mk6, Tie Adv, Defender, Interceptor, Sith Fighter, TIE Fighter',
        notes: 'cant auto',
        videos: [
            { url: 'https://www.youtube.com/watch?v=4skhcZSGAoQ', creator: 'kahzgul' },
        ],
        icon: '/icons/ships/tex.charui_chimaera.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    }
]
