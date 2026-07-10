
import React from 'react';
import { Beaker, Briefcase, Zap, Globe, Cpu, Users, Rocket } from 'lucide-react';
import { BlogPost } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'Society', href: '/society', external: false },
  { name: 'Projects', href: '/projects', external: false },
  { name: 'Blogs', href: '/blogs', external: false },
  { name: 'Learning Hub', href: '/hub', external: false },
  { name: 'Contact', href: '/contact', external: false },
];

export const TEAM_MEMBERS = [
  {
    name: 'Azhar Rizvi',
    role: 'Principal Advisor',
    desc: 'Providing strategic guidance and global expertise for the DeepTech ecosystem.',
    icon: <Users className="w-8 h-8 text-primary" />
  },
  {
    name: 'Neha Ahsan',
    role: 'Founding Director',
    desc: 'Driving the vision and leadership of the DeepTech Global Organization.',
    icon: <Rocket className="w-8 h-8 text-primary" />
  },
  {
    name: 'Muhammad Sohaib',
    role: 'Partnerships and Outreach',
    desc: 'Building bridges between academia, industry, and global stakeholders.',
    icon: <Briefcase className="w-8 h-8 text-primary" />
  },
  {
    name: 'Rohaan Khan',
    role: 'Operations & Growth',
    desc: 'Ensuring seamless execution of events and organizational logistics.',
    icon: <Globe className="w-8 h-8 text-primary" />
  },
  {
    name: 'Muhammad Hunzala',
    role: 'Marketing Lead',
    desc: 'Managing brand identity and promoting the community\'s impact.',
    icon: <Zap className="w-8 h-8 text-primary" />
  },
  {
    name: 'Areesha Amir',
    role: 'Creative Design',
    desc: 'Creating engaging visual and written content to represent our vision.',
    icon: <Beaker className="w-8 h-8 text-primary" />
  }
];

export const SUMMIT_PILLARS = [
  {
    id: 1,
    title: 'The Scientific Frontier',
    description: 'Showcasing groundbreaking research in AI, Biotech, Robotics, and Nanotech.',
    icon: <Cpu className="w-8 h-8 text-primary" />,
    details: 'Pakistan is full of brilliant scientists and researchers whose work never leaves the library. We are bringing these ideas into the spotlight.'
  },
  {
    id: 2,
    title: 'The Entrepreneurial Bridge',
    description: 'Capacity-building sessions where experts teach scientists and students how to build a business.',
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    details: 'Moving beyond software and code into the world of atoms. Learn market positioning, scalability, and impact.'
  },
  {
    id: 3,
    title: 'The Venture Pitch',
    description: 'A high-stakes live competition where startups pitch to a panel of VCs and Industry Titans.',
    icon: <Zap className="w-8 h-8 text-primary" />,
    details: 'Connecting brilliant minds to continuous funding. Turning theses and ideas into multi-million dollar businesses.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'What Happens When You Put Quantum Computing Inside Drug Discovery?',
    excerpt: 'An eye-opening conversation with Dr. Shahar Keinan on using quantum computing to search billions of molecular possibilities and change how diseases get treated.',
    date: 'Jul 11, 2026',
    author: 'Neha Ahsan',
    category: 'Quantum Tech',
    image: '/quantum_drug_discovery.png',
    link: '/blog/quantum-computing-drug-discovery'
  }
];
