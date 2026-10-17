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
    title: 'FTC 6183 — DECODE Season',
    description:
      'Full Java robot code for FTC Robotics Team 6183, which I co-captained and led programming for. Autonomous routines and driver-control systems for a 14-person team; won 1st Place Innovate Award at the Southeast Guilford State Qualifier.',
    tags: ['Java', 'FTC SDK', 'Robotics', 'Android'],
    repoUrl: 'https://github.com/FTC-6183/FTC6183-DECODE',
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
