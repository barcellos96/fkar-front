interface ModalSpanProps {
  span: string;
  fontWeight?: string;
  textHeight?: string;
}

export default function ModalSpan({
  span,
  fontWeight = "font-normal",
  textHeight = "text-base",
}: ModalSpanProps) {
  return (
    <div className={`flex flex-col ${textHeight} ${fontWeight} `}>
      <span>{span}</span>
    </div>
  );
}
