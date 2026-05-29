import os, re

ICON_CHARS = "public/icons/characters"
ICON_SHIPS = "public/icons/ships"

char_icons = set(f for f in os.listdir(ICON_CHARS) if f.endswith(".png"))
ship_icons = set(f for f in os.listdir(ICON_SHIPS) if f.endswith(".png"))

# Normalize an icon filename for comparison: strip prefix, suffix, underscores
def norm_icon(fname):
    name = fname.replace("tex.charui_", "").replace(".png", "")
    return name.lower()

# Build lookup maps
char_map = {norm_icon(f): f for f in char_icons}
ship_map = {norm_icon(f): f for f in ship_icons}

# List all available normalized keys
print("=== CHARACTER ICONS ===")
for k in sorted(char_map):
    print(f"  {k} -> {char_map[k]}")
print(f"\nTotal: {len(char_map)}")

print("\n=== SHIP ICONS ===")
for k in sorted(ship_map):
    print(f"  {k} -> {ship_map[k]}")
print(f"\nTotal: {len(ship_map)}")
