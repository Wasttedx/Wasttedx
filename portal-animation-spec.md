# Floating Portal Objects Animation Specification

## Core Concepts

- Use CSS `transform: translate3d()` for hardware-accelerated animations
- Always prioritize `opacity` and `transform` over layout properties
- Initialize animations with `will-change: transform`

## 1. Floating Movement

```css
@keyframes float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  25% { transform: translate3d(0px, -10px, 0); }
  50% { transform: translate3d(0px, -8px, 0); }
  75% { transform: translate3d(0px, -12px, 0); }
}

.portal {
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portal {
    animation: none !important;
    transform: none !important;
  }
}
```

## 2. Hover Effects

```css
@keyframes hover-pulse {
  0%, 100% { transform: translate3d(0,0,0) scale(1); filter: brightness(1) drop-shadow(0 0 10px rgba(212,175,55,0.3)); }
  50% { transform: translate3d(0,-8px,0) scale(1.05); filter: brightness(1.1) drop-shadow(0 0 25px rgba(212,175,55,0.6)); }
}

.portal.hovered {
  animation: hover-pulse 0.4s ease-out forwards;
  cursor: pointer;
  z-index: 100;
}
```

## 3. Parallax Interaction

```css
.portal {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (prefers-reduced-motion: reduce) {
  .portal {
    transition: none;
  }
}

/* JavaScript tracking */
.portal-moving {
  transform: translate3d(
    calc(var(--mouse-x, 0) * 0.1px),
    calc(var(--mouse-y, 0) * 0.1px),
    0
  );
}
```

## 4. Page Transitions

```css
@keyframes portal-appear {
  from { opacity: 0; transform: translate3d(-30px, -30px, -50px) scale(0.8); filter: blur(10px); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
}

.portal-transition {
  animation: portal-appear 0.5s ease-out forwards;
}

@keyframes portal-disappear {
  from { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  to { opacity: 0; transform: translate3d(var(--exit-x, -30px), var(--exit-y, -30px), var(--exit-z, -50px)) scale(0); }
}

.portal-moving-out {
  animation: portal-disappear 0.3s ease-in forwards;
}
```

## 5. Performance Optimizations

```css
/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portal *, .portal *::before, .portal *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Avoid layout thrashing */
.overflow-hidden .portal {
  will-change: transform;
}

/* Batch transforms */
portal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Usage Example

```html
<div class="portal" id="portal-1">
  <div class="portal-content"></div>
</div>

<script>
// Parallax tracking
document.addEventListener('mousemove', (e) => {
  const portals = document.querySelectorAll('.portal');
  portals.forEach(portal => {
    const rect = portal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    portal.style.setProperty('--mouse-x', e.clientX - centerX);
    portal.style.setProperty('--mouse-y', e.clientY - centerY);
  });
});
</script>
```

```css
/* Combine animations */
.portal.moving {
  animation: float 6s ease-in-out infinite, portal-moving 0.3s ease-out forwards;
}
```