import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsLeftP3: dataType[] = [
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'auto, not consistent 2/2',
        videos: [{ url: 'https://youtu.be/DiSqzfNlNww' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JKCK (Omis)',
        leadFull: 'Jedi Knight Cal Kestis',
        others: 'Kyle Katarn, +3 Jedi',
        notes: 'auto, omis on JKCK lead and Kyle Katarn',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        icon: '/icons/characters/tex.charui_calkestis.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Boss Nass',
        others: 'Other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/TY97HzhePAg?si=zo9rbCRZ-_JOfg8N&t=231', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, Han, Chewie',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/gC6v0taN3Jw' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for somewher else',
        videos: [{ url: 'https://youtu.be/SWi--w5QKws' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Shaak Ti, CUP',
        notes: 'auto, deselect targeting reticule',
        videos: [{ url: 'https://youtu.be/rUBUeI9eQQA' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
    },
    {
        lead: 'GAS with QA',
        leadFull: 'General Anakin Skywalker with Queen Amidala',
        others: 'Rex, Echo, Fives',
        notes: 'auto, but currently theres a bug that makes Fives taunt',
        videos: [{ url: 'https://youtu.be/DctCHNqsOEg' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Omega (omicron)',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/YR4PCMzh0QI' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Temple Guard, Depa Billaba (omicron)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ez1HYwJ8aZY' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const lsRightP3: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan +2',
        notes: 'auto, focus mara wave 2',
        videos: [{ url: 'https://youtu.be/xrl2EVOFLxQ' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +1',
        notes: 'auto, use Ezra and Hera if available',
        videos: [{ url: 'https://youtu.be/3T8M7wuyTuI' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'auto, Tarpals Omi',
        videos: [{ url: 'https://youtu.be/fO_7TdAxH6U' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting, target mara in wave 2, not totally consistent',
        videos: [{ url: 'https://youtu.be/YmLMvgbqW3U' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START, interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'only 1/2 on auto. would need to save force leap for mara in wave 2',
        videos: [{ url: 'https://youtu.be/F1CGB8sTCA4' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO, interactionType.PAUSE_WAVE2]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory. Target Mara wave 2',
        videos: [{ url: 'https://youtu.be/6LCLkhSg5AY' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2]
    },
    {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: '1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/8nRobwqifro' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (omicron)',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/foOES5g8prg' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO, interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'JMMW',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta Nu, Kelleran Beq, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, may want to focus down mara wave 2',
        videos: [{ url: 'https://youtu.be/OKNAs62Omco' }],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO, interactionType.PAUSE_WAVE2],
        omi: true
    },
    //     lead: 'GAS with QA',
    //     leadFull: 'General Anakin Skywalker with Queen Amidala',
    //     others: 'Rex, Echo, Fives',
    //     notes: 'auto, but target Mara then Purge troopers wave 2',
    //     videos: [{ url: 'https://youtu.be/DWqpQlVv0rA' }],
    //     difficulty: difficulty.EASY
    // },
]

export const sawP3: dataType[] = [
    {
        lead: 'Saw (Drogan)',
        leadFull: 'Saw with Drogan',
        others: 'Capt Rex, Luthen, Cassian, Drogan',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/K4HObnZm0TU' }],
        icon: '/icons/characters/tex.charui_sawgerrera.png',
        difficulty: difficulty.HARD,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Saw (Kyle)',
        leadFull: 'Saw with Kyle Katarn',
        others: 'Capt Rex, Luthen, Cassian, Kyle (o)',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/FCEEsGXMtOA' }],
        icon: '/icons/characters/tex.charui_sawgerrera.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
        omi: true
    }
]

export const wookies: dataType[] = [
    {
        lead: 'Tarfull',
        others: 'Chewbacca, Chewpio, Zaalbaar, Clone Wars Chewie',
        notes: 'Pico has them all R8, not sure if possible at R7. Looked safe though',
        videos: [{url: 'https://youtu.be/TY97HzhePAg?si=ewaYO47t0fspuZwl&t=463', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_tarfful.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
    }
]

export const shipsLSP3: dataType[] = [
        {
        lead: 'Profundity (no MF, Rogue One)',
        others: 'Outrider, Y wing, Ghost, Rogue One, Biggs, Phantom, Wedge',
        notes: 'If you have to platoon MF. Targeted auto. Keep reticule on Scythe. Biggs should be 2nd reinforcement',
        videos: [{ url: 'https://youtu.be/mpUiTI-GfP0' }],
        icon: '/icons/ships/tex.charui_rogueoneship.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity (no MF)',
        others: 'Outrider, Y wing, Ghost, Phantom, Cassian, Biggs, Wedge',
        notes: 'If you have to platoon MF. target scythe, basic to Outrider, built ult. not 100% consistent',
        videos: [{ url: 'https://youtu.be/El32c9zggjA' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.TARGET_START]
    }
]