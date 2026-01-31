export type TimelineCategory =
  | 'education'
  | 'work'
  | 'achievement'
  | 'project'
  | 'certification';

export interface TimelineItem {
  id: string;                     // unique ID for React keys
  title: string;
  description: string;

  start: string;                  // ISO date: "2024-03"
  end?: string;                   // optional: "2024-08" or undefined for "ongoing"

  category: TimelineCategory;

  color: string;                  // used for marker / UI accent

  projectLink?: string;           // optional link to your Projects page
  icon?: string;                  // optional icon name (e.g. "🎓", "💼", "🏆")

  location?: string;              // optional: city, remote, etc.
  technologies?: string[];        // optional: tags for skills used
  featured?: boolean;             // optional: highlight in UI
}

export const timelineItems: TimelineItem[] = [
  // {
  //   id: 'unity-ar-2024',
  //   title: 'Unity AR Interaction Framework',
  //   description:
  //     'Designed and implemented a modular AR interaction system with hand tracking and controller fallback.',
  //   start: '2024-02',
  //   end: '2024-07',
  //   category: 'project',
  //   color: '#10b981',
  //   projectLink: '/projects/unity-ar-framework',
  //   icon: '🕶️',
  //   technologies: ['Unity', 'C#', 'OpenXR', 'AR Foundation'],
  //   featured: true
  // },
];
