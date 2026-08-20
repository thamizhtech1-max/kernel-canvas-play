// Sample images are drawn locally on a canvas — no network requests.

export type SampleId = "gradient" | "shapes" | "edges";

const W = 320;
const H = 240;

export function createSample(id: SampleId): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  if (id === "gradient") {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#0b1220");
    g.addColorStop(0.5, "#4f46e5");
    g.addColorStop(1, "#f8fafc");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const radial = ctx.createRadialGradient(W * 0.7, H * 0.3, 8, W * 0.7, H * 0.3, 120);
    radial.addColorStop(0, "rgba(255,255,255,0.9)");
    radial.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);
  }

  if (id === "shapes") {
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(30, 40, 90, 90);
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(210, 90, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(120, 210);
    ctx.lineTo(70, 150);
    ctx.lineTo(170, 150);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 4;
    ctx.strokeRect(200, 150, 90, 60);
  }

  if (id === "edges") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    for (let x = 0; x < W; x += 40) ctx.fillRect(x, 0, 20, H);
    ctx.fillStyle = "#94a3b8";
    for (let y = 0; y < H; y += 60) ctx.fillRect(0, y, W, 8);
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(W, 0);
    ctx.stroke();
  }

  return canvas;
}
