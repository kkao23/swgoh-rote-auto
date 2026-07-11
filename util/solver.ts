/**
 * Hungarian (Kuhn-Munkres) algorithm for minimum-cost assignment.
 *
 * Solves: given an n×m cost matrix (n ≤ m), assign each of the n rows
 * to a distinct column so that total cost is minimized.
 *
 * O(size³) where size = max(n, m).
 */

const INF = 1e9;

/**
 * Run Hungarian on an n×m matrix. Returns an array `assignment` of length n
 * where `assignment[i] = j` means row i is assigned to column j.
 * Columns beyond `m-1` in the padded square are dummies; they are
 * reported as -1.
 */
export function hungarian(cost: number[][]): number[] {
  const n = cost.length;
  if (n === 0) return [];
  const m = cost[0].length;
  if (m === 0) return new Array(n).fill(-1);

  const size = Math.max(n, m);

  // Build a square matrix (size × size), padding with zeros.
  const a: number[][] = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) =>
      i < n && j < m ? Math.max(-INF, Math.min(INF, cost[i][j])) : 0,
    ),
  );

  const u: number[] = new Array(size + 1).fill(0);
  const v: number[] = new Array(size + 1).fill(0);
  const p: number[] = new Array(size + 1).fill(0);
  const way: number[] = new Array(size + 1).fill(0);

  for (let i = 1; i <= size; i++) {
    p[0] = i;
    let j0 = 0;
    const minv: number[] = new Array(size + 1).fill(INF);
    const used: boolean[] = new Array(size + 1).fill(false);

    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF;
      let j1 = 0;

      for (let j = 1; j <= size; j++) {
        if (!used[j]) {
          const cur = a[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j]) {
            minv[j] = cur;
            way[j] = j0;
          }
          if (minv[j] < delta) {
            delta = minv[j];
            j1 = j;
          }
        }
      }

      for (let j = 0; j <= size; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }

      j0 = j1;
    } while (p[j0] !== 0);

    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }

  // Extract assignment for real rows only.
  const assignment: number[] = new Array(n).fill(-1);
  for (let j = 1; j <= size; j++) {
    const row = p[j];
    if (row > 0 && row <= n && j - 1 < m) {
      assignment[row - 1] = j - 1;
    }
  }

  return assignment;
}
