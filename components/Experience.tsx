import type { ExperienceEntry } from "@/data/types";
import SectionHeader from "./SectionHeader";

type ExperienceProps = {
  experience: ExperienceEntry[];
};

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience">
      <div className="wrap">
        <SectionHeader index="02" title="Experience" />

        <div className="timeline">
          {experience.map((job) => (
            <div className="job" key={`${job.title}-${job.time}`}>
              <div className="job-head">
                <h3>{job.title}</h3>
                {job.organization && <span className="org">— {job.organization}</span>}
              </div>

              <div className="job-time mono">{job.time}</div>

              <ul>
                {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
