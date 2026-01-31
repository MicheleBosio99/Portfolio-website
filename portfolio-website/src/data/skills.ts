export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Next.js'
    ],
    color: '#4a9eff'
  },
  {
    title: 'Backend',
    skills: [
      'Node.js',
      'Express',
      'Python',
      'Django',
      'PostgreSQL',
      'MongoDB',
      'REST APIs'
    ],
    color: '#10b981'
  },
  {
    title: 'Tools & Others',
    skills: [
      'Git',
      'Docker',
      'AWS',
      'Firebase',
      'Figma',
      'CI/CD',
      'Agile'
    ],
    color: '#f59e0b'
  }
];
