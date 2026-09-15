import { portfolioData } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about">
      <div className="wrap">
        <SectionHeader index="01" title="About" />

        <div className="about-grid">
          <p className="about-text">
            {about.text.split("REST APIs, microservices, message queues, and the databases underneath them.")[0]}
            <strong>
              REST APIs, microservices, message queues, and the databases underneath them.
            </strong>
            {about.text.split("REST APIs, microservices, message queues, and the databases underneath them.")[1]}
          </p>

          <div className="about-panel">
            <div className="about-panel-head">
              <span className="about-panel-title">engineering-focus</span>
              <span className="about-panel-status">active</span>
            </div>

            <div className="focus-list">
              {about.focus.map(([key, value]) => (
                <div className="focus-item" key={key}>
                  <span>{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
