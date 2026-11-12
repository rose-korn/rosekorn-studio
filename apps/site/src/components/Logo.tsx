export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="var(--color-rose)" />
        {/* Abstract rose: three overlapping petals */}
        <path d="M16 7c4 3 4 9 0 12-4-3-4-9 0-12z" fill="var(--color-paper)" opacity=".95" />
        <path d="M8.5 15.5c4.5-1.5 9 1.5 9.5 6-4.5 1.5-9-1.5-9.5-6z" fill="var(--color-paper)" opacity=".7" />
        <path d="M23.5 15.5c-4.5-1.5-9 1.5-9.5 6 4.5 1.5 9-1.5 9.5-6z" fill="var(--color-paper)" opacity=".7" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-tight">
        Rosekorn<span className="text-rose">®</span>
      </span>
    </span>
  );
}
