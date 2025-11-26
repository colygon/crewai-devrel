# Contributing to CrewAI DevRel

Thank you for your interest in contributing! This project showcases a developer relations strategy for CrewAI, and we welcome improvements, corrections, and new content.

## Ways to Contribute

### 1. Content Contributions
- **New Use Cases:** Add multi-agent patterns with code examples
- **Ecosystem Integrations:** Document new tools, providers, or deployment patterns
- **Presentation Slides:** Improve or add slides to how-it-works.html
- **Code Examples:** Share working CrewAI implementations

### 2. Bug Fixes
- Typos and grammar
- Broken links
- Code examples that don't work
- CSS/JS bugs

### 3. Enhancements
- Accessibility improvements
- Performance optimizations
- Mobile responsiveness
- New features for presentation engine

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/crewai-devrel.git
   cd crewai-devrel
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Test locally by opening HTML files in a browser
   - Or run: `python3 -m http.server 8000`

5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add sales automation use case"
   git commit -m "fix: correct code example in presentation"
   git commit -m "docs: update README with new instructions"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Adding a Use Case

1. Edit `use-cases.html`
2. Follow the existing pattern:
   - Problem statement
   - Solution overview
   - Architecture diagram
   - Complete code example
   - Performance tips
3. Test the code example locally
4. Add copy button support with class `copy-button`

## Adding an Ecosystem Integration

1. Edit `ecosystem.html`
2. Add to appropriate section (LLM Providers, Tools, Memory, Deployment)
3. Include code example
4. Link to official documentation

## Adding Presentation Slides

1. Edit `how-it-works.html`
2. Add new `<section class="slide" data-slide-id="N">`
3. Include speaker notes in hidden `<div class="slide-notes">`
4. Update total slides count in controls
5. Test keyboard navigation

## Code Style

### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Use BEM-style class names where appropriate

### CSS
- Use existing design tokens (CSS variables)
- Follow mobile-first responsive design
- Respect `prefers-reduced-motion`

### JavaScript
- Use vanilla JS (no frameworks)
- Add comments for complex logic
- Handle errors gracefully

## Testing Checklist

- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile responsive (test on actual device or dev tools)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Links work and open correctly
- [ ] Code examples are syntactically correct
- [ ] Presentation slides advance properly

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature or content
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` CSS/formatting changes
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update README.md if adding major features
2. Ensure all links work
3. Test on multiple browsers
4. Describe changes clearly in PR description
5. Link any related issues

## Questions?

Open an issue or reach out to [@colygon](https://github.com/colygon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
