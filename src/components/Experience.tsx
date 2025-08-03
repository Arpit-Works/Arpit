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
        desc: "Attended a hands-on coding bootcamp focused on responsive front-end development. Gained practical experience with HTML, CSS, JavaScript, and ReactJS to build dynamic and user-friendly web applications. Developed multiple UI components and layouts following modern web design principles and accessibility standards.",
        date: "Aug 2022-Sep 2022",
        url: "https://www.devtown.in/",
      },
      {
        id: 2,
        name: "Netcore Cloud Pvt Ltd",
        desc: "Monitored distributed systems using Dynatrace and Opsgenie to ensure service health and quick incident response. Investigated production alerts by analyzing logs and debugging root causes, collaborating with component owners to resolve issues. Created and managed Jira tickets for tracking bugs, ensuring timely resolution and documentation. Automated Slack and Opsgenie alert workflows with custom scripts, scheduled via cron jobs for regular health checks. Developed a deep understanding of system architecture and data flow between microservices to enhance debugging accuracy",
        date: "Feb 2025-Present",
        url: "https://netcorecloud.com/",
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
        href="https://docs.google.com/document/d/1NV9K9sPeSAzxgG6zDsAnRlSv7IRMGwQTyQ_Rzq8_XvA/edit?tab=t.0"
        target="_blank"
        className="text-white px-2 py-2 text-lg font-semibold hover:text-lime-200"
      >
        View Resume <span className="ml-1 inline-block text-white hover:text-lime-200">↗</span>
      </Link>
    </div>
  );
}
