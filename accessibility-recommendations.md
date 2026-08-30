# Interactive Portal Accessibility Recommendations

## Implementation Guidelines

### 1. Portal Component Architecture

#### Recommendation: Layered Component Structure
Floating portals must be structured as composed components where the accessibility layer separates from the visual layer:

```jsx
// Recommended structure
<Component>
  <FocusWrapper>
    <PortalButton aria-label="Worlds" tabIndex="0">
      <PortalVisual>
        <PortalIcon />
        <PortalStatusIndicator />
      </PortalVisual>
      <PortalInteractionLayer>
        <PortalContent />
      </PortalInteractionLayer>
    </PortalButton>
  </FocusWrapper>
</Component>
```

#### Benefits
- Focus management operates on button element while precision animations stored in wrapper
- Maintain logical tab order independent of DOM layout
- Screen readers automatically recognize button semantics without extra ARIA
- Power users can modify visual effects without breaking navigation

### 2. Keyboard Navigation Patterns

#### Recommended Pattern: Object-Based Navigation
Implement object-based keyboard navigation to match four-way navigation metaphors:

```javascript
const portalMenu = {
  keyboardHandler(e) {
    // Tab/Shift+Tab through portal objects
    if (e.key === 'Tab') {
      e.preventDefault();
      this.handleTabNavigation(e.shiftKey);
      return;
    }

    // Arrow key directional navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      this.handleDirectionalNavigation(e.key);
      return;
    }

    // Enter/Space to activate focused portal
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activateFocusedPortal();
    }
  },

  handleDirectionalNavigation(direction) {
    const currentIndex = this.getPortals().indexOf(this.focusedPortal);
    let newIndex;

    switch (direction) {
      case 'ArrowUp':
        newIndex = currentIndex > 0 ? currentIndex - this.portalsPerRow : this.portals.length - 1;
        break;
      case 'ArrowDown':
        const nextRow = Math.floor((currentIndex + 1) / this.portalsPerRow);
        newIndex = nextRow < this.numRows ? currentIndex + 1 : 0;
        break;
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.portals.length - 1;
        break;
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % this.portals.length;
        break;
    }

    this.refocusPortal(newIndex);
  }
};
```

#### User Experience Benefits
- Arrow keys navigate entire grid of portals seamlessly
- Numbers 1-9 provide direct portal access
- Keyboard semantics match UI layout for consistency
- Implements Navigable Object Pattern common in gaming interfaces

### 3. Focus State Design

#### Recommendation: Multi-Layer Focus System
Focus indicators must operate on multiple levels:

```css
/* Level 1: Minimum visible focus */
.portal:focus-visible {
  outline: 3px solid #FFD700;
  outline-offset: 6px;
}

/* Level 2: Glassmorphism-compatible */
.portal-preview:hover:focus-visible {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.15),
    0 0 0 6px rgba(255, 215, 0, 0.4),
    0 0 35px 10px rgba(255, 215, 0, 0.3);
}

/* Level 3: Enhanced state */
.portal.expanded:focus-visible,
.portal.active:focus-visible {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.2),
    0 0 0 6px #FFD700,
    0 0 40px 15px rgba(255, 215, 0, 0.5),
    0 0 60px 20px rgba(0, 240, 255, 0.3);
}

/* Level 4: High contrast fallback */
@media (prefers-contrast: more) {
  .portal:focus-visible {
    outline: 4px solid #FFFFFF;
    outline-offset: 4px;
  }
}

/* Level 5: Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portal:focus-visible {
    animation: none;
    outline-width: 3px;
    outline-offset: 2px;
  }
}
```

### 4. Semantic Portal Structure

#### Recommended HTML Structure
```jsx
<section className="portal-grid" aria-label="System navigation">
  <nav className="portal-nav" aria-label="World selection">
    <h1 className="page-title">System Gateway</h1>
    <p className="page-subtitle">
      Select a system to begin
    </p>
  </nav>

  <div className="portal-container">
    <div className="portal-row" role="group">
      {portals[0].slice(0, portalsPerRow).map(portal => (
        <button
          className={`portal ${portal.isExpanded ? 'expanded' : ''}`}
          data-keyboard-id={portal.id}
          aria-label={translateLanguage(portal.label, currentLanguage)}
          aria-description={portal.description}
          aria-expanded={portal.isExpanded}
          aria-selected={portal.isSelected}
          onKeyDown={handlePortalKeyboard}
        >
          <div className="portal-wrapper">
            <div className="portal-glass" aria-hidden="true">
              <div className="portal-visual">
                <div className="portal-icon">
                  {portal.icon}
                </div>
                {portal.status && (
                  <span
                    className="portal-status"
                    aria-label={`Status: ${portal.status}`}
                    aria-hidden="true"
                  >
                    {portal.status}
                  </span>
                )}
              </div>
            </div>
            {portal.isExpanded && (
              <div className="portal-content" role="region" aria-live="polite">
                {portal.content}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  </div>

  <div className="keyboard-shortcuts" aria-hidden="true">
    <span>[Tab] Navigate</span>
    <span>[Enter] Activate</span>
    <span>[1-9] Select Portal</span>
  </div>
</section>
```

