import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import type { SampleId } from "@/lib/sampleImages";

const SAMPLES: { id: SampleId; label: string }[] = [
  { id: "gradient", label: "Gradient" },
  { id: "shapes", label: "Shapes" },
  { id: "edges", label: "Edges" },
];

interface Props {
  fileName: string | null;
  width: number;
  height: number;
  onFile: (file: File) => void;
  onSample: (id: SampleId) => void;
  onRemove: () => void;
}

export function ImageSource({ fileName, width, height, onFile, onSample, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Image Source
      </h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
        Upload Image
      </button>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
        className={`mt-3 rounded-lg border border-dashed px-3 py-6 text-center text-xs transition-colors ${
          dragging
            ? "border-primary bg-primary/5 text-foreground"
            : "border-border text-muted-foreground"
        }`}
      >
        <ImageIcon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
        Drag & drop a PNG, JPG, JPEG or WebP here
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Sample Images
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSample(s.id)}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {fileName ? (
        <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{fileName}</p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {width} × {height} px
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                Loaded
              </span>
            </div>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove image"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
