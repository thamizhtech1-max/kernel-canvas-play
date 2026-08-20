// Single source of truth for every operation ImageLab supports.
// Kernels are stored row-major as 9 numbers (3x3) plus an optional divisor.

export type OperationKind = "identity" | "point" | "convolution" | "median";

export interface Operation {
  id: string;
  label: string;
  kind: OperationKind;
  group: "basic" | "spatial" | "edge";
  purpose: string;
  /** 3x3 kernel, row-major. Only for kind === "convolution". */
  kernel?: number[];
  /** Kernel normalisation divisor (1 when not needed). */
  divisor?: number;
  divisorLabel?: string;
  /** Gradient results are signed -> show absolute value before clamping. */
  absolute?: boolean;
  formula?: string;
}

export const OPERATIONS: Operation[] = [
  {
    id: "original",
    label: "Original",
    kind: "identity",
    group: "basic",
    purpose: "No processing is applied. The output equals the input image.",
    formula: "P' = P",
  },
  {
    id: "grayscale",
    label: "Grayscale",
    kind: "point",
    group: "basic",
    purpose: "Converts colour to luminance using weighted RGB channels.",
    formula: "Gray = 0.299R + 0.587G + 0.114B",
  },
  {
    id: "invert",
    label: "Invert",
    kind: "point",
    group: "basic",
    purpose: "Produces the photographic negative of each channel.",
    formula: "R' = 255 - R,  G' = 255 - G,  B' = 255 - B",
  },
  {
    id: "mean",
    label: "Mean",
    kind: "convolution",
    group: "spatial",
    purpose: "Smooths the image by averaging the 3x3 neighbourhood.",
    kernel: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    divisor: 9,
    divisorLabel: "1/9",
  },
  {
    id: "gaussian",
    label: "Gaussian",
    kind: "convolution",
    group: "spatial",
    purpose: "Weighted smoothing — the centre pixel carries the most weight.",
    kernel: [1, 2, 1, 2, 4, 2, 1, 2, 1],
    divisor: 16,
    divisorLabel: "1/16",
  },
  {
    id: "median",
    label: "Median",
    kind: "median",
    group: "spatial",
    purpose: "Sorts the 3x3 neighbourhood and picks the middle value. Removes salt & pepper noise.",
  },
  {
    id: "blur",
    label: "Blur",
    kind: "convolution",
    group: "spatial",
    purpose: "Simple box smoothing using a normalised averaging kernel.",
    kernel: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    divisor: 9,
    divisorLabel: "1/9",
  },
  {
    id: "sharpen",
    label: "Sharpen",
    kind: "convolution",
    group: "spatial",
    purpose: "Enhances edges and fine detail by boosting the centre pixel.",
    kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    divisor: 1,
  },
  {
    id: "sobelx",
    label: "Sobel X",
    kind: "convolution",
    group: "edge",
    purpose: "Detects horizontal intensity change — highlights vertical edges.",
    kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
    divisor: 1,
    absolute: true,
  },
  {
    id: "sobely",
    label: "Sobel Y",
    kind: "convolution",
    group: "edge",
    purpose: "Detects vertical intensity change — highlights horizontal edges.",
    kernel: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
    divisor: 1,
    absolute: true,
  },
  {
    id: "laplacian",
    label: "Laplacian",
    kind: "convolution",
    group: "edge",
    purpose: "Second derivative operator — highlights rapid intensity changes.",
    kernel: [0, -1, 0, -1, 4, -1, 0, -1, 0],
    divisor: 1,
    absolute: true,
  },
];

export const getOperation = (id: string): Operation =>
  OPERATIONS.find((op) => op.id === id) ?? OPERATIONS[0];

export const GROUP_LABELS: Record<Operation["group"], string> = {
  basic: "Basic / Point Operations",
  spatial: "Spatial Filters",
  edge: "Edge Detection / Gradient Operators",
};
