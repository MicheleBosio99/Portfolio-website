import logo from "../assets/images/logo.png"
import jenga from "../assets/images/projects/jenga.png"
import ros from "../assets/images/projects/ros.png"
import pacman from "../assets/images/projects/pacman.png"
import pokedima from "../assets/images/projects/pokedima.png"
import reclaimHumanity from "../assets/images/projects/reclaim-humanity.png"
import rl from "../assets/images/projects/reinforcement-learning.png"


export type ProjectCategory = 'All' | 'Games' | 'App' | 'Web' | 'ML/AI' | 'Others';

export interface Project {
  id: number;
  title: string;
  image: string;
  link: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Porftolio Website",
    image: logo,
    link: "https://github.com/MicheleBosio99/Portfolio-website",
    category: "Web",
    description: "Portfolio website implementation to showcase my skills and projects.",
    tech: ["Web", "React", "Typescript", "HTML", "CSS", "Vercel"]
  },
  {
    id: 1,
    title: "Mixed Reality Jenga - Unity",
    image: jenga,
    link: "",
    category: "Others",
    description: "Master Thesis - Unity mixed reality application. Contains haptic gloves implementation.",
    tech: ["Unity", "C#", "Meta SDK", "WeArt SDK"]
  },
  {
    id: 2,
    title: "ROS Robotics System",
    image: ros,
    link: "",
    category: "Others",
    description: "ROS1 challenge for input handling, room scanning and self-driving.",
    tech: ["ROS1", "C++", "SLAM", "tmux"]
  },
  {
    id: 3,
    title: "Pacman 3D",
    image: pacman,
    link: "https://github.com/MicheleBosio99/Pacman3D_ProjectCG",
    category: "Games",
    description: "Vulkan implementation of Pacman in 3D using graphics basics and low level APIs",
    tech: ["Vulkan", "C++", "Computer Graphics", "VS2022"]
  },
  {
    id: 4,
    title: "PokeDima",
    image: pokedima,
    link: "https://github.com/MicheleBosio99/PokeDima",
    category: "App",
    description: "Flutter/Dart mobile application of a Social Network for scanning and sharing pokemon cards.",
    tech: ["Flutter", "Dart", "NoSQL Firebase"]
  },
  {
    id: 5,
    title: "Reclaim Humanity",
    image: reclaimHumanity,
    link: "https://polimi-game-collective.itch.io/reclaim-humanity",
    category: "Games",
    description: "Unity 2D RPG videogame. Contains custom logic, graphics, sounds.",
    tech: ["Unity", "C#", "Tiled", "Itch.io"]
  },
  {
    id: 7,
    title: "Automation & RL Scripts",
    image: rl,
    link: "",
    category: "ML/AI",
    description: "Scripts for a series of online monthly challenges.",
    tech: ["Python", "Selenium", "Reinforcement Learning"]
  },
];
