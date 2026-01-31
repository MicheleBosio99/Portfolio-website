export type ProjectCategory = 'All' | 'Web' | 'Mobile' | 'Design' | 'Other';

export interface Project {
  id: number;
  title: string;
  image: string;
  link: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    image: 'https://via.placeholder.com/300x200/2d2d2d/4a9eff?text=E-Commerce',
    link: '#',
    category: 'Web'
  },
  {
    id: 2,
    title: 'Task Manager App',
    image: 'https://via.placeholder.com/300x200/2d2d2d/10b981?text=Task+Manager',
    link: '#',
    category: 'Mobile'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    image: 'https://via.placeholder.com/300x200/2d2d2d/f59e0b?text=Weather+App',
    link: '#',
    category: 'Web'
  },
  {
    id: 4,
    title: 'Social Media App',
    image: 'https://via.placeholder.com/300x200/2d2d2d/10b981?text=Social+Media',
    link: '#',
    category: 'Mobile'
  },
  {
    id: 5,
    title: 'Portfolio Design',
    image: 'https://via.placeholder.com/300x200/2d2d2d/ec4899?text=Portfolio',
    link: '#',
    category: 'Design'
  },
  {
    id: 6,
    title: 'Blog Platform',
    image: 'https://via.placeholder.com/300x200/2d2d2d/4a9eff?text=Blog',
    link: '#',
    category: 'Web'
  },
  {
    id: 7,
    title: 'Fitness Tracker',
    image: 'https://via.placeholder.com/300x200/2d2d2d/10b981?text=Fitness',
    link: '#',
    category: 'Mobile'
  },
  {
    id: 8,
    title: 'Brand Identity',
    image: 'https://via.placeholder.com/300x200/2d2d2d/ec4899?text=Branding',
    link: '#',
    category: 'Design'
  }
];
