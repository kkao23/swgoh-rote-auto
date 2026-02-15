export const guaranteedIncome = {
  loginCalendarMonthly: 380,
  galacticBountiesMonthly: 200,
  dailiesDaily: 80,
  galacticWarDaily: 25,
}

export const fleetRankOptions = [
  { label: 'Rank 1', value: '1', crystals: 400 },
  { label: 'Rank 2', value: '2', crystals: 375 },
  { label: 'Rank 3', value: '3', crystals: 350 },
  { label: 'Rank 4', value: '4', crystals: 325 },
  { label: 'Rank 5', value: '5', crystals: 300 },
  { label: 'Rank 6-10', value: '6-10', crystals: 200 },
  { label: 'Rank 11-20', value: '11-20', crystals: 100 },
  { label: 'Rank 21-50', value: '21-50', crystals: 50 },
  { label: 'Rank 51+', value: '51+', crystals: 0 },
]

export const GAC_ROUNDS_PER_YEAR = 13
export const GAC_WINS_PER_ROUND = 4.5
export const GAC_LOSSES_PER_ROUND = 4.5

export const gacDivisionOptions = [
  { label: 'Kyber 1', value: 'kyber-1', daily: 260, victory: 900, defeat: 200, championship: 2135 },
  { label: 'Kyber 2', value: 'kyber-2', daily: 240, victory: 825, defeat: 200, championship: 2050 },
  { label: 'Kyber 3', value: 'kyber-3', daily: 220, victory: 750, defeat: 200, championship: 1970 },
  { label: 'Kyber 4', value: 'kyber-4', daily: 200, victory: 675, defeat: 200, championship: 1895 },
  { label: 'Kyber 5', value: 'kyber-5', daily: 180, victory: 600, defeat: 200, championship: 1820 },
  { label: 'Aurodium 1', value: 'aurodium-1', daily: 170, victory: 550, defeat: 150, championship: 1590 },
  { label: 'Aurodium 2', value: 'aurodium-2', daily: 160, victory: 510, defeat: 150, championship: 1515 },
  { label: 'Aurodium 3', value: 'aurodium-3', daily: 150, victory: 470, defeat: 150, championship: 1445 },
  { label: 'Aurodium 4', value: 'aurodium-4', daily: 140, victory: 430, defeat: 150, championship: 1375 },
  { label: 'Aurodium 5', value: 'aurodium-5', daily: 130, victory: 390, defeat: 150, championship: 1310 },
  { label: 'Chromium 1', value: 'chromium-1', daily: 125, victory: 350, defeat: 80, championship: 1080 },
  { label: 'Chromium 2', value: 'chromium-2', daily: 120, victory: 320, defeat: 80, championship: 1005 },
  { label: 'Chromium 3', value: 'chromium-3', daily: 115, victory: 290, defeat: 80, championship: 935 },
  { label: 'Chromium 4', value: 'chromium-4', daily: 110, victory: 260, defeat: 80, championship: 870 },
  { label: 'Chromium 5', value: 'chromium-5', daily: 105, victory: 230, defeat: 80, championship: 805 },
  { label: 'Bronzium 1', value: 'bronzium-1', daily: 100, victory: 200, defeat: 50, championship: 670 },
  { label: 'Bronzium 2', value: 'bronzium-2', daily: 95, victory: 180, defeat: 50, championship: 630 },
  { label: 'Bronzium 3', value: 'bronzium-3', daily: 90, victory: 160, defeat: 50, championship: 595 },
  { label: 'Bronzium 4', value: 'bronzium-4', daily: 85, victory: 140, defeat: 50, championship: 560 },
  { label: 'Bronzium 5', value: 'bronzium-5', daily: 80, victory: 120, defeat: 50, championship: 530 },
  { label: 'Carbonite 1', value: 'carbonite-1', daily: 75, victory: 110, defeat: 30, championship: 290 },
  { label: 'Carbonite 2', value: 'carbonite-2', daily: 70, victory: 100, defeat: 30, championship: 225 },
  { label: 'Carbonite 3', value: 'carbonite-3', daily: 65, victory: 90, defeat: 30, championship: 170 },
  { label: 'Carbonite 4', value: 'carbonite-4', daily: 60, victory: 80, defeat: 30, championship: 130 },
  { label: 'Carbonite 5', value: 'carbonite-5', daily: 55, victory: 70, defeat: 30, championship: 100 },
  { label: "I Don't Play GAC", value: 'no-gac', daily: 55, victory: 30, defeat: 30, championship: 100 },
]

export const TB_RUNS_PER_YEAR = 26

export const tbTypeOptions = [
  { label: 'Hoth', value: 'hoth' },
  { label: 'Geonosis', value: 'geonosis' },
  { label: 'Rise of the Empire', value: 'rote' },
]

export const maxStarsByTbType: Record<string, number> = {
  hoth: 45,
  geonosis: 33,
  rote: 56,
}

export const tbPayoutByType: Record<string, Record<number, number>> = {
  hoth: {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
    11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
    20: 50, 21: 50, 22: 50, 23: 50, 24: 50,
    25: 100, 26: 100, 27: 100,
    28: 125, 29: 125,
    30: 150, 31: 150, 32: 150,
    33: 175, 34: 175,
    35: 200, 36: 200, 37: 200,
    38: 225,
    39: 250,
    40: 300,
    41: 350,
    42: 400,
    43: 450,
    44: 500,
    45: 550,
  },
  geonosis: {
    1: 100, 2: 100,
    3: 150, 4: 150, 5: 150,
    6: 200, 7: 200,
    8: 250, 9: 250, 10: 250,
    11: 300, 12: 300,
    13: 375, 14: 375, 15: 375,
    16: 450, 17: 450,
    18: 525, 19: 525, 20: 525,
    21: 600, 22: 600,
    23: 675, 24: 675,
    25: 750, 26: 750, 27: 750,
    28: 825, 29: 825, 30: 825,
    31: 900, 32: 900, 33: 900,
  },
  rote: {
    1: 250, 2: 275, 3: 300, 4: 325, 5: 350, 6: 375, 7: 400, 8: 425, 9: 450, 10: 475,
    11: 500, 12: 525, 13: 550, 14: 575, 15: 600, 16: 625, 17: 650, 18: 675, 19: 700, 20: 725,
    21: 750, 22: 775, 23: 800, 24: 825, 25: 850, 26: 875, 27: 900, 28: 925, 29: 950, 30: 975,
    31: 1000, 32: 1025, 33: 1050, 34: 1075, 35: 1100, 36: 1125, 37: 1150, 38: 1175, 39: 1200, 40: 1225,
    41: 1250, 42: 1275, 43: 1300, 44: 1325, 45: 1350, 46: 1375, 47: 1400, 48: 1425, 49: 1450, 50: 1475,
    51: 1500, 52: 1525, 53: 1550, 54: 1575, 55: 1600, 56: 1675,
  },
}

export const perideaTierOptions = [
  { label: 'Tier 3 or below', value: 't3', monthlyCrystals: 0 },
  { label: 'Tier 4 [Relic 5]', value: 't4', monthlyCrystals: 100 },
  { label: 'Tier 5 [Relic 7]', value: 't5', monthlyCrystals: 200 },
  { label: 'Tier 6 [Relic 9]', value: 't6', monthlyCrystals: 300 },
]
