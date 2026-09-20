# MZ Notes: Quartz Site

This repository contains the Quartz site configuration, styling, and functionality for MZ Notes.
The notes themselves are synced from Obsidian with Quartz Syncer.

## Ownership

Obsidian and Quartz Syncer own the Markdown files in `content/`. Do not use this repository as the
place to manually organize, rewrite, or maintain note content. Edit notes in Obsidian and let Syncer
push them to GitHub.

This repository owns:

- `quartz/styles/custom.scss`: custom typography and CSS
- `quartz.config.yaml`: site settings, theme colors, fonts, plugins, and base URL
- `quartz/components/`, `quartz/plugins/`, and related Quartz code: functionality and layout
- `.github/workflows/deploy.yml`: the GitHub Pages build and deployment workflow
- `typography-lab/`: a local one-page fixture for fast design experiments

The `docs/` directory is Quartz's own documentation. It is not the content for MZ Notes and must
not be used as the deployment input.

## Requirements

- Node.js 22 or newer
- npm 10.9.2 or newer
- Git access to `git@github.com:MaCoZu/notes.git`

Install dependencies once after cloning or when dependencies change:

```bash
npm install
npx quartz plugin install
```

## Local Preview

To preview the actual personal notes:

```bash
npx quartz build --serve --watch -d content
```

Open `http://localhost:8080/`. This rebuilds the synced notes whenever they change.

Do not use `npm run docs` for the personal site. That script previews Quartz's documentation from
`docs/`.

## Typography Lab

The full site can take time to rebuild. Use the one-page lab while changing typography:

```bash
npx quartz build --serve --watch \
	-d typography-lab \
	-o public-typography-lab \
	--port 8081 \
	--wsPort 3002
```

Or run `npm run lab`.

Open `http://localhost:8081/`. The lab page is at the root so you do not need to type `/typography`.

Edit `quartz/styles/custom.scss`; the watcher rebuilds and reloads the page automatically. If an old
server is already using port 8081, stop it before running the lab command again. The lab is for local
testing only and is not deployed as the site.

## Current Typography

- Archivo is used for Quartz UI, navigation, and headings.
- Freight Sans Book is used for long-form article text.
- Freight Sans is used for code text.
- Font files are stored in `quartz/static/fonts/`.

The main controls for readable article text are in `quartz/styles/custom.scss`:

```scss
article p {
  font-size: 1.05rem;
  line-height: 1.45;
}
```

Increase `font-size` for larger text and `line-height` for more vertical breathing room.

## Configuration

Edit `quartz.config.yaml` for site-wide settings such as:

- Page title and base URL
- Theme colors and light/dark mode colors
- Font family names
- Enabled plugins
- Ignored note patterns such as `private`, `templates`, and `.obsidian`

Edit `quartz/styles/custom.scss` for CSS-level changes. Keep local font declarations in sync with
the files in `quartz/static/fonts/`.

## GitHub Pages Workflow

The workflow in `.github/workflows/deploy.yml` runs on every push to `main` and can also be started
manually from GitHub Actions.

It performs these steps:

1. Checks out the repository.
2. Installs Node, npm dependencies, and Quartz plugins.
3. Seeds the OG-image plugin with the local Archivo and Freight Sans font files.
4. Builds `content/` into `public/`.
5. Uploads `public/` to GitHub Pages.

The important build command is:

```bash
npx quartz build -d content
```

If the workflow shows a missing font error, check that the referenced files still exist in
`quartz/static/fonts/` and that the cache names in `deploy.yml` match the OG-image plugin's expected
font names.

## Working With Obsidian Syncer

Both Obsidian Syncer and this local workspace can create commits on `main`. Before pushing a local
Quartz change, integrate any commits that Syncer has already pushed:

```bash
git status
git add quartz/styles/custom.scss quartz.config.yaml .github/workflows/deploy.yml
git commit -m "Describe the Quartz change"
git pull --rebase origin main
git push origin main
```

If you have local work that is not ready to commit:

```bash
git stash push -u -m "local Quartz work"
git pull --rebase origin main
git stash pop
```

If a rebase reports conflicts, resolve the files, then run:

```bash
git add <resolved-file>
git rebase --continue
git push origin main
```

To cancel an in-progress rebase:

```bash
git rebase --abort
```

Never force-push `main`. Syncer commits are content updates and must be preserved.

## Useful Checks

Check the repository before committing:

```bash
git status
npm run check
```

Build the personal site without starting a server:

```bash
npx quartz build -d content
```

Run tests:

```bash
npm test
```

## Common Mistakes

- Building with `-d docs`: this produces Quartz documentation, not MZ Notes.
- Running the default failed workflow from an old checkout: confirm `deploy.yml` builds `content/`.
- Editing synced notes in this repository: make content changes in Obsidian.
- Pushing without pulling: Syncer may have added commits to `main`.
- Using port `8080` when another Quartz server is running: use `8081` and a separate WebSocket
  port such as `3002` for the typography lab.
