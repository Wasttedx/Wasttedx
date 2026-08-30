# Interactive Portal Responsive Design Guide

## 1. Breakpoints & Layout Strategy
| Device | Breakpoint | Grid Columns | Scaling Factor | Layout Behavior |
|--------|------------|--------------|----------------|-----------------|
| **Desktop** | > 1440px | 12 | 1.0 | Full immersion, watcher centered, wide margins. |
| **Laptop** | 1024px - 1440px | 12 | 0.95 | Balanced density, content-focused. |
| **Tablet** | 768px - 1023px | 8 | 0.9 | Side-by-side components stack to vertical if needed. |
| **Mobile Landscape** | 480px - 767px | 4 | 0.85 | Horizontal scrolling for wide elements, reduced heights. |
| **Mobile Portrait** | < 480px | 2 | 0.8 | Single column stacking, primary focus. |

## 2. Component Reorganization (Mobile)
- **Watcher/Hero:** Re-centered at top; size reduced by 20%; floating objects move to a 2xN grid below the hero instead of surrounding it.
- **Navigation:** Main nav collapses into a bottom-anchored "Floating Hub" button (80px) to ensure thumb reachability.
- **Glass Cards:** Padding reduced from 32px to 16px; width becomes 100% of container.

## 3. Touch & Interaction
- **Minimum Target Size:** All interactive elements (buttons, toggles, links) must be at least **44px × 44px**.
- **Touch Feedback:** Remove hover states for touch; replace with `active` state glow increase and scale pulse (0.95x).
- **Safe Zones:** Keep interactive elements away from the very edges (min 12px margin) to avoid system gesture interference.

## 4. Tables & Data
- **Responsive Tables:**
  - On Mobile: Convert rows into individual glass cards or use a "scrollable-container" approach with a gradient fade on the right.
  - Desktop: Maintain full-width neon glass aesthetic with fixed headers.
- **No Breakage:** Ensure no horizontal overflow on the root container. Use `overflow-x: hidden` on body and `max-width: 100%` on all children.

## 5. Animation Adjustments
- **Mobile:** Reduce particle count by 60% for performance. Disable parallax mouse-tracking; replace with subtle device orientation (gyroscope) tilting if supported, or stick to simple auto-float.
- **Laptop/Desktop:** Full hardware-accelerated `translate3d` animations.
