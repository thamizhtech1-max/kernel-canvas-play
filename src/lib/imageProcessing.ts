// Centralised image-processing logic. Every panel in the lab (neighbourhood,
// kernel, calculation, processed image) reads from these functions so the maths
// shown on screen is always the maths that produced the pixels.

import type { Operation } from "./kernels";

export interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const clamp255 = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

/** Luminance / intensity of a pixel. */
export const intensityOf = (r: number, g: number, b: number) =>
  Math.round(0.299 * r + 0.587 * g + 0.114 * b);

/**
 * Reads a pixel with "clamp to edge" (replicate) boundary handling — the same
 * strategy is used for convolution, the 3x3 neighbourhood display and the
 * calculation panel so all three always agree.
 */
export function getPixel(image: ImageData, x: number, y: number): Rgb {
  const cx = Math.max(0, Math.min(image.width - 1, x));
  const cy = Math.max(0, Math.min(image.height - 1, y));
  const i = (cy * image.width + cx) * 4;
  const d = image.data;
  return { r: d[i] ?? 0, g: d[i + 1] ?? 0, b: d[i + 2] ?? 0, a: d[i + 3] ?? 255 };
}

/** 9 intensity values around (x, y), row-major, centre = index 4. */
export function getNeighbourhood(image: ImageData, x: number, y: number): number[] {
  const values: number[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const p = getPixel(image, x + dx, y + dy);
      values.push(intensityOf(p.r, p.g, p.b));
    }
  }
  return values;
}

const createImageData = (width: number, height: number) =>
  new ImageData(new Uint8ClampedArray(width * height * 4), width, height);

/** Convolution / median result (single intensity value) for one pixel. */
export function computeOutputIntensity(image: ImageData, x: number, y: number, op: Operation) {
  const n = getNeighbourhood(image, x, y);

  if (op.kind === "median") {
    const sorted = [...n].sort((a, b) => a - b);
    return sorted[4] ?? 0;
  }

  const kernel = op.kernel ?? [];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += (n[i] ?? 0) * (kernel[i] ?? 0);
  sum /= op.divisor ?? 1;
  if (op.absolute) sum = Math.abs(sum);
  return clamp255(sum);
}

/**
 * Applies an operation to the whole image and returns a new ImageData.
 * Point operations work on RGB; neighbourhood operations work on the
 * intensity channel and therefore produce a grayscale result.
 */
export function applyOperation(image: ImageData, op: Operation): ImageData {
  const { width, height } = image;
  const out = createImageData(width, height);
  const src = image.data;
  const dst = out.data;

  if (op.kind === "identity") {
    dst.set(src);
    return out;
  }

  if (op.kind === "point") {
    for (let i = 0; i < src.length; i += 4) {
      const r = src[i] ?? 0;
      const g = src[i + 1] ?? 0;
      const b = src[i + 2] ?? 0;
      if (op.id === "grayscale") {
        const gray = intensityOf(r, g, b);
        dst[i] = gray;
        dst[i + 1] = gray;
        dst[i + 2] = gray;
      } else {
        dst[i] = 255 - r;
        dst[i + 1] = 255 - g;
        dst[i + 2] = 255 - b;
      }
      dst[i + 3] = src[i + 3] ?? 255;
    }
    return out;
  }

  // Convolution / median over the 3x3 neighbourhood.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = computeOutputIntensity(image, x, y, op);
      const i = (y * width + x) * 4;
      dst[i] = value;
      dst[i + 1] = value;
      dst[i + 2] = value;
      dst[i + 3] = src[i + 3] ?? 255;
    }
  }
  return out;
}

export interface Calculation {
  /** Monospace lines of the derivation. */
  lines: string[];
  outputLabel: string;
  /** Single numeric output (point-grayscale, convolution, median). */
  output?: number;
  /** RGB output (invert / original). */
  outputRgb?: { r: number; g: number; b: number };
  note?: string;
}

/** Builds the derivation shown in the Pixel Calculation card — never hardcoded. */
export function buildCalculation(
  image: ImageData,
  x: number,
  y: number,
  op: Operation,
): Calculation {
  const p = getPixel(image, x, y);

  if (op.kind === "identity") {
    return {
      lines: ["P' = P  (no processing applied)", `R = ${p.r}   G = ${p.g}   B = ${p.b}`],
      outputLabel: "OUTPUT PIXEL",
      outputRgb: { r: p.r, g: p.g, b: p.b },
    };
  }

  if (op.id === "grayscale") {
    const gray = intensityOf(p.r, p.g, p.b);
    const exact = (0.299 * p.r + 0.587 * p.g + 0.114 * p.b).toFixed(2);
    return {
      lines: [
        "Gray = 0.299(R) + 0.587(G) + 0.114(B)",
        `Gray = 0.299(${p.r}) + 0.587(${p.g}) + 0.114(${p.b})`,
        `Gray = ${exact}  ->  ${gray}`,
      ],
      outputLabel: "OUTPUT PIXEL",
      output: gray,
    };
  }

  if (op.id === "invert") {
    return {
      lines: [
        `Original:  R = ${p.r}   G = ${p.g}   B = ${p.b}`,
        `R' = 255 - ${p.r} = ${255 - p.r}`,
        `G' = 255 - ${p.g} = ${255 - p.g}`,
        `B' = 255 - ${p.b} = ${255 - p.b}`,
      ],
      outputLabel: "OUTPUT PIXEL",
      outputRgb: { r: 255 - p.r, g: 255 - p.g, b: 255 - p.b },
    };
  }

  const n = getNeighbourhood(image, x, y);

  if (op.kind === "median") {
    const sorted = [...n].sort((a, b) => a - b);
    return {
      lines: [
        "Neighbourhood values:",
        n.join(", "),
        "Sorted values:",
        sorted.join(", "),
        `Median = ${sorted[4]}`,
      ],
      outputLabel: "OUTPUT PIXEL",
      output: sorted[4] ?? 0,
      note: "Median is a rank-order (non-linear) operation, not a convolution.",
    };
  }

  const kernel = op.kernel ?? [];
  const rawSum = n.reduce((acc, v, i) => acc + v * (kernel[i] ?? 0), 0);
  const rows: string[] = [];
  for (let r = 0; r < 3; r++) {
    const parts = [0, 1, 2].map((c) => {
      const idx = r * 3 + c;
      return `(${n[idx]} \u00d7 ${kernel[idx]})`;
    });
    rows.push(`${r === 0 ? "  " : "+ "}${parts.join(" + ")}`);
  }
  const divisor = op.divisor ?? 1;
  rows.push(`Sum = ${rawSum}`);
  if (divisor !== 1) rows.push(`Sum / ${divisor} = ${(rawSum / divisor).toFixed(2)}`);
  if (op.absolute) rows.push(`|value| = ${Math.abs(rawSum / divisor).toFixed(2)}`);
  rows.push(`Clamped to 0-255`);

  return {
    lines: rows,
    outputLabel: "OUTPUT PIXEL",
    output: computeOutputIntensity(image, x, y, op),
    note: "Neighbourhood operations run on the intensity channel, so the result is grayscale.",
  };
}
