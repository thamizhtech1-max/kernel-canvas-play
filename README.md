# Pixel Lab Studio

# BUILD COMPLETE PROJECT — IMAGELAB

I need you to build a complete working college assignment project from scratch.

Project Name:

ImageLab — Interactive Image Processing Laboratory

Subject:

Image and Video Analytics (IVA)

Assignment Topics:

1. Spatial Domain Methods

2. Spatial Filtering

3. Gradient Operators

4. Image Kernels

5. Pixel-Level Image Analysis

6. Convolution Visualization

This is a SIMPLE COLLEGE ASSIGNMENT.

IMPORTANT:

Do not add unnecessary complexity.

Do NOT add:

- Backend

- Database

- Authentication

- User accounts

- Cloud storage

- API server

- History system

- AI/ML features

- Unnecessary dashboards

The project must work completely in the browser using JavaScript and HTML Canvas APIs.

The final result should be:

Simple functionality + correct image processing + professional modern UI + educational visualization.

---

# 1. PROJECT GOAL

Build an interactive web application where a user can:

1. Upload an image

2. Drag and drop an image

3. Choose sample images

4. View the original image

5. Apply image-processing operations

6. View the processed result

7. Select a pixel by clicking the image

8. View pixel coordinates

9. View RGB values

10. View pixel intensity

11. View the 3×3 neighbourhood around the selected pixel

12. View the kernel used by the selected operation

13. View the mathematical pixel calculation

14. View the calculated output pixel

15. Apply the selected filter

16. Reset the image

17. Download the processed image

The application should help students understand how image processing works at pixel level.

The main educational concept should be:

Image → Pixel Selection → 3×3 Neighbourhood → Kernel → Calculation → Output Pixel

---

# 2. TECH STACK

Use the existing project setup.

Preferred stack:

- React

- Vite

- JavaScript

- CSS or existing styling system already installed

- HTML5 Canvas API

- Lucide React icons if already available

Do NOT install unnecessary packages.

Do NOT add a backend.

Use browser Canvas APIs for:

- Reading image pixels

- ImageData manipulation

- Applying filters

- Convolution

- Downloading processed images

Keep the code clean and understandable.

---

# 3. PROJECT STRUCTURE

Before writing code:

1. Inspect the existing project structure.

2. Reuse the existing setup.

3. Do not unnecessarily replace configuration files.

4. Keep the architecture simple.

Suggested structure only if appropriate:

src/

  components/

    Navbar

    LandingPage

    LabPage

    ImageSource

    FilterPanel

    ImageViewer

    PixelInspector

    Neighbourhood

    KernelDisplay

    PixelCalculation

    ActionBar

  utils/

    imageProcessing.js

    kernels.js

  App.jsx

Do not create unnecessary files or excessive abstraction.

---

# 4. LANDING PAGE

Create a clean and professional landing page.

Brand:

ImageLab

Navbar:

- ImageLab logo/name

- Lab

- How It Works

- Theme toggle

Hero heading:

Understand Images

Pixel by Pixel.

Subheading:

Explore pixels, kernels and convolution through an interactive visual laboratory.

Buttons:

1. Launch Image Lab

2. Learn How It Works

The "Launch Image Lab" button should smoothly navigate to the laboratory section/page.

---

# 5. HERO VISUAL

On the right side of the landing hero, create a simple processing pipeline illustration.

Show visually:

Original Image

↓

Pixel Grid

↓

3×3 Kernel

↓

Processed Image

This should be a clean static educational illustration.

Do not make it overly animated.

---

# 6. WHAT YOU CAN EXPLORE

Below the hero, add ONE compact section only.

Title:

What You Can Explore

Create exactly 3 cards.

CARD 1:

Pixels

Inspect individual pixels and their intensity values.

CARD 2:

Kernels

Visualize 3×3 kernels used for image filtering.

CARD 3:

Convolution

Understand how kernels transform image pixels.

Use simple Lucide icons.

Cards should have:

- clean border

- subtle shadow

- rounded corners

- subtle hover effect

- good spacing

Do NOT add additional unnecessary landing-page sections.

---

# 7. HOW IT WORKS

Create a simple educational section explaining the process.

Show these steps:

1. Upload Image

2. Select an Operation

3. Click a Pixel

4. Inspect the 3×3 Neighbourhood

5. View Kernel Calculation

6. See the Output Pixel

Keep it compact and easy to understand.

---

# 8. IMAGE LAB PAGE

Create the main interactive workspace.

The desktop layout should have a professional organized structure.

LEFT COLUMN:

Image Source

Filters

CENTER / MAIN AREA:

Original Image

Processed Image

LOWER SECTION:

Pixel Inspector

3×3 Neighbourhood

Kernel

Pixel Calculation

BOTTOM:

Reset

