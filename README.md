# Such is Life

Personal blog of Suchaaver Chahal

## Developing

1. Install dependencies using `npm install` or `pnpm install`
2. Run the dev server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Process

1. Blog posts are written in `src/posts` as .md file with appropriate frontmatter. You can use the nvim `NoNeckPain` command for easier writing
2. Assets can be added to `assets_raw` while editing, for ease of use on multiple machines. 
3. Assets should be hosted on Cloudfront R2 storage when finalized, and removed from `assets_raw` once they are no longer needed

## Misc

This site is built using Svelte(+kit), Tailwind, and BitsUI
