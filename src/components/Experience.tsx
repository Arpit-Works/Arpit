"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ExperienceData {
  id: string;
  name: string;
  desc: string;
  date: string;
  url: string;
}

const SHEET_URL =
  "https://opensheet.elk.sh/1wlvtKuehbUaGhSHBr2Ne32ebR-zeWhVLTnk4kLGOlMQ/Sheet2";

const ExperienceItem = ({ experience }: { experience: ExperienceData }) => (
  <div key={experience.id} className="py-4 px-4 rounded-lg glass">
    <h6 className="text-sm text-gray-300 mb-2">{experience.date}</h6>
    <Link href={experience.url || "#"} target={experience.url ? "_blank" : "_self"} className="group">
      <h3 className="text-xl text-white font-semibold mb-2 hover:text-lime-200 cursor-pointer">
        {experience.name}
        <span className="ml-1 inline-block text-white group-hover:text-lime-200">
          ↗
        </span>
      </h3>
    </Link>
    <p className="mb-4">{experience.desc}</p>
  </div>
);

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container py-6">
      <h3 className="text-3xl font-bold text-white py-2">Experience</h3>
      {experiences.length === 0 ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))
      )}
      <Link
        href="https://drive.google.com/file/d/1Sz3t9RNbCna1JFTx0fq4SClsl7nLMgxX/view?usp=drive_link"
        target="_blank"
        className="text-white px-2 py-2 text-lg font-semibold hover:text-lime-200"
      >
        View Resume{" "}
        <span className="ml-1 inline-block text-white hover:text-lime-200">
          ↗
        </span>
      </Link>
    </div>
  );
}
