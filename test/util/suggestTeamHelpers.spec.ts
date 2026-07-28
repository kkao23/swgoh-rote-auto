import { describe, it, expect } from 'vitest';
import {
  buildLeadToGameId,
  matchGameId,
  fuzzyMatchPosition,
  checkDuplicateLead,
} from '~/util/suggestTeamHelpers';

// ── Minimal test data ────────────────────────────────────────────

const SAMPLE_LEADS = [
  { id: 'supremeleaderkyloren', fullName: 'Supreme Leader Kylo Ren', aliases: ['SLKR'] },
  { id: 'lordvader', fullName: 'Lord Vader', aliases: ['LV'] },
  { id: 'glleia', fullName: 'Leia Organa', aliases: ['Leia'] },
];

const SAMPLE_DATA = {
  phase1: {
    ds: {
      left: [
        { lead: 'SLKR', others: 'DRey', notes: '', videos: [], difficulty: 1 },
        { lead: 'SEE', others: 'Wat', notes: '', videos: [], difficulty: 1 },
      ],
      ships: [
        { lead: 'Executor', others: 'RC, XB', notes: '', videos: [], difficulty: 1 },
      ],
    },
    ls: {
      generic: [
        { lead: 'JMK', others: 'CAT', notes: '', videos: [], difficulty: 1 },
      ],
    },
    mixed: {
      jabba: [
        { lead: 'Jabba', others: 'Boushh', notes: '', videos: [], difficulty: 1 },
      ],
    },
  },
  phase3: {
    zeffo: {
      jedi: [
        { lead: 'JML', others: 'JKL, Revan', notes: '', videos: [], difficulty: 1 },
      ],
    },
  },
} as any;

// ── buildLeadToGameId ─────────────────────────────────────────────

describe('buildLeadToGameId', () => {
  const lookup = buildLeadToGameId(SAMPLE_LEADS);

  it('maps fullName to uppercase gameId', () => {
    expect(lookup.get('supreme leader kylo ren')).toBe('SUPREMELEADERKYLOREN');
    expect(lookup.get('lord vader')).toBe('LORDVADER');
    expect(lookup.get('leia organa')).toBe('GLLEIA');
  });

  it('maps id to uppercase gameId', () => {
    expect(lookup.get('supremeleaderkyloren')).toBe('SUPREMELEADERKYLOREN');
    expect(lookup.get('lordvader')).toBe('LORDVADER');
    expect(lookup.get('glleia')).toBe('GLLEIA');
  });

  it('maps aliases to uppercase gameId', () => {
    expect(lookup.get('slkr')).toBe('SUPREMELEADERKYLOREN');
    expect(lookup.get('lv')).toBe('LORDVADER');
    expect(lookup.get('leia')).toBe('GLLEIA');
  });
});

// ── matchGameId ───────────────────────────────────────────────────

describe('matchGameId', () => {
  const lookup = buildLeadToGameId(SAMPLE_LEADS);

  it('matches fullName (case insensitive)', () => {
    expect(matchGameId(lookup, 'Lord Vader')).toBe('LORDVADER');
    expect(matchGameId(lookup, 'lord vader')).toBe('LORDVADER');
  });

  it('matches alias', () => {
    expect(matchGameId(lookup, 'SLKR')).toBe('SUPREMELEADERKYLOREN');
    expect(matchGameId(lookup, 'slkr')).toBe('SUPREMELEADERKYLOREN');
  });

  it('matches id', () => {
    expect(matchGameId(lookup, 'glleia')).toBe('GLLEIA');
  });

  it('trims whitespace', () => {
    expect(matchGameId(lookup, '  Lord Vader  ')).toBe('LORDVADER');
  });

  it('returns undefined for unknown leads', () => {
    expect(matchGameId(lookup, 'Some Unknown Lead')).toBeUndefined();
    expect(matchGameId(lookup, '')).toBeUndefined();
  });
});

// ── fuzzyMatchPosition ────────────────────────────────────────────

describe('fuzzyMatchPosition', () => {
  it('matches exact (case insensitive)', () => {
    expect(fuzzyMatchPosition('jedi', 'jedi')).toBe(true);
    expect(fuzzyMatchPosition('Jedi', 'jedi')).toBe(true);
    expect(fuzzyMatchPosition('JEDI', 'jedi')).toBe(true);
  });

  it('matches when user input contains the data key', () => {
    expect(fuzzyMatchPosition('jediP1', 'jedi')).toBe(true);
    expect(fuzzyMatchPosition('Top Left', 'left')).toBe(true);
  });

  it('matches when data key contains the user input', () => {
    expect(fuzzyMatchPosition('jedi', 'jediP4')).toBe(true);
    expect(fuzzyMatchPosition('left', 'leftLSP2')).toBe(true);
  });

  it('strips non-alphanumeric characters', () => {
    expect(fuzzyMatchPosition('Top Left', 'topleft')).toBe(true);
    expect(fuzzyMatchPosition('Mid-Right', 'midright')).toBe(true);
  });

  it('returns false for no match', () => {
    expect(fuzzyMatchPosition('jedi', 'ships')).toBe(false);
    expect(fuzzyMatchPosition('left', 'right')).toBe(false);
    expect(fuzzyMatchPosition('', 'jedi')).toBe(false);
    expect(fuzzyMatchPosition('jedi', '')).toBe(false);
  });
});

// ── checkDuplicateLead ────────────────────────────────────────────

describe('checkDuplicateLead', () => {
  it('returns true when lead exists for same phase/alignment/position', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'DS', 'left', 'SLKR')).toBe(true);
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'DS', 'Left', 'slkr')).toBe(true);
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'LS', 'generic', 'JMK')).toBe(true);
  });

  it('returns false when lead does not exist for that position', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'DS', 'left', 'Rey')).toBe(false);
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'LS', 'generic', 'SLKR')).toBe(false);
  });

  it('returns false when position does not match', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'DS', 'ships', 'SLKR')).toBe(false);
  });

  it('returns false for unknown phase', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'P9', 'DS', 'left', 'SLKR')).toBe(false);
  });

  it('handles Zeffo/Mandalore sub-phases', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'Zeffo', 'Special', 'jedi', 'JML')).toBe(true);
    expect(checkDuplicateLead(SAMPLE_DATA, 'Zeffo', 'Special', 'jedi', 'Rey')).toBe(false);
  });

  it('matches fuzzy positions (Top Left → left)', () => {
    expect(checkDuplicateLead(SAMPLE_DATA, 'P1', 'DS', 'Top Left Mission', 'SLKR')).toBe(true);
  });
});
