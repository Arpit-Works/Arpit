import { gmailComposeUrl } from "@/lib/gmail-compose-url";
import type { PortfolioData } from "@/lib/portfolio-data";
import ContactTerminal from "./ContactTerminal";
import SectionHeader from "./SectionHeader";

type ContactProps = {
  contact: PortfolioData["contact"];
};

export default function Contact({ contact }: ContactProps) {
  return (
    <footer id="contact" className="contact-section">
      <div className="wrap">
        <SectionHeader index="07" title="Contact" />

        <div className="contact-grid">
          <div className="contact-copy">
            <h2>{contact.title}</h2>
            <p className="contact-lede">{contact.description}</p>

            <p className="contact-hint">
              <span className="contact-hint-wide">
                Use the terminal on the right — try <code>help</code>, <code>mail</code>, or{" "}
                <code>open linkedin</code>.
              </span>
              <span className="contact-hint-narrow">
                Use the terminal below — try <code>help</code>, <code>mail</code>, or{" "}
                <code>open linkedin</code>.
              </span>
            </p>

            <div className="footer-links">
              <a
                className="btn primary"
                href={gmailComposeUrl(contact.email)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Email me
              </a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              {contact.github ? (
                <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              ) : null}
            </div>
          </div>

          <div className="contact-terminal-slot">
            <ContactTerminal
              email={contact.email}
              linkedin={contact.linkedin}
              github={contact.github}
              resume={contact.resume}
              location={contact.location}
              build={contact.build}
            />
          </div>
        </div>

        <div className="foot-bottom">
          <span>{contact.location}</span>
          <span>© {new Date().getFullYear()} Arpit Vishwakarma · build {contact.build}</span>
        </div>
      </div>
    </footer>
  );
}
