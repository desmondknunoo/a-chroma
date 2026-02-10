# Contributing to A-Chroma

Thank you for your interest in contributing to A-Chroma! This document provides guidelines and instructions for contributing to this project.

## About A-Chroma

A-Chroma is a next-generation colour intelligence engine developed and maintained by **Achendo Agency**. It's an open source project licensed under a Custom Open Source License.

**Important:** All colour palettes, gradients, brand kits, and other assets created USING A-Chroma are free for both personal and commercial use. The software itself cannot be sold or integrated commercially without permission from Achendo Agency.

## How to Contribute

### 1. Fork the Repository

Start by forking the repository on GitHub:

1. Go to [https://github.com/desmondknunoo/a-chroma](https://github.com/desmondknunoo/a-chroma)
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination

### 2. Clone Your Fork

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/a-chroma.git
cd a-chroma
```

### 3. Set Up Upstream Remote

Keep your fork synced with the original repository:

```bash
git remote add upstream https://github.com/desmondknunoo/a-chroma.git
```

### 4. Create a Branch

Create a new branch for your feature or bug fix:

```bash
# For new features
git checkout -b feature/amazing-new-feature

# For bug fixes
git checkout -b fix/annoying-bug
```

### 5. Make Your Changes

Make your changes to the codebase. Please follow these guidelines:

- **Code Style**: Follow the existing code conventions in the project
- **TypeScript**: Use TypeScript for all new code
- **Components**: Follow existing component patterns in `components/`
- **Styling**: Use Tailwind CSS for styling
- **Naming**: Use meaningful variable and function names
- **Documentation**: Add comments for complex logic

### 6. Test Your Changes

Run the development server and test your changes:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your changes.

### 7. Commit Your Changes

Write a clear, descriptive commit message:

```bash
git add .
git commit -m "Add amazing new feature that does X"
```

**Commit Message Guidelines:**
- Use the imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Add more details in the body if needed
- Reference related issues using #issue-number

### 8. Push to GitHub

```bash
git push origin feature/amazing-new-feature
```

### 9. Create a Pull Request

1. Go to [https://github.com/desmondknunoo/a-chroma](https://github.com/desmondknunoo/a-chroma)
2. Click "New Pull Request"
3. Select your branch from the dropdown
4. Fill in the PR template

## Pull Request Guidelines

### What We Welcome

- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements
- Performance improvements
- Code refactoring
- Translation/localization
- Adding tests
- Improving accessibility

### PR Requirements

- **One PR per feature**: Keep pull requests focused on a single feature or bug fix
- **Keep it small**: Smaller PRs are easier to review and merge faster
- **Follow code style**: Use existing linting and formatting
- **Test thoroughly**: Ensure changes don't break existing functionality
- **Update documentation**: Update README.md or add comments for new features
- **Be responsive**: Address review comments promptly

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
Describe how you tested this change

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types for props and function parameters
- Avoid using `any` type

### Components

- Use functional components with hooks
- Follow the existing pattern in `components/ui/` for UI components
- Use Lucide React for icons
- Keep components small and focused

### Tailwind CSS

- Use Tailwind utility classes
- Follow the existing color scheme
- Use responsive breakpoints (sm, md, lg, xl)

### Git Conventions

- **main**: Stable production code
- **develop**: Development branch
- **feature/***: New features
- **fix/***: Bug fixes
- **hotfix/***: Critical bug fixes
- **release/***: Release preparation

## Reporting Bugs

Found a bug? Please open an issue with:

- Clear title describing the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/OS information
- Error messages

## Suggesting Features

Have an idea for a new feature? We'd love to hear it! Open an issue with:

- Clear description of the feature
- Why you think it would be useful
- Any similar features you've seen
- Possible implementation approach

## Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Pull Requests**: Use PRs for code contributions
- **Email**: For sensitive issues, contact hi@achendo.com

## License

By contributing to A-Chroma, you agree that your contributions will be licensed under the project's Custom Open Source License. The license permits studying and learning from the code, contributing to the project, and sharing information about the software. However, selling or commercially integrating A-Chroma requires written permission from Achendo Agency.

**Generated assets (palettes, gradients, brand kits) created using A-Chroma are free for any use - personal or commercial.**

For full license details, see the [LICENSE](LICENSE) file.

## Recognition

Contributors will be recognized in the project's README.md and on the GitHub repository.

---

**Thank you for contributing to A-Chroma!**

Built with by [Achendo Agency](https://achendo.com)
