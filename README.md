# LifeView Posters

The 16 LifeView framework posters from Higher Power Sedona, published as a
static web gallery. Built with Vite + React; every poster is a self-contained
React component, lazy-loaded per route so the gallery index stays fast.

- **Live site:** https://toolkit.higherpowersedona.org
- Linked from https://higherpowersedona.org (built on Framer; `/lifeviewToolkit` redirects here)

## Develop

```
npm install
npm run dev
```

## Deploy

`npm run build`, add `.nojekyll` and a `CNAME` file containing
`toolkit.higherpowersedona.org` to `dist/`, then force-push the `dist/`
folder to the `gh-pages` branch. The CNAME file must be present in every
deploy or the custom domain detaches.
