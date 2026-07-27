import website_logo from "../assets/images/website_logo.png"
import jenga from "../assets/images/projects/jenga.png"
import ros from "../assets/images/projects/ros.png"
import pacman from "../assets/images/projects/pacman.png"
import pokedima from "../assets/images/projects/pokedima.png"
import reclaimHumanity from "../assets/images/projects/reclaim-humanity.png"
import rl from "../assets/images/projects/reinforcement-learning.png"
import dungeonsaid from "../assets/images/projects/dungeonsaid.png"
import nfcTracker from "../assets/images/projects/nfc-tracker.svg"


export type ProjectCategory = 'All' | 'Games' | 'App' | 'Web' | 'ML/AI' | 'Others';

export interface Project {
  id: number;
  title: string;
  image: string;
  link: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  /** Repository is private: the card shows a notice instead of opening `link`. */
  isPrivate?: boolean;
  /**
   * ISO date of the last commit. Used ONLY to order the cards newest-first —
   * it is never displayed, so it can't show a stale "updated N days ago" claim.
   * Refresh with `git log -1 --format=%cI` in the relevant repo.
   */
  lastUpdate?: string;
}

const projectList: Project[] = [
  {
    id: 8,
    title: "DungeonsAid",
    image: dungeonsaid,
    link: "",
    category: "App",
    isPrivate: true,
    lastUpdate: "2026-07-26",
    description: "Tabletop-RPG companion app that transcribes table talk to look up rules live.",
    tech: ["Flutter", "Dart", "Speech Recognition", "Firebase"]
  },
  {
    id: 1,
    title: "Mixed Reality Jenga - Unity",
    image: jenga,
    link: "https://github.com/MicheleBosio99/MR_Jenga",
    category: "Others",
    lastUpdate: "2026-06-19",
    description: "Master Thesis - Unity mixed reality application. Contains haptic gloves implementation.",
    tech: ["Unity", "C#", "Meta SDK", "WeArt SDK"]
  },
  {
    id: 9,
    title: "NFC Attendance Tracker",
    image: nfcTracker,
    link: "https://github.com/MicheleBosio99/NFC_Tracker",
    category: "App",
    lastUpdate: "2026-04-21",
    description: "Flutter app for NFC tag tracking with IN/OUT history, stats and Excel export.",
    tech: ["Flutter", "Dart", "NFC", "Firebase"]
  },
  {
    id: 0,
    title: "Porftolio Website",
    image: website_logo,
    link: "https://github.com/MicheleBosio99/Portfolio-website",
    category: "Web",
    lastUpdate: "2026-02-05",
    description: "Portfolio website implementation to showcase my skills and projects.",
    tech: ["Web", "React", "Typescript", "HTML", "CSS", "Vercel"]
  },
  {
    id: 4,
    title: "PokeDima",
    image: pokedima,
    link: "https://github.com/MicheleBosio99/PokeDima",
    category: "App",
    lastUpdate: "2025-06-16",
    description: "Flutter/Dart mobile application of a Social Network for scanning and sharing pokemon cards.",
    tech: ["Flutter", "Dart", "NoSQL Firebase"]
  },
  {
    id: 3,
    title: "Pacman 3D",
    image: pacman,
    link: "https://github.com/MicheleBosio99/Pacman3D_ProjectCG",
    category: "Games",
    lastUpdate: "2025-05-30",
    description: "Vulkan implementation of Pacman in 3D using graphics basics and low level APIs",
    tech: ["Vulkan", "C++", "Computer Graphics", "VS2022"]
  },
  {
    id: 2,
    title: "ROS Robotics System",
    image: ros,
    link: "https://github.com/MicheleBosio99/ROS_First_Challenge",
    category: "Others",
    lastUpdate: "2024-05-01",
    description: "ROS1 challenge for input handling, room scanning and self-driving.",
    tech: ["ROS1", "C++", "SLAM", "tmux"]
  },
  {
    id: 5,
    title: "Reclaim Humanity",
    image: reclaimHumanity,
    link: "https://polimi-game-collective.itch.io/reclaim-humanity",
    category: "Games",
    lastUpdate: "2024-03-02",
    description: "Unity 2D RPG videogame. Contains custom logic, graphics, sounds.",
    tech: ["Unity", "C#", "Tiled", "Itch.io"]
  },
  {
    id: 7,
    title: "Automation & RL Scripts",
    image: rl,
    link: "",
    category: "ML/AI",
    isPrivate: true,
    description: "Scripts for a series of online monthly challenges.",
    tech: ["Python", "Selenium", "Reinforcement Learning"]
  },
];

/** Newest first. Entries without a date sort last, since they can't be placed. */
export const projects: Project[] = [...projectList].sort((a, b) => {
  if (!a.lastUpdate) return b.lastUpdate ? 1 : 0;
  if (!b.lastUpdate) return -1;
  return b.lastUpdate.localeCompare(a.lastUpdate);
});
