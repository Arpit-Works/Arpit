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
        desc: "I attended Devtown, a bootcamp focused on responsive front-end development. There, I learned key technologies including HTML, CSS, JavaScript, and ReactJS. This training equipped me with the skills to build dynamic and userfriendly web applications",
        date: "Aug 22-Sep 22",
        url: "https://www.devtown.in/",
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
        href="https://drive.google.com/file/d/1FolekJN8AtamV3O9s15AQ0vY0qXEYQbX/view?usp=drive_link"
        target="_blank"
        className="text-white px-2 py-2 text-lg font-semibold hover:text-lime-200"
      >
        View Resume <span className="ml-1 inline-block text-white hover:text-lime-200">↗</span>
      </Link>
    </div>
  );
}
