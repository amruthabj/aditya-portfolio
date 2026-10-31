# Aditya – Portfolio

Static website (no build step). Open `index.html` to preview.

## Add your content
| What | Where to put the file | Then edit `js/data.js` |
|---|---|---|
| Profile photo | `assets/images/profile.jpg` | nothing, already linked |
| CV (PDF) | `assets/docs/CV_Aditya.pdf` | nothing, shows a "Download CV" button |
| Certificates | `assets/certificates/` (PDF + optional preview image) | `certificates` list: title, issuer, year, image, file |
| Patents | `assets/docs/` | `patents` list |
| Project pictures | `assets/images/` | `projects` list: image, link |
| Timeline | – | `timeline` list |

Copy an existing line in `data.js` to add more. Leave `file` empty to show a plain card.

## Deploy (free)
- **Netlify:** go to app.netlify.com/drop and drag this whole folder in.
- **GitHub Pages:** upload the files to a repo, then Settings → Pages → deploy from `main` / root.
- **Vercel:** import the repo or run `vercel` in this folder.

Colours are CSS variables in the last `:root` block of `css/style.css` (a softer palette is noted in the comment above it). Gears live in `js/gears.js` (edit the `chain(...)` lines to move or resize them).
