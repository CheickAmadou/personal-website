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
    title: 'DodgeHours',
    description:
      "Live hours, open-rec court schedules, and crowd levels for Columbia's Dodge Fitness Center. Vanilla-JS PWA (offline shell, Web Push alerts) over Node serverless functions with Redis; a Python pipeline with 142 tests scrapes PE & Rec calendar feeds and IMLeagues daily via GitHub Actions.",
    tags: ['JavaScript', 'PWA', 'Node.js', 'Python', 'Redis', 'Vercel'],
    liveUrl: 'https://dodgehours.com',
    featured: true,
  },
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
    title: 'GUIDE: Guidance Using Intelligent Depth Estimation',
    description:
    'A portable, handheld assistive device that provides real-time audio navigation guidance. Raspberry Pi 5 as the processor, a Logitech C920 webcam for video capture, an AI HAT+ 26 TOPS for neural network inference, an Anker Nano Power Bank as the power supply, and a 3D-printed case for portability.',
    tags: ['Raspberry Pi', 'Python','Machine Learning'],
    repoUrl: 'https://github.com/CheickAmadou/GUIDE',
  },
  
];
