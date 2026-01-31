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
    image: "src/assets/images/logo.png",
    link: "https://github.com/MicheleBosio99/Portfolio-website",
    category: "Web",
  },
  {
    id: 1,
    title: "Mixed Reality Jenga - Unity",
    image: "src/assets/images/projects/jenga.png",
    link: "",
    category: "Others",
  },
  {
    id: 2,
    title: "ROS Robotics System",
    image: "src/assets/images/projects/ros.png",
    link: "",
    category: "Others",
  },
  {
    id: 3,
    title: "Pacman 3D",
    image: "src/assets/images/projects/pacman.png",
    link: "https://github.com/MicheleBosio99/Pacman3D_ProjectCG",
    category: "Games",
  },
  {
    id: 4,
    title: "PokeDima",
    image: "src/assets/images/projects/pokedima.png",
    link: "",
    category: "App",
  },
  {
    id: 5,
    title: "Reclaim Humanity",
    image: "src/assets/images/projects/reclaim-humanity.png",
    link: "https://polimi-game-collective.itch.io/reclaim-humanity",
    category: "Games",
  },
  {
    id: 7,
    title: "Automation & RL Scripts",
    image: "src/assets/images/projects/reinforcement-learning.png",
    link: "",
    category: "ML/AI",
  },
];
