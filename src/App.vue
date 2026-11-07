<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  FuseSideBar,
  FuseGreetBar,
  FuseThemeToggler,
  FuseStatCard,
  FuseInput,
  FuseFilters,
  FuseBreadcrumbs,
  FuseTable,
  useFuseBreadcrumbs,
  useFuseTheme,
} from './main.js'

import { navItems, getFilteredNavItems } from './navigation/navItems.js'

import {
  Sparkles,
  LayoutDashboard,
  Compass,
  BookOpen,
  Table as TableIcon,
  Filter,
  FolderTree,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Eye,
  Pencil,
  Trash2,
  Plus,
  FileText,
  File,
  ArrowRight,
  Code,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Layers,
  ChevronRight,
  Sliders,
  Upload,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
  Palette,
  Terminal,
  Workflow,
  CheckSquare,
  Shield,
  Lightbulb,
  ExternalLink,
} from '@lucide/vue'

// ─────────────────────────────────────────────────────────────
// ROUTER & NAVIGATION SYNCHRONIZATION
// ─────────────────────────────────────────────────────────────
const route = useRoute()
const router = useRouter()

// Derive active tab from route meta id or default to 'whats-new'
const activeTab = computed(() => {
  return route?.meta?.id || 'whats-new'
})

const handleSidebarNavigate = (item) => {
  if (item?.route) {
    router.push(item.route)
  } else if (item?.id) {
    router.push(`/docs/${item.id}`)
  }
}

// ─────────────────────────────────────────────────────────────
// USER PROFILE STATE
// ─────────────────────────────────────────────────────────────
const currentUser = ref({
  name: 'Developer Mbills',
  role: 'admin',
  email: 'mbills@enterprise.local',
  avatar: 'https://i.pravatar.cc/150?u=mbills',
})

// Role switcher for RBAC demo
const currentDemoRole = ref('admin')
const availableRoles = [
  { label: 'Admin (Full Access)', value: 'admin' },
  { label: 'Manager (Operations & Sales)', value: 'manager' },
  { label: 'Staff (Operations only)', value: 'staff' },
  { label: 'Accountant (Finance & Reports)', value: 'accountant' },
]

// ─────────────────────────────────────────────────────────────
// COPY TO CLIPBOARD HELPER
// ─────────────────────────────────────────────────────────────
const copiedKey = ref(null)
const copyCode = (codeText, key) => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(codeText)
    copiedKey.value = key
    setTimeout(() => {
      copiedKey.value = null
    }, 2000)
  }
}

// ─────────────────────────────────────────────────────────────
// 1. GREETBAR DEMO STATE
// ─────────────────────────────────────────────────────────────
const greetStyle = ref('title')
const greetPrefix = ref('Welcome back')
const greetVariations = [
  { id: 'title', label: '1. Title & Description Mode' },
  { id: 'greeting', label: '2. Greeting Mode (Good morning)' },
  { id: 'custom', label: '3. Custom Greeting Prefix' },
  { id: 'crumbs', label: '4. With Auto Breadcrumbs' },
]

// ─────────────────────────────────────────────────────────────
// 2. STATCARD DEMO STATE
// ─────────────────────────────────────────────────────────────
const statLoading = ref(false)
const statCurrency = ref('GHS')

// ─────────────────────────────────────────────────────────────
// 3. INPUT DEMO STATE (All 15+ variations)
// ─────────────────────────────────────────────────────────────
const formState = ref({
  fullName: 'Ama Mensah',
  email: 'ama@mbills.enterprise',
  password: 'Password@2026',
  searchQuery: '',
  phone: '+233 24 123 4567',
  website: 'https://mbills.enterprise',
  age: 28,
  rangeVal: 75,
  colorVal: '#031c45',
  birthDate: '1998-05-14',
  role: 'admin',
  skills: ['vue', 'tailwind'],
  bio: 'Lead software engineer building enterprise UI systems at Mbills Enterprise.',
  plan: 'pro',
  newsletter: true,
  termsAccepted: true,
})

