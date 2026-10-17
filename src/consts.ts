// Site-wide constants. Edit these first — everything else reads from here.
export const SITE = {
  name: 'Cheick Amadou',
  title: 'Cheick Amadou',
  description: 'Student, developer, and builder.',
  email: 'cma2253@columbia.edu',
  github: 'https://github.com/CheickAmadou',
  linkedin: 'https://www.linkedin.com/in/cheick-amadou-889a50393/',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
] as const;
