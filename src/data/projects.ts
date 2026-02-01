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
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Porftolio Website",
    image: logo,
    link: "https://github.com/MicheleBosio99/Portfolio-website",
    category: "Web",
  },
  {
    id: 1,
    title: "Mixed Reality Jenga - Unity",
    image: jenga,
    link: "",
    category: "Others",
  },
  {
    id: 2,
    title: "ROS Robotics System",
    image: ros,
    link: "",
    category: "Others",
  },
  {
    id: 3,
    title: "Pacman 3D",
    image: pacman,
    link: "https://github.com/MicheleBosio99/Pacman3D_ProjectCG",
    category: "Games",
  },
  {
    id: 4,
    title: "PokeDima",
    image: pokedima,
    link: "",
    category: "App",
  },
  {
    id: 5,
    title: "Reclaim Humanity",
    image: reclaimHumanity,
    link: "https://polimi-game-collective.itch.io/reclaim-humanity",
    category: "Games",
  },
  {
    id: 7,
    title: "Automation & RL Scripts",
    image: rl,
    link: "",
    category: "ML/AI",
  },
];
