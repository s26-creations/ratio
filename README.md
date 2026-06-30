# Ratio

A scientifically precise, yet surprisingly beautiful unit converter application. Built to solve the gap between highly accurate scientific converters and clean, intuitive, modern web design.

## 🌟 Features

- **High Precision Math**: Built on `Decimal.js` to eliminate JavaScript floating-point errors, supporting arbitrary-precision scientific calculations (up to 50 decimal places).
- **Extensive Knowledge Base**: Supports over **40 categories** and **260+ units**, spanning Mechanics, Thermodynamics, Electromagnetism, Chemistry, Computing, Cooking, and more. Includes support for affine transformations (like Temperature) and logarithmic scales (like Sound Pressure Level).
- **Premium UI / UX**: A gorgeous Glassmorphism design system featuring smooth micro-animations, customizable dark mode, and a responsive layout.
- **Progressive Web App (PWA)**: Installable on desktop and mobile, with offline support for lightning-fast performance.
- **Smart History & Favorites**: Automatically logs your recent conversions and allows you to bookmark your most-used unit pairs for one-click access.
- **Accessibility First (WCAG)**: Fully navigable via keyboard, equipped with ARIA roles/labels for screen readers, focus traps for modals, and respects OS-level `prefers-reduced-motion` settings.

## 🏗 Architecture

Ratio follows a clean, modular, and highly scalable architecture, decoupling the mathematical engine from the UI layer.

```text
src/
├── components/         # Reusable UI components
│   ├── common/         # Generic buttons, dropdowns, modals
│   ├── converter/      # Converter-specific components (selectors, displays)
│   ├── layout/         # Header, animated backgrounds
│   └── panels/         # Slide-out History and Favorites panels
├── context/            # React Context providers (State Management)
├── engine/             # Framework-agnostic core business logic
│   ├── core/           # Conversion engine and Decimal.js configuration
│   ├── definitions/    # Unit definitions grouped by scientific domain
│   └── utils/          # Formatters and validators
├── hooks/              # Custom React hooks
├── pages/              # Routed page views (HashRouter)
└── App.jsx             # Main application orchestrator & provider tree
```

### The Engine
The `engine/` directory is completely isolated from React. It uses a **Registry/Proxy pattern** to dynamically load unit definitions. This means adding 100+ new categories in the future will not bloat the initial load time or complicate the component tree.

### State Management
State is handled via a series of lightweight Context Providers (`ConverterContext`, `HistoryContext`, `FavoritesContext`, `SettingsContext`). This completely eliminates prop drilling and keeps components decoupled. 

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

- **React 18** (Context API + Hooks)
- **React Router** (Hash-based routing for PWA compatibility)
- **Vite** (Build Tool & PWA Plugin)
- **Tailwind CSS** (Styling & Glassmorphism UI)
- **Decimal.js** (High-precision mathematical engine)
- **Lucide React** (SVG Iconography)

## 🤝 Contributing (Adding New Units)

Adding a new unit or category to Ratio is incredibly simple thanks to the amazing decoupled engine.

1. **Create or edit a domain file** inside `src/engine/definitions/` (e.g., `mechanics.js`).
2. **Define the category** with a base unit and optionally an affine or logarithmic flag.
3. **Add units** by specifying their `factor` relative to the base unit.

```javascript
// Example: Adding a new linear category
export const myNewCategory = {
    base: 'meter',
    symbol: 'm',
    units: {
        meter: { factor: '1', symbol: 'm', name: 'Meter' },
        kilometer: { factor: '1000', symbol: 'km', name: 'Kilometer' }
    }
};
```
Once added, the engine automatically calculates cross-conversions, generates formulas for UI tooltips, and exposes the new options to the React components.
