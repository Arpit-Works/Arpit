"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ExperienceEntry } from "@/data/types";
import {
  categoryFilters,
  parseExperienceBullet,
  type ParsedExperienceBullet,
} from "@/lib/experience-bullet";
import { sortExperienceNewestFirst } from "@/lib/experience-sort";
import SectionHeader from "./SectionHeader";

type ExperienceProps = {
  experience: ExperienceEntry[];
};

function orgLabel(job: ExperienceEntry) {
  return job.organization.trim() || "Freelance";
}

function BulletList({ items }: { items: ParsedExperienceBullet[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="exp-bullets">
      {items.map((bullet, i) => (
        <li className="exp-bullet" key={`${bullet.raw}-${i}`}>
          {bullet.lead ? (
            <>
              <strong>{bullet.lead}</strong>
              {" — "}
              <span className="exp-bullet-body">{bullet.text}</span>
            </>
          ) : (
            <span className="exp-bullet-body">{bullet.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function ExperienceDetail({ job }: { job: ExperienceEntry }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const label = orgLabel(job);

  const parsed = useMemo(
    () => job.bullets.map((b) => parseExperienceBullet(b)),
    [job.bullets],
  );

  const filters = useMemo(() => categoryFilters(parsed), [parsed]);

  const filtered =
    activeFilter === "all"
      ? parsed
      : parsed.filter((b) => b.category === activeFilter);

  return (
    <article className="exp-detail">
      <header className="exp-detail-head">
        <h3>{job.title}</h3>
        <div className="exp-detail-meta">
          <span className="exp-detail-org">{label}</span>
          <span className="exp-detail-time mono">{job.time}</span>
        </div>
      </header>

      {job.highlightHeadline && (
        <div className="exp-highlight">
          <p className="exp-highlight-value">{job.highlightHeadline}</p>
          {job.highlightCaption && (
            <p className="exp-highlight-caption">{job.highlightCaption}</p>
          )}
        </div>
      )}

      {filters.length > 0 && (
        <div className="exp-filters" role="tablist" aria-label="Filter accomplishments">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`exp-filter${active ? " is-active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label} {filter.count}
              </button>
            );
          })}
        </div>
      )}

      <div className="exp-bullets-scroll">
        <BulletList items={filtered} />
      </div>

      <footer className="exp-tools" aria-label="Technologies used">
        <span className="exp-tools-label mono">used</span>
        <div className="exp-tools-tags">
          {job.tools.map((tool) => (
            <span className="exp-tool-tag" key={tool}>{tool}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}

function TimelineNav({
  jobs,
  activeIndex,
  onSelect,
}: {
  jobs: ExperienceEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const active = sidebar.querySelector<HTMLElement>(".exp-timeline-item.is-active");
    active?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div className="exp-sidebar" ref={sidebarRef}>
      <nav className="exp-timeline" aria-label="Work experience">
      {jobs.map((job, index) => {
        const selected = index === activeIndex;
        const org = orgLabel(job);

        return (
          <button
            key={`${job.title}-${job.time}`}
            type="button"
            className={`exp-timeline-item${selected ? " is-active" : ""}`}
            aria-current={selected ? "true" : undefined}
            onClick={() => onSelect(index)}
          >
            <span className="exp-timeline-title">{job.title}</span>
            <span className="exp-timeline-org">{org}</span>
            <span className="exp-timeline-time mono">{job.time}</span>
          </button>
        );
      })}
      </nav>
    </div>
  );
}

function MobileCarousel({
  jobs,
  activeIndex,
  onSelect,
}: {
  jobs: ExperienceEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="exp-carousel" role="tablist" aria-label="Work experience">
      {jobs.map((job, index) => {
        const org = orgLabel(job);
        const selected = index === activeIndex;

        return (
          <button
            key={`${job.title}-${job.time}`}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`exp-card${selected ? " is-active" : ""}`}
            onClick={() => onSelect(index)}
          >
            <span className="exp-card-title">{job.title}</span>
            <span className="exp-card-org">{org}</span>
            <span className="exp-card-time mono">{job.time}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Experience({ experience }: ExperienceProps) {
  const jobs = useMemo(() => sortExperienceNewestFirst(experience), [experience]);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex = jobs.length === 0 ? 0 : Math.min(activeIndex, jobs.length - 1);
  const activeJob = jobs[safeIndex];

  if (!activeJob) {
    return null;
  }

  return (
    <section id="experience">
      <div className="wrap">
        <SectionHeader index="02" title="Experience" />

        <div className="exp-layout">
          <TimelineNav
            jobs={jobs}
            activeIndex={safeIndex}
            onSelect={setActiveIndex}
          />

          <div className="exp-main">
            <MobileCarousel
              jobs={jobs}
              activeIndex={safeIndex}
              onSelect={setActiveIndex}
            />
            <ExperienceDetail
              key={`${activeJob.title}-${activeJob.time}`}
              job={activeJob}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
