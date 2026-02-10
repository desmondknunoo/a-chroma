# A-Chroma | Next-Gen Colour Suite

[![GitHub Stars](https://img.shields.io/github/stars/desmondknunoo/a-chroma?style=social)](https://github.com/desmondknunoo/a-chroma)
![A-Chroma Logo](/public/logo.png)

**A-Chroma** is a premium, next-generation colour intelligence engine designed for creators. It goes beyond simple palette generation to offer a comprehensive suite of tools for mastering colour theory, accessibility, and visual aesthetics.

Built with **Next.js** and **Tailwind CSS**, A-Chroma emphasizes perceptual uniformity (OKLCH), accessibility (WCAG), and a polished, "wow-factor" user experience.

## Key Features

- **Intelligent Palette Generator**: Hit `Spacebar` to instantly generate harmonious colour schemes based on rigorous colour theory logic.
- **Visual Gradient Studio**: Create stunning linear and radial gradients visually. Add grain/noise for texture, adjust angles, and export as CSS, JPG, or Palette.
- **Brand Scale Generator**: Generate consistent 5-step tint & shade scales for design systems. Upload images to export brand-ready palettes.
- **Daily Colour Rotation**: A unique "Colour of the Day" for every day of the year (365-day cycle), complete with psychological meaning and usage tips.
- **Accessibility First**: Integrated tools to ensure your designs are inclusive, including upcoming Contrast Checkers and simulation of colour vision deficiencies.
- **Localized "Colour"**: The application uses International/UK English spelling ("Colour") throughout, reflecting a sophisticated, global brand voice.
- **Comprehensive Export**: Export your assets as:
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
    git clone https://github.com/desmondknunoo/a-chroma.git
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

## 🤝 Contributing to A-Chroma

We welcome contributions from the community! Whether you want to fix a bug, add a new feature, or improve documentation, your help is appreciated.

### How to Contribute

#### 1. Fork the Repository

Click the "Fork" button at the top right of this page to create your own copy of the repository.

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/a-chroma.git
cd a-chroma
```

#### 3. Create a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/amazing-new-feature
# or
git checkout -b fix/annoying-bug
```

#### 4. Make Your Changes

Make your changes to the codebase. Ensure you follow the existing code style and conventions.

#### 5. Test Your Changes

Run the development server and test your changes:

```bash
npm run dev
```

#### 6. Commit Your Changes

Write a clear, descriptive commit message:

```bash
git add .
git commit -m "Add amazing new feature that does X"
```

#### 7. Push to GitHub

```bash
git push origin feature/amazing-new-feature
```

#### 8. Create a Pull Request

1.  Go to the original repository: https://github.com/desmondknunoo/a-chroma
2.  Click "New Pull Request"
3.  Select your branch from the dropdown
4.  Fill in the PR template with:
    -   A clear title
    -   Description of what you changed
    -   Why you made these changes
    -   Screenshots if applicable
    -   Testing steps

### Pull Request Guidelines

-   **One PR per feature**: Keep pull requests focused on a single feature or bug fix.
-   **Keep it small**: Smaller PRs are easier to review and merge faster.
-   **Follow code style**: Use the existing code conventions, linting, and formatting.
-   **Test thoroughly**: Ensure your changes don't break existing functionality.
-   **Update documentation**: If you're adding new features, update the README.md or add comments.
-   **Be responsive**: Address review comments promptly.

### Types of Contributions We Welcome

- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements
- Performance improvements
- Code refactoring
- Translation/localization
- Adding tests
- Improving accessibility

### Code Style

-   Use TypeScript for all new code
-   Follow the existing component patterns in `components/`
-   Use Tailwind CSS for styling
-   Write meaningful variable and function names
-   Add comments for complex logic
-   Keep components small and focused

### Reporting Bugs

If you find a bug, please open an issue with:

-   A clear title
-   Steps to reproduce
-   Expected behavior
-   Actual behavior
-   Screenshots if applicable
-   Browser/OS information

### Suggesting Features

Have an idea? We'd love to hear it! Open an issue with:

-   A clear description of the feature
-   Why you think it would be useful
-   Any similar features you've seen
-   Possible implementation approach

### Communication

-   **Issues**: Use GitHub Issues for bug reports and feature requests
-   **Pull Requests**: Use PRs for code contributions
-   **Email**: For sensitive issues, contact hi@achendo.com

Thank you for contributing to A-Chroma!

## 📄 License

This project is open source under the **Custom Open Source License** by Achendo Agency.

### Important: Generated Assets Are Free Forever

**All colour palettes, gradients, brand kits, and other assets created USING A-Chroma are free for both personal and commercial use.** You own what you create. There are no restrictions on how you use the outputs generated by this software.

### Software Usage Rights

✅ **Permitted:**
-   Study and learn from the codebase
-   Submit pull requests to improve the project
-   Share information about this software with others for free

❌ **Not Permitted (Without Permission):**
-   Sell A-Chroma as a standalone product
-   Integrate A-Chroma into commercial software or platforms
-   Include A-Chroma in paid products or services
-   Build commercial tools on top of A-Chroma

### Commercial Integration

If you wish to integrate A-Chroma into any commercial software, platform, or service, you must contact **Achendo Agency** for permission and licensing:

-   **Email**: hi@achendo.com
-   **Website**: https://achendo.com

Unauthorized commercial integration or sale of this software is strictly prohibited and will be subject to legal action.

### Attribution

While not required, we appreciate attribution when referencing A-Chroma:

> Powered by [A-Chroma](https://achendo.com) by Achendo Agency

---

This project is developed and maintained by [Achendo Agency](https://achendo.com). All rights reserved except as specifically granted in the [LICENSE](LICENSE) file.
