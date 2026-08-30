# Interactive Portal Accessibility Checklist

## ✅ Keyboard Navigation (Priority: HIGH)

### Mandatory Requirements
- [ ] `Tab` key navigates through all interactive portal objects in logical order
- [ ] `Shift + Tab` allows reverse tab navigation
- [ ] Interactive portals use `<button>`, `<a>`, or `role="button"` elements
- [ ] Portal objects cannot be focused via mouse alone
- [ ] No keyboard traps in page transitions
- [ ] Global keyboard shortcuts for navigation (Arrow keys, 1-9, Enter)
- [ ] Escape key closes modals / exits expansion modes

### Implementation Requirements
- [ ] All floating objects have `tabindex="0"` or are native interactive elements
- [ ] `tabindex` follows visual reading order, not DOM order
- [ ] No reliance on `:focus-within` alone - use explicit focus states
- [ ] Portal objects maintain focus when clicked
- [ ] `base` keyboard style provides sufficient contrast against glass backgrounds

## ✅ Visible Focus States (Priority: HIGH)

### Mandatory Requirements
- [ ] Focus indicator appears for all keyboard-focusable elements
- [ ] Focus state is clearly visible (at least 2px outline)
- [ ] Focus indicator maintains visibility with opacity during transitions
- [ ] Custom cursor icon appears on focused object
- [ ] Focus indicator is not covered by animations

### Implementation Requirements
- [ ] Custom focus ring using `box-shadow: 0 0 20px [primary-color]`
- [ ] Focus ring transforms with floating animations (lives) with object
- [ ] Focus ring has backdrop blur for glassmorphism compatibility
- [ ] High-contrast focus state for reduced media queries conflict

### Example Implementation
```css
.portal:focus-visible {
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.2),
    0 0 25px var(--primary-glow),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  outline: none;
  filter: brightness(1.2);
}
```

## ✅ Semantic HTML Usage (Priority: HIGH)

### Mandatory Requirements
- [ ] All interactive portals use proper semantic elements
- [ ] Document landmarks properly defined
- [ ] Portal navigation is in proper heading hierarchy
- [ ] User hides list is a `<ul>` or `<nav>`
- [ ] Descriptive `aria-label` or `aria-labelledby` provided for all portals

### Implementation Requirements
- [ ] H1 for page title, H2/H3 for portal categories
- [ ] `<nav>` element wrapping main navigation
- [ ] `aria-label="Worlds", "Systems", "Pixels"` on portals
- [ ] `aria-description` or `title` for detailed context
- [ ] Use `aria-expanded` for expanded/collapsed portal menus

### Example Structure
```html
<nav aria-label="Portal navigation" role="navigation">
  <h1>System Gateway</h1>
  <section>
    <h2>Worlds</h2>
    <button aria-label="Access creative worlds" tabindex="0">
      <div class="portal-content">Worlds</div>
    </button>
  </section>
</nav>
```

## ✅ Screen Reader Compatibility (Priority: HIGH)

