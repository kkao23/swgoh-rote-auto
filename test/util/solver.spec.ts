import { describe, it, expect } from 'vitest';
import { hungarian } from '~/util/solver';

/**
 * Brute-force solver for small matrices (n ≤ 8).
 * Verifies the Hungarian algorithm against exhaustive search.
 */
function bruteForce(cost: number[][]): { assignment: number[]; totalCost: number } {
  const n = cost.length;
  if (n === 0) return { assignment: [], totalCost: 0 };
  const m = cost[0].length;

  let bestAssign: number[] = [];
  let bestCost = Infinity;

  // Generate all ways to assign n rows to n distinct columns from m
  function permute(cols: number[], start: number) {
    if (start === n) {
      let total = 0;
      for (let i = 0; i < n; i++) {
        total += cost[i][cols[i]];
      }
      if (total < bestCost) {
        bestCost = total;
        bestAssign = [...cols];
      }
      return;
    }
    for (let j = 0; j < m; j++) {
      if (!cols.slice(0, start).includes(j)) {
        cols[start] = j;
        permute(cols, start + 1);
      }
    }
  }
  permute(new Array(n), 0);
  return { assignment: bestAssign, totalCost: bestCost };
}

describe('hungarian', () => {
  it('returns empty array for 0×0 input', () => {
    expect(hungarian([])).toEqual([]);
  });

  it('handles 1×1 matrix', () => {
    expect(hungarian([[5]])).toEqual([0]);
  });

  it('handles 1×1 with zero cost', () => {
    expect(hungarian([[0]])).toEqual([0]);
  });

  it('solves 2×2 with clear optimum', () => {
    const cost = [
      [1, 10],
      [10, 1],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    const bf = bruteForce(cost);
    expect(total).toBe(bf.totalCost);
  });

  it('solves 2×2 where optimum requires crossing', () => {
    const cost = [
      [10, 1],
      [1, 10],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    expect(total).toBe(2);
  });

  it('solves 3×3 matrix', () => {
    const cost = [
      [10, 20, 30],
      [30, 20, 10],
      [20, 10, 30],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    const bf = bruteForce(cost);
    expect(total).toBe(bf.totalCost);
    // All rows have distinct columns
    expect(new Set(assignment).size).toBe(3);
  });

  it('handles 4×4 with larger values', () => {
    const cost = [
      [90, 75, 35, 25],
      [35, 90, 75, 25],
      [25, 35, 90, 75],
      [75, 25, 35, 90],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    const bf = bruteForce(cost);
    expect(total).toBe(bf.totalCost);
  });

  it('handles rectangular n<m (more columns)', () => {
    const cost = [
      [100, 1, 10, 10],
      [10, 10, 1, 100],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    const bf = bruteForce(cost);
    expect(total).toBe(bf.totalCost);
  });

  it('solves 3×5 realistic planner scenario', () => {
    const INF = 100000;
    const cost = [
      [10, 0, INF, INF, INF],
      [INF, 0, 10, INF, INF],
      [INF, INF, INF, 0, 20],
    ];
    const assignment = hungarian(cost);
    const total = assignment.reduce((s, c, r) => s + cost[r][c], 0);
    const bf = bruteForce(cost);
    expect(total).toBe(bf.totalCost);
  });

  it('all assignments are distinct columns', () => {
    const cost = [
      [5, 2, 3, 8],
      [2, 5, 8, 3],
      [8, 3, 5, 2],
    ];
    const assignment = hungarian(cost);
    const cols = new Set(assignment);
    expect(cols.size).toBe(3);
    // All assigned cols are valid (< m)
    for (const c of assignment) {
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThan(4);
    }
  });
});
