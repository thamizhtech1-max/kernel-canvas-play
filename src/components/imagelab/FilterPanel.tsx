import { Check } from "lucide-react";
import { GROUP_LABELS, OPERATIONS, type Operation } from "@/lib/kernels";

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

const GROUPS: Operation["group"][] = ["basic", "spatial", "edge"];

export function FilterPanel({ selectedId, onSelect }: Props) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Filters
      </h2>

      <div className="mt-3 space-y-4">
        {GROUPS.map((group) => (
          <div key={group}>
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {GROUP_LABELS[group]}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPERATIONS.filter((op) => op.group === group).map((op) => {
                const active = op.id === selectedId;
                return (
                  <button
                    key={op.id}
                    type="button"
                    aria-pressed={active}
                    title={op.purpose}
                    onClick={() => onSelect(op.id)}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    {active ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    {op.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
