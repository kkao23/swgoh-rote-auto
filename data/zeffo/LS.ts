import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const clonesSM: dataType[] = [
    {
        lead: 'Rex',
        others: 'Capt Rex, Echo, Arc Trooper, Fives',
        notes: 'Auto, unselect reticule, Reticule on Consular in P2 to make it a bit safer, the woman\'s counterattacks hurt',
        videos: [{ url: 'https://youtu.be/SvUzVopG8a4' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
    }
]

export const zeffoFleets: dataType[] = [
    {
        lead: 'Negotiator',
        others: 'JKA, Marauder, Y wing, Ahsoka, Fives, Rex',
        notes: 'Auto',
        videos: [{ url: 'https://youtu.be/h4nS7Flp4Zk' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
]

export const zeffoJedi: dataType[] = [
    {
        lead: 'JKCK (JMK Ezra)',
        others: 'JMK, Jedi Knight Luke, Ezra Exile, Kyle',
        notes: 'Omi Kyle, auto',
        videos: [{ url: 'https://youtu.be/bBgHB0q5hmo' }],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'JKCK (GLAT)',
        others: 'GLAT, Sabine, Hera, Huyang',
        notes: 'Use ezra if possible, auto',
        videos: [{ url: 'https://youtu.be/V_u2XK-W8mA' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JKCK (JML Ezra)',
        others: 'JML, Ezra Exile, JKL, Shaak',
        notes: 'auto, target purge trooper wave 1 then 2S wave 2',
        videos: [{ url: 'https://youtu.be/LqJsWBb5S88' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START, interactionType.PAUSE_WAVE2],
        targeted: true
    },
    {
        lead: 'JKCK (Rey Ezra)',
        others: 'Rey, Ezra Exile, JKL, Kyle (omi)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/ixnkyhqL5G0' }],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    // {
    //     lead: 'JKCK (Lead Omi, JML)',
    //     others: 'JML, JKL, GMY, Shaak Ti',
    //     notes: 'auto, lead omi mandatory',
    //     videos: [{ url: 'https://www.youtube.com/watch?v=rhEhxaGzODI', creator: 'avengerObs' }],
    //     difficulty: difficulty.VERY_EASY,
    //     successRate: successRate.CONSISTENT,
    //     interactionType: [interactionType.AUTO],
    //     omi: true
    // },
]

export const zeffoUFU: dataType[] = [
    {
        lead: 'Rey',
        others: 'CAT, Ben, Cere, JTR',
        notes: 'auto, CAT mandatory, maybe like 70% success rate on full auto, higher if you target purge troopers',
        videos: [{ url: 'https://youtu.be/LQbMxA3Oqcs' },],
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Ahsoka Tano (No CAT)',
        others: 'Cere, Padawan Sabine, Fulcrum +1',
        notes: 'auto, only 1/2. Need CAT for 2/2',
        videos: [{ url: 'https://youtu.be/H4xzXPPNV8Y' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano (CAT)',
        others: 'Cere, Padawan Sabine, Fulcrum, CAT',
        notes: 'auto, target purge trooper in wave 1',
        videos: [{ url: 'https://youtu.be/jTJg8brbeS4' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
]

export const zeffoCombat: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpals omi)',
        notes: 'auto, target humanoids first',
        videos: [{ url: 'https://youtu.be/zR1ZBzkfELU' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
        omi: true,
    },
    {
        lead: 'Ahsoka Tano',
        others: 'other spectre',
        notes: 'auto, takes forever, can save Ezra for another mission. Need to take out others before big bot in wave 1',
        videos: [{ url: 'https://youtu.be/TTKvDyv3L1s' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'JKL (JML)',
        leadFull: 'Jedi Knight Luke with Jedi Master Luke',
        others: 'GMY, JKA, Shaak ti',
        notes: 'zero speed on JKL. full auto but target humanoids, then side bots round 1. round 2 full auto',
        videos: [{ url: 'https://youtu.be/g42DEv89flA' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Omega (omi)',
        others: 'Bad Batch Mercenaries',
        notes: 'auto but dont mark the big bot in wave 1',
        videos: [{url: 'https://youtu.be/6kIPMiz3jKE'}],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, Han, Chewie',
        notes: 'cant auto, try to spread stuns around',
        videos: [{ url: 'https://youtu.be/kDauBN0BZ0Y' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.MANUAL]
    },
]