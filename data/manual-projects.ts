import type { ProjectEntry } from "./types";

/** Projects that are not on GitHub (or need custom copy). Always shown alongside GitHub repos. */
export const manualProjects: ProjectEntry[] = [
  {
    title: "MIS Dashboard",
    status: "live",
    description:
      "Role-based college management system. Teachers manage subjects and attendance; students see schedules and grades in real time.",
    tags: ["Express.js", "MongoDB", "JWT + refresh rotation", "Socket.io", "Next.js", "Recharts", "Nextjs", "Typescript"],
  },
];
