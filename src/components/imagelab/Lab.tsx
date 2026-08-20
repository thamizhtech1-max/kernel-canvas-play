import { Download, RotateCcw, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterPanel } from "./FilterPanel";
import { ImageSource } from "./ImageSource";
import { ImageViewer } from "./ImageViewer";
import {
  KernelDisplay,
  Neighbourhood,
  PixelCalculation,
  PixelInspector,
} from "./InspectorPanels";
import {
  applyOperation,
  buildCalculation,
  getNeighbourhood,
  getPixel,
  intensityOf,
} from "@/lib/imageProcessing";
import { getOperation } from "@/lib/kernels";
import { createSample, type SampleId } from "@/lib/sampleImages";

const MAX_SIDE = 480; // keeps pixel-level work responsive in the browser

/** Draws any image source into a canvas and extracts its ImageData. */
function toImageData(source: HTMLImageElement | HTMLCanvasElement, w: number, h: number) {
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
  const width = Math.max(1, Math.round(w * scale));
  const height = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export function Lab() {
  const [original, setOriginal] = useState<ImageData | null>(null);
  const [processed, setProcessed] = useState<ImageData | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [opId, setOpId] = useState("original");
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const op = getOperation(opId);

  const loadImage = (data: ImageData, name: string) => {
    setOriginal(data);
    setProcessed(data);
    setFileName(name);
    setSelected(null);
    setError(null);
  };

  const handleFile = (file: File) => {
    if (!/^image\/(png|jpeg|jpg|webp)$/.test(file.type)) {
      setError("Please choose a PNG, JPG, JPEG or WebP image.");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      loadImage(toImageData(img, img.naturalWidth, img.naturalHeight), file.name);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError("That image could not be read.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleSample = (id: SampleId) => {
    const canvas = createSample(id);
    loadImage(toImageData(canvas, canvas.width, canvas.height), `sample-${id}.png`);
  };

  const handleRemove = () => {
    setOriginal(null);
    setProcessed(null);
    setFileName(null);
    setSelected(null);
    setOpId("original");
  };

  const handleApply = () => {
    if (!original) return;
    setProcessed(applyOperation(original, op));
  };

  const handleReset = () => {
    setOpId("original");
    setProcessed(original);
    setSelected(null);
  };

  const handleDownload = () => {
    if (!processed) return;
    const canvas = document.createElement("canvas");
    canvas.width = processed.width;
    canvas.height = processed.height;
    canvas.getContext("2d")!.putImageData(processed, 0, 0);
    const link = document.createElement("a");
    link.download = `imagelab-${op.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Derived pixel-level data — recomputed whenever pixel/op/image change.
  const pixel = original && selected ? getPixel(original, selected.x, selected.y) : null;
  const neighbourhood = useMemo(
    () => (original && selected ? getNeighbourhood(original, selected.x, selected.y) : null),
    [original, selected],
  );
  const calc = useMemo(
    () => (original && selected ? buildCalculation(original, selected.x, selected.y, op) : null),
    [original, selected, op],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Image Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Load an image, pick an operation, then click any pixel to follow the maths end to end.
        </p>
      </header>

      {error ? (
        <p role="alert" className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-5">
          <ImageSource
            fileName={fileName}
            width={original?.width ?? 0}
            height={original?.height ?? 0}
            onFile={handleFile}
            onSample={handleSample}
            onRemove={handleRemove}
          />
          <FilterPanel selectedId={opId} onSelect={setOpId} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <ImageViewer
            title="Original"
            image={original}
            selected={selected}
            onPick={(x, y) => setSelected({ x, y })}
            emptyText="No image loaded yet. Upload one or pick a sample."
            mode="RGB"
          />
          <ImageViewer
            title="Processed"
            image={processed}
            selected={selected}
            emptyText="The processed result appears here."
            mode={op.kind === "identity" || op.id === "invert" ? "RGB" : "Grayscale"}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <PixelInspector
          selected={selected}
          pixel={pixel}
          intensity={pixel ? intensityOf(pixel.r, pixel.g, pixel.b) : null}
        />
        <Neighbourhood values={neighbourhood} />
        <KernelDisplay op={op} />
        <PixelCalculation calc={calc} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleReset}
          disabled={!original}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={!original}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Wand2 className="h-4 w-4" aria-hidden="true" />
          Apply Filter
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!processed}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Result
        </button>
      </div>
    </div>
  );
}