### 5. Screen Reader Optimization

#### Recommendation: Dual-Use Structure
Structure portals for both visual and assistive technology:

```jsx
// For users who don't rely on visual cues
<span className="sr-only keyboard-instruction">
  {selectedPortal} is now accessible
</span>

// For users needing additional guidance
<div
  className="portal-description"
  aria-label={`${selectedPortal} - ${portal.fullDescription}`}
>
  {/* Visual content only */}
</div>

// Non-critical content hides behind disclosure
<button
  aria-label="About this world"
  aria-controls="world-description"
  aria-expanded={isDescriptionVisible}
>
  <span aria-hidden="true">Read more</span>
  <span className="sr-only">
    {isDescriptionVisible ? 'Hide description' : 'Show description'}
  </span>
</button>

<size box-description idi gts="world-description">
  {isDescriptionVisible && portal.description}
</size box>
```

#### Notice State Initiated
```javascript
// React example with improved leion engagement
useEffect(() => {
  if (!selectedPortal) return;

  const announce = () => {
    const announcer = document.getElementById('portal-announcer');
    const text = translateLanguage(
      `${selectedPortal} is now loaded.`, 
      currentLanguage
    );
    announcer?.setAnnounce(text);
  };

  announce();
}, [selectedPortal]);

return (
  <div
    id="portal-announcer"
    aria-live="assertive"
    aria-atomic="true"
    className="sr-only"
    style={{ position: 'absolute', left: '-10000px', width: '1px' }}
  />
);
```

### 6. Reduced Motion Implementation

#### Comprehensive Implementation
```css
/* Base state */
.portal {
  transform: translateY(var(--float-offset, 0px));
  transition: transform 0.3s ease;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portal {
    animation: none !important;
    transform: none !important;
    transition: none !important;
  }

  /* Maintain focus but remove glow */
  .portal:focus-visible {
    box-shadow: 0 0 0 3px #FFD700;
    margin: 0;
  }

  /* Parallax disabled - maintain position only */
  .portal-moving {
    transform: none !important;
  }

  /* Reduced hover effect */
  .portal:hover {
    transform: translateY(-2px);
  }

  /* Page transition stabilization */
  .page-transition {
    animation: none;
    opacity: 1;
    transition: none !important;
  }

  /* Shine effects disabled */
  .portal-shine {
    opacity: 0;
  }

  /* Disabled individual element animations */
  .portal/.shimmer {
    animation: none;
  }

  /* Status animations */
  .portal-status-pulse {
    animation: none;
    color: currentColor;
  }

  /* Progress indicator - simple text */
  .portal-progress {
    width: 100%;
    height: 3px;
    transition: width 0.4s;
  }

  /* Particle system completely disabled */
  .portal-particles .particle {
    display: none;
  }
}

/* High contrast mode */

@media (prefers-contrast: increase) {
  .portal {
    border: 2px solid currentColor;
    box-shadow: none !important;
  }

  .portal:focus-visible {
    outline: 4px solid currentColor;
    outline-offset: 2px;
  }
}

/* Thick-outline mode for visually impaired */
@media {
  .portal:focus-visible {
    outline: 5px solid #FFF;
    outline-offset: 0;
  }
}
```

