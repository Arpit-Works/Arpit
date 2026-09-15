interface TerminalBarProps {
  title: string;
}

export default function TerminalBar({ title }: TerminalBarProps) {
  return (
    <div className="term-bar">
      <div className="term-dots">
        <span />
        <span />
        <span />
      </div>
      <span className="term-title mono">{title}</span>
    </div>
  );
}
