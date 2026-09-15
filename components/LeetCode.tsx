import type { LeetCodeEntry } from "@/data/types";
import SectionHeader from "./SectionHeader";

type LeetCodeProps = {
  leetcode: LeetCodeEntry;
};

export default function LeetCode({ leetcode }: LeetCodeProps) {

  return (
    <section id="leetcode">
      <div className="wrap">
        <SectionHeader index="04" title="LeetCode" />

        <div className="leetcode-wrap">
          <div className="lc-summary">
            <div className="lc-label">problem-solving profile</div>
            <h3>LeetCode Performance</h3>

            <div className="lc-stats">
              {leetcode.stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
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
            <h3>DSA topics</h3>

            {leetcode.topics.map((topic) => (
              <div className="topic-row" key={topic.name}>
                <span>{topic.name}</span>
                <b>{topic.solved}</b>
              </div>
            ))}

            <div className="lc-languages">
              <div className="lc-label">languages used</div>
              {leetcode.languages.map((language) => (
                <span className="tag" key={language}>{language}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
