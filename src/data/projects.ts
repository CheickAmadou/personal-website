export type Project = {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

// Add a project by appending an object here. Order = display order.
export const projects: Project[] = [
  {
    title: 'Personal Website',
    description:
      'This site. Static Astro build with a Markdown blog, deployed to Cloudflare Pages on a free Student Pack domain.',
    tags: ['Astro', 'TypeScript', 'Tailwind', 'Cloudflare'],
    repoUrl: 'https://github.com/CheickAmadou/personal-website',
    featured: true,
  },
  {
    title: 'Example Project',
    description:
      'Replace me. One or two sentences on what it does and why it mattered.',
    tags: ['Python', 'FastAPI'],
    repoUrl: 'https://github.com/CheickAmadou',
  },
];