Apply Filter

Download Result

Use responsive CSS.

---

# 9. IMAGE SOURCE

Create an Image Source card.

Support:

- PNG

- JPG

- JPEG

- WebP

Features:

1. Upload image button

2. Drag and drop area

3. Selected file information

4. Image dimensions

5. Remove image option

Also provide sample images:

- Gradient

- Shapes

- Edges

The sample images should be generated or included locally without requiring external APIs.

When an image is loaded:

- Display filename

- Display dimensions

- Show "Loaded" status

---

# 10. ORIGINAL AND PROCESSED IMAGE

Create two image cards.

Card 1:

ORIGINAL

Card 2:

PROCESSED

Requirements:

- Images must maintain correct aspect ratio

- Never stretch or distort images

- Center images correctly

- Use a subtle checkerboard/dark background behind transparent images if appropriate

- Clicking on the image should allow pixel selection

- Show a visible crosshair or selected pixel indicator

Below each image show metadata such as:

Width × Height

RGB or Grayscale

Pixel Count

Example:

320 × 240

RGB

76,800 pixels

The Original image must always remain unchanged.

The Processed image updates based on the selected filter and Apply Filter action.

---

# 11. FILTER PANEL

Create a Filters card.

Group operations into three sections.

---

## BASIC / POINT OPERATIONS

Buttons:

1. Original

2. Grayscale

3. Invert

---

## SPATIAL FILTERS

Buttons:

1. Mean

2. Gaussian

3. Median

4. Blur

5. Sharpen

---

## EDGE DETECTION / GRADIENT OPERATORS

Buttons:

1. Sobel X

2. Sobel Y

3. Laplacian

Only one filter should be selected at a time.

Selected filter must clearly show:

- Accent border

- Subtle accent background

- Check icon

- Clear active state

Hover state:

- subtle transition

- subtle border/background change

Do not make buttons too large.

---

# 12. IMPLEMENT IMAGE PROCESSING CORRECTLY

Use HTML Canvas and ImageData.

All operations must actually process the image.

Do NOT fake the results.

---

## ORIGINAL

No image processing.

Processed output should match the original image.

No convolution kernel is required.

---

## GRAYSCALE

Use luminance conversion:

Gray = 0.299R + 0.587G + 0.114B

Set:

R = Gray

G = Gray

B = Gray

The Pixel Calculation panel should show the actual calculation for the selected pixel.

Example:

Gray = 0.299(80) + 0.587(120) + 0.114(200)

Output Pixel:

117

---

## INVERT

Use:

R' = 255 - R

G' = 255 - G

B' = 255 - B

Example:

R = 80

R' = 255 - 80 = 175

Show the actual calculation for the selected pixel.

---

# 13. SPATIAL FILTERS

For convolution-based filters, use a 3×3 neighbourhood.

Correctly handle edge pixels.

For edges and corners, use a clear strategy such as clamping/replicating the nearest valid pixel.

Use the same strategy consistently in:

- Image processing

- 3×3 neighbourhood display

- Pixel calculation

---

## MEAN FILTER

Use a 3×3 averaging kernel:

1/9 ×

1 1 1

1 1 1

1 1 1

Purpose:

Smooth the image by averaging neighbouring pixels.

The kernel display should show the actual kernel.

Pixel calculation should dynamically calculate the selected pixel.

---

## GAUSSIAN FILTER

Use a standard 3×3 Gaussian kernel:

1/16 ×

1 2 1

2 4 2

1 2 1

Purpose:

Smooth the image using weighted neighbouring pixels.

The center pixel should have greater weight.

Show the actual kernel and dynamic calculation.

---

## MEDIAN FILTER

Median filtering is NOT a convolution operation.

For the selected pixel:

1. Take the 3×3 neighbourhood values.

2. Sort the values.

3. Select the middle value.

Display something like:

Values:

12, 18, 22, 30, 34, 40, 41, 50, 61

Sorted:

12, 18, 22, 30, 34, 40, 41, 50, 61

Median:

34

Do NOT pretend that Median uses a normal convolution kernel.

The Kernel card should instead display:

Median • 3×3 Neighbourhood Operation

and explain that the median value is selected.

---

## BLUR FILTER

Implement a simple blur using a valid 3×3 smoothing kernel.

It can use an averaging kernel.

Keep it visually and academically understandable.

---

## SHARPEN FILTER

Use:

0  -1   0

-1  5  -1

0  -1   0

Purpose:

Enhance edges and details.

Show this kernel.

---

# 14. GRADIENT OPERATORS

Implement these correctly.

---

## SOBEL X

Use:

-1  0  1

-2  0  2

-1  0  1

Purpose:

Detect vertical intensity changes / vertical edges.

---

## SOBEL Y

Use:

-1  -2  -1

 0   0   0

 1   2   1

