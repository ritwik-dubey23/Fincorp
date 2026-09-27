# Design.md — Visual Design System & Aesthetics

## 1. Design System Overview
The design system of **Fincorp** closely recreates the visual hierarchy, colors, typography, spacing, and component organization of CredBuddha.

---

## 2. Color Palette

| Color Role | Color Hex / Tailwind Class | Visual Purpose |
|---|---|---|
| **Primary Navy** | `#0c2f54` / `bg-slate-950` | Headers, dark hero backgrounds, and funfact section |
| **Royal Blue** | `#1d4ed8` / `bg-blue-600` | Main CTA buttons, active navigation pills, icons |
| **Accent Indigo** | `#4f46e5` / `from-blue-600 to-indigo-600` | Button gradients, feature cards |
| **Success Emerald** | `#10b981` / `bg-emerald-600` | Free Credit Score highlights, approved status badges |
| **Amber Gold** | `#f59e0b` / `text-amber-400` | Accent text, interest rate highlights |
| **Background Light** | `#f8fafc` / `bg-slate-50` | General page background |

---

## 3. Typography
- **Primary Font Family**: `'Urbanist', sans-serif` (imported from Google Fonts)
- **Headings**: Extra Bold / Black (`font-extrabold` / `font-black`), tracking-tight
- **Body Text**: Medium / Semi-Bold (`font-medium` / `font-semibold`), slate-600

---

## 4. Components & Layout Specs
- **Navigation Bar**: Rounded pill container (`rounded-full`) on desktop with dropdowns for Loans & Tools.
- **Buttons**: Rounded pill buttons (`rounded-full`) with subtle shadow (`shadow-md shadow-blue-500/20`) and active scale feedback (`active:scale-95`).
- **Cards**: Soft rounded white cards (`rounded-3xl`) with subtle border (`border-slate-200/80`) and hover shadow transition.
- **Mobile Floating Bar**: Purple gradient bar fixed to bottom of mobile viewports with "Get Instant Loan Online" & Apply button.
