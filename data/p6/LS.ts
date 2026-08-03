import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsShipsP6: dataType[] = [
    {
        lead: 'Profundity', gameId: 'CAPITALPROFUNDITY',
        others: 'MF, Outrider, Y Wing, Phantom, Cassian, Biggs, Bistan',
        notes: 'Video is on manual but looks autoable with Rogue One',
        videos: [{ url: 'https://youtu.be/JcmNmvY4klY?si=TfjlyK7qYDoOSkwJ', creator: 'GoBucsGo' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
]

export const genericLSP6: dataType[] = [

    {
        lead: 'JMK', gameId: 'JEDIMASTERKENOBI',
        others: 'CAT, GK, GAS, Snips',
        notes: 'Does not work on auto. Manual play 1/2 possible. The damage every 10 waves will wipe the Team.',
        videos: [],
        difficulty: difficulty.CAUTION,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    },
    {
    lead: 'Omega (Fugitive)',
    gameId: 'OMEGAS3',
    others: 'Hunter (merc), Wrecker (merc), Crosshair, Batcher',
    notes: 'Auto',
    videos: [
        { url: 'https://youtu.be/7vfe8pUY49M' },
    ],
    difficulty: difficulty.EASY,
    creator: 'Mar Trepodi',
    },
    {
    lead: 'Jedi Master Mace Windu',
    gameId: 'JEDIMASTERMACEWINDU',
    others: 'Depa Billaba, Temple Guard, Jocasta Nu, Aayla Secura',
    notes: 'Auto',
    videos: [
        { url: 'https://youtu.be/pHrl4505LTI' },
    ],
    difficulty: difficulty.EASY,
    creator: 'Mar Trepodi',
    }
]

export const cassianLSP6: dataType[] = [

{
    lead: 'JKCK (Omi)', gameId: 'JEDIKNIGHTCAL',
    others: 'Okk, Cassian, K2, Pao',
    notes: 'Full auto',
    videos: [],
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
},
{
  lead: 'Leia',
  gameId: 'GLLEIA',
  others: 'R2-D2',
  notes: 'Auto',
  videos: [
    { url: 'https://youtu.be/AZcGvhvRnPw' },
  ],
  difficulty: difficulty.EASY,
  creator: 'Mar Trepodi',
},
{
  lead: 'JKCK',
  gameId: 'JEDIKNIGHTCAL',
  others: 'oKyle Katarn',
  notes: 'Auto',
  videos: [
    { url: 'https://youtu.be/e5WnNFbiot8' },
  ],
  difficulty: difficulty.EASY,
  creator: 'Mar Trepodi',
},
{
  lead: 'Leia',
  gameId: 'GLLEIA',
  others: 'R2, Drogan, AdRad, Fulcrum',
  notes: 'Manual play: 2/2 doable. R2 stunned the Purge Troopers to control the fight.',
  videos: [],
  difficulty: difficulty.EASY,
  creator: 'Anonymous',
}
]

export const bazeLSP6: dataType[] = [

{
    lead: 'Gl leia', gameId: 'GLLEIA',
    others: 'Drogan, Srp, Baze, Chirrut',
    notes: 'Full auto',
    videos: [],
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]