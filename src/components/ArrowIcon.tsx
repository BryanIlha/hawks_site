type ArrowIconProps = {
  className?: string;
};

export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
