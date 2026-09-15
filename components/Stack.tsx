import { portfolioData } from "@/data/portfolio";
import SectionHeader from "./SectionHeader";
import TerminalBar from "./TerminalBar";

export default function Stack() {
  const { stack } = portfolioData;

  return (
    <section id="stack">
      <div className="wrap">
        <SectionHeader index="05" title="Stack" />

        <div className="terminal term-narrow">
          <TerminalBar title="stack.yaml" />

          <div className="term-body mono">
            <div className="stack-console">
              <aside className="stack-sidebar">
                <div className="stack-side-title">workspace</div>

                <div className="stack-nav">
                  {stack.workspace.map((item) => (
                    <div className="stack-nav-item" key={item}>{item}</div>
                  ))}
                </div>

                <div className="stack-side-foot">
                  mode: production<br />
                  profile: backend-first<br />
                  status: ready
                </div>
              </aside>

              <div className="stack-code">
                <div className="stack-prompt">
                  <span className="user">arpit@dev</span>
                  <span className="path">~/stack</span>
                  <span className="cmd">$ cat stack.yaml</span>
                </div>

                <div className="stack-lines">
                  {stack.lines.map((line) => (
                    <div
                      className={`stack-line${line.kind.includes("section") ? " stack-section" : ""}`}
                      key={line.num}
                    >
                      <span className="stack-num">{line.num}</span>

                      {line.kind === "comment" ? (
                        <span className="stack-comment">{line.value}</span>
                      ) : (
                        <>
                          {"key" in line && line.key && (
                            <span className="stack-key">{line.key}</span>
                          )}

                          {(line.kind === "array" || line.kind === "array section") && (
                            <>
                              <span className="stack-punc">[</span>
                              {line.values.map((value, index) => (
                                <span key={value}>
                                  <span className="stack-value">{value}</span>
                                  {index < line.values.length - 1 && (
                                    <span className="stack-punc">, </span>
                                  )}
                                </span>
                              ))}
                              <span className="stack-punc">]</span>
                            </>
                          )}

                          {line.kind === "value" && (
                            <>
                              <span className="stack-value">{line.value}</span>
                              {"comment" in line && line.comment && (
                                <span className="stack-comment">{line.comment}</span>
                              )}
                              {"extra" in line && line.extra && (
                                <>
                                  <span className="stack-punc">, </span>
                                  <span className="stack-value">{line.extra}</span>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="stack-status">
                  <span><span className="ok">●</span> all systems operational</span>
                  <span>15 entries · stack.yaml</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
