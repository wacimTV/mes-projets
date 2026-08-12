# Personal Portfolio Website

A stunning, ultra-premium portfolio website built with **Next.js 15**, featuring Apple-style minimalism, smooth animations, and cutting-edge design patterns.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=for-the-badge&logo=framer)

## Features

### Design & UI

- **Premium Minimalist Aesthetic** - Apple-inspired design with pixel-perfect spacing
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Particle Field** - Dynamic particle system that responds to mouse movement
- **Smooth Animations** - Framer Motion powered scroll-triggered animations

### Sections

- **Hero** - Striking introduction with animated text and floating elements
- **About** - Personal story with interactive timeline and statistics
- **Projects** - Showcase of work with premium hover effects
- **Skills** - Animated progress bars with categorized expertise
- **Services** - Service offerings with elegant card design
- **Testimonials** - Client feedback carousel
- **Contact** - Validated contact form with social links

### Technical

- **Next.js 15** - Latest App Router with React Server Components
- **TypeScript** - Full type safety throughout the codebase
- **Tailwind CSS v4** - Modern utility-first styling with CSS variables
- **Framer Motion** - Production-ready motion library
- **Responsive Design** - Mobile-first approach, works on all devices
- **Accessibility** - WCAG compliant with semantic HTML

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm, npm, or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/senotron/portfolio.git
cd portfolio
````

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css         # Global styles and theme tokens
│   ├── layout.tsx          # Root layout with fonts and providers
│   └── page.tsx            # Main page component
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── about-section.tsx
│   ├── contact-section.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── particle-field.tsx
│   ├── preloader.tsx
│   ├── projects-section.tsx
│   ├── services-section.tsx
│   ├── skills-section.tsx
│   ├── testimonials-section.tsx
│   └── theme-provider.tsx
└── lib/
    └── utils.ts             # Utility functions
```

## Customization

### Personal Information

Update personal details in component files:

* `components/hero-section.tsx` - Name, title, introduction
* `components/about-section.tsx` - Bio, timeline, statistics
* `components/projects-section.tsx` - Projects
* `components/skills-section.tsx` - Skills
* `components/services-section.tsx` - Services
* `components/contact-section.tsx` - Contact info, social links

### Theme Colors

Modify colors in `app/globals.css`:

```css
@theme inline {
  --color-primary: /* your primary color */;
  --color-accent: /* your accent color */;
}
```

### Fonts

Change fonts in `app/layout.tsx` by importing different Google Fonts.

## Performance

* **Lighthouse Score:** 95+ across all metrics
* **Core Web Vitals:** Optimized for LCP, FID, CLS
* **Bundle Size:** Minimal JavaScript footprint with code splitting

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/senotron/portfolio)

### Other Platforms

```bash
# Build for production
pnpm build
# Start production server
pnpm start
```

## Tech Stack

| Category      | Technology              |
| ------------- | ----------------------- |
| Framework     | Next.js 15              |
| Language      | TypeScript              |
| Styling       | Tailwind CSS v4         |
| Animations    | Framer Motion           |
| UI Components | Shadcn UI               |
| Icons         | Lucide React            |
| Fonts         | Inter, Playfair Display |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Design inspired by Apple, Vercel, and Linear
* UI components from [shadcn/ui](https://ui.shadcn.com)
* Icons from [Lucide](https://lucide.dev)