const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Finance Officer', value: 'finance' },
  { label: 'Operations Lead', value: 'operations' },
  { label: 'Staff Member', value: 'staff' },
]

const skillOptions = [
  { label: 'Vue 3 & Composition API', value: 'vue' },
  { label: 'Tailwind CSS v4', value: 'tailwind' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vite & Rollup', value: 'vite' },
]

// ─────────────────────────────────────────────────────────────
// 4. FILTERS DEMO STATE
// ─────────────────────────────────────────────────────────────
const filterSearch = ref('')
const selectedFilters = ref({})
const filterConfigs = [
  {
    key: 'status',
    label: 'Account Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending Review', value: 'pending' },
      { label: 'Suspended', value: 'suspended' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    searchable: true,
    options: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Finance & Accounts', value: 'finance' },
      { label: 'Operations', value: 'operations' },
      { label: 'Human Resources', value: 'hr' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// 5. TABLE DEMO STATE
// ─────────────────────────────────────────────────────────────
const tablePage = ref(1)
const tableSelected = ref([])
const tableLoading = ref(false)
const tableStriped = ref(true)
const tableDense = ref(false)

const tableColumns = [
  { key: 'name', label: 'Employee', subKey: 'email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    sortable: true,
    filterable: true,
    badgeTone: {
      active: 'success',
      pending: 'warning',
      suspended: 'error',
    },
  },
  { key: 'department', label: 'Department', sortable: true, filterable: true },
  { key: 'salary', label: 'Monthly Pay', type: 'money', sortable: true, align: 'right' },
  {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
    actions: [
      { name: 'view', label: 'View', icon: Eye, tone: 'neutral' },
      { name: 'edit', label: 'Edit', icon: Pencil, tone: 'primary' },
      { name: 'delete', label: 'Remove', icon: Trash2, tone: 'error' },
    ],
  },
]

const tableRows = [
  { id: 1, name: 'Kwame Mensah', email: 'kwame@mbills.enterprise', status: 'active', department: 'Engineering', salary: 14500 },
  { id: 2, name: 'Ama Osei', email: 'ama@mbills.enterprise', status: 'active', department: 'Engineering', salary: 16200 },
  { id: 3, name: 'Kofi Boateng', email: 'kofi@mbills.enterprise', status: 'pending', department: 'Operations', salary: 11000 },
  { id: 4, name: 'Abena Antwi', email: 'abena@mbills.enterprise', status: 'suspended', department: 'Finance', salary: 13800 },
  { id: 5, name: 'Yaw Sarpong', email: 'yaw@mbills.enterprise', status: 'active', department: 'Finance', salary: 15100 },
]

const handleTableAction = ({ action, row }) => {
  alert(`Action "${action.label || action.name}" clicked for ${row.name}`)
}

// ─────────────────────────────────────────────────────────────
// 6. BREADCRUMBS DEMO STATE
// ─────────────────────────────────────────────────────────────
const { breadcrumbs: globalCrumbs, setBreadcrumbs, addBreadcrumb, removeLastBreadcrumb } = useFuseBreadcrumbs()

const staticCrumbItems = [
  { label: 'Documentation Hub', route: '/docs/whats-new', icon: BookOpen },
  { label: 'Data Display', route: '/docs/components/table' },
  { label: 'FuseTable Guide' },
]

const resetDynamicCrumbs = () => {
  setBreadcrumbs([
    { label: 'Documentation', route: '/docs/whats-new' },
    { label: 'Components', route: '/docs/components/sidebar' },
    { label: 'Interactive Playground' },
  ])
}

// ─────────────────────────────────────────────────────────────
// 7. THEME COMPOSABLE
// ─────────────────────────────────────────────────────────────
const { isDark, toggleTheme, setTheme } = useFuseTheme()
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden font-sans">
    <!-- Collapsible App Sidebar -->
    <FuseSideBar
      brand-name="Fuse-UI"
      brand-tagline="Mbills Enterprise"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/docs/whats-new"
      profile-route="/docs/recipes/rbac"
      @navigate="handleSidebarNavigate"
      @logout="alert('Logged out')"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Universal Context GreetBar -->
      <FuseGreetBar
        :title="route?.meta?.title || 'Fuse-UI Documentation'"
        :description="route?.meta?.description || 'Enterprise Vue 3 Component Suite • Developer Mbills at Mbills Enterprise'"
        :user="currentUser"
        auto-route
      >
        <template #title-badge v-if="route?.meta?.category">
          <span class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-primary/10 text-primary dark:bg-dark-primary/20 dark:text-dark-primary border border-primary/20">
            {{ route.meta.category }}
          </span>
        </template>
        <template #actions>
          <a
            href="https://github.com/Maderobills/fuse-ui"
            target="_blank"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted transition-colors shadow-xs"
          >
            <Code class="w-3.5 h-3.5 text-primary dark:text-dark-primary" />
            <span>GitHub</span>
          </a>
        </template>
        <FuseThemeToggler />
      </FuseGreetBar>

      <!-- Scrollable Documentation Body -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-10">

        <!-- ========================================================= -->
        <!-- VIEW 1: WHAT'S NEW & OVERVIEW                             -->
        <!-- ========================================================= -->
        <div v-if="activeTab === 'whats-new'" class="space-y-10">
          <!-- Hero Banner -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-slate-900 text-white p-6 md:p-10 shadow-lg">
            <div class="relative z-10 max-w-3xl space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md text-xs font-medium border border-white/20">
                <Sparkles class="w-3.5 h-3.5 text-secondary" />
                <span>Fuse-UI v0.1.0 • Built by Developer Mbills at Mbills Enterprise</span>
              </div>
              <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
                Enterprise Vue 3 UI Made Simple for Everyone
              </h1>
              <p class="text-sm md:text-base text-slate-200 leading-relaxed">
                Whether you are a seasoned software engineer or non-technical business builder, Fuse-UI provides ready-to-use, accessible, and beautifully styled dashboard components. No complicated setup, no breaking changes.
              </p>
              <div class="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="px-5 py-2.5 bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
                  @click="router.push('/docs/components/table')"
                >
                  <span>Explore Data Table</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-xl text-sm transition-all backdrop-blur-xs flex items-center gap-2"
                  @click="router.push('/docs/installation')"
                >
                  <Terminal class="w-4 h-4" />
                  <span>Installation Guide</span>
                </button>
              </div>
            </div>
            <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <!-- Feature Cards Grid -->
          <section class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-secondary/10 dark:bg-dark-secondary/10 flex items-center justify-center text-secondary dark:text-dark-secondary">
                <Sparkles class="w-4 h-4" />
              </div>
              <div>
                <h2 class="text-xl font-bold tracking-tight">What's New in This Release</h2>
                <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Architectural updates, safe null fallbacks, and router improvements</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                    <TableIcon class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">FuseTable Safe Fallbacks</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Columns now default safely to empty array <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">() => []</code> with built-in null checking, preventing undefined filter errors in dynamic views.
                </p>
              </div>

              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-info/10 text-info dark:bg-dark-info/10 dark:text-dark-info">
                    <Compass class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">Enhanced FuseGreetBar</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Support for page titles, descriptions, breadcrumbs array, custom greeting prefix ("Welcome back"), and automatic router path detection.
                </p>
              </div>

              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success">
                    <FolderTree class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">Universal Breadcrumbs Store</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Connected to <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">useFuseBreadcrumbs()</code> with auto-scroll on mobile, custom separator slots, and icon support.
                </p>
              </div>
            </div>
          </section>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 2: INSTALLATION & SETUP                              -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'installation'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <Terminal class="w-3.5 h-3.5" />
              <span>Getting Started</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">Installation & Setup Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Get started with Fuse-UI in your Vue 3 project in less than 2 minutes.
            </p>
          </div>

          <!-- Step 1: Install -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
            <h3 class="font-bold text-base flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Install the Package</span>
            </h3>
            <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
              Run this command in your project terminal:
            </p>
            <div class="bg-black/90 text-emerald-400 p-3.5 rounded-xl text-xs font-mono flex items-center justify-between">
              <code>npm install github:Maderobills/fuse-ui</code>
              <button
                type="button"
                class="px-2 py-1 text-[11px] rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                @click="copyCode('npm install github:Maderobills/fuse-ui', 'install')"
              >
                {{ copiedKey === 'install' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Step 2: Theme CSS -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
            <h3 class="font-bold text-base flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Import Theme CSS (Tailwind CSS v4 & v3)</span>
            </h3>
            <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
              Add the stylesheet to your main CSS file (<code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">src/assets/main.css</code>):
            </p>
            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono space-y-1">
              <p class="text-slate-400">/* Tailwind CSS v4 */</p>
              <p>@import "tailwindcss";</p>
              <p>@source "../../node_modules/@maderobills/fuse-ui";</p>
              <p>@import "@maderobills/fuse-ui/dist/theme.css";</p>
            </div>
          </div>

          <!-- Step 3: Vue App Registration -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
            <h3 class="font-bold text-base flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Register Plugin in main.js</span>
            </h3>
            <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
              Register all components globally, or import them individually in your SFCs:
            </p>
            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono space-y-1">
              <p><span class="text-purple-400">import</span> { createApp } <span class="text-purple-400">from</span> <span class="text-emerald-300">'vue'</span></p>
              <p><span class="text-purple-400">import</span> FuseUI <span class="text-purple-400">from</span> <span class="text-emerald-300">'@maderobills/fuse-ui'</span></p>
              <p><span class="text-purple-400">import</span> App <span class="text-purple-400">from</span> <span class="text-emerald-300">'./App.vue'</span></p>
              <p class="pt-2"><span class="text-purple-400">const</span> app = createApp(App)</p>
              <p>app.use(FuseUI)</p>
              <p>app.mount(<span class="text-emerald-300">'#app'</span>)</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 3: COMPONENT DECISION GUIDE                          -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'decision-guide'" class="space-y-6">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
              <Lightbulb class="w-3.5 h-3.5" />
              <span>Architecture Guide</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">Component Selection Guide: When to Use What</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Inspiration from Tailwind CSS and Vue documentation: choose the ideal component based on your screen requirements.
            </p>
          </div>

          <div class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-muted/30 dark:bg-dark-muted/30 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
                  <tr>
                    <th class="p-4 font-bold">Component</th>
                    <th class="p-4 font-bold">Core Purpose</th>
                    <th class="p-4 font-bold">When to Use This</th>
                    <th class="p-4 font-bold">Why not an alternative?</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline dark:divide-dark-outline">
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseSideBar</td>
                    <td class="p-4">Primary left navigation shell</td>
                    <td class="p-4">App layout container; handles route transitions and user profile pill.</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Handles mobile overlay drawer, collapsible widths, and tooltips automatically.</td>
                  </tr>
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseGreetBar</td>
                    <td class="p-4">Top contextual page banner</td>
                    <td class="p-4">Above main view content to show page title, breadcrumb trail, and actions.</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Automatically derives page titles and descriptions from route.meta.</td>
                  </tr>
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseTable</td>
                    <td class="p-4">Full data grid with filters & sorting</td>
                    <td class="p-4">Tabular records (orders, users, inventory, logs).</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Integrates FuseFilters, row selection, bulk actions, and pagination out of the box.</td>
                  </tr>
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseStatCard</td>
                    <td class="p-4">KPI metric cards</td>
                    <td class="p-4">Dashboards showing money, user counts, or uptime.</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Formats GHS/USD currency, compacts (1.2M), and colors positive/negative trends.</td>
                  </tr>
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseInput</td>
                    <td class="p-4">Unified form element (15+ types)</td>
                    <td class="p-4">Any form: login, registration, settings, profile edits.</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Single tag handles password eye toggles, multiselect tags, and file previews.</td>
                  </tr>
                  <tr class="hover:bg-muted/10">
                    <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseFilters</td>
                    <td class="p-4">Search & filter toolbar</td>
                    <td class="p-4">Card grids or non-table catalog lists.</td>
                    <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Debounces search queries automatically to avoid overloading backend servers.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 4: FUSEGREETBAR DOCUMENTATION                        -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'greetbar'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <Compass class="w-3.5 h-3.5" />
              <span>Header Component</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseGreetBar: Usage & Anatomy</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Top header banner designed for enterprise applications. Supports greeting mode, static title mode, automatic router breadcrumbs, and action slots.
            </p>
          </div>

          <!-- Why & When to Use Callout (Tailwind / Vue Docs Style) -->
          <div class="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-dark-primary/10 space-y-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary flex items-center gap-1.5">
              <Info class="w-4 h-4" />
              <span>Why & When to Use FuseGreetBar</span>
            </h3>
            <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
              Use <code class="font-bold font-mono">FuseGreetBar</code> at the top of every dashboard subpage. Rather than building separate breadcrumbs, page headers, user cards, and theme switchers from scratch, FuseGreetBar ties them together in one cohesive responsive bar.
            </p>
          </div>

          <!-- Interactive Style Selector -->
          <div class="flex flex-wrap items-center gap-2 p-3 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
            <span class="text-xs font-bold text-foreground/60 dark:text-dark-foreground/60 mr-2">Try Different Variations:</span>
            <button
              v-for="mode in greetVariations"
              :key="mode.id"
              type="button"
              class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
              :class="greetStyle === mode.id ? 'bg-primary text-white shadow-xs' : 'bg-muted dark:bg-dark-muted hover:bg-outline/40'"
              @click="greetStyle = mode.id"
            >
              {{ mode.label }}
            </button>
          </div>

          <!-- Live Interactive Preview -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface shadow-xs space-y-4">
            <div class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">
              Live Preview
            </div>

            <!-- Variation 1: Title & Description -->
            <div v-if="greetStyle === 'title'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
              <FuseGreetBar
                title="System Settings & Security"
                description="Manage your enterprise access rules and audit logging policies."
                :user="currentUser"
              >
                <template #title-badge>
                  <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/15 text-success">Active</span>
                </template>
                <template #actions>
                  <button type="button" class="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md shadow-xs">
                    Save Changes
                  </button>
                </template>
                <FuseThemeToggler />
              </FuseGreetBar>
            </div>

            <!-- Variation 2: Greeting Mode -->
            <div v-else-if="greetStyle === 'greeting'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
              <FuseGreetBar
                :user="currentUser"
                description="Here is what is happening across your campuses today."
              >
                <FuseThemeToggler />
              </FuseGreetBar>
            </div>

            <!-- Variation 3: Custom Greeting Prefix -->
            <div v-else-if="greetStyle === 'custom'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
              <FuseGreetBar
                greeting-prefix="Welcome back to Mbills Enterprise"
                :user="currentUser"
                description="You have 3 system alerts pending your review."
              >
                <FuseThemeToggler />
              </FuseGreetBar>
            </div>

            <!-- Variation 4: Breadcrumbs Mode -->
            <div v-else-if="greetStyle === 'crumbs'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
              <FuseGreetBar
                title="Financial Analytics"
                :breadcrumbs="[
                  { label: 'Admin', route: '/' },
                  { label: 'Reports', route: '/reports' },
                  { label: 'Q3 Financial Review' }
                ]"
                :user="currentUser"
              >
                <FuseThemeToggler />
              </FuseGreetBar>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 5: FUSETABLE DOCUMENTATION                           -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'table'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <TableIcon class="w-3.5 h-3.5" />
              <span>Data Display</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseTable: Enterprise Data Grid</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Complete tabular data solution with sortable columns, built-in search & filter toolbar, multi-select rows, bulk actions, and pagination.
            </p>
          </div>

          <!-- Why & When to Use Callout -->
          <div class="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-dark-primary/10 space-y-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary flex items-center gap-1.5">
              <Info class="w-4 h-4" />
              <span>Why & When to Use FuseTable</span>
            </h3>
            <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
              Instead of manually stitching together pagination buttons, sorting headers, search inputs, and checkboxes, <code class="font-bold font-mono">FuseTable</code> handles all client-side and server-side state automatically with declarative props.
            </p>
          </div>

          <!-- Table Controls & Live Preview -->
          <div class="p-1 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface shadow-xs space-y-4">
            <div class="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-outline dark:border-dark-outline">
              <div class="flex items-center gap-4 text-xs font-medium">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="tableStriped" class="rounded" />
                  <span>Striped Rows</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="tableDense" class="rounded" />
                  <span>Dense Mode</span>
                </label>
              </div>

              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium rounded-lg border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted transition-colors flex items-center gap-1.5"
                @click="tableLoading = !tableLoading"
              >
                <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': tableLoading }" />
                <span>Toggle Skeleton: {{ tableLoading ? 'ON' : 'OFF' }}</span>
              </button>
            </div>

            <FuseTable
              title="Enterprise Staff Directory"
              :columns="tableColumns"
              :rows="tableRows"
              :page-size="4"
              v-model:page="tablePage"
              selectable
              v-model:selected="tableSelected"
              filterable
              searchable
              :striped="tableStriped"
              :dense="tableDense"
              :loading="tableLoading"
              @action="handleTableAction"
            >
              <template #toolbar>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                  @click="alert('Add New Staff Member')"
                >
                  <Plus class="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </template>

              <template #bulk="{ selected }">
                <button
                  type="button"
                  class="px-3 py-1 text-xs font-bold text-error bg-error/10 border border-error/30 rounded-lg hover:bg-error/20 transition-colors"
                  @click="alert(`Deleting ${selected.length} records: [${selected.join(', ')}]`)"
                >
                  Delete Selected ({{ selected.length }})
                </button>
              </template>
            </FuseTable>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 6: FUSESTATCARD DOCUMENTATION                        -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'statcard'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
              <LayoutDashboard class="w-3.5 h-3.5" />
              <span>Data Display</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseStatCard: KPI Metrics</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Format currency values, compact large counts (e.g. 1.2M), and display positive/negative trends.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FuseStatCard
              title="Gross Revenue"
              type="money"
              :value="148500"
              currency="GHS"
              :icon="DollarSign"
              tone="success"
              :trend="{ direction: 'up', label: '+18.4% vs last mo', good: true }"
            />
            <FuseStatCard
              title="Total Active Users"
              type="number"
              :value="1254300"
              compact
              :icon="Users"
              tone="primary"
              :trend="{ direction: 'up', label: '+4.2% today', good: true }"
            />
            <FuseStatCard
              title="Server Uptime"
              type="number"
              :value="99.98"
              suffix="%"
              tone="info"
              :trend="{ direction: 'neutral', label: 'Zero downtime' }"
            />
            <FuseStatCard
              title="AWS Infrastructure Cost"
              type="money"
              :value="2400"
              currency="USD"
              tone="warning"
              :trend="{ direction: 'down', label: '-8.5% optimized', good: true }"
            />
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 7: FUSEINPUT (ALL FORM TYPES)                        -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'inputs' || activeTab.startsWith('input')" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-info/10 text-info dark:bg-dark-info/10 dark:text-dark-info text-xs font-semibold">
              <BookOpen class="w-3.5 h-3.5" />
              <span>Form Controls</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseInput: All-in-One Form Controls</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Replaces multiple form wrappers. Simply change <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">type=""</code> to render text, passwords, selects, multi-select tags, sliders, colors, textareas, and checkboxes.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-surface dark:bg-dark-surface p-6 border border-outline dark:border-dark-outline rounded-xl shadow-xs">
            <FuseInput
              label="1. Standard Text"
              placeholder="e.g. Kwame Mensah"
              v-model="formState.fullName"
              required
            />
            <FuseInput
              type="email"
              label="2. Corporate Email"
              placeholder="name@enterprise.com"
              v-model="formState.email"
              required
            />
            <FuseInput
              type="password"
              label="3. Password with Reveal Eye"
              placeholder="Enter secure password"
              v-model="formState.password"
              hint="Click eye icon to toggle visibility"
            />
            <FuseInput
              type="select"
              label="4. Select Dropdown"
              :options="roleOptions"
              v-model="formState.role"
              searchable
            />
            <FuseInput
              type="multiselect"
              label="5. Multi-Select Tags"
              :options="skillOptions"
              v-model="formState.skills"
              searchable
              clearable
            />
            <FuseInput
              type="range"
              :label="`6. Range Slider (${formState.rangeVal}%)`"
              :min="0"
              :max="100"
              v-model="formState.rangeVal"
            />
            <div class="md:col-span-2">
              <FuseInput
                type="textarea"
                label="7. Multi-line Textarea"
                placeholder="Write your note..."
                :rows="3"
                v-model="formState.bio"
              />
            </div>
            <div class="md:col-span-3 pt-2">
              <FuseInput
                type="checkbox"
                placeholder="I accept the Mbills Enterprise Terms of Service."
                v-model="formState.termsAccepted"
              />
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 8: FUSEFILTERS DOCUMENTATION                         -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'filters'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warning/10 text-warning dark:bg-dark-warning/10 dark:text-dark-warning text-xs font-semibold">
              <Filter class="w-3.5 h-3.5" />
              <span>Query & Toolbar</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseFilters: Standalone Query Toolbar</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Debounced real-time search with customizable dropdown filters and slot controls.
            </p>
          </div>

          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <FuseFilters
              show-search
              search-placeholder="Search records by name, department, role..."
              :debounce="300"
              :filters="filterConfigs"
              :grid-cols="2"
              v-model="selectedFilters"
              v-model:search="filterSearch"
            />

            <div class="p-3.5 rounded-lg bg-muted/30 dark:bg-dark-muted/30 border border-outline dark:border-dark-outline text-xs font-mono">
              <span class="font-bold">Active Filter Output:</span>
              <pre class="mt-1">{{ { search: filterSearch, filters: selectedFilters } }}</pre>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 9: FUSEBREADCRUMBS DOCUMENTATION                     -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'breadcrumbs'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success text-xs font-semibold">
              <FolderTree class="w-3.5 h-3.5" />
              <span>Navigation Trails</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseBreadcrumbs Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Wayfinding trails reading from static items props or dynamically from the global reactive store.
            </p>
          </div>

          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="font-bold text-sm">Static Items Prop (with Icons)</h3>
            <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
              <FuseBreadcrumbs :items="staticCrumbItems" />
            </div>
          </div>

          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-sm">Dynamic Global Store via useFuseBreadcrumbs()</h3>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white shadow-xs"
                @click="addBreadcrumb({ label: `Step #${Math.floor(Math.random() * 100)}` })"
              >
                + Add Step
              </button>
            </div>
            <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
              <FuseBreadcrumbs />
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 10: ROLE-BASED ACCESS CONTROL (RBAC) RECIPE          -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'recipe-rbac' || activeTab === 'sidebar'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
              <Shield class="w-3.5 h-3.5" />
              <span>Recipes & Patterns</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">Role-Based Access Control (RBAC) Navigation</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Filter navigation menus dynamically based on user role permissions (e.g. admin, manager, staff, accountant).
            </p>
          </div>

          <!-- Interactive Role Switcher -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-sm">Switch Simulated User Role:</h3>
                <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Watch how navigation items filter in real time</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="r in availableRoles"
                  :key="r.value"
                  type="button"
                  class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
                  :class="currentDemoRole === r.value ? 'bg-primary text-white shadow-xs' : 'bg-muted dark:bg-dark-muted hover:bg-outline/40'"
                  @click="currentDemoRole = r.value"
                >
                  {{ r.label }}
                </button>
              </div>
            </div>

            <!-- Dynamic Filtered Navigation Preview -->
            <div class="p-4 rounded-xl bg-muted/20 dark:bg-dark-muted/20 border border-outline/50 dark:border-dark-outline/50 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary">
                Accessible Sections for [{{ currentDemoRole.toUpperCase() }}]:
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                <div
                  v-for="group in getFilteredNavItems('', currentDemoRole)"
                  :key="group.label"
                  class="p-3 rounded-lg bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline space-y-1"
                >
                  <div class="font-bold text-xs flex items-center gap-1.5 text-primary dark:text-dark-primary">
                    <component :is="group.icon" class="w-3.5 h-3.5" />
                    <span>{{ group.label }}</span>
                  </div>
                  <ul class="text-[11px] text-foreground/70 dark:text-dark-foreground/70 pl-5 list-disc space-y-0.5">
                    <li v-for="child in group.children" :key="child.label">{{ child.label }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIEW 11: THEMING & COMPOSABLES                            -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'theming' || activeTab === 'themetoggler'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <Sun class="w-3.5 h-3.5" />
              <span>Theming & State</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">Theming & Composables Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Zero-configuration dark mode switcher and programmatic state helpers for themes and breadcrumbs.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
              <h3 class="font-bold text-base">FuseThemeToggler</h3>
              <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                Switches the <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">.dark</code> class on <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">&lt;html&gt;</code> and syncs to <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">localStorage</code>.
              </p>
              <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 flex items-center justify-between">
                <span class="text-xs font-bold">Interactive Component:</span>
                <FuseThemeToggler />
              </div>
            </div>

            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
              <h3 class="font-bold text-base">useFuseTheme() Composable</h3>
              <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                Programmatic control: toggle or force dark/light mode in JavaScript.
              </p>
              <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 flex items-center justify-between">
                <span class="text-xs font-mono font-bold">isDark: {{ isDark }}</span>
                <button
                  type="button"
                  class="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold shadow-xs"
                  @click="toggleTheme"
                >
                  toggleTheme()
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- FALLBACK DEFAULT VIEW                                     -->
        <!-- ========================================================= -->
        <div v-else class="space-y-6">
          <div class="p-8 border border-outline dark:border-dark-outline rounded-2xl bg-surface dark:bg-dark-surface text-center space-y-3">
            <h2 class="text-xl font-bold">Section Under Active Development</h2>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
              Click any component on the left sidebar to explore its full live documentation.
            </p>
            <button
              type="button"
              class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-xs"
              @click="router.push('/docs/whats-new')"
            >
              Return to What's New
            </button>
          </div>
        </div>

        <!-- Developer Branding Footer -->
        <footer class="pt-8 border-t border-outline dark:border-dark-outline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60 dark:text-dark-foreground/60">
          <div class="flex items-center gap-2">
            <span class="font-bold text-primary dark:text-dark-primary">Fuse-UI</span>
            <span>•</span>
            <span>Developer Mbills at Mbills Enterprise</span>
          </div>
          <div class="flex items-center gap-6">
            <span class="hover:underline cursor-pointer" @click="router.push('/docs/whats-new')">Documentation</span>
            <span class="hover:underline cursor-pointer" @click="router.push('/docs/decision-guide')">Component Matrix</span>
            <span class="hover:underline cursor-pointer" @click="router.push('/docs/recipes/rbac')">RBAC Guide</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