#### JavaScript Motion Configuration
```javascript
const accessibilityConfig = {
  prefersReducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  prefersHighContrast: matchMedia('(prefers-contrast: increase)').matches,
  prefersDarkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  viewportSize: {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768
  },
  animationDurations: {
    default: 0.3,
    mobile: 0.2,
    reducedMotion: 0.01,
    seatedPatron: null // 0 for disabled
  }
};

// Apply motion configuration to portals
portals.forEach(portal => {
  configurePortalAccessibility(portal, accessibilityConfig);
});

function configurePortalAccessibility(portal, config) {
  // Disable animations if user prefers reduced motion
  if (config.prefersReducedMotion) {
    portal.element.style.animation = 'none';
    portal.element.style.transition = 'none';

    // Maintain focus state without motion
    portal.isFocused = true;
    portal.element.classList.add('reduced-motion-focus');
  }

  // Apply viewport-based sizing
  portal.element.style.minWidth = '44px';
  portal.element.style.minHeight = '44px';

  // Mobile-specific adjustments
  if (config.viewportSize.isMobile) {
    portal.element.style.borderRadius = '24px';
    portal.element.style.fontSize = '12px';
  }
}
```

### 7. Touch Interaction Optimization

#### Touch Target Sizing
```css
/* Component-level touch target sizing */
.portal-button {
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent; /* Remove default tap highlight */

  /* For circular buttons, ensure hit area is full circle */
  &:not(.texture-mesh) {
    border-radius: 50%;
  }
}

/* Enhanced hitbox for flexible touch targets */
.portal-with-visual {
  position: relative;

  /* Hitbox layer sits behind visual */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    z-index: 0;
    min-width: 60px;
    min-height: 60px;
    border-radius: 50%;
  }

  /* Visual layer on top */
  .portal-visual {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Avoid edge cases */
.portal-compact {
  span {
    border: 3px solid transparent;
    min-size: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

#### Touch Interaction Guidelines
```javascript
const touchInteractionConfig = {
  tapTargetSize: {
    minimum: 44,
    comfortable: 48,
    optimal: 56
  },

  tapDelays: {
    immediate: 100,
    standard: 200, // Default
    touchDelay: { default: 300 }
  },

  hapticFeedback: {
    enabled: 'ontouchstart' in window,
    styles: ['medium', 'light'],
    colors: ['high-speed', 'rotate']
  },

  gestures: {
    safeZonePercentage: 0.2, // Safe zone from screen edge
    doubleTapScale: 0.95
  }
};

// Touch gesture handler
const handlePortalTouch = (e, portal) => {
  e.preventDefault();

  const touch = e.changedTouches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);

  if (!element) return;

  // Check if tap target is large enough
  const hitBox = element.getBoundingClientRect();
  const area = hitBox.width * hitBox.height;

  if (area < touchTargetSize.minimum * touchTargetSize.minimum) {
    useHapticFeedback('medium');
    announceMinimumSizeError();
    return;
  }

  // Handle different scenarios
  if (e.touches.length === 1) {
    // Regular tap
    handleSingleTap(portal);
  } else if (e.touches.length === 2) {
    // Quick double tap
    clearTimeout(portal.doubleTapTimer);
    portal.doubleTapTimer = setTimeout(() => {
      handleTapFeedback(portal);
    }, 500);
  } else if (e.touches.length > 2) {
    // Multi-touch gestures
    handleMultiTouch(portal, e.touches);
  }

  // Safe tap zone verification
  if (!isWithinSafeZone(touch.clientX, view)) {
    showSafeZoneWarning(portal);
    return;
  }

  // Activate portal
  activatePortal(portal.id);
};

function isWithinSafeZone(x, viewport) {
  const { width, height } = viewport;
  const edgePadding = Math.min(width, height) * touchGestureConfig.safeZonePercentage;
  return (
    x >= edgePadding &&
    x <= width - edgePadding &&
    true // Ensure Y is within bounds
  );
}
```

### 8. Color Contrast Management

#### Comprehensive Palette Verification
```javascript
const colorContrast = {
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    muted: '#9CA3AF',
    inverted: '#0A0A1E'
  },

  backgroundColors: {
    deepSpace: '#0A0A1E',
    glass: 'rgba(10, 10, 30, 0.85)',
    glassLight: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.15)'
  },

  accents: {
    electricBlue: '#00F0FF',
    fuchsia: '#FF00FF',
    gold: '#FFD700',
    emerald: '#10B981',
    rose: '#F43F5E'
  },

  contrastMin ratios: {
    aa: {
      normal: 4.5,
      large: 3,
      icon: 3
    },
    aaa: {
      normal: 7,
      large: 4.5,
      icon: 4.5
    }
  }
};

