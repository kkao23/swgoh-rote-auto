import os
import re

DATA_DIR = "data"
ICON_CHARS = "public/icons/characters"
ICON_SHIPS = "public/icons/ships"

# Collect available icons
char_icons = set(f for f in os.listdir(ICON_CHARS) if f.endswith(".png"))
ship_icons = set(f for f in os.listdir(ICON_SHIPS) if f.endswith(".png"))

# Files to scan
data_files = [
    "data/p1/DS.ts", "data/p1/LS.ts", "data/p1/Mixed.ts",
    "data/p2/DS.ts", "data/p2/LS.ts", "data/p2/Mixed.ts",
    "data/p3/DS.ts", "data/p3/LS.ts", "data/p3/Mixed.ts",
    "data/p4/DS.ts", "data/p4/LS.ts", "data/p4/Mixed.ts",
    "data/p5/DS.ts", "data/p5/LS.ts", "data/p5/Mixed.ts",
    "data/p6/DS.ts", "data/p6/LS.ts", "data/p6/Mixed.ts",
    "data/zeffo/LS.ts", "data/mandalore/Mixed.ts",
]

# Known ship leads (capital ships that need ship icons)
ship_leads = {
    "Executrix", "Chimaera", "Leviathan", "Profundity", "Executor",
    "Malevolence", "Negotiator", "Raddus", "Venator",
    "Mon Calamari Liberty Cruiser", "Star Destroyer",
}

# Track entries without icons
missing_icons = []

for filepath in data_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")

    in_entry = False
    entry_start = 0
    entry_lead = None
    has_icon = False
    brace_depth = 0

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Detect start of an entry object (top-level object)
        if stripped == "{" and not in_entry:
            in_entry = True
            entry_start = i + 1
            entry_lead = None
            has_icon = False
            brace_depth = 1
            continue

        if in_entry:
            brace_depth += stripped.count("{") - stripped.count("}")

            # Check for lead field
            lead_match = re.match(r"\s*lead:\s*'([^']+)'", line)
            if lead_match:
                entry_lead = lead_match.group(1)

            # Check for icon field
            if re.search(r"icon:\s*'", line) or re.search(r'icon:\s*"', line):
                has_icon = True

            # End of entry
            if brace_depth == 0:
                if entry_lead and not has_icon:
                    missing_icons.append((filepath, entry_start, entry_lead))
                in_entry = False

print(f"Found {len(missing_icons)} entries without icons:\n")
for filepath, line_num, lead in missing_icons:
    print(f"  {filepath}:{line_num}  lead='{lead}'")
