# Personal Website CMS

Sanity Studio for [langstonwoods.com](https://langstonwoods.com). Sanity project
`8nxoag3r`, dataset `production`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3333
```

To publish a hosted Studio you can edit from any machine:

```bash
npx sanity login
npm run deploy   # prompts for a hostname → https://<hostname>.sanity.studio
```

## First-time seeding

The Studio starts empty. To load the site's current copy into it in one shot:

```bash
npm run seed
```

That imports `seed/content.ndjson` with `--replace`, creating the three
singletons and the two experience entries. It is safe to re-run — it overwrites
those documents by fixed `_id`, so it will discard edits you've made since. Once
you start editing in the Studio, don't run it again.

The seed does not include the headshot or the resume PDF, since NDJSON can't
carry binary assets. Upload those in the Studio if you want to manage them there
(see *Fallbacks* below).

### One-off imports

`seed/promptdesk.ndjson` adds the PromptDesk project:

```bash
npx sanity dataset import seed/promptdesk.ndjson production --replace
```

It only touches `project-promptdesk`, so nothing else in the dataset is
affected. Importing cannot clear a flag on *other* documents — if another
project still has **Currently Working On** ticked, untick it in the Studio so
PromptDesk is the only one in that section. Delete this file once it's in.

## What's in here

**Singletons** — one document each, edited in place:

| Document | Controls |
| --- | --- |
| Site Settings | Logo, both nav menus, contact email/phone, social buttons, resume upload, footer lines |
| Home Page | Hero, About, Skills, Education, Freelance, Contact copy, plus every section label |
| Projects Page | The header on `/projects` |

**Collections** — add/remove/reorder freely:

| Document | Controls |
| --- | --- |
| Projects | Project cards. `Featured on Homepage` puts one in the homepage Projects grid; `Currently Working On` puts it in "What I'm Working On"; every project appears on `/projects` regardless. Ordered by `Sort Order` |
| Experience | The Experience timeline. Ordered by `Sort Order` |

## Fallbacks

Every field falls back to a hardcoded default in
`personal-website/src/content/defaults.ts`. A field left empty in the Studio —
or a section you haven't created yet — renders the original copy instead of
going blank. Empty strings and empty arrays count as "not set", so you can't
accidentally wipe a section.

Two fields fall back to files bundled with the site rather than to text: the
hero **headshot** and the **resume PDF**. Leave them empty in the Studio and the
site serves `src/assets/`; upload one and it wins, which lets you swap your
resume without a redeploy.

## Inline bold

The About paragraphs support `**double asterisks**` for bold, rendered by
`personal-website/src/components/RichText.tsx`. Nothing else is parsed — it's
plain text otherwise.

## Adding a field

Three files, in this order:

1. `studio/schemaTypes/<type>.ts` — add the `defineField`
2. `personal-website/src/sanity/queries.ts` — add it to the projection
3. `personal-website/src/sanity/types.ts` — add it to the interface, and a
   default in `src/content/defaults.ts`

New document types also need registering in `studio/schemaTypes/index.ts`, and
in the structure list in `sanity.config.ts` if they should show in the sidebar.

## Publishing

Hit **Publish** and the change is live — the site fetches at runtime, so no
redeploy. The client uses the CDN (`useCdn: true`), so allow up to a minute.