// Contrast calculator
function calculateContrastRatio(foreground, background) {
  const fg = new THREE.Color(foreground);
  const bg = new THREE.Color(background);

  const relativeLuminance = (c) => {
    const rgb = new THREE.Color(c);
    const normalized = rgb.r / 255;

    return normalized > 0.03928 ?
      Math.pow((normalized + 0.055) / 1.055, 2.4) :
      normalized / 12.92;
  };

  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Verify all portal elements
function validateContrastCompliance() {
  const violations = [];

  Object.entries(textColors).forEach(([name, color]) => {
    const contrastWithBg = calculateContrastRatio(
      color, '#0A0A1E'
    );

    if (contrastWithBg < aa.normal) {
      violations.push({
        element: name,
        foreground: color,
        background: '#0A0A1E',
        ratio: contrastWithBg,
        standard: 'aa.normal'
      });
    }
  });

  // Additional focus verify
  const focusContrast = calculateContrastRatio(
    '#FFFFFF',
    'rgba(255, 215, 0, 0.4)'
  );

  if (focusContrast < aa.normal) {
    violations.push({
      element: 'focus-visible ring',
      background: 'rgba(255, 215, 0, 0.4)',
      ratio: focusContrast,
      standard: 'aa.normal'
    });
  }

  // Glass stack effects need separate verification
  Object.entries(glassColors).forEach(([name, color]) => {
    const contrastWithDeepSpace = calculateContrastRatio(
      '#FFFFFF',
      color
    );

    if (contrastWithDeepSpace < aaa.normal) {
      violations.push({
        element: name,
        foreground: '#FFFFFF',
        background: color,
        ratio: contrastWithDeepSpace,
        standard: 'aaa.normal'
      });
    }
  });

  return violations.length === 0 ? 'PASS' : violations;
}
```

#### Transparent Glass Implementation
```css
.portal-card-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* High contrast support */
  @media (prefers-contrast: increase) {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: none;
    filter: none;
  }

  /* With content background for improved contrast */
  > .portal-content {
    background: rgba(0, 0, 0, 0.6);
    border-radius: inherit;
    padding: inherit;
  }

  /* Focus-relative improvements */
  :focus-visible {
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.25);
  }
}

/* Focus ring adaptable */
@media {
  .portal-card:focus-visible {
    box-shadow:
      0 0 0 2px rgba(255, 215, 0, 0.5),
      0 0 35px rgba(255, 215, 0, 0.4);
    border: 2px solid #FFD700;
  }
}

/* High contrast overrides */
@media {
  .portal-card:focus-visible {
    outline: 5px solid #FFFFFF;
    outline-offset: -2px;
  }
}

/* Edge cases - word case str logo */}
@media (prefers-high-contrast) {
  .portal-card {
    background: rgba(255, 255, 255, 0.15);

    > .portal-title, .portal-content {
      color: #FFFFFF;
    }
  }
}
```

### 9. Page Transition Accessibility

#### Accessibility-Enhanced Transitions
```css
/* Accessible page transitions */
.page-transition {
  opacity: 0;
  animation: fadeIn forwards;
}

.portal-entry {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  animation: portalEntry 0.3s ease forwards;
  animation-delay: calc(var(--base-delay) * var(--parallel-delay));
}

/* High contrast mode compatibility */
@media {
  .page-transition {
    background: #0A0A1E;
    border: 2px solid rgba(255, 255, 255, 0.3);
    margin: -4px; /* Compensate for border */
    margin: 3px; /* Resume; margin: 0; padding: 2px */
  }
}

