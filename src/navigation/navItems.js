import {
  Sparkles,
  BookOpen,
  Layers,
  Compass,
  FolderTree,
  LayoutDashboard,
  Table as TableIcon,
  Filter,
  Sun,
  Shield,
  Palette,
  CheckSquare,
  SlidersHorizontal,
  Terminal,
  FileCode,
  Lightbulb,
  Workflow,
  KeyRound,
  FileText,
} from '@lucide/vue'

/*
|--------------------------------------------------------------------------
| Fuse-UI Documentation — Navigation Structure
|--------------------------------------------------------------------------
|
| Inspires: Tailwind CSS & Vue.js Official Documentation Design
|
| categories:
|   - Getting Started
|   - Layout & Navigation
|   - Data Display
|   - Form Controls
|   - Filtering & Search
|   - Theming & Utilities
|   - Real-World Recipes
|
| Built by Developer Mbills at Mbills Enterprise
|--------------------------------------------------------------------------
*/

export const navItems = [
  // ─────────────────────────────────────────────────────────────
  // 1. GETTING STARTED
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Getting Started',
    icon: Sparkles,
    children: [
      {
        label: "What's New in v0.1.0",
        icon: Sparkles,
        route: '/docs/whats-new',
        id: 'whats-new',
        badge: 'New',
        badgeTone: 'secondary',
        description: 'New components, safe fallbacks, and architecture updates.',
      },
      {
        label: 'Quick Installation',
        icon: Terminal,
        route: '/docs/installation',
        id: 'installation',
        description: 'Install via npm, configure Tailwind CSS v4, and import into Vue 3.',
      },
      {
        label: 'Theming & Design Tokens',
        icon: Palette,
        route: '/docs/theming',
        id: 'theming',
        description: 'Color palettes, CSS custom properties, and dark mode configuration.',
      },
      {
        label: 'Component Decision Guide',
        icon: Lightbulb,
        route: '/docs/decision-guide',
        id: 'decision-guide',
        description: 'When to choose which component for optimal UI architecture.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. LAYOUT & NAVIGATION
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Layout & Navigation',
    icon: Layers,
    children: [
      {
        label: 'FuseSideBar',
        icon: Layers,
        route: '/docs/components/sidebar',
        id: 'sidebar',
        badge: 'Shell',
        description: 'Collapsible application sidebar with submenus, user pill, and active state.',
      },
      {
        label: 'FuseGreetBar',
        icon: Compass,
        route: '/docs/components/greetbar',
        id: 'greetbar',
        badge: 'Header',
        description: 'Universal page header with greetings, titles, breadcrumbs, and slots.',
      },
      {
        label: 'FuseBreadcrumbs',
        icon: FolderTree,
        route: '/docs/components/breadcrumbs',
        id: 'breadcrumbs',
        description: 'Dynamic and static path trail with icons, auto-scroll, and global store.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. DATA DISPLAY
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Data Display',
    icon: TableIcon,
    children: [
      {
        label: 'FuseTable',
        icon: TableIcon,
        route: '/docs/components/table',
        id: 'table',
        badge: 'Powerhouse',
        badgeTone: 'primary',
        description: 'Enterprise data table with sorting, filtering, selection, and pagination.',
      },
      {
        label: 'FuseStatCard',
        icon: LayoutDashboard,
        route: '/docs/components/statcard',
        id: 'statcard',
        description: 'KPI metric cards with auto-currency (GHS/USD/EUR), compact format, and trends.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FORM CONTROLS
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Form Controls',
    icon: BookOpen,
    children: [
      {
        label: 'FuseInput: Overview',
        icon: BookOpen,
        route: '/docs/components/input',
        id: 'input',
        badge: '15+ Types',
        description: 'Unified all-in-one form component replacing individual input wrappers.',
      },
      {
        label: 'Text, Email & Password',
        icon: KeyRound,
        route: '/docs/components/input/text-password',
        id: 'input-text',
        description: 'Text inputs with auto mail icons and secure show/hide password toggle.',
      },
      {
        label: 'Select & Multi-Select',
        icon: CheckSquare,
        route: '/docs/components/input/select-tags',
        id: 'input-select',
        description: 'Single searchable dropdowns and multi-select badge tags.',
      },
      {
        label: 'Sliders, Colors & Dates',
        icon: SlidersHorizontal,
        route: '/docs/components/input/controls',
        id: 'input-controls',
        description: 'Native date pickers, range sliders, and interactive color palettes.',
      },
      {
        label: 'Textarea, Radio & Checkboxes',
        icon: FileText,
        route: '/docs/components/input/choices',
        id: 'input-choices',
        description: 'Multi-line textareas, grouped radio buttons, and single/multi checkboxes.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. FILTERING & SEARCH
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Filtering & Search',
    icon: Filter,
    children: [
      {
        label: 'FuseFilters',
        icon: Filter,
        route: '/docs/components/filters',
        id: 'filters',
        description: 'Standalone debounced search bar and multi-criteria dropdown toolbar.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. THEMING & UTILITIES
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Theming & Composables',
    icon: Sun,
    children: [
      {
        label: 'FuseThemeToggler',
        icon: Sun,
        route: '/docs/components/themetoggler',
        id: 'themetoggler',
        description: 'Zero-config dark/light mode button managing html class and localStorage.',
      },
      {
        label: 'useFuseTheme()',
        icon: Palette,
        route: '/docs/composables/usefusetheme',
        id: 'usefusetheme',
        description: 'Programmatic composable to read dark mode state and toggle themes.',
      },
      {
        label: 'useFuseBreadcrumbs()',
        icon: FolderTree,
        route: '/docs/composables/usefusebreadcrumbs',
        id: 'usefusebreadcrumbs',
        description: 'Global reactive breadcrumbs store with trail setters and add/remove helpers.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. REAL-WORLD RECIPES & PATTERNS
  // ─────────────────────────────────────────────────────────────
  {
    label: 'Recipes & Architecture',
    icon: Workflow,
    children: [
      {
        label: 'Enterprise Dashboard Template',
        icon: LayoutDashboard,
        route: '/docs/recipes/dashboard',
        id: 'recipe-dashboard',
        description: 'Combine Sidebar, GreetBar, StatCards, and Table into a complete app.',
      },
      {
        label: 'Admin CRUD Table Pattern',
        icon: TableIcon,
        route: '/docs/recipes/crud',
        id: 'recipe-crud',
        description: 'Full create, read, update, delete workflow with bulk deletion.',
      },
      {
        label: 'Role-Based Navigation (RBAC)',
        icon: Shield,
        route: '/docs/recipes/rbac',
        id: 'recipe-rbac',
        description: 'Filter sidebars and view routes conditionally based on user role permissions.',
      },
    ],
  },
]

/*
|--------------------------------------------------------------------------
| Filter navigation items by search query or role
|--------------------------------------------------------------------------
*/
export const getFilteredNavItems = (query = '', role = null) => {
  const q = query.trim().toLowerCase()

  return navItems
    .map((group) => {
      if (!group.children) return group

      const filteredChildren = group.children.filter((item) => {
        // Role check (if specified)
        if (role && item.roles && !item.roles.includes(role)) {
          return false
        }

        // Query check
        if (!q) return true
        const inLabel = item.label.toLowerCase().includes(q)
        const inDesc = item.description?.toLowerCase().includes(q)
        return inLabel || inDesc
      })

      return {
        ...group,
        children: filteredChildren,
      }
    })
    .filter((group) => {
      if (group.children) return group.children.length > 0
      return true
    })
}

export default navItems

