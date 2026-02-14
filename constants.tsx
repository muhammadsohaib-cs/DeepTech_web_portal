
import React from 'react';
import { Beaker, Briefcase, Zap, Globe, Cpu, Users } from 'lucide-react';
import { BlogPost } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'Community', href: 'https://chat.whatsapp.com/dummy-link', external: true },
  { name: 'Contact', href: '/contact', external: false },
];

export const TEAM_MEMBERS = [
  {
    name: 'Scientific Strategy',
    role: 'Research & Innovation',
    desc: 'Leading the bridge between academic research and commercial viability.',
    icon: <Beaker className="w-8 h-8 text-primary" />
  },
  {
    name: 'Venture Relations',
    role: 'Investment & Scaling',
    desc: 'Connecting deeptech startups with global venture capital pools.',
    icon: <Zap className="w-8 h-8 text-primary" />
  },
  {
    name: 'Ecosystem Growth',
    role: 'Community & Partnerships',
    desc: 'Building the network that supports founders from lab to revenue.',
    icon: <Globe className="w-8 h-8 text-primary" />
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
    title: 'Why Nanotech is the Future of Medicine',
    excerpt: 'Exploring how drug delivery nanoparticles are changing treatments across the globe...',
    date: 'Dec 15, 2025',
    author: 'DeepTech Team',
    category: 'Science',
    image: 'https://picsum.photos/seed/blog1/800/400'
  },
  {
    id: '2',
    title: 'The Gap Between Theses and Ten-Figure Businesses',
    excerpt: 'Identifying why Pakistani research often stays in libraries and how we are changing it...',
    date: 'Jan 05, 2026',
    author: 'Visionary Editorial',
    category: 'Entrepreneurship',
    image: 'https://picsum.photos/seed/blog2/800/400'
  },
  {
    id: '3',
    title: 'Building a Silicon Valley in Lahore',
    excerpt: 'The roadmap to creating a self-sustaining DeepTech ecosystem in the heart of Pakistan...',
    date: 'Feb 12, 2026',
    author: 'Research Hub',
    category: 'Ecosystem',
    image: 'https://picsum.photos/seed/blog3/800/400'
  }
];
