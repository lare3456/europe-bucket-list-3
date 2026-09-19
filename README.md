# Europe Bucket List

An illustrated postcard collection of all 46 European countries. Heart the ones you
want to visit and they light up on an interactive map of Europe.

Plain HTML, CSS and JavaScript. No build step, no framework, no backend.

## Files

Every file sits in the same folder — no subfolders, so you can upload them
individually on GitHub's web interface without needing to recreate a folder.

```
index.html    markup: nav, hero, country deck, map, bucket list
styles.css    all styling, including dark mode and responsive rules
map.js        MAP — SVG path data for the 46 country outlines
data.js       COUNTRIES — the 46-country dataset (facts, order, art key)
scenes.js     SCENES — the 46 illustrations, drawn from a shared SVG kit
app.js        rendering, map interaction, state, localStorage
```

Scripts must load in that order: `map.js` → `data.js` → `scenes.js` → `app.js`.

## Hosting on GitHub Pages

1. Create a repository and copy these files into its root (so `index.html` sits at
   the top level, with `assets/` beside it).
2. Commit and push.
3. In the repository, go to **Settings → Pages**, set **Source** to
   *Deploy from a branch*, pick your branch and the `/ (root)` folder, then save.
4. The site appears at `https://<username>.github.io/<repository>/` within a minute
   or two.

If you'd rather serve it from a `docs/` folder, move everything into `docs/` and
choose `/docs` as the folder in step 3 instead.

Nothing here depends on the site living at the domain root — all paths are
relative — so a project subpath like `/europe-bucket-list/` works fine.

## Running it locally

Open `index.html` directly in a browser and it works. If your browser is strict
about local files, serve the folder instead:

```
python3 -m http.server
```

then visit `http://localhost:8000`.

## Notes

- **Saved lists** live in `localStorage` under the key `europe-bucket-list.v1`,
  so they are per-browser and per-origin. No account, no server.
- **Fonts** (Alfa Slab One, Karla, Special Elite) load from Google Fonts. To go
  fully offline, self-host them and swap the `<link>` in `index.html`.
- **Country outlines** come from Natural Earth's 1:10m admin-0 boundaries (public
  domain), projected with an Albers conic projection centred on Europe, then
  simplified. Crimea is drawn as part of Ukraine.
- **Adding or editing a country**: edit the entry in `assets/data.js`. Its `art`
  key points at a function in `assets/scenes.js`, and its `name` must match the
  key used in `assets/map.js` for the map to highlight it.
