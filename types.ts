
export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  image: string;
  category: 'Scientific' | 'Entrepreneurial' | 'Venture';
}

export interface EventSession {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  location: string;
}

export interface Partner {
  name: string;
  logo: string;
  category: 'Strategic' | 'Academic' | 'Industry' | 'Venture';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface ResearchPaper {
  _id: string;
  title: string;
  abstract: string;
  authorName: string;
  authorId: string;
  authorEmail?: string;
  fileUrl?: string;
  tags: string[];
  createdAt: string; // ISO date string
  isExternal?: boolean; // Optional flag for external API papers
}
