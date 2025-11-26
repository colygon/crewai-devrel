# CrewAI Developer Relations Strategy

> A comprehensive developer relations strategy and interactive presentation for CrewAI - the open-source framework for orchestrating autonomous AI agent crews.

🔗 **Live Site:** [Coming Soon on Vercel]  
📊 **Presentation:** [how-it-works.html](how-it-works.html)  
🤖 **CrewAI:** [crewai.com](https://www.crewai.com/) | [GitHub](https://github.com/crewAIInc/crewAI)

## 📋 Overview

This project showcases a world-class developer relations strategy for CrewAI, featuring:

- **Comprehensive DevRel Strategy:** Objectives, pillars, programs, metrics, and 90-day execution plan
- **Interactive Presentation:** Slide deck with keyboard navigation, speaker notes, and Web Speech API narration
- **Real-World Use Cases:** Multi-agent patterns with code examples and architecture diagrams
- **Ecosystem Guide:** LLM providers, tools, memory systems, and deployment patterns
- **Production-Ready:** Static site, self-hosted assets, accessible, and performant

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/colygon/crewai-devrel.git
cd crewai-devrel

# Open in browser
open index.html
# Or serve with Python
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

## 📁 Project Structure

```
crewai-devrel/
├── index.html              # Main DevRel strategy page
├── how-it-works.html       # Interactive presentation
├── use-cases.html          # Multi-agent patterns
├── ecosystem.html          # Integrations and tools
├── assets/
│   ├── css/
│   │   ├── styles.css      # Main stylesheet
│   │   └── presentation.css # Presentation-specific styles
│   ├── js/
│   │   ├── main.js         # Site behaviors
│   │   ├── presentation.js # Slide deck engine
│   │   └── diagrams.js     # Architecture diagrams
│   └── vendor/
│       └── highlightjs/    # Syntax highlighting (local)
├── data/
│   └── metrics.json        # DevRel KPIs and metrics
├── vercel.json             # Deployment configuration
└── README.md               # This file
```

## 🎯 Key Features

### Developer Relations Strategy

- **Five Pillars:** Content, Code, Community, Enablement, and Feedback
- **Programs:** Weekly recipes, biweekly livestreams, monthly hackathons
- **90-Day Plan:** Foundation → Amplification → Acceleration
- **Metrics Dashboard:** Real-time KPIs from data/metrics.json

### Interactive Presentation

**Keyboard Controls:**
- `→` or `Space` - Next slide
- `←` or `Shift+Space` - Previous slide
- `F` - Toggle fullscreen
- `N` - Toggle speaker notes
- `Esc` - Exit fullscreen
- `Home` / `End` - First/last slide

**Features:**
- Progress bar and slide counter
- URL hash bookmarking (`#slide-5`)
- LocalStorage progress saving
- Web Speech API narration (toggle on/off)
- Reduced motion support

### Accessibility

- Semantic HTML5 landmarks
- ARIA labels and roles
- Keyboard-only navigation
- Color contrast WCAG AA compliant
- Reduced motion support
- Focus indicators

## 🛠️ Customization

### Adding a Use Case

Edit `use-cases.html` and add a new section:

```html
<div class="use-case-card">
    <h3>Your Use Case Title</h3>
    <p>Problem statement and outcome</p>
    
    <!-- Architecture diagram -->
    <div class="diagram-container">
        <!-- Agent and task nodes -->
    </div>
    
    <!-- Code example -->
    <pre><code class="language-python">
# Your CrewAI code here
    </code></pre>
</div>
```

### Adding a Slide

Edit `how-it-works.html` and add:

```html
<section class="slide" data-slide-id="N">
    <div class="slide-content">
        <h2>Your Slide Title</h2>
        <p>Content...</p>
    </div>
    <div class="slide-notes" style="display: none;">
        Speaker notes for narration
    </div>
</section>
```

Update `totalSlides` in the presentation controller.

### Updating Metrics

Edit `data/metrics.json` with current stats:

```json
{
  "github": {
    "stars": 25000,
    "forks": 3200,
    ...
  },
  ...
}
```

The site automatically loads and displays these metrics.

## 🎨 Design System

**Colors:**
- Primary: `#06D6A0` (Turquoise)
- Accent: `#7C3AED` (Purple)
- Cyan: `#22D3EE`
- Background: `#0B1020` → `#0F1629`

**Typography:**
- Base: System fonts (SF Pro, Segoe UI, Roboto)
- Mono: SF Mono, Monaco, Cascadia Code

**Spacing Scale:**
- `--space-xs` to `--space-3xl`
- Based on 0.25rem increments

## 📊 Performance

- **No external CDNs:** All assets self-hosted
- **Minimal JavaScript:** <10KB total
- **Optimized CSS:** Scoped, efficient selectors
- **Fast load times:** <1s on 3G

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-addition`)
3. Make your changes
4. Test locally
5. Commit (`git commit -m 'feat: add amazing feature'`)
6. Push (`git push origin feature/amazing-addition`)
7. Open a Pull Request

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgements

- **CrewAI Team:** For building an amazing multi-agent framework
- **Perplexity DevRel:** Inspiration for presentation structure
- **Community:** For feedback and contributions

## 📞 Contact

**Colin Lowenberg**  
AI Developer Relations & Platform Ecosystems

- LinkedIn: [colinlowenberg](https://linkedin.com/in/colinlowenberg)
- GitHub: [@colygon](https://github.com/colygon)
- Twitter: [@colinlowenberg](https://twitter.com/colinlowenberg)

---

**Built with ❤️ for the CrewAI community**

*This project demonstrates a comprehensive approach to developer relations for AI frameworks, combining strategy, education, and community building.*
