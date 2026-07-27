# Resume

## 👉 Current resume (use this one)

`master/resume_onepage.docx` — the latest, general-purpose one-page resume.

- Source: `master/resume_onepage.md`
- Builder: `master/build_resume_onepage.js` (run `node master/build_resume_onepage.js` to regenerate the `.docx`)

Edit the `.md` and the builder together, then rebuild. The builder always writes the `.docx` into `master/`, no matter where you run it from.

## The PDF on the website

`https://coded-by-aditya.github.io/resume.pdf` is served from `resume.pdf` in the repo root, which `index.html` links to. Do not move it.

- Source: `master/resume_onepage.html` (a print stylesheet version of the same content, tuned to fit one page)
- Builder: `master/build_resume_pdf.sh` (renders it with headless Chrome and writes `resume.pdf` to the repo root)

So a resume change means three files: the `.md`, the `.js` builder, and the `.html`. Rebuild both outputs and push, or the site keeps serving the old PDF.

## Folders

| Folder | What's in it |
|---|---|
| `master/` | The current master resume (md + docx + builder). Start here. |
| `applications/` | Resumes/cover letters tailored to a specific role. One folder per application. |
| `archive/` | Old versions kept for reference only. Do not send these. |

### applications/

| Folder | Role |
|---|---|
| `deloitte-fde/` | Deloitte Forward-Deployed Engineer (Req 41226) — resume + cover letter |
| `deloitte-cloud/` | Deloitte Cloud Engineer (Req 41166) — application doc |
| `opus-fde/` | Opus Recruitment FDE — unnamed Melbourne AI startup |
| `retail-technical-ba/` | Technical Business Analyst, Data & AI — unnamed major Australian retailer via Iterate (Kyla) — resume + cover letter + email |
