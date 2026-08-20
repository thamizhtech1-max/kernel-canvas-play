import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Grid3x3, Layers, ScanEye } from "lucide-react";
import { Navbar } from "@/components/imagelab/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ImageLab — Interactive Image Processing Laboratory" },
      {
        name: "description",
        content:
          "Explore pixels, 3×3 kernels and convolution in the browser. ImageLab shows spatial filters and gradient operators with live pixel-level maths.",
      },
      { property: "og:title", content: "ImageLab — Understand Images Pixel by Pixel" },
      {
        property: "og:description",
        content:
          "An interactive image processing laboratory for spatial domain methods, kernels, convolution and pixel-level analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const CARDS = [
  {
    icon: ScanEye,
    title: "Pixels",
    text: "Inspect individual pixels and their intensity values.",
  },
  {
    icon: Grid3x3,
    title: "Kernels",
    text: "Visualize 3×3 kernels used for image filtering.",
  },
  {
    icon: Layers,
    title: "Convolution",
    text: "Understand how kernels transform image pixels.",
  },
];

const STEPS = [
  ["Upload Image", "Use your own PNG, JPG, JPEG or WebP file, or start from a sample."],
  ["Select an Operation", "Pick a point operation, spatial filter or gradient operator."],
  ["Click a Pixel", "Coordinates, RGB and intensity are read straight from the image data."],
  ["Inspect the 3×3 Neighbourhood", "Edge pixels replicate the nearest valid pixel."],
  ["View Kernel Calculation", "Every multiplication and sum is generated from real values."],
  ["See the Output Pixel", "The clamped result — the exact value written to the output image."],
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Image and Video Analytics
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Understand Images
              <br />
              <span className="text-primary">Pixel by Pixel.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Explore pixels, kernels and convolution through an interactive visual laboratory.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/lab"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Launch Image Lab
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Learn How It Works
              </a>
            </div>
          </div>

          {/* Static pipeline illustration */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <PipelineStep label="Original Image">
              <div className="h-16 w-full rounded-md bg-gradient-to-br from-slate-800 via-primary to-slate-100" />
            </PipelineStep>
            <Arrow />
            <PipelineStep label="Pixel Grid">
              <div className="grid grid-cols-8 gap-0.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="aspect-square rounded-[2px] bg-primary"
                    style={{ opacity: 0.15 + ((i * 7) % 10) / 12 }}
                  />
                ))}
              </div>
            </PipelineStep>
            <Arrow />
            <PipelineStep label="3 × 3 Kernel">
              <div className="grid w-24 grid-cols-3 gap-1">
                {[-1, 0, 1, -2, 0, 2, -1, 0, 1].map((v, i) => (
                  <span
                    key={i}
                    className="grid aspect-square place-items-center rounded-[3px] border border-border bg-muted font-mono text-[10px]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </PipelineStep>
            <Arrow />
            <PipelineStep label="Processed Image">
              <div className="h-16 w-full rounded-md bg-gradient-to-r from-slate-100 via-slate-500 to-slate-900" />
            </PipelineStep>
          </div>
        </section>

        {/* What you can explore */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-semibold tracking-tight">What You Can Explore</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {CARDS.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map(([title, text], i) => (
                <li key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <span className="font-mono text-xs font-semibold text-primary">
                    STEP {i + 1}
                  </span>
                  <h3 className="mt-1.5 text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
            <Link
              to="/lab"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Launch Image Lab
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <footer className="border-t border-border">
          <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
            ImageLab — Interactive Image Processing Laboratory · Image and Video Analytics
            assignment project.
          </p>
        </footer>
      </main>
    </div>
  );
}

function PipelineStep({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

const Arrow = () => (
  <div aria-hidden="true" className="py-1.5 text-center text-sm text-muted-foreground">
    ↓
  </div>
);
