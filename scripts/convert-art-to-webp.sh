#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

DIR="public/art"
WIDTH=600
QUALITY=80   # bump to 85–90 if you see artifacts

# Requires: cwebp (brew install webp)

echo "Converting images in $DIR to ${WIDTH}px-wide WebP…"

# Read NUL-delimited filenames from find
while IFS= read -r -d $'\0' f; do
  out="${f%.*}.webp"

  # Skip if output exists and is newer than source
  if [[ -f "$out" && "$out" -nt "$f" ]]; then
    echo "Up to date: $out"
    continue
  fi

  echo "-> $out"
  cwebp -q "$QUALITY" -m 6 -mt -sharp_yuv -metadata none -resize "$WIDTH" 0 "$f" -o "$out"
done < <(find "$DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

echo "Done."
