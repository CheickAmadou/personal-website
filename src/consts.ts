// Site-wide constants. Edit these first — everything else reads from here.
export const SITE = {
  name: 'Cheick Amadou',
  title: 'Cheick Amadou',
  description: 'Student, developer, and builder. Projects, writing, and resume.',
  email: 'cheickmouslimamadou@gmail.com',
  github: 'https://github.com/CheickAmadou',
  linkedin: 'https://www.linkedin.com/in/cheickamadou',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
] as const;
