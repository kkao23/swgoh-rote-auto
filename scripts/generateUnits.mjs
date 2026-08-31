// Generates data/units.ts from data/swgohgg/characters.json + ships.json.
// Run: node scripts/generateUnits.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const characters = JSON.parse(fs.readFileSync(path.join(root, 'data/swgohgg/characters.json'), 'utf8'));
const ships = JSON.parse(fs.readFileSync(path.join(root, 'data/swgohgg/ships.json'), 'utf8'));

/** Build one UnitDef from a swgoh.gg API entry. */
function buildUnit(entry, type) {
  const iconFile = (entry.image || '').split('/').pop();
  const iconDir = type === 'ship' ? 'ships' : 'characters';

  let icon = '';
  if (iconFile) {
    const localPath = `/icons/${iconDir}/${iconFile}`;
    if (fs.existsSync(path.join(root, 'public', 'icons', iconDir, iconFile))) {
      icon = localPath;
    } else {
      // Fall back to the swgoh.gg CDN for units without a local asset.
      console.warn(`[generateUnits] missing local icon, using CDN: ${iconFile} (${entry.base_id})`);
      icon = `https://game-assets.swgoh.gg/textures/${iconFile}`;
    }
  }

  return {
    id: entry.base_id.toLowerCase(),
    name: entry.name,
    icon,
    type,
    categories: entry.categories ?? [],
    alignment: entry.alignment ?? null,
    role: entry.role ?? null,
    capitalShip: type === 'ship' ? Boolean(entry.capital_ship) : false,
  };
}

const units = [
  ...characters.map(entry => buildUnit(entry, 'character')),
  ...ships.map(entry => buildUnit(entry, 'ship')),
].sort((a, b) => a.id.localeCompare(b.id));

const lines = [];
lines.push('// ────────────────────────────────────────────────────────────────────');
lines.push('// GENERATED FILE — do not edit by hand.');
lines.push('// Source: data/swgohgg/characters.json + data/swgohgg/ships.json');
lines.push('// Regenerate with: node scripts/generateUnits.mjs');
lines.push('// ────────────────────────────────────────────────────────────────────');
lines.push('');
lines.push('export interface UnitDef {');
lines.push('  /** Lowercase SWGOH base id (gameId). */');
lines.push('  id: string;');
lines.push('  /** Canonical display name from swgoh.gg. */');
lines.push('  name: string;');
lines.push('  /** Local icon path, e.g. /icons/characters/tex.charui_bazemalbus.png */');
lines.push('  icon: string;');
lines.push("  type: 'character' | 'ship';");
lines.push('  categories: string[];');
lines.push('  alignment: string | null;');
lines.push('  role: string | null;');
lines.push('  capitalShip: boolean;');
lines.push('}');
lines.push('');
lines.push('export const UNITS: UnitDef[] = [');

for (const u of units) {
  const cat = u.categories.length
    ? `[${u.categories.map(c => JSON.stringify(c)).join(', ')}]`
    : '[]';
  lines.push(`  { id: ${JSON.stringify(u.id)}, name: ${JSON.stringify(u.name)}, icon: ${JSON.stringify(u.icon)}, type: ${JSON.stringify(u.type)}, categories: ${cat}, alignment: ${u.alignment === null ? 'null' : JSON.stringify(u.alignment)}, role: ${u.role === null ? 'null' : JSON.stringify(u.role)}, capitalShip: ${u.capitalShip} },`);
}

lines.push('];');
lines.push('');
lines.push('const UNIT_BY_ID = new Map(UNITS.map(u => [u.id, u]));');
lines.push('');
lines.push('/** Look up a unit by lowercase gameId/base id. */');
lines.push('export function getUnit(id: string | undefined | null): UnitDef | undefined {');
lines.push('  if (!id) return undefined;');
lines.push('  return UNIT_BY_ID.get(id.split(\',\')[0].trim().toLowerCase());');
lines.push('}');
lines.push('');
lines.push('/** Canonical display name for a gameId, if known. */');
lines.push('export function getUnitName(id: string | undefined | null): string | undefined {');
lines.push('  return getUnit(id)?.name;');
lines.push('}');
lines.push('');
lines.push('/** Local icon path for a gameId, if known. */');
lines.push('export function getUnitIcon(id: string | undefined | null): string | undefined {');
lines.push('  return getUnit(id)?.icon;');
lines.push('}');
lines.push('');

const outPath = path.join(root, 'data/units.ts');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`[generateUnits] wrote ${units.length} units (${characters.length} characters, ${ships.length} ships) to data/units.ts`);
