# 🖼️ ImageLab — Interactive Image Processing Laboratory

> An interactive web application for understanding image processing concepts **pixel by pixel**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20ImageLab-5B5BD6?style=for-the-badge)](https://kernel-canvas-play.vercel.app/)

### 🌐 Live Website
## 👉 https://kernel-canvas-play.vercel.app/

---

## 📌 About the Project

**ImageLab** is an interactive educational web application developed as a college assignment for the **Image and Video Analytics (IVA)** subject.

The application helps students understand important image processing concepts through practical interaction and visualization. Users can upload an image, apply different image-processing operations, select individual pixels, inspect their RGB and intensity values, visualize the 3×3 neighbourhood, view the corresponding kernel, and understand the mathematical calculation behind the output pixel.

The main learning flow of the project is:

```text
Image
  ↓
Pixel Selection
  ↓
3 × 3 Neighbourhood
  ↓
Kernel / Operation
  ↓
Mathematical Calculation
  ↓
Output Pixel
```

---

## 🎯 Assignment Topics Covered

This project demonstrates the following concepts:

- Spatial Domain Methods
- Spatial Filtering
- Gradient Operators
- Image Kernels
- Image Convolution
- Pixel-Level Image Analysis
- 3 × 3 Neighbourhood Processing
- Image Smoothing
- Image Sharpening
- Edge Detection

---

## ✨ Features

### 🖼️ Image Input

- Upload PNG images
- Upload JPG / JPEG images
- Upload WebP images
- Drag and drop support
- Built-in sample images
- Display image dimensions and file information

### 🎨 Point Operations

- Original
- Grayscale
- Invert

### 🔲 Spatial Filters

- Mean Filter
- Gaussian Filter
- Median Filter
- Blur Filter
- Sharpen Filter

### 📈 Gradient and Edge Operators

- Sobel X
- Sobel Y
- Laplacian

### 🔍 Pixel Inspector

Click on an image to inspect an individual pixel.

The application displays:

- X Coordinate
- Y Coordinate
- RGB Values
- Pixel Intensity
- Pixel Color Preview

### 🧩 3 × 3 Neighbourhood

For every selected pixel, ImageLab displays the surrounding **3 × 3 pixel neighbourhood**.

The centre cell represents the selected pixel.

For edge and corner pixels, the application uses a consistent boundary handling strategy by replicating the nearest valid pixel.

### 🔢 Kernel Visualization

The application displays the actual kernel used for the selected operation.

Examples include:

#### Sharpen Kernel

```text
 0  -1   0
-1   5  -1
 0  -1   0
```

#### Sobel X Kernel

```text
-1   0   1
-2   0   2
-1   0   1
```

#### Sobel Y Kernel

```text
-1  -2  -1
 0   0   0
 1   2   1
```

#### Laplacian Kernel

```text
 0  -1   0
-1   4  -1
 0  -1   0
```

### 🧮 Dynamic Pixel Calculation

The mathematical calculation is generated dynamically using actual image pixel values.

For example:

```text
(82 × -1) + (91 × 0) + (103 × 1)

+ (120 × -2) + (150 × 0) + (161 × 2)

+ (115 × -1) + (138 × 0) + (149 × 1)

────────────────────────────

OUTPUT PIXEL

83
```

The displayed values are based on the selected pixel, its neighbourhood, and the currently selected operation.

### ⚙️ Image Actions

- Apply Filter
- Reset Image
- Restore Original Image
- Download Processed Result as PNG

---

## 🧠 How It Works

### Step 1 — Upload an Image

Upload your own image using the upload option or drag and drop an image into the application.

You can also explore the available sample images.

### Step 2 — Select an Operation

Choose an image-processing operation such as:

- Grayscale
- Mean Filter
- Gaussian Filter
- Sharpen
- Sobel X
- Sobel Y
- Laplacian

### Step 3 — Click a Pixel

Click on the image to select a specific pixel.

The application maps the mouse position to the actual image coordinates.

### Step 4 — Inspect the Pixel

View the selected pixel's:

```text
X Coordinate
Y Coordinate
RGB Values
Intensity
```

### Step 5 — View the 3 × 3 Neighbourhood

The application reads the surrounding pixels and displays their intensity values in a 3 × 3 matrix.

### Step 6 — View the Kernel

The selected spatial filter or gradient operator displays its corresponding kernel.

For point operations such as Grayscale and Invert, the corresponding mathematical formula is displayed instead.

### Step 7 — Understand the Calculation

Each neighbourhood pixel value is combined with the corresponding kernel value.

```text
Pixel Value × Kernel Value
```

All values are added together to calculate the output pixel.

### Step 8 — Apply the Filter

The selected operation is applied to the complete image using browser-based image processing.

The original image remains unchanged, while the processed result is displayed separately.

---

## 🖥️ User Interface

The application contains the following main sections:

```text
┌─────────────────────────────────────────────┐
│                  ImageLab                   │
├─────────────────────────────────────────────┤
│                                             │
│  Image Source        Filters                │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Original Image     Processed Image      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Pixel Inspector    3×3 Neighbourhood       │
│                                             │
│  Kernel             Pixel Calculation       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Reset   Apply Filter   Download Result  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | User Interface Development |
| Vite | Frontend Development and Build Tool |
| JavaScript | Application Logic |
| HTML5 Canvas API | Pixel-Level Image Processing |
| CSS | Styling and Responsive Design |
| Lucide Icons | User Interface Icons |
| Vercel | Deployment |

---

## ⚙️ Image Processing Concepts

### Grayscale

Grayscale conversion is performed using the luminance formula:

```text
Gray = 0.299R + 0.587G + 0.114B
```

The calculated grayscale value is assigned to:

```text
R = Gray
G = Gray
B = Gray
```

---

### Invert

Color inversion is performed using:

```text
R' = 255 - R
G' = 255 - G
B' = 255 - B
```

---

### Mean Filter

The Mean Filter smooths an image by averaging neighbouring pixels.

```text
1/9 ×

1  1  1
1  1  1
1  1  1
```

---

### Gaussian Filter

The Gaussian Filter performs weighted smoothing.

```text
1/16 ×

1  2  1
2  4  2
1  2  1
```

The centre pixel receives greater importance.

---

### Median Filter

The Median Filter is a neighbourhood-based operation and is not a traditional convolution filter.

The process is:

```text
1. Read 3 × 3 neighbourhood values
2. Sort the values
3. Select the middle value
```

This is useful for reducing noise while preserving edges.

---

### Sharpen Filter

The Sharpen Filter enhances image details and edges.

```text
 0  -1   0
-1   5  -1
 0  -1   0
```

---

### Sobel X

Sobel X detects vertical intensity changes and vertical edges.

```text
-1   0   1
-2   0   2
-1   0   1
```

---

### Sobel Y

Sobel Y detects horizontal intensity changes and horizontal edges.

```text
-1  -2  -1
 0   0   0
 1   2   1
```

---

### Laplacian

The Laplacian operator highlights rapid intensity changes in an image.

```text
 0  -1   0
-1   4  -1
 0  -1   0
```

---

## 📂 Project Structure

```text
ImageLab
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── ImageSource
│   │   ├── FilterPanel
│   │   ├── ImageViewer
│   │   ├── PixelInspector
│   │   ├── Neighbourhood
│   │   ├── KernelDisplay
│   │   ├── PixelCalculation
│   │   └── ActionBar
│   │
│   ├── lib/
│   │   ├── imageProcessing
│   │   ├── kernels
│   │   └── sampleImages
│   │
│   ├── App
│   └── main
│
├── package.json
└── README.md
```

> The exact file structure may vary slightly depending on the project setup.

---

## 🚀 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/thamizhtech1-max/kernel-canvas-play.git
```

### 2. Move into the Project Directory

```bash
cd kernel-canvas-play
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

## 🌐 Live Demo

### 🚀 Try ImageLab Online

**https://kernel-canvas-play.vercel.app/**

The project is deployed using **Vercel**.

---

## 📚 Educational Purpose

ImageLab was developed to make image-processing concepts easier to understand through direct interaction.

Instead of only studying formulas and kernel matrices, users can:

- Select a real pixel
- View actual RGB values
- Inspect the surrounding pixels
- See the selected kernel
- Follow the mathematical calculation
- Observe the resulting output pixel

This provides a practical visual understanding of **spatial domain image processing and gradient operators**.

---

## 🎓 Academic Information

**Project Title:**  
ImageLab — Interactive Image Processing Laboratory

**Subject:**  
Image and Video Analytics

**Topics Covered:**

- Spatial Domain Methods
- Spatial Filtering
- Gradient Operators
- Image Kernels
- Convolution
- Pixel-Level Image Analysis

---

## 👨‍💻 Author

**Thamizhvaanan D**

GitHub:  
https://github.com/thamizhtech1-max

---

## 📄 License

This project was developed for **educational and academic purposes**.

---

<p align="center">

⭐ If you found this project useful, consider giving the repository a star.

<br />

<b>ImageLab — Understand Images, Pixel by Pixel.</b>

</p>
