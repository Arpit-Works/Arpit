"use client";

import { useLayoutEffect } from "react";

/**
 * On full page reload: start at the top (Hero), not a restored scroll position or #hash anchor.
 * In-page #section links still work until the user refreshes.
 */
export default function ScrollRestoration() {
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type !== "reload") return;

    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
