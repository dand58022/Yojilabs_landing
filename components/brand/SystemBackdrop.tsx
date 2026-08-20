interface SystemBackdropProps {
  className?: string;
  mirrored?: boolean;
}

export function SystemBackdrop({
  className,
  mirrored = false,
}: SystemBackdropProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      aria-hidden="true"
      className={className}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 33H126L168 73H292" strokeWidth="1.3" />
        <path d="M22 94H101L146 52H212L246 94H297" strokeWidth="1.1" />
        <path d="M62 148H154L196 113H296" strokeWidth="1.3" />
      </g>
      <circle cx="22" cy="33" r="4.5" fill="currentColor" />
      <circle cx="168" cy="73" r="4.5" fill="currentColor" />
      <circle cx="297" cy="94" r="4.5" fill="currentColor" />
      <circle cx="62" cy="148" r="4.5" fill="currentColor" />
      <circle cx="212" cy="52" r="4.5" fill="currentColor" />
    </svg>
  );
}
