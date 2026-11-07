<script setup>
import { ref, computed } from 'vue'
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
} from '@lucide/vue'

// ─────────────────────────────────────────────────────────────
// NAVIGATION & CURRENT USER STATE
// ─────────────────────────────────────────────────────────────
const activeTab = ref('whats-new')

const navItems = [
  { label: "What's New & Quick Start", icon: Sparkles, id: 'whats-new' },
  { label: 'FuseGreetBar (Header)', icon: Compass, id: 'greetbar' },
  { label: 'FuseStatCard (Metrics)', icon: LayoutDashboard, id: 'stats' },
  { label: 'FuseInput (Form Controls)', icon: BookOpen, id: 'inputs' },
  { label: 'FuseFilters (Search & Filter)', icon: Filter, id: 'filters' },
  { label: 'FuseTable (Data Table)', icon: TableIcon, id: 'table' },
  { label: 'FuseBreadcrumbs (Trail)', icon: FolderTree, id: 'breadcrumbs' },
  { label: 'FuseSideBar (Navigation)', icon: Layers, id: 'sidebar' },
  { label: 'Theme & Composables', icon: Sun, id: 'theming' },
]

const currentUser = {
  name: 'Developer Mbills',
  role: 'Mbills Enterprise',
  email: 'mbills@enterprise.local',
  avatar: 'https://i.pravatar.cc/150?u=mbills',
}

// ─────────────────────────────────────────────────────────────
// COPY TO CLIPBOARD HELPER
// ─────────────────────────────────────────────────────────────
const copiedSnippet = ref(null)
const copyCode = (code, key) => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(code)
    copiedSnippet.value = key
    setTimeout(() => {
      copiedSnippet.value = null
    }, 2000)
  }
}

// ─────────────────────────────────────────────────────────────
// 1. GREETBAR DEMO STATE
// ─────────────────────────────────────────────────────────────
const greetStyle = ref('title') // 'title' | 'greeting' | 'custom' | 'route'
const greetPrefix = ref('Welcome back')
const showGreetBreadcrumbs = ref(true)

// ─────────────────────────────────────────────────────────────
// 2. STATCARD DEMO STATE
// ─────────────────────────────────────────────────────────────
const statLoading = ref(false)
const statCurrency = ref('GHS')

