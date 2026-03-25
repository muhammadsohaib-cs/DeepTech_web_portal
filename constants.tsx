
import React from 'react';
import { Beaker, Briefcase, Zap, Globe, Cpu, Users, Rocket } from 'lucide-react';
import { BlogPost } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'Society', href: '/society', external: false },
  { name: 'Projects', href: '/projects', external: false },
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
    title: 'A new spin on quantum cryptography: Avoiding trapdoors and embracing public keys',
    excerpt: 'An investigation of post-quantum cryptographic standards and their integration into existing sovereign defense networks.',
    date: 'Dec 15, 2025',
    author: 'Research Team',
    category: 'Quantum Tech',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    link: 'https://arxiv.org/abs/1109.3235'
  },
  {
    id: '2',
    title: 'Functional Synthetic Biology',
    excerpt: 'Evaluating the potential of engineered genomes and programming logic at the cellular level.',
    date: 'Jan 05, 2026',
    author: 'Biotech Lab',
    category: 'Biotechnology',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
    link: 'https://arxiv.org/abs/2207.00538'
  },
  {
    id: '3',
    title: 'Synthetic Biology meets Neuromorphic Computing: Towards bio-inspired Perception',
    excerpt: 'A study on neuromorphic chip architectures designed to mimic human neural pathways and reduce AI energy loads.',
    date: 'Feb 12, 2026',
    author: 'AI Core Group',
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    link: 'https://arxiv.org/abs/2504.10053'
  }
];
