// skills.ts

export type SkillGroup = 'languages' | 'frameworks' | 'others';

export interface SkillCategory {
  group: SkillGroup;
  title: string;
  skills: string[];
  color: string;
}

// The three groups are kept at the same length so the columns read as a set.
export const skillCategories: SkillCategory[] = [
  {
    group: 'languages',
    title: 'Programming Languages',
    skills: [
      'C#', 'C++', 'C',
      'Python',
      'SQL',
      'Dart',
      'Javascript', 'React', 'Typescript', 'HTML/5', 'CSS/3',
      'GLSL', 'XML',
    ],
    color: '#4a9eff'
  },
  {
    group: 'frameworks',
    title: 'Frameworks & Technologies',
    skills: [
      'Unity', 'Monogame',
      'Meta XR SDK',
      'Flutter',
      'ROS',
      'PyTorch', 'TensorFlow', 'Pandas', 'NumPy',
      'Selenium',
      'Docker',
    ],
    color: '#10b981'
  },
  {
    group: 'others',
    title: 'Tools &\nOther Skills',
    skills: [
      'Git', 'Github',
      'Firebase',
      'Vulkan', 'OpenGL',
      'Agile',
      'Problem solving', 'Team working', 'Ownership',
      'Communication', 'Fast learning'
    ],
    color: '#f59e0b'
  }
];