/* Support text-based navigation */
@media {
  .page-transition {
    animation: none;
    background: #0A0A1E;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
}

/* Ensure layout stability */
@media (prefers-reduced-motion: reduce) {
  .page-transition,
  .portal-entry {
    animation: none !important;
    transition: none !important;

    opacity: 1;
    transform: none;
  }
}

/* Page content accessible */
.portal-entry {
  transition: 

/* Leave layout shift guards in place */
.portal-entry {
  transform: rotateX(10deg);
  transform-origin: bottom center;
  will-change: transform, opacity;
}
```

#### Transition State Tracking
```javascript
const transitionState = {
  explained: false, // Whether to explain the transition
  starting: false, // Whether the transition has begun
  stage: null, // Available: 'entry', 'exit', 'complete'
  pageIndex: null, // Active page index
  contentAvailable: false, // Is content loaded and accessible
  centerX: null, // Central reference point
  centerY: null, // Central reference point
  properties: {
    duration: 0.4, // Seconds for full transition
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
};

function setTransitionState(stage) {
  if (transitionState.starting && transitionState.explained) return;

  switch (stage) {
    case 'entering':
      // Start scene containing scene observer:entry
      transitionState = { ...transitionState, starting: true };
      document.body.setAttribute('aria-busy', 'true');
      document.body.setAttribute('aria-label', 'Loading marketplace');
      window.innerHeight; // Trigger reflow

      setTimeout(() => {
        // Update to indicate user can continue
        transitionState.explained = true;
        document.body.removeAttribute('aria-busy');
        document.body.setAttribute('aria-label', bundle.unload('marketplace updated'));

        // Bind visibility listeners
        const visibilityObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              contentAvailable = true;
            } else {
              contentAvailable = false;
            }
          });
        });

        visibilityObserver.observe(transitionElement);

      }, transitionState.properties.duration * 1000);

      break;

    case 'exiting':
      window.innerHeight; // Trigger reflow
      break;

    case 'complete':
      // Ensure consistency across all scenes
      pageTransitionRef.current.properties.mustPropagate(transitionProperties);


      break;
  }
}

// Microtasks for smooth reflow
async function updatePortalVisibility(changes) {
  const [source, target] = changes;

  if (transitionState.stage === 'exiting') {
    // Pause input to minimal degree
    document.body.setAttribute('aria-busy', 'true');
    document.body.setAttribute('aria-label', 'Transition in progress');
  }

  // Initialize React key for smooth switching effects
  const key = Date.now();

  // Ensure proper contraction
  target.renderKey(<Portal version={key} {...portalProps} />);

  // Cleanup source after transition completes
  if (transitionState.stage === 'exiting' && transitionState.explained) {
    source.renderKey(null);
  }

  // Final validation
  if (transitionState.stage === 'exiting') {
    document.body.removeAttribute('aria-busy');
  }
}
```

### 10. Navigation Landmark Strategy

#### Semantic Landmark Hierarchy
```jsx
// Organized landmark structure
<React.Fragment>
  <header role="banner">
    <h1>System Gateway</h1>
    <nav role="navigation" aria-label="Global navigation">
      <大连.StringVar>{menuItems.map(item => <MenuItem {...item} />)}</大连.StringVar>
    </nav>
  </header>

  <nav role="navigation" aria-label="Main content area">
    <section aria-labelledby="main-heading">
      <h2 id="main-heading">Portal Navigation</h2>

      <article aria-labelledby="worlds-heading">
        <header>
          <h3 id="worlds-heading">Worlds</h3>
          <p>Explore creative cultural worlds</p>
        </header>

        <section>
          <ul role="group" aria-label="World selection">
            <li>
              <button
                aria-label="Storybook Worlds - Collaborative storytelling environments"
                aria-describedby="worlds-description"
                aria-expanded="false"
              >
                <WorldsIcon />
                <span aria-hidden="true">Storybook Worlds</span>
              </button>

              <div
                id="worlds-description"
                role="region"
                aria-live="polite"
                aria-atomic="true"
                className="portal-description hidden"
              >
                Collaborative storytelling environments where multiple users can
                create narrative scenes together in real-time.
              </div>
            </li>
          </ul>
        </section>

        <article aria-labelledby="systems-heading">
          <header>
            <h3 id="systems-heading">Systems</h3>
            <p>Manage technical infrastructure and configuration</p>
          </header>
          <ul role="group" aria-label="System management">
            <li>
              <button
                aria-label="Data Systems - Database and servers management"
                aria-describedby="systems-description"
              >
                <SystemsIcon />
              </button>

              <div
                id="systems-description"
                role="region"
                aria-live="polite"
                className="portal-description hidden"
              >
                Monitor and manage database connections, server uptime,
                and system configuration across all interconnected services.
              </div>
            </li>
          </ul>
        </article>

        <article aria-labelledby="pixels-heading">
          <header>
            <h3 id="pixels-heading">Pixels</h3>
            <p>Visual assets and creative resources</p>
          </header>
          <ul role="group" aria-label="Pixel assets">
            <li>
              <button
                aria-label="Asset Store - Precious media and texture library"
              >
                <AssetLibraryIcon />
              </button>
            </li>
            <li>
              <button
                aria-label="Color Palette - Custom color scheme builder"
              >
                <PaletteIcon />
              </button>
            </li>
            <li>
              <button
                aria-label="Shader Gallery - Custom visual effects"
              >
                <ShadersIcon />
              </button>
            </li>
          </ul>
        </article>
      </section>
    </nav>

    <section aria-label="User controls">
      <div role="spinbutton">
        <button aria-label="Increase zoom level">+</button>
        <span aria-live="polite" aria-atomic="true">Current zoom: 100%</span>
        <button aria-label="Decrease zoom level">-</button>
      </div>
      <div role="listbox">
        <button aria-label="Turn on high contrast mode">High Contrast</button>
      </div>
    </section>
  </nav>

  <footer role="contentinfo">
    <p>© 2026 System Portal. All rights reserved.</p>
    <div role="list" aria-label="Quick links">
      <a href="/privacy">Privacy Policy</a>
      <a href="/accessibility">Accessibility</a>
    </div>
  </footer>
