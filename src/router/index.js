import { createRouter, createWebHistory } from 'vue-router'
import { useFuseBreadcrumbs } from '../composables/useFuseBreadcrumbs.js'
import App from '../App.vue'

/*
|--------------------------------------------------------------------------
| Fuse-UI Documentation — Vue Router Configuration
|--------------------------------------------------------------------------
|
| Features:
|   - Deep-linking for every component, variation, and recipe
|   - Automatic breadcrumb trail synchronization via useFuseBreadcrumbs()
|   - Contextual meta (title, description, category, and icon tags)
|   - Tailwind / Vue.js official documentation style wayfinding
|--------------------------------------------------------------------------
*/

export const routes = [
  // ─────────────────────────────────────────────────────────────
  // DEFAULT REDIRECT
  // ─────────────────────────────────────────────────────────────
  {
    path: '/',
    redirect: '/docs/whats-new',
  },

  // ─────────────────────────────────────────────────────────────
  // 1. GETTING STARTED
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/whats-new',
    name: 'docs-whats-new',
    component: App,
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
    component: App,
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
    component: App,
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
    component: App,
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

  // ─────────────────────────────────────────────────────────────
  // 2. LAYOUT & NAVIGATION
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/components/sidebar',
    name: 'docs-sidebar',
    component: App,
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
    component: App,
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
    component: App,
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

  // ─────────────────────────────────────────────────────────────
  // 3. DATA DISPLAY
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/components/table',
    name: 'docs-table',
    component: App,
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
    component: App,
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

  // ─────────────────────────────────────────────────────────────
  // 4. FORM CONTROLS
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/components/input',
    name: 'docs-input',
    component: App,
    meta: {
      id: 'inputs',
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

  // ─────────────────────────────────────────────────────────────
  // 5. FILTERING & SEARCH
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/components/filters',
    name: 'docs-filters',
    component: App,
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

  // ─────────────────────────────────────────────────────────────
  // 6. THEMING & UTILITIES
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/components/themetoggler',
    name: 'docs-themetoggler',
    component: App,
    meta: {
      id: 'theming',
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

  // ─────────────────────────────────────────────────────────────
  // 7. REAL-WORLD RECIPES & PATTERNS
  // ─────────────────────────────────────────────────────────────
  {
    path: '/docs/recipes/dashboard',
    name: 'docs-recipe-dashboard',
    component: App,
    meta: {
      id: 'recipe-dashboard',
      title: 'Recipe: Complete Enterprise Dashboard',
      description: 'Production-ready dashboard layout combining Sidebar, Header, Stats, and Tables.',
      category: 'Recipes & Architecture',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Recipes' },
        { label: 'Dashboard Pattern' },
      ],
    },
  },
  {
    path: '/docs/recipes/crud',
    name: 'docs-recipe-crud',
    component: App,
    meta: {
      id: 'recipe-crud',
      title: 'Recipe: Full Admin CRUD Table Workflow',
      description: 'End-to-end data grid with row actions, search filtering, and bulk operations.',
      category: 'Recipes & Architecture',
      breadcrumbs: [
        { label: 'Documentation', route: '/docs/whats-new', icon: 'sparkles' },
        { label: 'Recipes' },
        { label: 'Admin CRUD Pattern' },
      ],
    },
  },
  {
    path: '/docs/recipes/rbac',
    name: 'docs-recipe-rbac',
    component: App,
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

  // ─────────────────────────────────────────────────────────────
  // FALLBACK
  // ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────
// GLOBAL NAVIGATION GUARD (Syncs Breadcrumbs & Page Titles)
// ─────────────────────────────────────────────────────────────────
router.beforeEach((to) => {
  // 1. Sync global breadcrumbs trail
  const { setBreadcrumbs } = useFuseBreadcrumbs()
  if (to.meta?.breadcrumbs) {
    setBreadcrumbs(to.meta.breadcrumbs)
  }

  // 2. Update browser document title
  const title = to.meta?.title || 'Documentation'
  if (typeof document !== 'undefined') {
    document.title = `${title} — Fuse-UI || Mbills Enterprise`
  }
})

export default router

