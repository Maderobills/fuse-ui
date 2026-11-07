import { createRouter, createWebHistory } from 'vue-router'
import { useFuseBreadcrumbs } from '../composables/useFuseBreadcrumbs.js'

export const routes = [
  {
    path: '/',
    redirect: '/docs/whats-new',
  },

  // 1. GETTING STARTED
  {
    path: '/docs/whats-new',
    name: 'docs-whats-new',
    component: () => import('../views/WhatsNewView.vue'),
    meta: {
      id: 'whats-new',
      title: "What's New in Fuse-UI v0.1.0",
      description: 'Recent enhancements, architectural upgrades, and component additions.',
      category: 'Getting Started',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Getting Started' },
        { label: "What's New" },
      ],
    },
  },
  {
    path: '/docs/installation',
    name: 'docs-installation',
    component: () => import('../views/InstallationView.vue'),
    meta: {
      id: 'installation',
      title: 'Quick Installation & Setup',
      description: 'Step-by-step installation with npm, Tailwind CSS v4, and Vite configuration.',
      category: 'Getting Started',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Getting Started' },
        { label: 'Installation' },
      ],
    },
  },
  {
    path: '/docs/theming',
    name: 'docs-theming',
    component: () => import('../views/ThemingView.vue'),
    meta: {
      id: 'theming',
      title: 'Theming & Design Tokens',
      description: 'CSS variables, dark mode configuration, and theme customization guide.',
      category: 'Getting Started',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Getting Started' },
        { label: 'Theming' },
      ],
    },
  },
  {
    path: '/docs/decision-guide',
    name: 'docs-decision-guide',
    component: () => import('../views/DecisionGuideView.vue'),
    meta: {
      id: 'decision-guide',
      title: 'Component Decision Guide: When to Use What',
      description: 'Plain-English architecture reference for selecting the right component.',
      category: 'Getting Started',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Getting Started' },
        { label: 'Decision Guide' },
      ],
    },
  },

  // 2. LAYOUT & NAVIGATION
  {
    path: '/docs/components/sidebar',
    name: 'docs-sidebar',
    component: () => import('../views/SideBarDocView.vue'),
    meta: {
      id: 'sidebar',
      title: 'FuseSideBar — Application Navigation Shell',
      description: 'Collapsible application sidebar with submenus, user profile, and active route highlights.',
      category: 'Layout & Navigation',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Layout & Navigation' },
        { label: 'FuseSideBar' },
      ],
    },
  },
  {
    path: '/docs/components/greetbar',
    name: 'docs-greetbar',
    component: () => import('../views/GreetBarDocView.vue'),
    meta: {
      id: 'greetbar',
      title: 'FuseGreetBar — Context Header & Top Banner',
      description: 'Versatile top header with greetings, titles, breadcrumbs, and action slots.',
      category: 'Layout & Navigation',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Layout & Navigation' },
        { label: 'FuseGreetBar' },
      ],
    },
  },
  {
    path: '/docs/components/breadcrumbs',
    name: 'docs-breadcrumbs',
    component: () => import('../views/BreadcrumbsDocView.vue'),
    meta: {
      id: 'breadcrumbs',
      title: 'FuseBreadcrumbs — Universal Path Trails',
      description: 'Path navigation with icon indicators, auto-scroll, and global store binding.',
      category: 'Layout & Navigation',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Layout & Navigation' },
        { label: 'FuseBreadcrumbs' },
      ],
    },
  },

  // 3. DATA DISPLAY
  {
    path: '/docs/components/table',
    name: 'docs-table',
    component: () => import('../views/TableDocView.vue'),
    meta: {
      id: 'table',
      title: 'FuseTable — Enterprise Data Grid',
      description: 'Full data grid with sorting, search, selection, pagination, and bulk actions.',
      category: 'Data Display',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Data Display' },
        { label: 'FuseTable' },
      ],
    },
  },
  {
    path: '/docs/components/statcard',
    name: 'docs-statcard',
    component: () => import('../views/StatCardDocView.vue'),
    meta: {
      id: 'statcard',
      title: 'FuseStatCard — Metrics & KPIs',
      description: 'KPI metric cards with auto-currency (GHS, USD, EUR), compact notation, and trends.',
      category: 'Data Display',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Data Display' },
        { label: 'FuseStatCard' },
      ],
    },
  },

  // 4. FORM CONTROLS
  {
    path: '/docs/components/input',
    name: 'docs-input',
    component: () => import('../views/InputDocView.vue'),
    meta: {
      id: 'input',
      title: 'FuseInput — Unified Form Controls',
      description: 'Single component managing 15+ input types: passwords, selects, textareas, files, and more.',
      category: 'Form Controls',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Form Controls' },
        { label: 'FuseInput' },
      ],
    },
  },
  {
    path: '/docs/components/input/text-password',
    name: 'docs-input-text',
    component: () => import('../views/InputDocView.vue'),
    meta: {
      id: 'input',
      title: 'FuseInput — Text, Email & Password',
      description: 'Text inputs with auto mail icons and secure show/hide password toggle.',
      category: 'Form Controls',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Form Controls' },
        { label: 'Text & Password' },
      ],
    },
  },
  {
    path: '/docs/components/input/select-tags',
    name: 'docs-input-select',
    component: () => import('../views/InputDocView.vue'),
    meta: {
      id: 'input',
      title: 'FuseInput — Select & Multi-Select',
      description: 'Single searchable dropdowns and multi-select badge tags.',
      category: 'Form Controls',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Form Controls' },
        { label: 'Select & Multi-Select' },
      ],
    },
  },
  {
    path: '/docs/components/input/controls',
    name: 'docs-input-controls',
    component: () => import('../views/InputDocView.vue'),
    meta: {
      id: 'input',
      title: 'FuseInput — Sliders, Colors & Dates',
      description: 'Native date pickers, range sliders, and interactive color palettes.',
      category: 'Form Controls',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Form Controls' },
        { label: 'Sliders & Colors' },
      ],
    },
  },
  {
    path: '/docs/components/input/choices',
    name: 'docs-input-choices',
    component: () => import('../views/InputDocView.vue'),
    meta: {
      id: 'input',
      title: 'FuseInput — Textarea, Radio & Checkboxes',
      description: 'Multi-line textareas, grouped radio buttons, and single/multi checkboxes.',
      category: 'Form Controls',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Form Controls' },
        { label: 'Choices & Checkboxes' },
      ],
    },
  },

  // 5. FILTERING & SEARCH
  {
    path: '/docs/components/filters',
    name: 'docs-filters',
    component: () => import('../views/FiltersDocView.vue'),
    meta: {
      id: 'filters',
      title: 'FuseFilters — Query & Filter Toolbar',
      description: 'Responsive debounced search and multi-criteria dropdown toolbar.',
      category: 'Filtering & Search',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Filtering & Search' },
        { label: 'FuseFilters' },
      ],
    },
  },

  // 6. THEMING & UTILITIES
  {
    path: '/docs/components/themetoggler',
    name: 'docs-themetoggler',
    component: () => import('../views/ThemeTogglerDocView.vue'),
    meta: {
      id: 'themetoggler',
      title: 'FuseThemeToggler & Composables',
      description: 'Dark/light mode switch button and programmatic composable helpers.',
      category: 'Theming & Utilities',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Theming & Utilities' },
        { label: 'FuseThemeToggler' },
      ],
    },
  },
  {
    path: '/docs/composables/usefusetheme',
    name: 'docs-usefusetheme',
    component: () => import('../views/ThemingView.vue'),
    meta: {
      id: 'theming',
      title: 'useFuseTheme() — Programmatic Theming',
      description: 'Read and toggle dark mode in JavaScript.',
      category: 'Theming & Utilities',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Composables' },
        { label: 'useFuseTheme' },
      ],
    },
  },
  {
    path: '/docs/composables/usefusebreadcrumbs',
    name: 'docs-usefusebreadcrumbs',
    component: () => import('../views/BreadcrumbsDocView.vue'),
    meta: {
      id: 'breadcrumbs',
      title: 'useFuseBreadcrumbs() — Global Breadcrumb Store',
      description: 'Manage breadcrumb navigation state across pages.',
      category: 'Theming & Utilities',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new' },
        { label: 'Composables' },
        { label: 'useFuseBreadcrumbs' },
      ],
    },
  },

  // 7. REAL-WORLD RECIPES & PATTERNS
  {
    path: '/docs/recipes/rbac',
    name: 'docs-recipe-rbac',
    component: () => import('../views/RbacRecipeView.vue'),
    meta: {
      id: 'recipe-rbac',
      title: 'Recipe: Role-Based Access Control (RBAC)',
      description: 'Filter navigation menus and protect views dynamically by user permission levels.',
      category: 'Recipes & Architecture',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Recipes' },
        { label: 'RBAC Navigation' },
      ],
    },
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/docs/whats-new',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to) => {
  const { setBreadcrumbs } = useFuseBreadcrumbs()
  if (to.meta?.breadcrumbs) {
    setBreadcrumbs(to.meta.breadcrumbs)
  }

  const title = to.meta?.title || 'Documentation'
  if (typeof document !== 'undefined') {
    document.title = `${title} — Fuse-UI || Mbills Enterprise`
  }
})

export default router
