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
    title: 'AutoCable',
    description:
      'Teleoperated mecanum-drive robot that automates BNC cable connection to oscilloscopes. ROS 2 nodes on a Jetson Orin Nano drive an Arduino Mega running 50 Hz PID velocity control, with a dependency-free browser control room (virtual joysticks, FPV touch controls, live RealSense depth) and a triple-redundant dead-man safety chain.',
    tags: ['Python', 'C', 'ROS 2', 'Linux', 'Jetson'],
    repoUrl: 'https://github.com/CheickAmadou/AutoCable',
    featured: true,
  },
  {
    title: 'Personal Website',
    description:
      'This site. Static Astro build with a Markdown blog, deployed to Cloudflare Workers on a free Student Pack domain.',
    tags: ['Astro', 'TypeScript', 'Tailwind', 'Cloudflare'],
    repoUrl: 'https://github.com/CheickAmadou/personal-website',
    featured: true,
  },
];
