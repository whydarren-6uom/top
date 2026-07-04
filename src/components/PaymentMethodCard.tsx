import type { PaymentMethod } from "@/src/data/types";
import Tag from "./Tag";

export default function PaymentMethodCard({
  method,
}: {
  method: PaymentMethod;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {method.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {method.type.replaceAll("_", " ")}
            {method.network ? ` / ${method.network}` : ""}
          </p>
        </div>
        {method.network && <Tag label={method.network} />}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <List title="Best for" items={method.bestFor} />
        <List title="Avoid for" items={method.avoidFor} />
        <List title="Notes" items={method.notes} />
      </div>
    </article>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
