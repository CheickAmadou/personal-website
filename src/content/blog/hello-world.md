---
title: 'Hello, world'
description: 'Why I built this site, and how it is put together.'
date: 2026-10-17
tags: ['meta', 'astro']
---

This is the first post on my new site. I built it mostly to have a place to
write things down — project notes, things I learned the hard way, and the
occasional opinion.

## How it's built

The site is a static [Astro](https://astro.build) build. Blog posts are plain
Markdown files in the repo, projects are a typed array, and the whole thing
deploys to Cloudflare Pages on every push.

```ts
// Adding a project is one object in src/data/projects.ts
export const projects = [
  { title: 'Something new', description: '...', tags: ['TypeScript'] },
];
```

The domain is free for a year through the GitHub Student Developer Pack, and
hosting is free indefinitely. Total cost: $0.

## What's next

More posts, more projects, and probably a redesign once I get bored of this one.
