import { portfolioData } from "@/data/portfolio";
import { gmailComposeUrl } from "@/lib/gmail-compose-url";
import TerminalBar from "./TerminalBar";

export default function Hero() {
  const { hero, metrics, terminal } = portfolioData;

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="status-line">
              <span className="pulse" />
              {hero.status}
            </div>

            <h1 className="title">
              {hero.name}
              <br />
              <span className="role">{hero.role}</span>
            </h1>

            <p className="lede">{hero.description}</p>

            <div className="contact-row">
              <a
                href={gmailComposeUrl(hero.email)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.email}
              </a>
              <a href={hero.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <span>{hero.location}</span>
            </div>
          </div>

          <div className="terminal" aria-hidden="true">
            <TerminalBar title="prod-monitor — netcore" />
            <div className="term-body mono">
              {terminal.map((line) => (
                <div className="term-line" key={`${line.time}-${line.tag}`}>
                  <span className="ts">{line.time}</span>
                  <span className={`tag tag-${line.type}`}>{line.tag}</span>
                  {line.text}
                  {line.time === "14:04:10" && <span className="cursor">▍</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="metrics">
          {metrics.map((metric) => (
            <div className="metric" key={metric.value}>
              <span className="val">{metric.value}</span>
              <span className="lbl">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
