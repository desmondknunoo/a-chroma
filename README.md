# A-Chroma | Next-Gen Colour Suite

![A-Chroma Logo](/public/logo.png)

**A-Chroma** is a premium, next-generation colour intelligence engine designed for creators. It goes beyond simple palette generation to offer a comprehensive suite of tools for mastering colour theory, accessibility, and visual aesthetics.

Built with **Next.js** and **Tailwind CSS**, A-Chroma emphasizes perceptual uniformity (OKLCH), accessibility (WCAG), and a polished, "wow-factor" user experience.

## ✨ Key Features

-   **🎨 Intelligent Palette Generator**: Hit `Spacebar` to instantly generate harmonious colour schemes based on rigorous colour theory logic.
-   **🌈 Visual Gradient Studio**: Create stunning linear and radial gradients visually. Add grain/noise for texture, adjust angles, and export as CSS, JPG, or Palette.
-   **📊 Brand Scale Generator**: Generate consistent 5-step tint & shade scales for design systems. Upload images to extract brand-ready palettes.
-   **📅 Daily Colour Rotation**: A unique "Colour of the Day" for every day of the year (365-day cycle), complete with psychological meaning and usage tips.
-   **👁️ Accessibility First**: Integrated tools to ensure your designs are inclusive, including upcoming Contrast Checkers and simulation of colour vision deficiencies.
-   **🇬🇧 Localized "Colour"**: The application uses International/UK English spelling ("Colour") throughout, reflecting a sophisticated, global brand voice.
-   **💾 Comprehensive Export**: Export your assets as:
    -   **CSS Variables**: Ready to drop into `globals.css`.
    -   **Tailwind Config**: Copy-paste ready for your `tailwind.config.js`.
    -   **PDF Reports**: High-quality brand booklets.
    -   **Images**: PNG, JPEG, and SVG options with custom watermarks.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Micro-interactions**: [Motion](https://motion.dev/) (Framer Motion)
-   **Colour Engine**:
    -   [Chroma.js](https://gka.github.io/chroma.js/) for manipulation.
    -   [ColorThief](https://lokeshdhakar.com/projects/color-thief/) for image extraction.
    -   [Color-Namer](https://github.com/zeke/color-namer) for semantic naming.
-   **Export**: [jsPDF](https://github.com/parallax/jsPDF) for client-side PDF generation.

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/a-chroma.git
    cd a-chroma
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

-   `app/`: Application routes and pages (Home, Generator, Gradient, etc.).
-   `components/`: Reusable UI components (ExportDialog, PaletteGenerator, etc.).
-   `lib/`: Utility functions and static data.
    -   `annual-colors.ts`: The 365-day colour registry.
    -   `colors-data.ts`: Curated colour descriptions and psychology.
    -   `daily-color.ts`: Logic for determining the daily colour.
-   `public/`: Static assets (Logo, icons).

## 📄 License

This project is proprietary software developed by [Achendo.com](https://achendo.com). All rights reserved.