</React.Fragment>
```

#### Skip Navigation
```jsx
// Skip link to main content
<a
  href="#main-heading"
  className="skip-link"
  aria-labelledby="skip-link-text"
>
  <span id="skip-link-text">Skip to main content</span>
</a>

// Skip link styles
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #FFD700;
  color: #0A0A1E;
  padding: 8px 16px;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 16px;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.2);
  outline: none;
}

@media (prefers-reduced-motion: reduce) {
  .skip-link {
    transition: none;
  }
}
```

## Performance Recommendations

### Animation Performance
1. Use `transform` and `opacity` for animations only
2. Avoid layout thrashing by batching style updates
3. Use `will-change` sparingly and with detection
4. Implement RAF-based animation loops
5. Use Object Requested Animation for complex sequences

### Screen Reader Optimization
1. Transmit minimal time for initial load
2. Load critical content immediately
3. Progressive disclose content as needed
4. Use `aria-atomic="false"` for dynamic content
5. Verify with screen reader database documentation

### Touch Optimization
1. Avoid complex multi-touch gestures where possible
2. Provide tap targets at least 48×48px
3. Support edge case scenarios with multiple tabs
4. Utilize touch feedback for confirmatory confirmation
5. Test on devices with variable touch response times

### Color and Contrast Verification
1. Use a color contrast checker for all pairings
2. Verify conversions in grayscale to ensure separation
3. Test with colorblind simulation tools
4. Document all color choices
5. Provide fallback to non-color text information

## Testing Procedures

### Screen Reader Testing
1. Test with VoiceOver on iPhone and JAWS on Windows
2. Verify all major portals announce correctly
3. Verify page loading states are communicated
4. Verify modal/expanded content is accessible to keyboard
5. Verify keyboard navigation is consistent across modes

### Keyboard Testing
1. Navigate entire interface with only keyboard
2. Verify focus indicator is always visible
3. Verify modal content trap works correctly
4. Verify escape key closes modals properly
5. Verify Alt+Enter/Space works for activation

### Color Contrast Testing
1. Use WCAG AA/AAA contrast ratio checker
2. Test with grayscale filter in browser
3. Test with color blindness simulation
4. Verify focus states work in all modes
5. Verify icons are distinguishable

### Reduced Motion Testing
1. Enable reduced motion preference
2. Verify all animations are minimized
3. Verify layout stability maintained
4. Verify focus states still visible
5. Verify transitions remain smooth but simple

### Touch Device Testing
1. Test on variety of mobile devices
2. Verify tap targets are adequate
3. Verify gestures are reliable
4. Verify haptic feedback where available
5. Verify vertical alignment works properly

---

## Documentation and Maintenance

### Code Comments
Use semantic comments to document accessibility intent:

```javascript
// Accessibility: Implements keyboard navigation for portal grids
// ARIA region used to announce portal content selection
// Supports focus trapping for expanded content states

// Accessibility: Reduced motion config applies to all portal animations
// Ensure Focus state remains visible: default 4px ring
// Color contrast requirement: WCAG AA 4.5:1 minimum
```

### Change Logging
Document accessibility changes in release notes:

```
Version 1.2.0 - Accessibility Improvements
- Added WCAG AA compliant color contrast
- Implemented prefers-reduced-motion support
- Added custom focus visible states
- Fixed keyboard navigation in modal content
- Improved screen reader announcements
```

### Regular Audits
Perform quarterly accessibility reviews:
- Automated testing (Lighthouse, Axe)
- Manual screen reader testing
- Keyboard navigation verification
- Color contrast verification
- Reduced motion testing
- Open accessibility bugs tracking