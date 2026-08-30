# Interactive Portal Visual Design Specification

## Visual Identity
**Theme:** "Neon Glass" - Modern, futuristic, playful yet premium

### Style Keywords
- Glassmorphism with neon accents
- Depth through layering and shadows
- Gradient flows and organic motion
- Floating micro-interactions

## Color Palette

### Primary Colors
| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| Primary Action | Electric Blue | #00F0FF | Main CTAs |
| Secondary Action | Fuchsia | #FF00FF | Secondary elements |
| Premium Accent | Gold | #FFD700 | Premium elements |
| Success | Emerald | #10B981 | Success states |
| Error | Rose | #F43F5E | Error states |

### Background Colors
| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| Deep Space | #0A0A1E | Main background |
| Glass Base | rgba(255,255,255,0.05) | Cards & panels |
| Glass Light | rgba(255,255,255,0.1) | Hover states |
| Glow A | rgba(0,240,255,0.3) | Primary glow |
| Glow B | rgba(255,0,255,0.3) | Secondary glow |

### Text Colors
| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| Primary Text | #FFFFFF | Main headings |
| Secondary Text | #E0E0E0 | Body text |
| Muted Text | #9CA3AF | Decorative text |
| Inverted | #0A0A1E | High-contrast visibility |

## Typography

### Font Families
- **Display/Headings:** "Orbitron" or "Exo 2" (Google Fonts)
- **Body Text:** "Inter" or "Outfit" (Google Fonts)
- **Monospace:** "Fira Code" or "JetBrains Mono" (for data/code elements)

### Sizes & Weights

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero Headline | 3.5rem-5rem | 700 | 1.1 |
| Section Headers | 2.5rem-3.5rem | 600-700 | 1.2 |
| Subheaders | 1.5rem-2.5rem | 600 | 1.3 |
| Body Large | 1.125rem-1.5rem | 500 | 1.6 |
| Body Standard | 1rem | 400 | 1.6 |
| Body Small | 0.875rem | 400 | 1.5 |
| Caption/Labels | 0.75rem-0.875rem | 500 | 1.4 |

### Letter Spacing
- **Wide:** 0.02em (headings)
- **Normal:** 0 (body)
- **Narrow:** -0.02em (keywords)

## Background Concept

