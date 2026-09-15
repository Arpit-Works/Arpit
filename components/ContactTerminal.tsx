"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { gmailComposeUrl } from "@/lib/gmail-compose-url";
import TerminalBar from "./TerminalBar";

function openGmailCompose(email: string) {
  window.open(gmailComposeUrl(email), "_blank", "noopener,noreferrer");
}

export type ContactTerminalProps = {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  build: string;
};

type LogEntry =
  | { id: string; kind: "sys"; text: string }
  | { id: string; kind: "cmd"; text: string }
  | { id: string; kind: "out"; lines: string[] }
  | { id: string; kind: "err"; text: string };

const QUICK_COMMANDS = ["help", "email", "linkedin", "github", "contact", "clear"] as const;

const WELCOME_LOG: LogEntry[] = [
  {
    id: "welcome-0",
    kind: "sys",
    text: "reach-out.sh — interactive contact shell (v1)",
  },
  {
    id: "welcome-1",
    kind: "sys",
    text: 'Type "help" or click a command below. Try: email, linkedin, status, mail',
  },
];

function executeCommand(
  input: string,
  ctx: ContactTerminalProps,
  nextId: () => string,
): { entries: LogEntry[]; reset?: boolean; sideEffect?: () => void } {
  const trimmed = input.trim();
  if (!trimmed) return { entries: [] };

  const [command, ...args] = trimmed.toLowerCase().split(/\s+/);
  const cmdEntry: LogEntry = { id: nextId(), kind: "cmd", text: trimmed };

  switch (command) {
    case "help":
    case "?":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [
              "Commands:",
              "  help              — this message",
              "  email             — show email address",
              "  mail              — open Gmail compose",
              "  linkedin          — show profile path",
              "  open linkedin     — open LinkedIn in new tab",
              "  github            — show GitHub profile",
              "  open github       — open GitHub in new tab",
              "  location          — city",
              "  timezone          — Asia/Kolkata (IST)",
              "  status            — availability",
              "  contact           — all channels (JSON)",
              "  whoami            — short intro",
              "  ping              — latency joke",
              "  clear             — reset terminal",
            ],
          },
        ],
      };

    case "clear":
      return { entries: [cmdEntry], reset: true };

    case "email":
      return {
        entries: [
          cmdEntry,
          { id: nextId(), kind: "out", lines: [ctx.email, 'Run "mail" to compose.'] },
        ],
      };

    case "mail":
      return {
        entries: [
          cmdEntry,
          { id: nextId(), kind: "out", lines: [`Opening Gmail compose for ${ctx.email}…`] },
        ],
        sideEffect: () => openGmailCompose(ctx.email),
      };

    case "linkedin":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [ctx.linkedin, 'Run "open linkedin" to visit.'],
          },
        ],
      };

    case "github":
      if (!ctx.github) {
        return {
          entries: [
            cmdEntry,
            {
              id: nextId(),
              kind: "out",
              lines: ["GitHub profile not configured. Set GITHUB_USERNAME in .env.local."],
            },
          ],
        };
      }
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [ctx.github, 'Run "open github" to visit.'],
          },
        ],
      };

    case "open": {
      const target = args[0];
      if (target === "linkedin") {
        return {
          entries: [
            cmdEntry,
            { id: nextId(), kind: "out", lines: ["Opening LinkedIn…"] },
          ],
          sideEffect: () => window.open(ctx.linkedin, "_blank", "noopener,noreferrer"),
        };
      }
      if (target === "email" || target === "mail") {
        return {
          entries: [
            cmdEntry,
            { id: nextId(), kind: "out", lines: ["Opening Gmail compose…"] },
          ],
          sideEffect: () => openGmailCompose(ctx.email),
        };
      }
      if (target === "github") {
        if (!ctx.github) {
          return {
            entries: [
              cmdEntry,
              {
                id: nextId(),
                kind: "err",
                text: "GitHub profile not configured. Set GITHUB_USERNAME in .env.local.",
              },
            ],
          };
        }
        return {
          entries: [
            cmdEntry,
            { id: nextId(), kind: "out", lines: ["Opening GitHub…"] },
          ],
          sideEffect: () => window.open(ctx.github, "_blank", "noopener,noreferrer"),
        };
      }
      return {
        entries: [
          cmdEntry,
          { id: nextId(), kind: "err", text: 'Usage: open linkedin | open github | open email' },
        ],
      };
    }

    case "location":
      return {
        entries: [cmdEntry, { id: nextId(), kind: "out", lines: [ctx.location] }],
      };

    case "timezone":
    case "tz":
      return {
        entries: [
          cmdEntry,
          { id: nextId(), kind: "out", lines: ["Asia/Kolkata (IST)", "UTC+5:30"] },
        ],
      };

    case "status":
    case "hire":
    case "roles":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [
              "status: open_to_roles",
              "focus: backend · full-stack · reliability",
              "reply: usually within 24h",
            ],
          },
        ],
      };

    case "whoami":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [
              "arpit — backend-focused engineer",
              "debugging, observability, shipping stable systems",
            ],
          },
        ],
      };

    case "contact":
    case "ls":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [
              "{",
              `  email: "${ctx.email}",`,
              `  linkedin: "${ctx.linkedin}",`,
              `  github: "${ctx.github || "—"}",`,
              `  location: "${ctx.location}",`,
              '  timezone: "Asia/Kolkata",',
              '  status: "open_to_roles"',
              "}",
            ],
          },
        ],
      };

    case "ping":
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "out",
            lines: [
              `PING ${ctx.location} — 64 bytes`,
              "64 bytes from mumbai: icmp_seq=1 ttl=64 time=24h (human response SLA)",
            ],
          },
        ],
      };

    case "build":
    case "version":
      return {
        entries: [
          cmdEntry,
          { id: nextId(), kind: "out", lines: [`build: ${ctx.build}`] },
        ],
      };

    default:
      return {
        entries: [
          cmdEntry,
          {
            id: nextId(),
            kind: "err",
            text: `command not found: ${command}. Type "help".`,
          },
        ],
      };
  }
}

