// Configuration Data
const portalData = [
  {
    id: 'home',
    title: 'Home',
    description: 'Portal home',
    href: 'index.html',
    icon: '🏠'
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'View my work and creations',
    href: 'pages/projects.html',
    icon: '💻'
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn about me',
    href: 'pages/about.html',
    icon: '👤'
  },
  {
    id: 'games',
    title: 'Games',
    description: 'Interactive experiences',
    href: 'pages/games.html',
    icon: '🎮'
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'My developer toolkit',
    href: 'pages/tools.html',
    icon: '🔧'
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Latest thoughts',
    href: 'pages/blog.html',
    icon: '📝'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch',
    href: 'pages/contact.html',
    icon: '✉️'
  }
];

// Position Configuration - hexagonal layout
const positionConfig = {
  center: { row: 0, col: 0 },
  left: { row: 0, col: -1, rotate: 210 },
  right: { row: 0, col: 1, rotate: 330 },
  top: { row: -1, col: 0, rotate: 90 },
  bottom: { row: 1, col: 0, rotate: 270 }
};

// Portal Size Configuration
const sizeConfig = {
  small: { width: '120px', height: '120px' },
  medium: { width: '160px', height: '160px' },
  large: { width: '180px', height: '180px' }
};

// Portal Gap Configuration
const gapConfig = {
  small: { outer: '2rem', inner: '2rem' },
  medium: { outer: '3rem', inner: '3rem' },
  large: { outer: '4rem', inner: '3.5rem' }
};

// Portal Navigation Functions