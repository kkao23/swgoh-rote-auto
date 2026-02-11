import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const shipsLSP2: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'target scythe, auto',
        videos: [{ url: 'https://youtu.be/CkHBVQJmZtk' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity (R1, No MF)',
        others: 'Outrider, Y wing, Ghost, Rogue 1, Phantom',
        notes: 'target scythe, auto',
        videos: [{ url: 'https://youtu.be/dD9Eey116EY' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    }
]

export const jediLSP2: dataType[] = [
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, JKL, Kyle Katarn, Shaak Ti',
        notes: 'auto with KK omi',
        videos: [{ url: 'https://youtu.be/wom3RZrx9VQ' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra',
        others: 'Shaak, Ahsoka, Ezra exile, GK',
        notes: 'auto, long, not reliable 2/2',
        videos: [{ url: 'https://youtu.be/_0J9LtUwj4U' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, any 3 jedi',
        notes: 'auto, I had Bastila, JKA and Plo and it was close at the end. Use better jedi for more consistency',
        videos: [{ url: 'https://youtu.be/d5uJfXLjlvc' }],
        icon: '/icons/characters/tex.charui_luke_jml.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'JKL (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, Kyle Katarn, +2 (I had Bastila and JKA)',
        notes: 'deselect reticule, auto with KK omi',
        videos: [{ url: 'https://youtu.be/eggFQcIom2E' }],
        icon: '/icons/characters/tex.charui_luke_jediknight.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START],
        omi: true,
    },
    {
        lead: 'Kelleran Beq or JMMW',
        leadFull: 'Kelleran Beq or Jedi Master Mace Windu',
        others: 'Jocasta Nu, Shaak Ti, Temple Guard, Depa Billaba (omicron)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/SPL5FC0Qdcc' }],
        icon: '/icons/characters/tex.charui_kelleranbeq.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const leftLSP2: dataType[] = [
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'Rey, Paz, Beskar Mando, IG12',
        notes: 'not reliable on auto, only 1/2',
        videos: [{ url: 'https://youtu.be/W_AfGpB5RxY' }],
        icon: '/icons/characters/tex.charui_mandalorbokatan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/2epBiIcFaG0' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Han, Chewie',
        notes: 'auto, last two replaceable, can occasionally get unlucky if Leia < R8',
        videos: [{ url: 'https://youtu.be/fFO75yKREfA' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
    },
    {
        lead: 'Finn (omi)',
        others: 'Poe, Zorii, RH Finn, Rose',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/-T5DUTDHm6Y?si=enslsLffHD2qyfnW&t=381', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting reticule, need good mods on QA to get decoy out first',
        videos: [{ url: 'https://youtu.be/-4mjKaoesMs' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/5nRShbbHbAI' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GAS, Padme, CAT',
        notes: 'Deselect reticule. Need to do targeting. Target same enemy to reduce max health',
        videos: [{ url: 'https://youtu.be/IuyL502QQJo' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/i6NewbYrjqU' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const rightLSP2: dataType[] = [
    {
        lead: 'Leia',
        others: 'Drogan, R2, Baze, Capt Rex',
        notes: 'auto, last two replaceable, can occasionally get unlucky',
        videos: [{ url: 'https://youtu.be/Od4-cr8woO8' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Saw',
        others: 'Luthen, Kyle (o), Cassian, Capt Rex',
        notes: 'only 1/2 auto',
        videos: [{ url: 'https://youtu.be/jX-X3SfQGUI' }],
        icon: '/icons/characters/tex.charui_sawgerrera.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'JKCK',
        leadFull: 'JKCK (triple o)',
        others: 'Kyle (o), EE, Shaak Ti, JKA',
        notes: 'deselect reticle, full auto. had my EE at R10. Editors Note: Don\'t use JKCK here',
        videos: [],
        icon: '/icons/characters/tex.charui_calkestis.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
        creator: 'jkat70',
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +any',
        notes: 'auto, use Hera if available, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/aP8-BIqw0jk' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Padme, CAT',
        notes: 'only 1/2 on auto. Deselect reticule',
        videos: [{ url: 'https://youtu.be/pYalwvB22qo' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/AwPI5dywqAQ' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Shaak Ti, CUP',
        notes: 'auto, deselect targeting reticule, need good mods on QA to get decoy out first',
        videos: [{ url: 'https://youtu.be/k1SV2V_ODjc' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: '1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/Mnzx15JilpQ' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, auto but more consistent if you manually target wave 2',
        videos: [{ url: 'https://youtu.be/hssMBkkdQSk' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
        targeted: true
    },
    // {
    //     lead: 'GAS with QA',
    //     leadFull: 'General Anakin Skywalker with Queen Amidala',
    //     others: 'Fives, Rex, Snips/Echo',
    //     notes: 'auto, Echo is better if not platooned. Need Fives as the off tank',
    //     videos: [{ url: 'https://youtu.be/eOXu2I5QuII' }],
    //     difficulty: difficulty.EASY
    // },
]

export const zeffoUnlock: dataType[] = [
    {
        lead: 'Cere',
        others: 'JKCK',
        notes: 'Two non lead omis on Cal. The white whale of auto',
        videos: [{ url: 'https://youtu.be/Ad_cJiVLLY0' }],
        icon: '/icons/characters/tex.charui_cerejunda.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL],
        omi: true
    }
]