export default function ContactTerminal({
  email,
  linkedin,
  github,
  location,
  build,
}: ContactTerminalProps) {
  const [log, setLog] = useState<LogEntry[]>(WELCOME_LOG);
  const [value, setValue] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logIdRef = useRef(0);
  const inputId = useId();

  const nextLogId = useCallback(() => {
    logIdRef.current += 1;
    return `log-${logIdRef.current}`;
  }, []);

  const scrollLog = useCallback(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollLog();
  }, [log, scrollLog]);

  const run = useCallback(
    (raw: string) => {
      const result = executeCommand(raw, { email, linkedin, github, location, build }, nextLogId);
      if (result.reset) {
        setLog([...WELCOME_LOG]);
        return;
      }
      if (result.entries.length === 0) return;
      setLog((prev) => [...prev, ...result.entries]);
      result.sideEffect?.();
    },
    [email, linkedin, github, location, build, nextLogId],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = value;
    setValue("");
    run(next);
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="terminal contact-terminal contact-terminal-interactive"
      onClick={focusInput}
      role="region"
      aria-label="Interactive contact terminal"
    >
      <TerminalBar title="reach-out.sh — zsh" />

      <div className="contact-term-shell mono">
        <div className="contact-quick" role="toolbar" aria-label="Quick commands">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="contact-quick-btn"
              onClick={(e) => {
                e.stopPropagation();
                run(cmd);
                focusInput();
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        <div className="contact-log" ref={logRef} tabIndex={-1}>
          {log.map((entry) => {
            if (entry.kind === "sys") {
              return (
                <p key={entry.id} className="contact-log-sys">
                  {entry.text}
                </p>
              );
            }
            if (entry.kind === "cmd") {
              return (
                <div key={entry.id} className="contact-log-cmd">
                  <span className="user">arpit@dev</span>
                  <span className="path">~/contact</span>
                  <span className="cmd-prompt">$ {entry.text}</span>
                </div>
              );
            }
            if (entry.kind === "err") {
              return (
                <p key={entry.id} className="contact-log-err">
                  {entry.text}
                </p>
              );
            }
            return (
              <div key={entry.id} className="contact-log-out">
                {entry.lines.map((line, index) => (
                  <p key={`${entry.id}-${index}`}>{line}</p>
                ))}
              </div>
            );
          })}
        </div>

        <form className="contact-input-row" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor={inputId}>Terminal command</label>
          <span className="contact-input-prefix" aria-hidden="true">
            <span className="user">arpit@dev</span>
            <span className="path">~/contact</span>
            <span className="cmd-prompt">$</span>
          </span>
          <input
            id={inputId}
            ref={inputRef}
            className="contact-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command…"
            aria-label="Enter a terminal command"
          />
        </form>
      </div>
    </div>
  );
}
