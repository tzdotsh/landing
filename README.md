# TV Website - DevOps Documentation

Internal Nuxt.js application for TV streaming platform management. This README contains technical setup and deployment information for development and operations teams.

## 🛠️ Tech Stack

- **Framework**: Nuxt 4
- **CSS**: TailwindCSS 4 (using `@tailwindcss/vite`)
- **UI Libraries**: Reka UI, Headless UI
- **Package Manager**: Bun
- **State**: Pinia + Pinia Colada
- **CMS**: Payload CMS Integration
- **Forms**: FormKit
- **Secrets**: Infisical
- **Runtime**: Node.js 18+
- **Cache/Storage**: Redis (Nitro Storage)

## 📁 Project Structure

```
root/
├── front/                  # Main application code
│   ├── components/         # Vue components (organized by feature)
│   │   ├── apps/           # App selection & download
│   │   ├── auth-check/     # Subscription verification
│   │   ├── blog/           # Blog & Articles
│   │   ├── channels/       # Channel catalog & search
│   │   ├── home/           # Landing page sections
│   │   ├── ui/             # Reusable UI elements (Lunar design)
│   │   └── ...
│   ├── pages/              # Application Routes
│   │   ├── v[version]/     # Versioned routes
│   │   └── ...
│   ├── composables/        # Shared logic
│   ├── middleware/         # Route middleware
│   ├── store/              # Pinia stores (apps, channels, blog, etc.)
│   └── assets/             # Static assets & global styles
├── i18n/                   # Translations (en, es)
├── public/                 # Public static files
├── scripts/                # Utility scripts (e.g., TMDB updates)
├── nuxt.config.ts          # Nuxt configuration
└── package.json            # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- Node.js 18+ (fallback)
- [Infisical](https://infisical.cccambox.com/) CLI (for environment variables)

### Development Setup

```bash
# Install dependencies
bun install

# Start dev server (uses Infisical for env vars)
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

### Utility Scripts

```bash
# Update TMDB images
bun update:tmdb
```

## 🔧 Configuration

### Environment Variables

We use **Infisical** for secret management. The `dev` script automatically fetches secrets for the `dev` environment.

For manual `.env` file creation (e.g., for build), ensure you have:

```bash
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_PUBLIC_PAYLOAD_BASE_URL=http://localhost:4050
NUXT_PUBLIC_VALID_DOMAIN=...
# ... and other secrets managed by Infisical
```

### Key Config Files

- `nuxt.config.ts`: Main configuration.
  - Extends `tv-layout` (local or remote based on environment).
  - Configures modules: `@nuxtjs/seo`, `@nuxtjs/fontaine`, `nuxt-delay-hydration`, `nuxt-vitalizer`.
  - Defines `routeRules` for aggressive caching (ISR, Prerender).
  - Configures Redis as the storage driver for Nitro cache.

## 📦 Deployment

### Build Commands

```bash
# Production build (exports env vars from Infisical first)
bun build

# Generate static site
bun generate
```

### Deployment Notes

- **SSR**: Application uses Server-Side Rendering.
- **Caching**:
  - Redis is configured for server-side caching.
  - `routeRules` define specific caching strategies per route (e.g., homepage and static pages are prerendered; blog uses ISR).
- **Optimization**:
  - **Vite Manual Chunks**: Vendors are split into `vue-vendor`, `ui-vendor`, `form-vendor`, and `animation-vendor`.
  - **Images**: Uses `sharp` for processing.

## 🧩 Development Notes

### Key Dependencies & Features

- **Nuxt 4**: Uses experimental features (`typedPages`, `inlineRouteRules`).
- **Styling**: TailwindCSS 4 with `@tailwindcss/vite` plugin.
- **Animation**: `motion-v` and `@splidejs/vue-splide` for sliders/animations.
- **Data**:
  - `better-sqlite3` included.
- **SEO**: `@nuxtjs/seo` module for comprehensive meta tag management.
- **Performance**:
  - `nuxt-delay-hydration` for improved Time to Interactive.
  - `nuxt-vitalizer` for web vitals tracking.
  - `nuxt-fontaine` for font metric overrides (CLS reduction).

### Internationalization (i18n)

Supports English (`en-en`) and Spanish (`es-es`).

- Configured with `prefix_except_default` strategy.
- Detects browser language automatically.

## 🐛 Troubleshooting

### Common Issues

1. **Bun not found**: Install Bun runtime.
2. **Infisical missing**: Install Infisical CLI or ensure you have access to the project secrets.
3. **Redis Connection**: Ensure Redis is running if working on caching features locally.

## 📝 Maintenance

```bash
# Update dependencies
bun update

# Check for outdated packages
bun outdated
```
