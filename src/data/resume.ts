export interface EducationEntry {
  id: string;
  school: string;
  location: string;
  degree: string;
  start: string;
  end: string;
  gpa?: string;
  link?: string;
  accomplishments?: string[];
  description?: string;
  logo?: string; // optional future use
}

export interface WorkEntry {
  id: string;
  company: string;
  location: string;
  role: string;
  start: string;
  end: string;
  link?: string;
  technologies?: string[];
  accomplishments?: string[];
  description?: string;
  logo?: string;
}

export const education: EducationEntry[] = [
  {
    id: "edu-2",
    school: "Politecnico di Milano",
    location: "Milan, Italy",
    degree: "Master's Degree in Software Engineering and Computer Science",
    start: "Sept. 2022",
    end: "Expected Mar. 2026",
    link: "https://www.polimi.it",
    accomplishments: [
      "Master Thesis on an XR Multiplayer Physics Interaction System",
      "Completed advanced courses in Machine Learning, Deep Learning, Computer Graphics, Robotics, Distributed Systems, and Streaming Analytics",
      "Designed and implemented complex systems across XR, graphics and machine learning"
    ],
    description:
      "A specialized Master's program emphasizing scalable systems, immersive technologies, and advanced computational methods."
  },
  {
    id: "edu-1",
    school: "Politecnico di Milano",
    location: "Milan, Italy",
    degree: "Bachelor's Degree in Software Engineering and Computer Science",
    start: "Sept. 2018",
    end: "Sept. 2022",
    link: "https://www.polimi.it",
    accomplishments: [
      "Completed a full Software Engineering and Computer Science curriculum",
      "Developed multiple academic projects across graphics, systems, and AI",
      "Built a strong foundation in algorithms, programming languages, and distributed systems"
    ],
    description:
      "A four-year program focused on core computer science, software engineering principles, and hands-on project development."
  }
];

export const workExperience: WorkEntry[] = [
  {
    id: "work-1",
    company: "Software Engineer",
    location: "Bergamo / Milan, Italy",
    role: "Looking up to new opportunities...",
    start: "Apr. 2026",
    end: "",
    accomplishments: []
  },
  // {
  //   id: "work-1",
  //   company: "Local Pizzeria",
  //   location: "Casnigo, BG, Italy",
  //   role: "NOT SOFTWARE RELATED - Pizza Maker",
  //   start: "2018",
  //   end: "2023",
  //   accomplishments: [
  //     "Learned to work efficiently under the pressure of peak rush hours",
  //     "Maintained direct communication and positive rapport with customers",
  //   ]
  // }
];