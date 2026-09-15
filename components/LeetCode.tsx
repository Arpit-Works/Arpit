import type { LeetCodeEntry } from "@/data/types";
import DsaTopicsCarousel from "./DsaTopicsCarousel";
import SectionHeader from "./SectionHeader";

type LeetCodeProps = {
  leetcode: LeetCodeEntry;
};

function DifficultyStat({ value }: { value: string }) {
  const parts = value.split("/").map((part) => part.trim());
  if (parts.length !== 3) {
    return <strong className="lc-diff-fallback">{value}</strong>;
  }

  const labels = ["easy", "medium", "hard"];

  return (
    <div
      className="lc-diff-row"
      aria-label={`${parts[0]} easy, ${parts[1]} medium, ${parts[2]} hard`}
    >
      {parts.map((count, index) => (
        <div className="lc-diff-cell" key={labels[index]}>
          <strong>{count}</strong>
          <span>{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function statValue(stats: LeetCodeEntry["stats"], label: string): string {
  return stats.find(([, l]) => l === label)?.[0] ?? "—";
}

export default function LeetCode({ leetcode }: LeetCodeProps) {
  const total = statValue(leetcode.stats, "problems solved");
  const difficulty = statValue(leetcode.stats, "easy / medium / hard");
  const rank = statValue(leetcode.stats, "global rank");

  return (
    <section id="leetcode">
      <div className="wrap">
        <SectionHeader index="04" title="LeetCode" />

        <div className="leetcode-wrap">
          <div className="lc-summary">
            <div className="lc-panel-head">
              <div className="lc-label">problem-solving profile</div>
              <h3>LeetCode Performance</h3>
            </div>

            <div className="lc-stats lc-panel-main">
              <div className="lc-stat">
                <strong>{total}</strong>
                <span>problems solved</span>
              </div>
              <div className="lc-stat">
                <strong className="lc-stat-rank">{rank}</strong>
                <span>global rank</span>
              </div>
              <div className="lc-stat lc-stat-wide">
                <DifficultyStat value={difficulty} />
                <span className="lc-stat-wide-label">easy / medium / hard</span>
              </div>
            </div>

            {leetcode.profileUrl ? (
              <p className="lc-note">
                <a href={leetcode.profileUrl} target="_blank" rel="noopener noreferrer">
                  View full profile on LeetCode →
                </a>
              </p>
            ) : (
              <p className="lc-note">
                Set <code>LEETCODE_USERNAME</code> in <code>.env.local</code> to load live stats.
              </p>
            )}
          </div>

          <div className="lc-topics">
            <DsaTopicsCarousel
              topics={leetcode.topics}
              totalProblemsSolved={leetcode.totalProblemsSolved}
            />

            <div className="lc-languages lc-panel-foot">
              <div className="lc-label">languages used</div>
              <div className="lc-lang-tags">
                {leetcode.languages.map((language) => (
                  <span className="tag" key={language}>{language}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