### Mandatory Requirements
- [ ] All interactive portals have `aria-label` or descriptive text
- [ ] Accessibility-based dynamic content updates are announced
- [ ] Current page context is announced
- [ ] Portal interaction mode states are communicated
- [ ] Screen reader skips floating animation elements (not because they're interactive)

### Implementation Requirements
- [ ] Live regions announce portal expansion/collapse events
- [ ] Dynamic content areas use `aria-live="polite"` or `aria-live="assertive"`
- [ ] Background animation elements have `aria-hidden="true"` unless keyboard focusable
- [ ] Portal transitions use `aria-busy="true"` during loading
- [ ] Screen reader-friendly text fallback for decorative SVG icons

### Live Region Examples
```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  Currently viewing: [Selected Portal Name]
</div>

<section aria-busy="true" aria-live="assertive">
  <!-- Loading content -->
</section>
```

## ✅ Color Contrast Minimums (Priority: HIGH)

### Mandatory Requirements
- [ ] All text elements meet WCAG AA (4.5:1) minimum contrast
- [ ] Large text meets WCAG AAA (7:1) recommendation
- [ ] Icons and UI elements meet minimum contrast ratios
- [ ] Focus states maintain distinguishability in all color combinations
- [ ] Disabled states have sufficient contrast from enabled states

### Implementation Requirements
- [ ] Primary text (#FFFFFF) against dark backgrounds meets 7:1
- [ ] Secondary text (#E0E0E0) against dark backgrounds meets 4.5:1
- [ ] Gold accents (#FFD700) meet 4.5:1 minimum for interactive elements
- [ ] Glass backgrounds (#0A0A1E with rgba overlay) provide sufficient contrast
- [ ] Colorless focus state as fallback for colorblind accessibility

### Contrast Documentation
| Element | Contrast Ratio | Status |
|---------|----------------|--------|
| Primary Text (#FFFFFF) on #0A0A1E | 16.8:1 | ✓ AAA |
| Primary Text on Glass | 11.4:1 | ✓ AAA |
| Gold (#FFD700) on Dark | 13.5:1 | ✓ AAA |
| Secondary Text (#E0E0E0) on #0A0A1E | 11.2:1 | ✓ AAA |
| Focus Border 2px white on medium dark | 10.1:1 | ✓ AAA |

## ✅ Reduced Motion Support (Priority: HIGH)

### Mandatory Requirements
- [ ] Animations disabled for users preferring reduced motion
- [ ] Transitions maintain core functionality without parallax/particles
- [ ] Focus states remain visible (no opacity loss)
- [ ] Page transitions maintain readability (grayscale or solid colors)

### Implementation Requirements
- [ ] `@media (prefers-reduced-motion: reduce)` disables all movement
- [ ] Floating portals become static
- [ ] Parallax tracking removed
- [ ] Page transitions become instant or fade only
- [ ] Hover interactions reduced to color shift only

### Complete Reduced Motion Implementation
```css
@media (prefers-reduced-motion: reduce) {
  .portal {
    animation: none !important;
    transition: none !important;
    cursor: default;
  }

  .portal:focus-visible {
    outline: 2px solid #FFD700;
    outline-offset: 4px;
  }

  .page-transition {
    animation: none !important;
    transition: opacity 0.2s ease;
  }

  /* Glass particles still visible but static */
  .glass-particles {
    animation: none;
  }
}
```

## ✅ Touch Interaction Design (Priority: MEDIUM)

### Mandatory Requirements
- [ ] All interactive buttons meet WCAG AA minimum size (44×44px)
- [ ] Portal cueing for touch proportionality
- [ ] User has clear indication of haptic feedback availability
- [ ] Tap targets spaced 8px minimum apart
- [ ] Multi-touch gestures supported where appropriate
- [ ] no targeting competing "edge" interactions

### Portal Size Specifications
| Portal Type | Minimum Size | Suggested Size | Touch Target |
|-------------|--------------|----------------|--------------|
| Small Icon Buttons | 44×44px | 48×48px | Inside 44px |
| Medium Bubble Buttons | 44×44px | 60×60px | Full area |
| Large Portal Objects | 44×44px | 80×100px | Full area |

### Example Portal Touch Design
```html
<!-- Minimum 44×44px recommended -->
<button
  tabindex="0"
  aria-label="Worlds - Access creative worlds"
  style="min-width: 44px; min-height: 44px;"
>
  <div
    class="portal-wrapper"
    style="transform: translateY(var(--y, 0px))"
    aria-hidden="true"
  >
    <div class="portal">
      <!-- Portal content icon -->
    </div>
  </div>
</button>
```

## ✅ Button/Landmark Sizes (Priority: MEDIUM)

### Accessibility Mirror
Floating portal objects must:

1. **Minimum Size**: 44×44px area for all touch interactions
2. **Visual Coverage**: Glass button area represents play area, not just icon size
3. **Aspect Ratio**: Rounded shapes maintain at least 1:1 for circular objects
4. **Interactive Borders**: All edges must be tappable (leave no unclickable corners)

### Implementation Requirements
```css
/* All portal objects meet accessibility minimums */
.portal-button {
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.portal-button:focus-visible {
  /* Focus indicator covers entire tappable area */
  padding: 4px;
  margin: -4px;
  box-shadow: 0 0 20px var(--focus-glow);
}

/* Visual portal size can be larger */
.portal-visual {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* Animation layer subordinate to button layer */
}
```

## ✅ Focus Trap Management (Priority: MEDIUM)

### Requirements for Expanded Portal Content
- [ ] Focus remains within open modal/expanded section
- [ ] Focusable elements listed in logical reading order
- [ ] First element automatically focused on modal open
- [ ] Escape key cycles back to last focusable element
- [ ] Tab order consistent across keyboard and screen readers

### Focus Trap Implementation
```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [tabindex]:not([tabindex="-1"]), a[href]"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    } else if (e.key === 'Escape') {
      // Close modal
    }
  });
}
```

## ✅ ARIA Live Region State Management (Priority: MEDIUM)

### Synchronized State Communication
- [ ] Portal selection announced to screen readers
- [ ] Page loading states live-announced
- [ ] Errors and warnings accessible
- [ ] Success/failure states communicated
- [ ] Persistent state indicators on portals

### Live Region Configuration
```html
<!-- Persistent status - polite updates -->
<span aria-label="Worlds: Active" class="portal-status">
  <span aria-hidden="true">●</span> Active
</span>

<!-- Critical state change - assertive -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  Access to Worlds is restricted
</div>

<!-- Loading progress - polutes -->
<div role="status" aria-live="polite" aria-label="Loading worlds">
  Loading visual assets...
</div>
```

## Accessibility Testing Checklist

### Automated Testing
- [ ] Axe DevTools accessibility audit passed
- [ ] Lighthouse accessibility score ≥ 95
- [ ] Color contrast ratio compliance verified
- [ ] Focus management tested across all transitions
- [ ] Screen reader compatibility confirmed

### Manual Testing
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Verify focus indicator visibility in all states
- [ ] Confirm reduced motion preference disabled animations
- [ ] Test on mobile viewport and 3:4 aspect ratio
- [ ] Test with low-bandwidth and low-light settings
- [ ] Verify tab order is logical, predictable, and consistent

### Functionality Verification
- [ ] Portal hover effects accessible via keyboard (Enter/Space)
- [ ] Portal click actions trigger correct behavior
- [ ] Page loading states communicate progress
- [ ] Transition states don't introduce UX barriers
- [ ] User can escape from expanded/expanded modal content

## Performance & Loading Accessibility
- [ ] Screenreader fallbacks for shimmer effects
- [ ] Fallback content visible before layout shifts complete
- [ ] Animation stability for 60fps interactions
- [ ] Off-canvas button focus retention after tab switching
- [ ] Progressive improvement for content fetch

## Compliance Mapping
| Requirement | WCAG Level | Testing Method |
|------------|-----------|----------------|
| Keyboard Accessibility | A | Manual testing + Axe |
| Screen Support | A | Screen reader testing |
| Focus Visibility | AA | Visual inspection + axe |
| Color Contrast | AA | Color contrast checker + axe |
| Reduced Motion | A | Manual testing |
| Minimum Touch Target | AA | Size measurement + mouse testing |
| Hierarchy & Landmarks | A | Axe + semantic validation |
| Deprecated interaction colors | AA | WCAG contrast + Colorblind testing |
| Landing animations | A | Screen reader + manual |

## Priority Action Items

### High Priority (Must Complete)
1. Add `aria-label` to all floating portal objects
2. Implement `prefers-reduced-motion` query
3. Define custom CSS focus-visible states
4. Ensure minimum 44×44px touch targets
5. Verify text contrast ratios pass WCAG AA

### Medium Priority (Should Complete)
1. Add ARIA live regions for state updates
2. Implement focus trap for modal content
3. Add skip navigation link (anchor)
4. Configure keyboard tab order correctly
5. Add `aria-hidden="true"` to decorative animations

### Low Priority (Future Enhancement)
1. Add comprehensive keyboard shortcuts
2. Implement custom screen reader gestures
3. Add keyboard-operated navigation dots
4. Implement haptic feedback for critical interactions
5. Add augmented reality accessibility features

---

## Minimum Deliverables for Phase 1

- [ ] Complete custom focus-visible styles
- [ ] Mapped floating portals to semantic <button> elements
- [ ] Reduced motion implementation with animation disable
- [ ] WCAG AA color contrast validation
- [ ] Minimum 44×44px accessibility-tappable area for all portals
- [ ] ARIA labels for all navigation elements
- [ ] Initial screen reader testing verification