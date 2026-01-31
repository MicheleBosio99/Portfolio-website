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
];
