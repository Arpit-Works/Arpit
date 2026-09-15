import { portfolioData } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";
import TerminalBar from "./TerminalBar";

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <SectionHeader index="06" title="Education" />

        <div className="terminal term-narrow">
          <TerminalBar title="schema_migrations" />

          <div className="term-body mono migrations">
            {portfolioData.education.map((item) => (
              <div className="migration-row" key={item.file}>
                <span className="mig-file">{item.file}</span>
                <span className="mig-desc">{item.description}</span>
                <span className="mig-status">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