### Main Background Layer
- **Deep space gradients** with subtle animated orbs
- Three deep-canvas gradients overlapping:
  - Electric Blue (#00F0FF) at 60% opacity
  - Fuchsia (#FF00FF) at 50% opacity
  - Dark purple (#1A1A3E) at 70% opacity
- Floating glass particles (1-3px) with blur filter
- Custom SVG wave patterns across the screen

### Layer Hierarchy
1. **Base:** Deep space gradient animation
2. **Texture:** Subtle noise overlay (5% opacity)
3. **Particles:** Floating glass orbs
4. **Glass Card Backgrounds:** 0.05-0.15 opacity white
5. **Content:** Final layer with z-index

### Animation Direction
- Particles: Gentle floating, slight parallax
- Orbs: Slow movement, breathing effect
- Background: Gradient hue rotation (180s cycle)

## Button & Bubble Design

### Bubble/Orb Buttons
- **Size:** 60px - 120px diameter circles
- **Shape:** Perfect circles with gradient borders
- **Border Width:** 2-3px gradient
- **Glow:** box-shadow with color spread (0,0,20px)
- **Home Button:** 80px, surrounded by 4 orbit satellites

### Solid Buttons
- **Primary:**
  - Gradient background: Blue to Purple
  - Glass bloom effect on hover
  - Shadow glow matching brand color
- **Secondary:**
  - Semi-transparent glass
  - Scale 1.05 on hover

### Standard Buttons
- **Size:** 40px - 48px height, 100% - 140px width
- **Rounded:** Custom radius (12px - 20px)
- **Glow:** Multi-layer box-shadow
- **Border:** Opera gradient (transform radius animation)

### Button Animation States
- **Idle:** Subtle breathing (scale 0.98-1.02)
- **Hover:**
  - Scale 1.08
  - Glow intensifies
  - Border radius expands 150%
  - Blur filter softens
- **Active:**
  - Scale 0.95
  - Glow constricts
  - Background gradient shifts
- **Click Ripple:** Expanding ring animation (300ms)

### Click Feedback
- Primary: Strong scale + color shift + glow intensity increase
- Secondary: Multiple bright orbs appear briefly
- Micro-tap: Small particles burst from click point

## Spacing & Hierarchy

### Container Spacing
- **Main Container:** 90% - 95% viewport size
- **Padding:** Responsive (24px-48px per side based on screen)
- **Glass Card Base Padding:** 32px - 48px

### Section Spacing
- **Hero Section:** 15vh - 20vh vertical space
- **Modal/Section:** At least 20vh
- **Buttons:** 8px-16px spacing between
- **Flops:** 4px-8px spacing stack

### Alignment
- **Layout Grid:** CSS Grid with 8px base unit
- **Center Alignment:** Main content
- **Spacing Units:** 8px increments (64px grid line-size)
- **Mobile:** Flexible margins, full-width stacking

## Interaction States

### Hover Effects
- **Targeted Element:**
  - Lift up 8px
  - Glow intensifies
  - Border brighter
  - Text scales up 1.02x
- **Unrelated Elements:**
  - dim opacity 0.6
  - no transform

### Click Effects
- **Ripples:** Expanding ring from click point
- **Feedback:** Color pulse, scale, and glow
- **Success:** Confetti burst from button

### Hover Delay
- **Long Hover:** 1s for important elements (overview)
- **Standard:** 300ms for standard elements

## Page Transitions

### Opening Animation (Page Start)
1. **Pulse In (0s):** Elements fade in with scale 0-1
2. **Float Up (0.5s-1s):** Elements float gently upward into place
3. **Glow (1s-1.5s):** Glow intensifies on completion
4. **Audio (complete):** Ambient sound layer strengthens

### Element Entry
- **Fade In + Float:** Scale 0 → 1 + Y-axis float
- **Delay Timing:** Stagger based on element importance (50ms-200ms increments)
- **Easing:** Cubic-bezier (ease-out-cubic)

### Expected Transitions
| Scenario | Effect | Duration |
|----------|--------|----------|
| Standard Hover | Scale + Glow + Border | 300ms |
| Strong Hover | Lift + Intense Glow | 500ms |
| Click | Scale Pulse + Ripple | 200ms |
| Transition | Smooth fade + slight scale | 400ms |

### Exit Effects
- **Explosion:** Particles burst outward from clicked element
- **Glow Collapse:** Glow fades out quickly
- **Revert:** Step back to previous scale/hover state

## Mobile Behavior

### Layout Adaptations
- **Viewport:** 100% height, responsive width
- **Margins:** Reduced padding (16px-24px instead of 32px-48px)
- **Font Sizes:** Reduced by 15-20% for smaller screens
- **Scale:** Scale view to fit screen when needed

### Interaction Adjustments
- **Touch Targets:** 44px × 44px minimum (WCAG AA)
- **Tap Delay:** 100ms (faster than desktop)
- **Long Press:** 300ms (extend zoom on zoom buttons)
- **Touch Hold Decoration:** Glow increases on hold

### Off-canvas Elements
- **Container:** 85% - 90% screen height
- **Slide In:** From bottom with elastic bounce
- **Backdrop:** Filter blur (0.3 - 0.5)

### Responsive Media Breakpoints
| Breakpoint | Elements per row | Bubbles | Scale Factor |
|-----------|------------------|---------|--------------|
| Mobile | 1-2 | Smaller | 0.85-0.95 |
| Tablet | 2-4 | Normal | 0.95 |
| Desktop | 3-6 | Normal | 1.0 |
| Large Desktop | 4-8 | Normal | 1.0 |

### Performance Optimizations
- **Mobile:** Disable elemental glow animations
- **Low Data:** Reduce particle count by 50%
- **Off-Travel:** Offline mode: reduced animations, solid colors