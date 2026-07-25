#!/bin/bash
# Renders resume_onepage.html to the PDF served at coded-by-aditya.github.io/resume.pdf
# Keep resume_onepage.html in sync with resume_onepage.md when you edit the resume.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/../../resume.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$DIR/resume_onepage.html"

echo "Wrote $(cd "$(dirname "$OUT")" && pwd)/resume.pdf"
