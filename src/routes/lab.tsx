import { createFileRoute } from "@tanstack/react-router";
import { Lab } from "@/components/imagelab/Lab";
import { Navbar } from "@/components/imagelab/Navbar";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Image Lab — Pixel, Kernel & Convolution Workspace | ImageLab" },
      {
        name: "description",
        content:
          "Interactive lab: upload an image, apply spatial filters and gradient operators, and inspect pixels, 3×3 neighbourhoods and kernel maths.",
      },
      { property: "og:title", content: "Image Lab — ImageLab Workspace" },
      {
        property: "og:description",
        content:
          "Apply grayscale, mean, Gaussian, median, sharpen, Sobel and Laplacian operations and watch the pixel maths update live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Lab />
      </main>
    </div>
  );
}
