export default function WarningBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-start rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs leading-snug text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
      {children}
    </span>
  );
}
