import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsShipsP4: dataType[] = [
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'auto, Dont use Ghost if required in Mixed',
        videos: [{ url: 'https://youtu.be/-AZjA6D9sK4' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Negotiator',
        others: 'JKA, Y Wing, Marauder, Plo, Ahsoka, Fives, Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/D30RG8s3HDQ' }],
        icon: '/icons/ships/tex.charui_negotiator.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Poe XWing, Res Bomber, Comeuppance, Res X Wing',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/drEhB7NLcZU' }],
        icon: '/icons/ships/tex.charui_raddus.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Home One (MF)',
        others: 'MF, Y Wing, Ravens Claw, Outrider, Phantom, Ghost, Cassian',
        notes: 'auto, Dont use Ghost if required in Mixed',
        videos: [{ url: 'https://youtu.be/67erqo3zyvA' }],
        icon: '/icons/ships/tex.charui_moncalamarilibertycruiser.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Home One (B wing)',
        others: 'Biggs, Bistan and Ravens Claw starting, B wing, Cassian and Wedge in reinforcements',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/0PAH1s4Umfs' }],
        icon: '/icons/ships/tex.charui_moncalamarilibertycruiser.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
]

export const lsGenericP4: dataType[] = [
    {
        lead: 'Leia',
        others: 'Han, Cassian, Raddus, R2-D2',
        notes: 'auto, Drogan if you have him',
        videos: [{ url: 'https://youtu.be/C6F4fIWlP-I' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Yoda, Padme',
        notes: 'auto, other two can be any GR',
        videos: [{ url: 'https://youtu.be/6YzDrnBGFvw' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Padme, Snips, GK, CAT',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/qPc-UJDjAt0' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'Tarpals omi, auto',
        videos: [{ url: 'https://youtu.be/xCacWaNrwto' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Any',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nNTovvlMApI' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/kjYZ24h5fok' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'GAS with QA',
        leadFull: 'General Anakin Skywalker with Queen Amidala',
        others: 'POW, MQG, Snips',
        notes: 'auto, faster than QA herself',
        videos: [{ url: 'https://youtu.be/B6E6XdAYfNQ' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Kelleran Beq or JMMW',
        leadFull: 'Kelleran Beq or Jedi Master Master Windu',
        others: 'Jocasta Nu, Shaak Ti, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, dont need platoons, very fast',
        videos: [{ url: 'https://youtu.be/wRYwjDu3F5Y' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const jediLSP4: dataType[] = [
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra Exile',
        others: 'GAS, Ahsoka, Ezra Exile, GK',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nVtmzJh4xlk0' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, GAS, GMY, Plo',
        notes: 'auto, replace Plo if possible',
        videos: [{ url: 'https://youtu.be/OcVbpC8FHmE' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK (no Ezra, no bros)',
        leadFull: 'Jedi Master Kenobi without Ezra Exile or POW/MQJ',
        others: 'GAS, Ahsoka, GK, Plo',
        notes: 'auto, only 1/2',
        videos: [{ url: 'https://youtu.be/nzJ8oUrygqc' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (bros, no Ezra)',
        leadFull: 'Jedi Master Luke without Ezra Exile with POW/MQJ',
        others: 'GAS, GMY, POW, MQG',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/5tJavs7rly4' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK (bros, no Ezra)',
        leadFull: 'Jedi Master Kenobi without Ezra Exile with POW/MQJ',
        others: 'GAS, GK, POW, MQG',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/9ZKHdxBljyc' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (KK Omi)',
        leadFull: 'Jedi Master Luke with Kyle Katarn Omi',
        others: 'Kyle Katarn (omi), GAS, GMY, GK',
        notes: 'auto, GMY and GK are likely replaceable',
        videos: [{ url: 'https://www.youtube.com/watch?v=7N2-JbEer7k', creator: 'avengerObs' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Kelleran Beq or JMMW',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Aayla, Temple Guard',
        notes: 'auto, all platoons required, Temple Guard required, 100% consistent with Mace lead',
        videos: [{ url: 'https://youtu.be/A5hzdGVrBlY' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Kelleran Beq or JMMW',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, dont need platoons, very fast',
        videos: [{ url: 'https://youtu.be/vH6YIiUsXQ4' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]