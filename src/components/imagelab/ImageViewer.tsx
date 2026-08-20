import { useEffect, useRef } from "react";

interface Props {
  title: string;
  image: ImageData | null;
  selected: { x: number; y: number } | null;
  onPick?: (x: number, y: number) => void;
  emptyText: string;
  mode: string;
}

/** Renders an ImageData on a canvas and maps clicks back to real pixel coords. */
export function ImageViewer({ title, image, selected, onPick, emptyText, mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d")!.putImageData(image, 0, 0);
  }, [image]);

  const handlePick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image || !onPick) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Map CSS display coordinates to actual image pixel coordinates.
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * image.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * image.height);
    onPick(
      Math.max(0, Math.min(image.width - 1, x)),
      Math.max(0, Math.min(image.height - 1, y)),
    );
  };

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-border px-4 py-2.5">
        <h3 className="truncate text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {title}
        </h3>
        {onPick && image ? (
          <span className="shrink-0 text-[11px] text-muted-foreground">click to inspect</span>
        ) : null}
      </div>

      <div className="p-4">
        <div className="checkerboard relative flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-border">
          {image ? (
            <div className="relative inline-block max-w-full">
              <canvas
                ref={canvasRef}
                onClick={handlePick}
                aria-label={`${title} image preview`}
                className={`block h-auto max-h-[380px] w-auto max-w-full [image-rendering:pixelated] ${
                  onPick ? "cursor-crosshair" : ""
                }`}
              />
              {selected ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-2 outline-primary"
                  style={{
                    left: `${((selected.x + 0.5) / image.width) * 100}%`,
                    top: `${((selected.y + 0.5) / image.height) * 100}%`,
                    width: 11,
                    height: 11,
                    boxShadow: "0 0 0 1px oklch(1 0 0 / 0.85)",
                  }}
                />
              ) : null}
            </div>
          ) : (
            <p className="px-6 py-12 text-center text-sm text-muted-foreground">{emptyText}</p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          {image ? (
            <>
              <span>
                {image.width} × {image.height}
              </span>
              <span>{mode}</span>
              <span>{(image.width * image.height).toLocaleString()} pixels</span>
            </>
          ) : (
            <span>—</span>
          )}
        </div>
      </div>
    </section>
  );
}
