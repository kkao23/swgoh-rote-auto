import os
import re

LEAD_ICON_MAP: dict[str, str] = {
    "PKHO": "glhondo",
    "GM": "greatmothers",
    "CLS": "luke_ep4",
    "BKM": "mandalorbokatan",
    "JMMW": "jedimastermacewindu",
    "Glat": "ahsokatanogray",
    "JMLS": "luke_jml",
    "oFinn": "finn",
    "Grand Inquisitor": "grandinquisitor",
    "Admiral Trench": "admiraltrench",
    "Satele Shan": "sateleshan",
    "Rey": "rey_tros",
    "Rey (GL)": "rey_tros",
    "Maul": "maul",
    "Palpatine": "palpatineemperor",
    "Emperor Palpatine": "palpatineemperor",
    "Emp Palpatine": "palpatineemperor",
    "Captain Enoch": "captainenoch",
    "Jedi Master Mace Windu": "jedimastermacewindu",
    "Jedi master Luke": "luke_jml",
    "Jedi Master Kenobi": "globiwan",
    "Cassian (Undercover)": "cassian",
    "Finn (o)": "finn",
    "Jedi Knight Cal Kestis": "jediknightcal",
    "Great Mothers": "greatmothers",
    "Aphra": "doctoraphra",
    "Dr. Aphra": "doctoraphra",
    "Dr Aphra": "doctoraphra",
    "Doctor Aphra": "doctoraphra",
    "The Stranger": "stranger",
    "Zuckuss": "zuckuss",
    "General Syndulla": "generalsyndulla",
    "Lord Vader": "lordvader",
    "Dark Trooper Moff Gideon": "moffgideons3",
    "Boss Nass": "bossnass",
    "Ahsoka Tano": "ahsokatanogray",
    "Maz": "mazkanata",
    "Padmé Amidala": "padme_geonosis",
    "Padm\u00e9 Amidala": "padme_geonosis",
    "Executrix": "stardestroyer",
    "Home one": "moncalamarilibertycruiser",
}

SHIP_LEADS = {"Executrix", "Home one"}

ICON_CHARS = "public/icons/characters"
ICON_SHIPS = "public/icons/ships"
char_icons = set(f for f in os.listdir(ICON_CHARS) if f.endswith(".png"))
ship_icons = set(f for f in os.listdir(ICON_SHIPS) if f.endswith(".png"))


def resolve_icon_path(lead: str) -> str | None:
    icon_key = LEAD_ICON_MAP.get(lead)
    if not icon_key:
        return None
    filename = f"tex.charui_{icon_key}.png"
    if lead in SHIP_LEADS and filename in ship_icons:
        return f"/icons/ships/{filename}"
    if filename in char_icons:
        return f"/icons/characters/{filename}"
    if filename in ship_icons:
        return f"/icons/ships/{filename}"
    return None


data_files = [
    "data/p1/DS.ts", "data/p1/LS.ts", "data/p1/Mixed.ts",
    "data/p2/DS.ts", "data/p2/LS.ts", "data/p2/Mixed.ts",
    "data/p3/DS.ts", "data/p3/LS.ts", "data/p3/Mixed.ts",
    "data/p4/DS.ts", "data/p4/LS.ts", "data/p4/Mixed.ts",
    "data/p5/DS.ts", "data/p5/LS.ts", "data/p5/Mixed.ts",
    "data/p6/DS.ts", "data/p6/LS.ts", "data/p6/Mixed.ts",
    "data/zeffo/LS.ts", "data/mandalore/Mixed.ts",
]

total_fixed = 0

for filepath in data_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    fixed_in_file = 0

    for lead_name in list(LEAD_ICON_MAP.keys()):
        icon_path = resolve_icon_path(lead_name)
        if not icon_path:
            continue

        # Escape the lead name for regex
        escaped_lead = re.escape(lead_name)

        # Pattern: find `lead: 'XXX',` then scan forward until we hit
        # `difficulty:`, `successRate:`, or `interactionType:` without
        # an intervening `icon:` line (meaning this entry lacks an icon).
        #
        # Strategy: Use a regex that matches from lead to the first of
        # {difficulty, successRate, interactionType} and insert icon line
        # before that match.
        #
        # Match: lead: 'LEAD' ... (anything without 'icon:') ... until:
        #   (difficulty:|successRate:|interactionType:)
        pattern = re.compile(
            rf"(lead:\s*'{escaped_lead}'"
            rf"(?:(?!\n\s*icon:)[\s\S])*?)"  # non-greedy, stop before icon: line
            rf"(\n(\s*)(?:difficulty:|successRate:|interactionType:))",
            re.MULTILINE
        )

        def make_replacement(m, counter):
            indent = m.group(3)
            icon_line = f"{indent}icon: '{icon_path}',"
            counter[0] += 1
            return m.group(1) + "\n" + icon_line + m.group(2)

        counter = [0]
        content, count = re.subn(pattern, lambda m: make_replacement(m, counter), content, count=1)
        fixed_in_file += count
        while True:
            content, n = re.subn(pattern, lambda m: make_replacement(m, counter), content, count=1)
            fixed_in_file += n
            if n == 0:
                break

    if fixed_in_file > 0:
        print(f"{filepath}: {fixed_in_file} icons added")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
    total_fixed += fixed_in_file

print(f"\nTotal fixed: {total_fixed}")
