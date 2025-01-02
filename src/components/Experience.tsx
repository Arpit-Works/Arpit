import Link from "next/link";
import React, { useContext, useMemo } from "react";


interface ExperienceData {
  id: number;
  name: string;
  desc: string;
  date: string;
  url: string;
}

const ExperienceItem = ({ experience }: { experience: ExperienceData }) => (
  <div key={experience.id} className="py-4 px-4 rounded-lg glass">
    <h6 className="text-sm text-gray-300 mb-2">{experience.date}</h6>
    <Link href={experience.url} target="_blank" className="group">
      <h3 className="text-xl text-white font-semibold mb-2 hover:text-lime-200 cursor-pointer">
        {experience.name}
        <span className="ml-1 inline-block text-white group-hover:text-lime-200">↗</span>
      </h3>
    </Link>
    <p className="mb-4">{experience.desc}</p>
  </div>
);

export default function Experience() {

  const experiences: ExperienceData[] = useMemo(
    () => [
      {
        id: 1,
        name: "Devtown",
        desc: "I attended Devtown, a boot camp focused on responsive front-end development. There, I learned key technologies including HTML, CSS, JavaScript, and ReactJS. This training equipped me with the skills to build dynamic and user-friendly web applications",
        date: "Aug 22-Sep 22",
        url: "https://www.devtown.in/",
      },
      {
        id: 2,
        name: "ZA Charity Feed Foundation",
        desc: "I designed and developed end-to-end digital solutions, including landing pages, a demo model, and a full-stack project. I built scalable and efficient applications by leveraging technologies like HTML, CSS, JavaScript, ReactJS, Next.js, MongoDB, SQL, Node.js, and Express.js. Additionally, I deployed the project on Hostinger to ensure seamless accessibility. I aim to showcase my ability to deliver comprehensive web development solutions, from frontend design to backend architecture and deployment.",
        date: "Sep 23-Present",
        url: "https://zeeshanali.org/",
      },      
    ],
    []
  );

  return (
    <div className="container py-6" >
      <h3 className="text-3xl font-bold text-white py-2">Experience</h3>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
      <Link
        href="https://drive.google.com/file/d/1h-5bOy4vSj-7uO9_otNH60KMYlRO1hRd/view?usp=drive_link"
        target="_blank"
        className="text-white px-2 py-2 text-lg font-semibold hover:text-lime-200"
      >
        View Resume <span className="ml-1 inline-block text-white hover:text-lime-200">↗</span>
      </Link>
    </div>
  );
}