Purpose:

Detect horizontal intensity changes / horizontal edges.

---

## LAPLACIAN

Use:

0  -1   0

-1  4  -1

0  -1   0

Purpose:

Highlight rapid intensity changes and edges.

---

# 15. CONVOLUTION LOGIC

For convolution-based operations:

1. Get the selected pixel.

2. Get its 3×3 neighbourhood.

3. Convert neighbouring pixels to intensity values where appropriate.

4. Multiply each neighbourhood value by the corresponding kernel value.

5. Add the results.

6. Clamp the final result to the valid range 0–255 when generating the final image.

The displayed calculation must match the actual processing logic.

Do NOT display hardcoded calculations.

---

# 16. PIXEL INSPECTOR

Create a Pixel Inspector card.

Display:

X

Y

RGB

Intensity

Example:

X

86

Y

74

RGB

8   10   15

Intensity

10

Show a small color preview square.

The displayed values must update when the user clicks another pixel.

For grayscale images, RGB values can be equal.

Coordinates must correspond to the actual clicked image pixel, not the scaled CSS display size.

Correctly map mouse click coordinates to actual image coordinates.

---

# 17. 3×3 NEIGHBOURHOOD

Create a card titled:

3 × 3 NEIGHBOURHOOD

Display the intensity values around the selected pixel.

Example:

10   10   10

10   10   10

10   10   10

Requirements:

- All cells equal size

- Values centered

- Center cell represents selected pixel

- Center cell highlighted

- Updates dynamically when another pixel is clicked

For edge/corner pixels, use the same boundary handling strategy as the actual image processing.

Do NOT leave values blank unless the chosen boundary strategy specifically requires it.

---

# 18. KERNEL VISUALIZATION

Create a Kernel card.

For convolution filters, show:

Filter Name • 3 × 3

Then show the actual matrix.

Example for Sobel X:

-1   0   1

-2   0   2

-1   0   1

Use subtle visual distinction:

- Negative values

- Positive values

- Zero values

Do not use excessive colors.

For point operations:

Grayscale

Invert

Original

Do not show a fake 3×3 kernel.

Instead show:

Point Operation

and display the relevant formula or explanation.

For Median:

Show:

Median • 3×3 Neighbourhood Operation

with a short explanation.

---

# 19. PIXEL CALCULATION

Create a Pixel Calculation card.

The content must dynamically change depending on the selected operation and selected pixel.

---

## CONVOLUTION EXAMPLE

For a convolution filter, display something like:

(82 × -1) + (91 × 0) + (103 × 1)

+ (120 × -2) + (150 × 0) + (161 × 2)

+ (115 × -1) + (138 × 0) + (149 × 1)

────────────────────

OUTPUT PIXEL

83

Use monospace typography for mathematical expressions.

Do not use hardcoded numbers.

Generate the expression dynamically.

---

## GRAYSCALE EXAMPLE

Gray = 0.299(R) + 0.587(G) + 0.114(B)

Gray = 0.299(80) + 0.587(120) + 0.114(200)

OUTPUT PIXEL

117

---

## INVERT EXAMPLE

Original:

R = 80

G = 120

B = 200

Inverted:

R = 175

G = 135

B = 55

---

## MEDIAN EXAMPLE

Neighbourhood Values:

12, 18, 22, 30, 34, 40, 41, 50, 61

Sorted Values:

12, 18, 22, 30, 34, 40, 41, 50, 61

Median:

34

OUTPUT PIXEL

34

---

# 20. OUTPUT PIXEL

Clearly display the final calculated value.

Label:

OUTPUT PIXEL

The output should match the actual operation logic.

For convolution filters, clamp appropriately when showing the final valid pixel value.

For RGB operations, display RGB output where appropriate.

---

# 21. APPLY FILTER BUTTON

Create a prominent:

Apply Filter

button.

When clicked:

- Apply the currently selected operation to the entire image.

- Update the Processed image.

- Preserve the Original image.

- Update relevant UI information.

The button should have a clear active state.

If no image is loaded, disable the button.

---

# 22. RESET BUTTON

Reset should:

- Remove the current filter selection or return to Original

- Restore the processed image to the original image

- Clear/reset pixel inspection state appropriately

- Reset kernel and calculation panels

Do not reload the page.

---

# 23. DOWNLOAD RESULT

Create:

Download Result

When clicked:

- Download the processed image as PNG.

- Use browser APIs only.

- Disable it if there is no processed image.

---

# 24. RESPONSIVE DESIGN

The project must work properly on:

Desktop

Tablet

Mobile

---

## DESKTOP

Maintain the workspace layout.

Prefer:

Left:

Image Source + Filters

Main:

Original + Processed

Below:

Pixel Inspector + Neighbourhood + Kernel + Calculation

