"use client";

import { useRef } from "react";
import type { ProjectEntry } from "@/data/types";
import SectionHeader from "./SectionHeader";

type ProjectsProps = {
  projects: ProjectEntry[];
};

export default function Projects({ projects }: ProjectsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function moveProjects(direction: number) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>(".proj-card");
    if (!card) return;

    const gap = 18;
    carousel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }

  return (
    <section id="projects">
      <div className="wrap">
        <div className="projects-head">
          <SectionHeader index="03" title="Projects" />
          <div className="project-nav" aria-label="Project carousel controls">
            <button type="button" aria-label="Previous project" onClick={() => moveProjects(-1)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button type="button" aria-label="Next project" onClick={() => moveProjects(1)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="projects-wrap">
          <div className="projects" id="projectCarousel" ref={carouselRef}>
            {projects.map((project) => (
              <div className="proj-card" key={project.title}>
                <div className="proj-top">
                  <h3>{project.title}</h3>
                  <span className="proj-status">
                    <span className="dot" />
                    {project.status}
                  </span>
                </div>

                <p>{project.description}</p>

                <div className="tagrow">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
