"use client";

import { useRef } from "react";
import type { LeetCodeTopic } from "@/data/types";

type DsaTopicsCarouselProps = {
  topics: LeetCodeTopic[];
  totalProblemsSolved: number;
};

function topicSharePercent(solved: number, totalProblemsSolved: number): number {
  if (totalProblemsSolved <= 0 || solved <= 0) return 0;
  return Math.min(100, (solved / totalProblemsSolved) * 100);
}

/** Keeps tiny shares visible without changing the displayed count / % label. */
function topicBarWidth(share: number, solved: number): number {
  if (solved <= 0) return 0;
  return Math.max(share, 12);
}

export default function DsaTopicsCarousel({
  topics,
  totalProblemsSolved: total,
}: DsaTopicsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollTopics(direction: number) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>(".topic-card");
    if (!card) return;

    const gap = 10;
    carousel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }

  return (
    <div className="topics-panel">
      <div className="lc-topics-toolbar">
        <div>
          <h3>DSA topics</h3>
          {total > 0 ? (
            <p className="lc-topics-hint">
              Horizontal bars = share of <strong>{total}</strong> total solved
            </p>
          ) : null}
        </div>

        {topics.length > 1 ? (
          <div className="topic-nav" aria-label="Topic carousel controls">
            <button type="button" aria-label="Previous topics" onClick={() => scrollTopics(-1)}>
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
            <button type="button" aria-label="Next topics" onClick={() => scrollTopics(1)}>
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
        ) : null}
      </div>

      <div className="topics-wrap">
        <div className="topics-carousel" ref={carouselRef}>
          {topics.map((topic) => {
            const share = topicSharePercent(topic.solved, total);
            const barWidth = topicBarWidth(share, topic.solved);
            const meterLabel =
              total > 0
                ? `${topic.name}: ${topic.solved} of ${total} (${Math.round(share)}%)`
                : `${topic.name}: ${topic.solved}`;

            return (
              <article className="topic-card" key={topic.name} aria-label={meterLabel}>
                <div className="topic-card-top">
                  <span className="topic-card-name">{topic.name}</span>
                  <strong className="topic-card-count">{topic.solved}</strong>
                </div>
                <div className="topic-card-meter" aria-hidden="true">
                  <div className="topic-card-meter-fill" style={{ width: `${barWidth}%` }} />
                </div>
                {total > 0 ? (
                  <span className="topic-card-share">{Math.round(share)}%</span>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
