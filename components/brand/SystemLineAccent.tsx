interface SystemLineAccentProps {
  className?: string;
}

export function SystemLineAccent({ className }: SystemLineAccentProps) {
  return (
    <svg
      viewBox="0 0 74 12"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 6H52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="59" cy="6" r="3.5" fill="currentColor" />
      <path
        d="M65 6H72M72 6L68.5 2.5M72 6L68.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
