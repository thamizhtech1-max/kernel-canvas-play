import type { Calculation, Rgb } from "@/lib/imageProcessing";
import type { Operation } from "@/lib/kernels";

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
    <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {title}
    </h3>
    <div className="mt-3">{children}</div>
  </section>
);

const Empty = ({ text }: { text: string }) => (
  <p className="text-sm text-muted-foreground">{text}</p>
);

/* ---------------------------------- Pixel Inspector --------------------------------- */

export function PixelInspector({
  selected,
  pixel,
  intensity,
}: {
  selected: { x: number; y: number } | null;
  pixel: Rgb | null;
  intensity: number | null;
}) {
  return (
    <Card title="Pixel Inspector">
      {selected && pixel ? (
        <div className="space-y-2 font-mono text-sm">
          <Row label="X" value={String(selected.x)} />
          <Row label="Y" value={String(selected.y)} />
          <Row label="RGB" value={`${pixel.r}  ${pixel.g}  ${pixel.b}`} />
          <Row label="Intensity" value={String(intensity ?? 0)} />
          <div className="flex items-center gap-2 pt-1">
            <span
              className="h-7 w-7 rounded-md border border-border"
              style={{ backgroundColor: `rgb(${pixel.r},${pixel.g},${pixel.b})` }}
              aria-label={`Colour preview rgb(${pixel.r},${pixel.g},${pixel.b})`}
            />
            <span className="text-xs text-muted-foreground">colour preview</span>
          </div>
        </div>
      ) : (
        <Empty text="Click a pixel on the original image to inspect it." />
      )}
    </Card>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
    <span className="text-xs tracking-wider text-muted-foreground uppercase">{label}</span>
    <span className="truncate">{value}</span>
  </div>
);

/* --------------------------------- Neighbourhood ---------------------------------- */

export function Neighbourhood({ values }: { values: number[] | null }) {
  return (
    <Card title="3 × 3 Neighbourhood">
      {values ? (
        <>
          <div className="grid grid-cols-3 gap-1.5">
            {values.map((v, i) => (
              <span
                key={i}
                className={`grid aspect-square place-items-center rounded-md border font-mono text-sm ${
                  i === 4
                    ? "border-primary bg-primary/10 font-semibold text-primary"
                    : "border-border bg-muted/40"
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Intensity values. Centre = selected pixel. Edges replicate the nearest pixel.
          </p>
        </>
      ) : (
        <Empty text="Select a pixel to see its neighbourhood." />
      )}
    </Card>
  );
}

/* ------------------------------------ Kernel -------------------------------------- */

export function KernelDisplay({ op }: { op: Operation }) {
  const cellClass = (v: number) =>
    v > 0
      ? "border-primary/40 bg-primary/10 text-primary"
      : v < 0
        ? "border-border bg-muted text-foreground"
        : "border-border bg-card text-muted-foreground";

  return (
    <Card title="Kernel">
      {op.kind === "convolution" && op.kernel ? (
        <>
          <p className="font-mono text-xs text-muted-foreground">
            {op.label} • 3 × 3{op.divisorLabel ? ` • ${op.divisorLabel} ×` : ""}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {op.kernel.map((v, i) => (
              <span
                key={i}
                className={`grid aspect-square place-items-center rounded-md border font-mono text-sm ${cellClass(v)}`}
              >
                {v}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{op.purpose}</p>
        </>
      ) : op.kind === "median" ? (
        <>
          <p className="font-mono text-xs text-muted-foreground">
            Median • 3×3 Neighbourhood Operation
          </p>
          <p className="mt-2 text-sm">
            No convolution kernel. The nine neighbourhood values are sorted and the middle
            (5th) value becomes the output pixel.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">{op.purpose}</p>
        </>
      ) : (
        <>
          <p className="font-mono text-xs text-muted-foreground">Point Operation</p>
          <p className="mt-2 rounded-md border border-border bg-muted/40 p-3 font-mono text-sm break-words">
            {op.formula}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">{op.purpose}</p>
        </>
      )}
    </Card>
  );
}

/* -------------------------------- Pixel Calculation ------------------------------- */

export function PixelCalculation({ calc }: { calc: Calculation | null }) {
  return (
    <Card title="Pixel Calculation">
      {calc ? (
        <>
          <div className="space-y-1 overflow-x-auto font-mono text-[12px] leading-relaxed whitespace-pre-wrap">
            {calc.lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="mt-3 border-t border-dashed border-border pt-3">
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              {calc.outputLabel}
            </p>
            {calc.outputRgb ? (
              <p className="mt-1 font-mono text-xl font-semibold text-primary">
                {calc.outputRgb.r}, {calc.outputRgb.g}, {calc.outputRgb.b}
              </p>
            ) : (
              <p className="mt-1 font-mono text-2xl font-semibold text-primary">{calc.output}</p>
            )}
          </div>
          {calc.note ? <p className="mt-2 text-xs text-muted-foreground">{calc.note}</p> : null}
        </>
      ) : (
        <Empty text="Select a pixel to see the calculation for the current operation." />
      )}
    </Card>
  );
}
