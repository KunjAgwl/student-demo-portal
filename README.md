# Guardian Angel · Student Portal

Onboarding portal for outreach associates, built from the Merrickson *Onboarding Content Framework* (21 Oct 2026). Plain HTML, CSS and JS with no build step.

## Run

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 5173
```

## Files

| File | What's in it |
| --- | --- |
| `js/data.js` | All content: sections, glossary, replies, rules, personas, quiz, FAQ, changelog |
| `js/app.js` | Router, pages, seller clocks, phrase check, simulator scoring, handbook search |
| `css/styles.css` | Neumorphic theme, light and dark, responsive |
| `assets/roofline-mark.svg` | Logo |

## Placeholders to replace before launch

- **Permitted texting hours**: `window` in `js/data.js` (currently 9 AM to 8 PM seller time). US counsel sets the real window.
- **Founder video**: the play button on 01 shows a notice until a recording is wired in.
- **Transcripts**: both collections in 03 are empty until anonymised transcripts are approved.
- **Simulator**: personas follow a script, and replies are scored by rule checks in the browser. The AI seller would plug in at `renderSim` / `scoreSim` in `js/app.js`.
- **Storage**: progress, tickets and submitted scenarios live in the student's browser (`localStorage`). They need a backend before team leads can see them.
