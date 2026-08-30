// Main JavaScript Entry Point
import portalData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portal loaded successfully');
  console.log('Navigation data:', portalData);
  initPortalGenerator();
});

function initPortalGenerator() {
  const portalContainer = document.getElementById('portal-container');

  if (!portalContainer) {
    console.error('Portal container not found');
    showNotification('Portal container not found', 'error');
    return;
  }

  portalContainer.innerHTML = '';
  let count = 0;

  portalData.forEach((portal, index) => {
    try {
      const portalButton = createPortalElement(portal, index);
      portalContainer.appendChild(portalButton);
      count++;
    } catch (error) {
      console.error(`Error creating portal element for ${portal.title}:`, error);
    }
  });

  console.log(`Generated ${count} portal buttons`);

  if (count === 0) {
    showNotification('No portal buttons were generated', 'error');
  } else {
    showNotification(`Portal loaded with ${count} interactive destinations`, 'success');
  }

  // Create particles for visual effect
  createParticles();
}

function showNotification(message, type = 'info') {
  const existing = document.querySelector('.portal-notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'portal-notification';
  notification.textContent = message;

  Object.assign(notification.style, {
    position: 'fixed',
    top: type === 'error' ? '1rem' : '90%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    cursor: 'pointer',
    pointerEvents: 'auto',
    zIndex: 9999,
    background: type === 'error' ? 'rgba(244, 63, 94, 0.9)' : 'rgba(16, 185, 129, 0.9)',
    color: '#FFFFFF',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
    opacity: '0',
    animation: 'notification-fade-in 0.3s ease forwards'
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'notification-fade-out 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 4000);

  if (type === 'error') {
    document.addEventListener('click', () => {
      window.open('about:blank', '_blank');
      notification.remove();
    });
  }
}

function createParticles() {
  const backgroundContainer = document.getElementById('background-container');
  if (!backgroundContainer) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --particle-opacity: ${Math.random() * 0.5 + 0.2};
      animation: ${getParticleAnimation(i)} 15s ease-in-out infinite;
      animation-delay: ${Math.random() * 15}s;
    `;
    backgroundContainer.appendChild(particle);
  }
}

function getParticleAnimation(i) {
  const delays = [
    'float-up 15s ease-in-out infinite',
    'float-down 18s ease-in-out infinite',
    'float-left 20s ease-in-out infinite',
    'float-right 22s ease-in-out infinite',
    'float-circle 25s ease-in-out infinite'
  ];
  return delays[i % delays.length];
}

function createPortalElement(portal, index) {
  const button = document.createElement('button');

  const positionClass = portal.class || 'portal-position-center';
  button.className = `portal-button glow-hover ${positionClass}`;

  button.setAttribute('data-id', portal.id);
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', `${portal.title}: ${portal.description}`);
  button.setAttribute('aria-describedby', `portal-desc-${portal.id}`);
  button.style.setProperty('--animation-delay', `${index * 0.08}s`);

  const content = document.createElement('div');
  content.className = 'portal-content';

  const icon = document.createElement('span');
  icon.className = 'portal-icon';
  icon.textContent = portal.icon;

  const title = document.createElement('span');
  title.className = 'portal-title';
  title.textContent = portal.title;

  const description = document.createElement('span');
  description.className = 'portal-description';
  description.id = `portal-desc-${portal.id}`;
  description.textContent = portal.description;

  content.appendChild(icon);
  content.appendChild(title);
  content.appendChild(description);

  button.appendChild(content);

  button.addEventListener('click', () => {
    if (portal.href) {
      navigateToPortal(portal.href);
    }
  });

  return button;
}

function navigateToPortal(href) {
  console.log('Navigating to:', href);

  const button = document.activeElement;
  if (button) {
    button.classList.add('page-transitioning');

    setTimeout(() => {
      if (confirm(`Navigating to ${href}. Continue?`)) {
        window.location.href = href;
      } else {
        button.classList.remove('page-transitioning');
      }
    }, 300);
  } else {
    if (confirm(`Navigating to ${href}. Continue?`)) {
      window.location.href = href;
    }
  }
}