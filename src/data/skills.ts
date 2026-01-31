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
    skills: [
      'C#', 'C++', 'C',
      'Python',
      'SQL',
      'Dart',
      'React', 'Typescript', 'HTML/5', 'CSS/3'
    ],
    color: '#4a9eff'
  },
  {
    group: 'frameworks',
    title: 'Frameworks & Technologies',
    skills: [
      'Unity', 'Monogame',
      'Flutter',
      'PyTorch', 'TensorFlow'
    ],
    color: '#10b981'
  },
  {
    group: 'others',
    title: 'Tools &\nOther Skills',
    skills: [
      'Git', 'Github',
      'Docker',
      'Firebase',
      'Vulkan', 'OpenGL',

      'Problem solving', 'Team working', 'Ownership'
    ],
    color: '#f59e0b'
  }
];