import type { data as TeamData } from '~/models/data';
import { teamScore } from '~/util/plannerHelpers';
import { interactionBadges } from '~/util/missionHelpers';

// ── Minimal row contract (subset of PlannerResults' UnifiedRow) ──

export interface ExportRow {
  missionId: string;
  missionLabel: string;
  phase: string;
  alignment: string;
  kind: 'assigned' | 'unavailable' | 'unassigned';
  solverLead: string | null;
  solverOthers: string | null;
}

// ── Helpers duplicated here to keep the util self-contained ──

function successLabel(rate: string | undefined): string {
  switch (rate) {
    case 'consistent': return '100%';
    case 'ninety-percent': return '90%';
    case 'usually': return '70%';
    case 'fifty-fifty': return '50%';
    case 'unreliable': return 'Unreliable';
    default: return '—';
  }
}

// ── Reddit markdown table builder ───────────────────────────────

export function buildRedditTable(
  rows: ExportRow[],
  getEffectiveTeam: (row: ExportRow) => TeamData | null,
): string {
  const lines: string[] = [];
  const header = '| Mission | Planet | Team | Success | Int | Score |';
  const separator = '|---------|--------|------|---------|-----|-------|';
  lines.push(header, separator);

  for (const row of rows) {
    const mission = row.missionLabel;
    const planet = `${row.phase} ${row.alignment}`;

    let team: string;
    if (row.kind === 'unavailable') {
      team = 'N/A (No eligible team)';
    } else {
      const effective = getEffectiveTeam(row);
      if (effective) {
        const lead = effective.leadFull || effective.lead;
        team = effective.others ? `${lead} (${effective.others})` : lead;
      } else if (row.kind === 'unassigned') {
        team = 'Unassigned';
      } else {
        team = row.solverLead || '—';
      }
    }

    const effective = getEffectiveTeam(row);
    const success = effective ? successLabel(effective.successRate) : '—';

    let int: string;
    if (effective?.interactionType && effective.interactionType.length > 0) {
      const badges = interactionBadges(effective.interactionType);
      int = badges.length > 0
        ? badges.map(b => b.tooltip).join(', ')
        : 'Auto';
    } else {
      int = effective ? 'Auto' : '—';
    }

    const score = effective ? teamScore(effective) : '—';

    lines.push(`| ${mission} | ${planet} | ${team} | ${success} | ${int} | ${score} |`);
  }

  return lines.join('\n');
}

// ── Clipboard helpers ───────────────────────────────────────────

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}