// ─────────────────────────────────────────────────────────────
// 3. INPUT DEMO STATE (All 15+ input variations)
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
  appointmentTime: '14:30',
  role: 'admin',
  skills: ['vue', 'tailwind'],
  bio: 'Lead software engineer building enterprise UI systems at Mbills Enterprise.',
  plan: 'pro',
  newsletter: true,
  termsAccepted: true,
  uploadedFile: null,
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
  { label: 'Node.js Backend', value: 'node' },
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
  {
    key: 'location',
    label: 'Office Branch',
    options: [
      { label: 'Accra HQ', value: 'accra' },
      { label: 'Kumasi Hub', value: 'kumasi' },
      { label: 'Remote / Virtual', value: 'remote' },
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
  { id: 6, name: 'Esi Frimpong', email: 'esi@mbills.enterprise', status: 'active', department: 'Human Resources', salary: 12400 },
  { id: 7, name: 'Kojo Owusu', email: 'kojo@mbills.enterprise', status: 'pending', department: 'Engineering', salary: 13000 },
]

const handleTableAction = ({ action, row }) => {
  alert(`Action "${action.label || action.name}" clicked for ${row.name}`)
}

// ─────────────────────────────────────────────────────────────
// 6. BREADCRUMBS DEMO STATE
// ─────────────────────────────────────────────────────────────
const { breadcrumbs: globalCrumbs, setBreadcrumbs, addBreadcrumb, removeLastBreadcrumb, clearBreadcrumbs } = useFuseBreadcrumbs()

const staticCrumbItems = [
  { label: 'Mbills Enterprise', route: '/', icon: Layers },
  { label: 'Documentation Hub', route: '/docs', icon: BookOpen },
  { label: 'Component Catalog', route: '/docs/components' },
  { label: 'FuseBreadcrumbs Guide' },
]

const resetDynamicCrumbs = () => {
  setBreadcrumbs([
    { label: 'Home', route: '/' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'School Analytics' },
  ])
}
resetDynamicCrumbs()

// ─────────────────────────────────────────────────────────────
// 7. THEME COMPOSABLE DEMO STATE
// ─────────────────────────────────────────────────────────────
const { isDark, toggleTheme, setTheme } = useFuseTheme()
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden font-sans">
    <!-- App Navigation Sidebar -->
    <FuseSideBar
      brand-name="Fuse-UI"
      brand-tagline="Mbills Enterprise"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/"
      profile-route="/profile"
      @navigate="(item) => (activeTab = item?.id || 'whats-new')"
      @logout="alert('Logged out clicked')"
    />

    <!-- Main Content Stage -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Universal Header Bar -->
      <FuseGreetBar
        title="Fuse-UI Documentation"
        description="Enterprise Vue 3 Component Suite • Developer Mbills at Mbills Enterprise"
        :user="currentUser"
        :breadcrumbs="[{ label: 'Docs', route: '/' }, { label: navItems.find(n => n.id === activeTab)?.label || 'Overview' }]"
      >
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
        <!-- TAB 0: WHAT'S NEW & QUICK START (BEGINNER FRIENDLY)       -->
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
                  @click="activeTab = 'table'"
                >
                  <span>Explore Live Demos</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-xl text-sm transition-all backdrop-blur-xs flex items-center gap-2"
                  @click="activeTab = 'inputs'"
                >
                  <BookOpen class="w-4 h-4" />
                  <span>View Form Controls</span>
                </button>
              </div>
            </div>
            <!-- Background Decorative Glow -->
            <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <!-- What's New Grid -->
          <section class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-secondary/10 dark:bg-dark-secondary/10 flex items-center justify-center text-secondary dark:text-dark-secondary">
                <Sparkles class="w-4 h-4" />
              </div>
              <div>
                <h2 class="text-xl font-bold tracking-tight">What's New in This Release</h2>
                <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Recent enhancements, additions, and architectural upgrades</p>
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

              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-warning/10 text-warning dark:bg-dark-warning/10 dark:text-dark-warning">
                    <DollarSign class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">FuseStatCard Formatting</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Built-in currency rendering (GHS, USD, EUR), compact number abbreviation (1.2M), good/bad trend inversions, and skeleton loading.
                </p>
              </div>

              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary">
                    <ShieldCheck class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">Full TypeScript Declarations</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Included <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">dist/index.d.ts</code> with complete prop type safety, slot typings, and IDE IntelliSense.
                </p>
              </div>

              <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5 shadow-xs">
                <div class="flex items-center gap-2">
                  <span class="p-2 rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                    <Zap class="w-4 h-4" />
                  </span>
                  <h3 class="font-bold text-sm">Tailwind CSS v4 Native</h3>
                </div>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
                  Zero CSS compilation step required. Pure semantic classes referencing theme tokens like <code class="bg-muted dark:bg-dark-muted px-1 py-0.5 rounded text-[11px]">--color-primary</code>.
                </p>
              </div>
            </div>
          </section>

          <!-- 3-Step Beginner Guide for Non-Coders -->
          <section class="p-6 md:p-8 rounded-2xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-6 shadow-sm">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary">Quick Setup</span>
              <h2 class="text-xl font-bold mt-1">3 Simple Steps to Start Using Fuse-UI</h2>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Easy guide for junior developers and non-coders copying into their project</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Step 1 -->
              <div class="p-4 rounded-xl bg-muted/30 dark:bg-dark-muted/30 border border-outline/50 dark:border-dark-outline/50 space-y-3">
                <div class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">1</div>
                <h3 class="font-bold text-sm">Install Package</h3>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                  Run this terminal command in your Vue project directory:
                </p>
                <div class="relative bg-black/80 text-emerald-400 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
                  <code>npm install @maderobills/fuse-ui</code>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="p-4 rounded-xl bg-muted/30 dark:bg-dark-muted/30 border border-outline/50 dark:border-dark-outline/50 space-y-3">
                <div class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">2</div>
                <h3 class="font-bold text-sm">Include Theme CSS</h3>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                  Add this line into your main CSS file (<code class="font-mono text-[11px]">style.css</code>):
                </p>
                <div class="relative bg-black/80 text-emerald-400 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
                  <code>@import "@maderobills/fuse-ui/dist/theme.css";</code>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="p-4 rounded-xl bg-muted/30 dark:bg-dark-muted/30 border border-outline/50 dark:border-dark-outline/50 space-y-3">
                <div class="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">3</div>
                <h3 class="font-bold text-sm">Import & Enjoy</h3>
                <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                  Import any component directly in your Vue page template:
                </p>
                <div class="relative bg-black/80 text-emerald-400 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
                  <code>import { FuseGreetBar } from '@maderobills/fuse-ui'</code>
                </div>
              </div>
            </div>
          </section>

          <!-- Component Selection Cheat-Sheet (When to use what) -->
          <section class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
            <div class="p-5 border-b border-outline dark:border-dark-outline bg-muted/30 dark:bg-dark-muted/30">
              <h3 class="font-bold text-base">Component Decision Guide: When to Use What</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Plain-English guide to pick the exact component for your application screen</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-muted/10 dark:bg-dark-muted/10 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
                  <tr>
                    <th class="p-3.5 font-bold">Component Name</th>
                    <th class="p-3.5 font-bold">What It Does</th>
                    <th class="p-3.5 font-bold">When to Use This</th>
                    <th class="p-3.5 font-bold">Alternative / Difference</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline dark:divide-dark-outline">
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseGreetBar</td>
                    <td class="p-3.5">Top page banner with titles, greetings, and action buttons.</td>
                    <td class="p-3.5">At the top of every dashboard view or subpage.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Unlike breadcrumbs alone, it holds page titles, user avatar, and custom toolbar slots.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseStatCard</td>
                    <td class="p-3.5">KPI metric cards showing money, numbers, or statuses.</td>
                    <td class="p-3.5">For dashboards showing sales, student counts, cloud costs, etc.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Handles currency formatting, compacting (1.2M), and positive/negative trends automatically.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseInput</td>
                    <td class="p-3.5">All-in-one form element for 15+ input types.</td>
                    <td class="p-3.5">Any form: login, registration, settings, profile edits.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">One component handles passwords with eye reveal, multi-select tags, date pickers, and files.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseFilters</td>
                    <td class="p-3.5">Toolbar for searching and selecting dropdown filters.</td>
                    <td class="p-3.5">Filtering card grids, product lists, or custom catalogs.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Use when data is NOT in a table; FuseTable already includes this built-in.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseTable</td>
                    <td class="p-3.5">Full data table with sorting, search, selection, and paging.</td>
                    <td class="p-3.5">Displaying tabular records (users, orders, transactions).</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Replaces 500 lines of boilerplate code with one single declarative component.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseBreadcrumbs</td>
                    <td class="p-3.5">Path trail showing users where they are in the application.</td>
                    <td class="p-3.5">Deeply nested pages, folders, or document trees.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Can be placed anywhere or read automatically from the global composable.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseSideBar</td>
                    <td class="p-3.5">Collapsible left sidebar with nested submenus and profile.</td>
                    <td class="p-3.5">Main application layout shell.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Handles responsive folding, active routes, tooltips, and logout events.</td>
                  </tr>
                  <tr class="hover:bg-muted/20 dark:hover:bg-dark-muted/20">
                    <td class="p-3.5 font-bold text-primary dark:text-dark-primary">FuseThemeToggler</td>
                    <td class="p-3.5">Dark/light mode toggle button with sun and moon icons.</td>
                    <td class="p-3.5">Navbar, sidebar footer, or settings modal.</td>
                    <td class="p-3.5 text-foreground/70 dark:text-dark-foreground/70">Zero configuration needed. Automatically manages dark class on &lt;html&gt; and localStorage.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 1: FUSEGREETBAR (ALL USAGE STYLES)                    -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'greetbar'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <Compass class="w-3.5 h-3.5" />
              <span>Header Component</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseGreetBar Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              The flexible top bar designed for modern web applications. Supports greeting mode, static title mode, automatic breadcrumbs, and custom action slots.
            </p>
          </div>

          <!-- Interactive Style Selector -->
          <div class="flex flex-wrap items-center gap-2 p-3 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
            <span class="text-xs font-bold text-foreground/60 dark:text-dark-foreground/60 mr-2">Try Different Variations:</span>
            <button
              v-for="mode in [
                { id: 'title', label: '1. Title & Description Mode' },
                { id: 'greeting', label: '2. Greeting Mode ("Good morning")' },
                { id: 'custom', label: '3. Custom Greeting Prefix' },
                { id: 'crumbs', label: '4. With Auto Breadcrumbs' },
              ]"
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
              Live Interactive Preview
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
                <template #actions>
                  <button type="button" class="px-2.5 py-1 text-xs border border-outline dark:border-dark-outline rounded-md">
                    Dismiss All
                  </button>
                </template>
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

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Copy-Paste Code Snippet</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p class="text-slate-400">// Style 1: Page Title & Description</p>
              <p>&lt;<span class="text-amber-400">FuseGreetBar</span></p>
              <p class="pl-4"><span class="text-sky-300">title</span>=<span class="text-emerald-300">"System Settings & Security"</span></p>
              <p class="pl-4"><span class="text-sky-300">description</span>=<span class="text-emerald-300">"Manage access rules and audit policies."</span></p>
              <p class="pl-4">:<span class="text-sky-300">user</span>=<span class="text-emerald-300">"currentUser"</span></p>
              <p>&gt;</p>
              <p class="pl-4">&lt;<span class="text-amber-400">FuseThemeToggler</span> /&gt;</p>
              <p>&lt;/<span class="text-amber-400">FuseGreetBar</span>&gt;</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 2: FUSESTATCARD (ALL USAGE STYLES)                    -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'stats'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
              <LayoutDashboard class="w-3.5 h-3.5" />
              <span>Metrics & KPIs</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseStatCard Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Display critical business statistics with automatic currency formatting, compact millions/thousands abbreviations, customizable trend arrows, and loading skeletons.
            </p>
          </div>

          <!-- Controls Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-foreground/60 dark:text-dark-foreground/60">Switch Currency:</span>
              <button
                v-for="curr in ['GHS', 'USD', 'EUR', 'GBP']"
                :key="curr"
                type="button"
                class="px-2.5 py-1 text-xs font-semibold rounded-md transition-all"
                :class="statCurrency === curr ? 'bg-primary text-white' : 'bg-muted dark:bg-dark-muted'"
                @click="statCurrency = curr"
              >
                {{ curr }}
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium rounded-lg border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted transition-colors flex items-center gap-1.5"
                @click="statLoading = !statLoading"
              >
                <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': statLoading }" />
                <span>Toggle Loading Skeleton: {{ statLoading ? 'ON' : 'OFF' }}</span>
              </button>
            </div>
          </div>

          <!-- Live Interactive Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Style 1: Money -->
            <FuseStatCard
              title="Gross Revenue"
              type="money"
              :value="148500"
              :currency="statCurrency"
              :icon="DollarSign"
              tone="success"
              :loading="statLoading"
              :trend="{ direction: 'up', label: '+18.4% vs last mo', good: true }"
            />

            <!-- Style 2: Number with Compact -->
            <FuseStatCard
              title="Total Active Users"
              type="number"
              :value="1254300"
              compact
              :icon="Users"
              tone="primary"
              :loading="statLoading"
              :trend="{ direction: 'up', label: '+4.2% today', good: true }"
            />

            <!-- Style 3: Percentage / Suffix -->
            <FuseStatCard
              title="Server Uptime"
              type="number"
              :value="99.98"
              suffix="%"
              tone="info"
              :loading="statLoading"
              :trend="{ direction: 'neutral', label: 'Zero downtime' }"
            />

            <!-- Style 4: Inverted Trend (Cost Down = Good) -->
            <FuseStatCard
              title="AWS Infrastructure Cost"
              type="money"
              :value="2400"
              :currency="statCurrency"
              tone="warning"
              :loading="statLoading"
              :trend="{ direction: 'down', label: '-8.5% optimized', good: true }"
            />
          </div>

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Code Examples: Money, Compact, and Inverted Trends</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-2">
              <p class="text-slate-400">// 1. Money Card with Ghanaian Cedi or USD</p>
              <p>&lt;<span class="text-amber-400">FuseStatCard</span> <span class="text-sky-300">title</span>=<span class="text-emerald-300">"Revenue"</span> <span class="text-sky-300">type</span>=<span class="text-emerald-300">"money"</span> :<span class="text-sky-300">value</span>=<span class="text-emerald-300">"148500"</span> <span class="text-sky-300">currency</span>=<span class="text-emerald-300">"GHS"</span> <span class="text-sky-300">tone</span>=<span class="text-emerald-300">"success"</span> /&gt;</p>

              <p class="text-slate-400 pt-2">// 2. Compact Big Numbers (renders as 1.3M)</p>
              <p>&lt;<span class="text-amber-400">FuseStatCard</span> <span class="text-sky-300">title</span>=<span class="text-emerald-300">"Users"</span> <span class="text-sky-300">type</span>=<span class="text-emerald-300">"number"</span> :<span class="text-sky-300">value</span>=<span class="text-emerald-300">"1254300"</span> <span class="text-sky-300">compact</span> /&gt;</p>

              <p class="text-slate-400 pt-2">// 3. Trend where DOWN is GOOD (e.g. expenses reduced)</p>
              <p>&lt;<span class="text-amber-400">FuseStatCard</span> :<span class="text-sky-300">trend</span>=<span class="text-emerald-300">"{ direction: 'down', label: '-8.5%', good: true }"</span> /&gt;</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 3: FUSEINPUT (ALL FORM CONTROLS & INPUT TYPES)        -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'inputs'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-info/10 text-info dark:bg-dark-info/10 dark:text-dark-info text-xs font-semibold">
              <BookOpen class="w-3.5 h-3.5" />
              <span>Form Master Component</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseInput Usage Guide (All 15+ Types)</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              One unified component replaces dozens of individual input wrappers. Pass <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">type=""</code> to render text, passwords with toggle, dropdowns, multiselect tags, checkboxes, dates, ranges, and file uploads.
            </p>
          </div>

          <!-- Live Form Demo Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-surface dark:bg-dark-surface p-6 border border-outline dark:border-dark-outline rounded-xl shadow-xs">
            <!-- Style 1: Text -->
            <FuseInput
              label="1. Standard Text"
              placeholder="e.g. Kwame Mensah"
              v-model="formState.fullName"
              hint="Required full legal name"
              required
            />

            <!-- Style 2: Email with built-in Mail Icon -->
            <FuseInput
              type="email"
              label="2. Corporate Email"
              placeholder="name@enterprise.com"
              v-model="formState.email"
              hint="Includes auto mail icon"
              required
            />

            <!-- Style 3: Password with Eye Toggle -->
            <FuseInput
              type="password"
              label="3. Password (Show / Hide)"
              placeholder="Enter secure password"
              v-model="formState.password"
              hint="Click eye icon to reveal"
            />

            <!-- Style 4: Single Select Dropdown -->
            <FuseInput
              type="select"
              label="4. Select Dropdown"
              :options="roleOptions"
              v-model="formState.role"
              searchable
              hint="Searchable single select"
            />

            <!-- Style 5: Multi-Select with Badges -->
            <FuseInput
              type="multiselect"
              label="5. Multi-Select Tags"
              :options="skillOptions"
              v-model="formState.skills"
              searchable
              clearable
              hint="Select multiple items as tags"
            />

            <!-- Style 6: Phone Number -->
            <FuseInput
              type="tel"
              label="6. Phone Number"
              placeholder="+233 ..."
              v-model="formState.phone"
              hint="Auto phone icon"
            />

            <!-- Style 7: Date Picker -->
            <FuseInput
              type="date"
              label="7. Date Picker"
              v-model="formState.birthDate"
              hint="Native browser date dialog"
            />

            <!-- Style 8: Range Slider -->
            <div class="space-y-1">
              <FuseInput
                type="range"
                :label="`8. Range Slider (${formState.rangeVal}%)`"
                :min="0"
                :max="100"
                v-model="formState.rangeVal"
              />
            </div>

            <!-- Style 9: Color Picker -->
            <FuseInput
              type="color"
              label="9. Brand Color Picker"
              v-model="formState.colorVal"
              hint="Interactive color selector"
            />

            <!-- Style 10: Radio Group -->
            <div class="md:col-span-2 lg:col-span-1">
              <FuseInput
                type="radio"
                label="10. Radio Options"
                :options="[
                  { label: 'Free Plan', value: 'free' },
                  { label: 'Pro Plan', value: 'pro' },
                  { label: 'Enterprise', value: 'enterprise' },
                ]"
                v-model="formState.plan"
              />
            </div>

            <!-- Style 11: Textarea -->
            <div class="md:col-span-2">
              <FuseInput
                type="textarea"
                label="11. Multi-line Textarea"
                placeholder="Write your note..."
                :rows="3"
                v-model="formState.bio"
                hint="Auto-sized multi-line text input"
              />
            </div>

            <!-- Style 12: Checkbox -->
            <div class="md:col-span-3 pt-2">
              <FuseInput
                type="checkbox"
                placeholder="I accept the Mbills Enterprise Terms of Service and Privacy Agreement."
                v-model="formState.termsAccepted"
              />
            </div>
          </div>

          <!-- Reactive Data Inspector -->
          <div class="p-4 bg-muted/30 dark:bg-dark-muted/30 border border-outline dark:border-dark-outline rounded-xl space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary">Live Form State Output (Real-time reactive binding):</span>
            <pre class="text-xs font-mono bg-black/80 text-emerald-400 p-3 rounded-lg overflow-x-auto">{{ formState }}</pre>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 4: FUSEFILTERS (SEARCH & FILTER TOOLBAR)              -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'filters'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warning/10 text-warning dark:bg-dark-warning/10 dark:text-dark-warning text-xs font-semibold">
              <Filter class="w-3.5 h-3.5" />
              <span>Toolbar & Querying</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseFilters Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Provide search with automatic debounce timing (avoids overwhelming server APIs), multiple dropdown filters, customizable columns, and custom slot controls.
            </p>
          </div>

          <!-- Live Interactive Filters Bar -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface shadow-xs space-y-5">
            <FuseFilters
              show-search
              search-placeholder="Search employees by name, title, or branch..."
              :debounce="300"
              :filters="filterConfigs"
              :grid-cols="3"
              clear-label="Clear All Filters"
              v-model="selectedFilters"
              v-model:search="filterSearch"
              @filter-change="(val) => console.log('Filters changed', val)"
            >
              <template #actions>
                <button
                  type="button"
                  class="px-3.5 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                  @click="alert('Export filtered results to CSV')"
                >
                  Export CSV
                </button>
              </template>
            </FuseFilters>

            <div class="p-4 rounded-xl bg-muted/40 dark:bg-dark-muted/40 border border-outline dark:border-dark-outline text-xs font-mono space-y-1">
              <div class="font-bold text-foreground/80 dark:text-dark-foreground/80">Active Filter State:</div>
              <pre>{{ { search: filterSearch, activeFilters: selectedFilters } }}</pre>
            </div>
          </div>

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Copy-Paste Code Snippet</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p>&lt;<span class="text-amber-400">FuseFilters</span></p>
              <p class="pl-4"><span class="text-sky-300">show-search</span></p>
              <p class="pl-4"><span class="text-sky-300">search-placeholder</span>=<span class="text-emerald-300">"Search records..."</span></p>
              <p class="pl-4">:<span class="text-sky-300">debounce</span>=<span class="text-emerald-300">"300"</span></p>
              <p class="pl-4">:<span class="text-sky-300">filters</span>=<span class="text-emerald-300">"filterConfigs"</span></p>
              <p class="pl-4"><span class="text-sky-300">v-model</span>=<span class="text-emerald-300">"activeFilters"</span></p>
              <p class="pl-4"><span class="text-sky-300">v-model:search</span>=<span class="text-emerald-300">"searchQuery"</span></p>
              <p>&gt;</p>
              <p class="pl-4">&lt;<span class="text-amber-400">template</span> #<span class="text-sky-300">actions</span>&gt;</p>
              <p class="pl-8">&lt;<span class="text-amber-400">button</span>&gt;Export&lt;/<span class="text-amber-400">button</span>&gt;</p>
              <p class="pl-4">&lt;/<span class="text-amber-400">template</span>&gt;</p>
              <p>&lt;/<span class="text-amber-400">FuseFilters</span>&gt;</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 5: FUSETABLE (ENTERPRISE DATA TABLE)                  -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'table'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <TableIcon class="w-3.5 h-3.5" />
              <span>Full Data Table</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseTable Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              High-performance data grid with sortable columns, automatic filter toolbar integration, multi-row selection, bulk action triggers, and custom cell templates.
            </p>
          </div>

          <!-- Table Feature Toggles -->
          <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
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
              <span>Toggle Skeleton Loading: {{ tableLoading ? 'ON' : 'OFF' }}</span>
            </button>
          </div>

          <!-- Live Table Demo -->
          <div class="p-1 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface shadow-xs">
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
              <!-- Top Toolbar Action Button -->
              <template #toolbar>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                  @click="alert('Add New Staff Member clicked')"
                >
                  <Plus class="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </template>

              <!-- Bulk Action Trigger (appears when rows are checked) -->
              <template #bulk="{ selected }">
                <button
                  type="button"
                  class="px-3 py-1 text-xs font-bold text-error bg-error/10 border border-error/30 rounded-lg hover:bg-error/20 transition-colors"
                  @click="alert(`Removing ${selected.length} records: [${selected.join(', ')}]`)"
                >
                  Batch Delete ({{ selected.length }})
                </button>
              </template>
            </FuseTable>
          </div>

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Copy-Paste Code Snippet</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p>&lt;<span class="text-amber-400">FuseTable</span></p>
              <p class="pl-4"><span class="text-sky-300">title</span>=<span class="text-emerald-300">"Staff Directory"</span></p>
              <p class="pl-4">:<span class="text-sky-300">columns</span>=<span class="text-emerald-300">"tableColumns"</span></p>
              <p class="pl-4">:<span class="text-sky-300">rows</span>=<span class="text-emerald-300">"tableRows"</span></p>
              <p class="pl-4">:<span class="text-sky-300">page-size</span>=<span class="text-emerald-300">"10"</span></p>
              <p class="pl-4"><span class="text-sky-300">selectable</span></p>
              <p class="pl-4"><span class="text-sky-300">v-model:selected</span>=<span class="text-emerald-300">"selectedRows"</span></p>
              <p class="pl-4"><span class="text-sky-300">filterable</span></p>
              <p class="pl-4"><span class="text-sky-300">searchable</span></p>
              <p class="pl-4">@<span class="text-sky-300">action</span>=<span class="text-emerald-300">"handleTableAction"</span></p>
              <p>&gt;</p>
              <p class="pl-4">&lt;<span class="text-amber-400">template</span> #<span class="text-sky-300">bulk</span>="{ selected }"&gt;</p>
              <p class="pl-8">&lt;<span class="text-amber-400">button</span>&gt;Delete Selected (\{\{ selected.length \}\})&lt;/<span class="text-amber-400">button</span>&gt;</p>
              <p class="pl-4">&lt;/<span class="text-amber-400">template</span>&gt;</p>
              <p>&lt;/<span class="text-amber-400">FuseTable</span>&gt;</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 6: FUSEBREADCRUMBS (TRAIL NAVIGATION)                 -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'breadcrumbs'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success text-xs font-semibold">
              <FolderTree class="w-3.5 h-3.5" />
              <span>Wayfinding & Trails</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseBreadcrumbs Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Provide breadcrumb navigation either via static items array or via the global reactive <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">useFuseBreadcrumbs()</code> composable.
            </p>
          </div>

          <!-- Variation 1: Static Items Prop -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
            <h3 class="font-bold text-sm">Style 1: Static Items Prop (with Lucide Icons)</h3>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Explicit array of trail steps passed directly to the component</p>
            <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
              <FuseBreadcrumbs :items="staticCrumbItems" />
            </div>
          </div>

          <!-- Variation 2: Global Composable Store -->
          <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 class="font-bold text-sm">Style 2: Zero-Prop Global Composable</h3>
                <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
                  Calling <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">&lt;FuseBreadcrumbs /&gt;</code> without props automatically reads the global store.
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-md shadow-xs"
                  @click="addBreadcrumb({ label: `Sub-Folder #${Math.floor(Math.random() * 100)}` })"
                >
                  + Add Step
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium border border-outline dark:border-dark-outline rounded-md hover:bg-muted dark:hover:bg-dark-muted"
                  @click="removeLastBreadcrumb"
                >
                  Remove Step
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium border border-outline dark:border-dark-outline rounded-md hover:bg-muted dark:hover:bg-dark-muted"
                  @click="resetDynamicCrumbs"
                >
                  Reset
                </button>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
              <FuseBreadcrumbs />
            </div>
          </div>

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>How to Use useFuseBreadcrumbs() Anywhere</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p class="text-slate-400">// In any sub-page or router guard:</p>
              <p><span class="text-purple-400">import</span> { useFuseBreadcrumbs } <span class="text-purple-400">from</span> <span class="text-emerald-300">'@maderobills/fuse-ui'</span></p>
              <p><span class="text-purple-400">const</span> { setBreadcrumbs, addBreadcrumb } = useFuseBreadcrumbs()</p>
              <p class="pt-2 text-slate-400">// Set full trail:</p>
              <p>setBreadcrumbs([</p>
              <p class="pl-4">{ label: <span class="text-emerald-300">'Home'</span>, route: <span class="text-emerald-300">'/'</span> },</p>
              <p class="pl-4">{ label: <span class="text-emerald-300">'Students'</span>, route: <span class="text-emerald-300">'/students'</span> },</p>
              <p class="pl-4">{ label: <span class="text-emerald-300">'Kwame Mensah Profile'</span> }</p>
              <p>])</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 7: FUSESIDEBAR (APPLICATION NAVIGATION)               -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'sidebar'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
              <Layers class="w-3.5 h-3.5" />
              <span>Layout Shell</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">FuseSideBar Usage Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              The primary left-side navigation shell with collapsible width, brand header, nested submenus, user card, role badges, and logout handlers.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
              <h3 class="font-bold text-sm">Key Capabilities</h3>
              <ul class="text-xs space-y-2 text-foreground/80 dark:text-dark-foreground/80 list-disc list-inside">
                <li><span class="font-semibold">Submenus:</span> Add <code class="font-mono text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">children: [...]</code> to any navigation item.</li>
                <li><span class="font-semibold">User Card:</span> Displays avatar, full name, role badge, and email.</li>
                <li><span class="font-semibold">Two-Way Collapse:</span> Bind <code class="font-mono text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">v-model:expanded="isExpanded"</code>.</li>
                <li><span class="font-semibold">Events:</span> Emits <code class="font-mono text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">@navigate</code>, <code class="font-mono text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">@logout</code>.</li>
              </ul>
            </div>

            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
              <h3 class="font-bold text-sm">Supported Props</h3>
              <div class="text-xs space-y-1 font-mono text-foreground/70 dark:text-dark-foreground/70">
                <p>• brand-name: String</p>
                <p>• brand-tagline: String</p>
                <p>• brand-logo: String (Image URL)</p>
                <p>• navigation-items: Array</p>
                <p>• user: Object { name, role, email, avatar }</p>
                <p>• home-route: String</p>
                <p>• profile-route: String</p>
              </div>
            </div>
          </div>

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Full Setup Code</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p>&lt;<span class="text-amber-400">FuseSideBar</span></p>
              <p class="pl-4"><span class="text-sky-300">brand-name</span>=<span class="text-emerald-300">"Fuse-UI"</span></p>
              <p class="pl-4"><span class="text-sky-300">brand-tagline</span>=<span class="text-emerald-300">"Mbills Enterprise"</span></p>
              <p class="pl-4">:<span class="text-sky-300">navigation-items</span>=<span class="text-emerald-300">"navItems"</span></p>
              <p class="pl-4">:<span class="text-sky-300">user</span>=<span class="text-emerald-300">"currentUser"</span></p>
              <p class="pl-4">@<span class="text-sky-300">navigate</span>=<span class="text-emerald-300">"handleNavigate"</span></p>
              <p class="pl-4">@<span class="text-sky-300">logout</span>=<span class="text-emerald-300">"handleLogout"</span></p>
              <p>/&gt;</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 8: THEME & COMPOSABLES                                -->
        <!-- ========================================================= -->
        <div v-else-if="activeTab === 'theming'" class="space-y-8">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
              <Sun class="w-3.5 h-3.5" />
              <span>Theming & State</span>
            </div>
            <h2 class="text-2xl font-bold mt-2">Dark Mode & Composables Guide</h2>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
              Zero-configuration dark mode switcher and programmatic state helpers for themes and breadcrumbs.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ThemeToggler Demonstration -->
            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
              <h3 class="font-bold text-base">FuseThemeToggler</h3>
              <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                Self-contained button that switches the <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">.dark</code> class on <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">&lt;html&gt;</code> and syncs to <code class="font-mono bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">localStorage</code>.
              </p>
              <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 flex items-center justify-between">
                <span class="text-xs font-bold">Interactive Component:</span>
                <FuseThemeToggler />
              </div>
            </div>

            <!-- Programmatic useFuseTheme() -->
            <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
              <h3 class="font-bold text-base">useFuseTheme() Composable</h3>
              <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
                Read the current dark state or toggle theme programmatically inside your JavaScript code.
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

          <!-- Code Documentation -->
          <div class="p-5 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
            <h3 class="text-sm font-bold flex items-center gap-2">
              <Code class="w-4 h-4 text-primary dark:text-dark-primary" />
              <span>Programmatic Composable Code</span>
            </h3>

            <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
              <p><span class="text-purple-400">import</span> { useFuseTheme } <span class="text-purple-400">from</span> <span class="text-emerald-300">'@maderobills/fuse-ui'</span></p>
              <p><span class="text-purple-400">const</span> { isDark, toggleTheme, setTheme } = useFuseTheme()</p>
              <p class="pt-2 text-slate-400">// Force light or dark mode programmatically:</p>
              <p>setTheme(<span class="text-amber-400">true</span>)  <span class="text-slate-400">// Dark</span></p>
              <p>setTheme(<span class="text-amber-400">false</span>) <span class="text-slate-400">// Light</span></p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- DEVELOPER BRANDING FOOTER                                 -->
        <!-- ========================================================= -->
        <footer class="pt-8 border-t border-outline dark:border-dark-outline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60 dark:text-dark-foreground/60">
          <div class="flex items-center gap-2">
            <span class="font-bold text-primary dark:text-dark-primary">Fuse-UI</span>
            <span>•</span>
            <span>Developer Mbills at Mbills Enterprise</span>
          </div>
          <div class="flex items-center gap-6">
            <span>Documentation Hub</span>
            <span>Component Registry</span>
            <span>MIT License</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
