interface SectionHeaderProps {
  index: string;
  title: string;
}

export default function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <span className="idx mono">{index}</span>
      <h2>{title}</h2>
    </div>
  );
}
