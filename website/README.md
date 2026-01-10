# Pyreload Marketing Website

Public-facing marketing website for Pyreload - a Python file monitor with polling support.

## Features

- **Hero Section** - Compelling intro with polling support highlight
- **Quick Examples** - Interactive tabs (Basic, Docker, Config)
- **Features** - 6 key features showcasing Pyreload capabilities
- **Polling Highlight** - Side-by-side comparison of with/without polling
- **Use Cases** - 6 practical development scenarios
- **Modern UI** - Dark theme with cyan/blue gradients
- **Responsive Design** - Mobile-first approach
- **Fast** - Next.js 15 with static export

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Deployment**: Static export (GitHub Pages compatible)

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3004)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm start
```

## Project Structure

```
website/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── src/
│   └── styles/
│       └── globals.css   # Global styles and Tailwind
├── public/               # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Page Sections

1. **Navigation** - Fixed header with links to docs, GitHub, PyPI
2. **Hero** - Main value proposition with polling support badge
3. **Quick Examples** - Tabbed code examples
4. **Features** - Grid of 6 key features
5. **Polling Highlight** - Visual comparison section
6. **Use Cases** - Common development scenarios
7. **CTA** - Call-to-action with PyPI and docs links
8. **Footer** - Links and credits

## Key Features

- Highlights polling mode as the main differentiator
- Interactive code examples with tabs
- Responsive design for all devices
- Fast page loads with static export
- SEO optimized with metadata

## External Links

- **Documentation**: https://dotbrains.github.io/pyreload-cli
- **GitHub**: https://github.com/dotbrains/pyreload-cli
- **PyPI**: https://pypi.org/project/pyreload-cli-cli

## Deployment

The site is configured for static export and can be deployed to:

- GitHub Pages
- Vercel
- Netlify
- Any static hosting

```bash
pnpm run build
# Output is in out/ directory
```

## License

MIT
