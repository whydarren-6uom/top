import { userSettings } from "@/src/data/settings";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Settings
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Hardcoded settings for now. Edit <code>src/data/settings.ts</code> to
          update the assumptions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(userSettings).map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {key}
            </p>
            <p className="mt-2 break-words text-lg font-semibold text-zinc-950 dark:text-white">
              {typeof value === "number" ? value.toLocaleString() : String(value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
