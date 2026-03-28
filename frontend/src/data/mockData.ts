export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'Live' | 'Ongoing' | 'GitHub only';
  liveLink?: string;
  githubLink?: string;
  coverImage?: string;
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const MOCK_USER: UserProfile = {
  name: "John Doe",
  bio: "Fullstack Developer creating high-performance tools for modern engineering teams. Focused on React, TypeScript, and AI-driven systems.",
  avatar: "https://images.unsplash.com/photo-1544717297-fa154daaf762?auto=format&fit=crop&q=80&w=400",
  socials: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  }
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ErrorLens AI',
    description: 'A premium AI-powered debugging tool for developers to analyze and fix code errors in seconds. Built for scale with OpenAI integration.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'OpenAI'],
    status: 'Live',
    liveLink: 'https://errorlens.ai',
    githubLink: 'https://github.com/dev/errorlens',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    id: '2',
    title: 'QuickWork Marketplace',
    description: 'Cloud-based marketplace connecting service providers with clients for micro-tasks and scheduled jobs. Features a custom Stripe flow.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    status: 'Ongoing',
    githubLink: 'https://github.com/dev/quickwork',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    id: '3',
    title: 'CodeShowify',
    description: 'An open-source library for creating beautiful code snippets and documentation walkthroughs. Supports 50+ languages.',
    techStack: ['React', 'Vite', 'MDX', 'Framer Motion'],
    status: 'GitHub only',
    githubLink: 'https://github.com/dev/codeshowify',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'DevShowroom CRM',
    description: 'Internal project management tool for DevShowroom developers to track showcase metrics and recruiter engagement.',
    techStack: ['React', 'Node.js', 'Redis', 'Tailwind'],
    status: 'Live',
    liveLink: 'https://devshowroom-crm.com',
    githubLink: 'https://github.com/dev/showroom-crm',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=1000'
  }
];
