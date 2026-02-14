import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsTopLeftP5: dataType[] = [
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Snips, GK',
        notes: '1/2 on auto, don\'t target probe droid',
        videos: [{ url: 'https://youtu.be/ofMJ0SXjdCU' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.TARGET_START],
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause auto at the beginning of wave 2. Full platoon required',
        videos: [{ url: 'https://youtu.be/BeYMQVqnVV0' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/rKrNwQrNHw4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, +1 Galactic Republic',
        notes: 'Auto, CWC Replaceable',
        videos: [{ url: 'https://youtu.be/225Hr3xBRok' }, { url: 'https://youtu.be/8YPqRLYrLZM' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/FwsUlJJgz_o' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
]

export const lsTopMidP5: dataType[] = [
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Snips, CUP',
        notes: 'auto, hope they dont kill MQG/POW',
        videos: [{ url: 'https://youtu.be/2eC85m5HXOA' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta, Depa, Aayla, Temple Guard',
        notes: 'Depa omi - full auto',
        videos: [],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true,
        creator: 'Njuta 93',
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi. Full platoon required',
        videos: [{ url: 'https://youtu.be/GbS9hvNfB3k' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2-D2, Admiral Raddus, +1',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/czbZV5oFunQ' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra, Fulcrum, +2',
        notes: '2/2 on auto, the more Spectres the better',
        videos: [{ url: 'https://youtu.be/Y3dadvLoH8o' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        others: 'GK, CAT, Snips, +1 Galactic Republic',
        notes: 'Auto, CWC Replaceable',
        videos: [{ url: 'https://youtu.be/qsX88wWIk4Y' },],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
]

export const lsBottomP5: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=5kjc-83PM2s', creator: 'avengerObs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        icon: '/icons/characters/tex.charui_bossnass.png',
        creator: 'avengerObs',
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'easy auto with Wrecker Omi, pause to target Mara at the beginning of wave 2.',
        videos: [{ url: 'https://youtu.be/OmM8S6w6l3s' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'Ahsoka Tano (randoms)',
        others: 'Ezra, random R9',
        notes: '1/2 on auto, need more Spectres to 2/2',
        videos: [{ url: 'https://youtu.be/xruQGASpTP4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano (spectres)',
        others: 'Ezra, Sabine, Hera, Fulcrum',
        notes: 'auto but need some luck on who takes the opening mass assist',
        videos: [{ url: 'https://youtu.be/Q9fG6WCUjE4' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    }
]

export const lsShipsP5: dataType[] = [
    {
        lead: 'Profundity (Rogue One)',
        others: 'MF, Outrider, Y Wing, Rogue One',
        notes: 'Keep reticule on Scythe, auto',
        videos: [{ url: 'https://youtu.be/qpNtrNGpeKI' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity (No Rogue One)',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'can\'t auto. Go after Scythe, Phantom first reinforcement',
        videos: [{ url: 'https://youtu.be/9HiGycdlf4E' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
    },
    {
        lead: 'Home One (B wing)',
        others: 'Biggs, Bistan and Ravens Claw starting, B wing, Cassian in reinforcements',
        notes: 'can\'t auto. Go after Scythe first. When Scythe uses its special to get all the stacks of formation, bring Cassian out to dispel them',
        videos: [{ url: 'https://youtu.be/QahRayHXWXk' }],
        icon: '/icons/ships/tex.charui_moncalamarilibertycruiser.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.MANUAL]
    },
]