import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
  image: string; // Path to the project image
}

const projects: ProjectData[] = [
  {
    id: 1,
    title: "Gym-Guide",
    description: "Gym Guide is a web application designed to help users create personalized workout plans. The app provides daily workout routines based on various training styles, such as focusing on individual muscles, split routines, or push/pull/legs.",
    techStack: ["React", "Tailwind CSS"],
    githubLink: "https://github.com/ArpitVK/Gym-Guide.git",
    demoLink: "https://gym-guide-sigma.vercel.app/",
    image: "/images/Gym-Guide.png",
  },
  {
    id: 2,
    title: "Nasa-app",
    description: "This NASA-themed application fetches and displays data from NASA's public APIs, providing users with educational information about space, astronomy, and related topics.",
    techStack: ["React", "CSS", "API"],
    githubLink: "https://github.com/ArpitVK/nasa-app.git",
    demoLink: "https://666dd4040c30bb19e2236b46--arpit-nasa-react-app.netlify.app/",
    image: "/images/Nasa-app.png",
  },
  {
    id: 3,
    title: "Get-Youtube-Subscriber",
    description: "This Node.js application manages YouTube subscribers, including functionality to retrieve subscriber lists and specific subscriber details.",
    techStack: ["NodeJS", "ExpressJS", "MongoDB"],
    githubLink: "https://github.com/ArpitVK/Get-Youtube-Subscribers.git",
    demoLink: "https://get-youtube-subscribers-z73z.onrender.com/subscribers",
    image: "/images/get-youtube-subscriber.png",
  }
];

const Projects: React.FC = () => {

  return (
    <div  className="py-4">
      <div className="container">
        <h3 className="text-3xl py-4 font-bold text-white">Projects</h3>
        {projects.map(({ id, title, description, techStack, demoLink, image }) => (
          <div
            key={id}
            className=" glass bg-card-bg  py-4 px-4 rounded-lg mb-6 flex flex-col md:flex-row gap-6  "
          >
            {image && (
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative w-full aspect-video mx-1">
                  <Image
                    src={image}
                    alt={`${title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="flex-grow">
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <h3 className="text-white hover:text-lime-200 text-xl font-semibold mb-2">
                  {title} <span className="text-sm align-top">↗</span>
                </h3>
              </a>
              <p className="text-text-secondary mb-4">{description}</p>
              {techStack && (
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-bg-dark text-lime-200 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
