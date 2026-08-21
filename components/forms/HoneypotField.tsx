interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/** Visually hidden and excluded from the tab order; humans never see it. */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}
