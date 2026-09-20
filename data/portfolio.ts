export const fallbackExperience = [
  {
    title: "Associate Software Engineer",
    organization: "Netcore Cloud Pvt. Ltd",
    time: "FEB 2025 — PRESENT",
    startDate: "2025-02-01",
    highlightHeadline: "100,000 → 40,000",
    highlightCaption:
      "monthly production alerts cut after threshold tuning across IND, US & EU",
    tools: [
      "Kibana",
      "Opsgenie",
      "Slack",
      "Redis",
      "SQS",
      "MySQL",
      "MongoDB",
      "VerticaDB",
    ],
    bullets: [
      "Alerting:: Cut monthly production alerts from 100,000 to 40,000 by analyzing recurring failures and tuning thresholds across IND, US, and EU environments.",
      "Incidents:: Investigated incidents across distributed microservices — component failures, API errors, queue backlogs, cache pressure, and database latency — using logs, metrics, and service dependency maps.",
      "Incidents:: Traced customer-facing frontend issues back through the network to the backend API or dependency actually responsible.",
      "Incidents:: Correlated application delays with elevated MySQL, MongoDB, and VerticaDB load, coordinating fixes with the owning teams.",
      "Alerting:: Built Redis memory monitoring that surfaced exhaustion risk early, helping prevent a repeat of a prior global Redis outage.",
      "Alerting:: Added SQS queue-depth monitoring to catch processing delays and backlogs before they became incidents.",
      "Tooling:: Built log-analysis and multi-server debugging tooling that cut manual investigation effort by 40%.",
      "Alerting:: Triaged alerts through Kibana, Slack, and Opsgenie, separating transient noise from incidents that needed escalation.",
    ],
  },
  {
    title: "Freelance Web Developer",
    organization: "Freelance",
    time: "AUG 2024 — JAN 2025",
    startDate: "2024-08-01",
    tools: ["HTML", "CSS", "JavaScript", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    bullets: [
      "College MIS — Built a role-based college management REST API with Node.js, Express.js, MongoDB, JWT auth, and Socket.io for real-time attendance and notifications.",
      "Client delivery — Delivered responsive web apps and API integrations for freelance clients end-to-end, from requirements through deployment.",
    ],
  },
  {
    title: "Front-End Web Developer Trainee",
    organization: "Devtown",
    time: "AUG 2022 — SEP 2022",
    startDate: "2022-08-01",
    tools: ["HTML", "CSS", "JavaScript", "ReactJS"],
    bullets: [
      "Built responsive landing pages and UI components with HTML, CSS, and JavaScript while learning modern front-end workflows.",
      "Practiced ReactJS fundamentals — props, state, hooks, and component composition — on small product-style exercises.",
    ],
  },
];

/** Static site content (experience & projects are loaded at build/request time). */
export const portfolioStatic = {
  nav: [
    { label: "about", href: "#about" },
    { label: "experience", href: "#experience" },
    { label: "projects", href: "#projects" },
    { label: "stack", href: "#stack" },
    { label: "leetcode", href: "#leetcode" },
    { label: "contact", href: "#contact" },
  ],

  hero: {
    status: "available for backend / full-stack roles",
    name: "Arpit Vishwakarma",
    role: "Backend-focused full-stack engineer",
    description:
      "I work where things break: APIs, queues, caches, and databases under real production load. Two years spent tracing customer-facing failures back to their root cause across Node.js services, Redis, Kafka, SQS, and MySQL/Mongo/Vertica — then building the monitoring so they don't happen twice.",
    email: "vishwakarmaarpit621@gmail.com",
    linkedin: "https://www.linkedin.com/in/arpit-vishwakarma23",
    location: "Mumbai, India",
  },

  metrics: [
    { value: "60%", label: "production alert volume cut (100k → 40k/mo)" },
    { value: "40%", label: "less manual investigation time during incidents" },
    { value: "2+ yrs", label: "production experience across IND, US, EU" },
  ],

  terminal: [
    { time: "14:02:11", tag: "INFO", type: "info", text: "sqs-depth-watch — backlog cleared" },
    { time: "14:02:44", tag: "ALERT", type: "alert", text: "redis-mem-guard — usage 81%" },
    { time: "14:03:02", tag: "INFO", type: "info", text: "mysql-latency — p95 118ms" },
    { time: "14:03:37", tag: "RESOLVED", type: "resolved", text: "incident-4482 — cache eviction storm" },
    { time: "14:04:10", tag: "INFO", type: "info", text: "alerts/mo — 100k → 40k" },
  ],

  about: {
    text: "I'm a full-stack engineer, but the backend is where I spend most of my attention — REST APIs, microservices, message queues, and the databases underneath them. A lot of my day-to-day is diagnostic: a customer reports something broken in the browser, and the real cause is three services away, in a queue backlog or a cache under memory pressure. I've built the monitoring and debugging tooling that catches that earlier, and I like building product features just as much as I like reading logs at 2am to find out why they stopped moving.",
    focus: [
      ["primary", "backend systems"],
      ["architecture", "microservices"],
      ["reliability", "observability"],
      ["data", "SQL + NoSQL"],
      ["delivery", "APIs → production"],
    ],
  },

  leetcode: {
    stats: [
      ["—", "problems solved"],
      ["—", "easy / medium / hard"],
      ["—", "contest rating"],
    ],
    topics: ["Arrays", "Strings", "Hash Table", "Two Pointers", "Binary Search"],
    languages: ["JavaScript", "Java", "Python"],
  },

  stack: {
    workspace: ["languages", "backend", "data", "frontend", "infra", "observability"],
    lines: [
      { num: "01", kind: "comment", value: "# backend-first, full-stack capable" },
      { num: "02", kind: "array", key: "languages:", values: ["JavaScript (ES6+)", "TypeScript", "Python", "Bash/Shell"] },
      { num: "03", kind: "section", key: "backend:" },
      { num: "04", kind: "value", key: "framework:", value: "Express.js", comment: "# Node.js" },
      { num: "05", kind: "array", key: "patterns:", values: ["REST APIs", "microservices", "cron jobs"] },
      { num: "06", kind: "value", key: "cache:", value: "Redis" },
      { num: "07", kind: "value", key: "realtime:", value: "Socket.io" },
      { num: "08", kind: "array section", key: "data:", values: ["MongoDB", "MySQL", "VerticaDB"] },
      { num: "09", kind: "array", key: "frontend:", values: ["React", "Next.js", "Tailwind CSS", "Material UI"] },
      { num: "10", kind: "section", key: "infra:" },
      { num: "11", kind: "value", key: "cloud:", value: "AWS (EC2, SQS, load balancing)", extra: "GCP" },
      { num: "12", kind: "value", key: "containers:", value: "Docker" },
      { num: "13", kind: "value", key: "os:", value: "Linux" },
      { num: "14", kind: "value", key: "vcs:", value: "Git" },
      { num: "15", kind: "array", key: "ci-cd:", values: ["Github Actions"] },
      { num: "16", kind: "array", key: "observability:", values: ["Kibana", "Opsgenie", "Jira"] },
    ],
  },

  education: [
    {
      file: "0002_be_information_technology.sql",
      description: "Mumbai University · CGPA 7.20",
      status: "2024-07",
    },
    {
      file: "0001_diploma_information_technology.sql",
      description: "Vidyalankar Polytechnic · 86%",
      status: "2021-07",
    },
  ],

  contact: {
    title: "Let's fix something, or build something new.",
    description:
      "Open to backend and full-stack roles — especially ones where reliability, debugging, and system design matter as much as shipping features.",
    email: "vishwakarmaarpit621@gmail.com",
    linkedin: "https://www.linkedin.com/in/arpit-vishwakarma23",
    github: "" as string,
    location: "Mumbai, India",
    build: "portfolio-v1",
    resume:
      "https://drive.google.com/file/d/1Sz3t9RNbCna1JFTx0fq4SClsl7nLMgxX/view?usp=drive_link",
  },
} as const;

/** @deprecated Use getPortfolioData() for full data including experience & projects. */
export const portfolioData = portfolioStatic;
