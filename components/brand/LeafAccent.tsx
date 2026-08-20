interface LeafAccentProps {
  className?: string;
  mirrored?: boolean;
}

export function LeafAccent({ className, mirrored = false }: LeafAccentProps) {
  return (
    <svg
      viewBox="0 0 220 180"
      aria-hidden="true"
      className={className}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 156c22-44 24-88 7-132" strokeWidth="2.2" />
        <path d="M66 148c18-34 23-68 16-104" strokeWidth="2" />
        <path d="M94 140c18-29 23-57 20-88" strokeWidth="1.9" />
        <path d="M122 132c16-24 22-48 21-75" strokeWidth="1.8" />
      </g>
      <g fill="currentColor">
        <path d="M46 42c18-1 31 6 39 21-18 6-32 1-42-16 1-2 2-4 3-5Z" opacity=".7" />
        <path d="M80 57c20-1 34 7 42 24-19 5-34-2-44-19 0-2 1-4 2-5Z" opacity=".62" />
        <path d="M36 82c20-1 34 8 43 26-19 4-35-4-45-22 0-1 1-3 2-4Z" opacity=".6" />
        <path d="M102 89c17-1 29 5 36 19-16 4-28-1-38-15 0-2 1-3 2-4Z" opacity=".56" />
        <path d="M60 114c17-1 29 5 37 19-16 4-29-1-38-16 0-1 0-2 1-3Z" opacity=".54" />
        <path d="M126 116c15-1 26 4 33 15-14 4-25 0-34-12 0-1 0-2 1-3Z" opacity=".5" />
      </g>
    </svg>
  );
}
