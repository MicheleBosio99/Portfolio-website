// skills.ts

export type SkillGroup = 'languages' | 'frameworks' | 'others';

export interface SkillCategory {
  group: SkillGroup;
  title: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    group: 'languages',
    title: 'Programming Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C#', 'C++'],
    color: '#4a9eff'
  },
  {
    group: 'frameworks',
    title: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Unity', 'Node.js', 'Tailwind CSS'],
    color: '#10b981'
  },
  {
    group: 'others',
    title: 'Tools & Other Skills',
    skills: ['Git', 'Docker', 'Linux', 'Figma', 'CI/CD'],
    color: '#f59e0b'
  }
];