---

## TABLET

Reduce columns naturally.

Avoid horizontal overflow.

---

## MOBILE

Stack content in this order:

Image Source

↓

Filters

↓

Original

↓

Processed

↓

Pixel Inspector

↓

3×3 Neighbourhood

↓

Kernel

↓

Pixel Calculation

↓

Actions

Nothing should overflow horizontally.

Filter buttons should remain easy to tap.

Images should remain usable for pixel selection.

---

# 25. VISUAL DESIGN

Create a professional educational technology interface.

Use a LIGHT THEME by default.

Design style:

- Modern developer tool

- Educational technology product

- Polished SaaS-inspired interface

- Clean and minimal

Use:

- White or off-white background

- Dark navy text

- Subtle blue/purple accent

- Soft gray borders

- Rounded cards

- Subtle shadows

- Excellent spacing

- Modern typography

Avoid:

- Neon colors

- Excessive gradients

- Gaming UI

- Over-designed dashboards

- Too many animations

- Generic college-project appearance

The UI should look polished but believable as a student project.

---

# 26. NAVBAR

Create a clean navbar.

Brand:

ImageLab

Navigation:

- Lab

- How It Works

Include:

- Theme toggle

Requirements:

- Clean spacing

- Subtle bottom border

- Responsive

- Sticky if appropriate

- Navigation should smoothly scroll or navigate correctly

Do not overcrowd mobile navigation.

---

# 27. INTERACTIONS AND ANIMATIONS

Use only subtle micro-interactions.

Add subtle transitions for:

- Buttons

- Filter selection

- Cards

- Pixel selection

- Image changes

- Navigation

If Framer Motion is already installed, it may be used.

Do NOT install animation libraries just for small effects.

Respect reduced-motion preferences if practical.

---

# 28. ACCESSIBILITY

Improve:

- Keyboard focus states

- Button labels

- aria-labels where useful

- Image alt text

- Good text contrast

- Visible selected states

Do not sacrifice the clean design.

---

# 29. IMPORTANT CODE RULES

Do not:

- Create a backend

- Add a database

- Add authentication

- Use fake processing results

- Hardcode pixel calculations

- Hardcode neighbourhood values

- Hardcode output pixels

- Use unnecessary dependencies

- Create duplicate image-processing logic

- Over-engineer the application

Do:

- Keep processing logic centralized

- Reuse kernels from a single source where possible

- Keep React state understandable

- Add comments for important image-processing logic

- Use descriptive variable names

- Keep components reasonably small

---

# 30. IMPORTANT CORRECTNESS RULE

The following relationship must always be correct:

Selected Pixel

↓

3×3 Neighbourhood

↓

Selected Kernel / Operation

↓

Mathematical Calculation

↓

Output Pixel

If the user clicks a different pixel, all relevant panels must update.

The displayed calculation must correspond to real pixel data.

Do not create decorative UI that displays incorrect information.

---

# 31. FINAL TESTING

After implementation, run the project.

Make sure:

npm run dev

works successfully.

Test:

---

## IMAGE INPUT

- PNG

- JPG

- JPEG

- WebP

- Drag and Drop

- Sample Images

---

## OPERATIONS

- Original

- Grayscale

- Invert

- Mean

- Gaussian

- Median

- Blur

- Sharpen

- Sobel X

- Sobel Y

- Laplacian

---

## PIXEL INTERACTION

Click:

- Normal pixel

- Edge pixel

- Corner pixel

Verify:

- X coordinate

- Y coordinate

- RGB values

- Intensity

- 3×3 neighbourhood

- Kernel/operation display

- Mathematical calculation

- Output pixel

---

## ACTIONS

Verify:

- Apply Filter

- Reset

- Download Result

---

## RESPONSIVENESS

Check:

- Desktop

- Tablet

- Mobile

Fix:

- Horizontal overflow

- Broken layouts

- Overlapping elements

- Tiny text

- Unusable buttons

---

## CODE QUALITY

Check browser console.

Fix all:

- Runtime errors

- React warnings

- Broken imports

- Missing keys

- Broken buttons

- Undefined state

- Console errors

Do not stop at creating the UI.

Make sure the complete application actually works.

---

# FINAL EXPECTED RESULT

The completed project should be a polished interactive educational web application called:

ImageLab — Interactive Image Processing Laboratory

It should demonstrate:

Spatial Domain Methods

+

Spatial Filters

+

Gradient Operators

+

Image Kernels

+

Pixel-Level Analysis

+

3×3 Neighbourhoods

+

Dynamic Mathematical Calculations

Keep the project simple enough for a college assignment, but make the UI and implementation professional, complete, responsive, and fully functional.

Build the complete project now.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kernel-canvas-play.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6b556ade-9772-404e-ac7a-f3d8e48ae452).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
