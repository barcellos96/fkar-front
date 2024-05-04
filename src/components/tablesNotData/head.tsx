interface Props {
  text: string;
}

export default function HeadeNotDataTable({ text }: Props) {
  return <span className="py-3">{text}</span>;
}
