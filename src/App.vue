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
} from './main.js'

import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Table as TableIcon,
  Filter,
  CheckCircle2,
  DollarSign,
  Users,
  GraduationCap,
  TrendingUp,
  FolderTree,
  Eye,
  Pencil,
  Trash2,
  Plus,
  FileText,
  File,
  ShieldCheck,
  Zap,
} from '@lucide/vue'

// Current active documentation tab
const activeTab = ref('whats-new')

// Navigation items for FuseSideBar
const navItems = [
  { label: "What's New", icon: Sparkles, id: 'whats-new' },
  { label: 'Data Table', icon: TableIcon, id: 'table' },
  { label: 'Form Controls', icon: BookOpen, id: 'inputs' },
  { label: 'Filters & Search', icon: Filter, id: 'filters' },
  { label: 'Stats & KPIs', icon: LayoutDashboard, id: 'stats' },
  { label: 'Breadcrumbs', icon: FolderTree, id: 'breadcrumbs' },
]

// Current user profile
const currentUser = {
  name: 'Developer Mbills',
  role: 'Mbills Enterprise',
  email: 'mbills@enterprise.local',
  avatar: 'https://i.pravatar.cc/150?u=mbills',
}

// Breadcrumbs demo
const { setBreadcrumbs, addBreadcrumb, clearBreadcrumbs } = useFuseBreadcrumbs()

const resetBreadcrumbDemo = () => {
  setBreadcrumbs([
    { label: 'Mbills Enterprise', route: '/' },
    { label: 'Fuse-UI Documentation', route: '/docs' },
    { label: 'Component Explorer' },
  ])
}
resetBreadcrumbDemo()

// Form Controls demo state
const formState = ref({
  fullName: 'Ama Mensah',
  email: 'ama@mbills.enterprise',
  password: 'SuperSecretPassword!',
  role: 'admin',
  skills: ['vue', 'tailwind'],
  bio: 'Lead frontend engineer building next-gen enterprise UI at Mbills Enterprise.',
  plan: 'pro',
  newsletter: true,
})

const roleOptions = [
  { label: 'Enterprise Admin', value: 'admin' },
  { label: 'Project Manager', value: 'manager' },
  { label: 'Staff Developer', value: 'developer' },
]

const skillOptions = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Tailwind CSS v4', value: 'tailwind' },
  { label: 'Vite', value: 'vite' },
  { label: 'TypeScript', value: 'typescript' },
]

// Filters demo state
const activeFilters = ref({})
const searchQuery = ref('')

const filterConfig = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Suspended', value: 'suspended' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    searchable: true,
    options: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Operations', value: 'operations' },
      { label: 'Finance', value: 'finance' },
    ],
  },
]

// Table demo state
const selectedRows = ref([])
const tablePage = ref(1)

const tableColumns = [
  { key: 'name', label: 'Member', subKey: 'email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    filterable: true,
    sortable: true,
    badgeTone: {
      active: 'success',
      pending: 'warning',
      suspended: 'error',
    },
  },
  { key: 'department', label: 'Department', sortable: true, filterable: true },
  { key: 'salary', label: 'Compensation', type: 'money', sortable: true, align: 'right' },
  {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
    actions: [
      { name: 'view', label: 'View', icon: Eye, tone: 'neutral' },
      { name: 'edit', label: 'Edit', icon: Pencil, tone: 'primary' },
      { name: 'delete', label: 'Delete', icon: Trash2, tone: 'error' },
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
  alert(`Triggered action "${action.name}" for ${row.name}`)
}
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden">
    <!-- Sidebar Navigation -->
    <FuseSideBar
      brand-name="Fuse-UI"
      brand-tagline="Mbills Enterprise"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/"
      profile-route="/profile"
      @navigate="(item) => (activeTab = item?.id || 'whats-new')"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Context & Greeting Bar -->
      <FuseGreetBar
        title="Fuse-UI Documentation"
        description="Enterprise Vue 3 Component Suite • Developer Mbills at Mbills Enterprise"
        :user="currentUser"
      >
        <FuseThemeToggler />
      </FuseGreetBar>

      <!-- Scrollable Documentation Page View -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
        <!-- Hero Header -->
        <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface rounded-xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary rounded-full text-xs font-semibold">
              <Zap class="w-3.5 h-3.5" />
              <span>Fuse-UI v0.1.0 • Mbills Enterprise</span>
            </div>
            <h1 class="text-2xl lg:text-3xl font-bold tracking-tight">
              Design Faster. Build Modern.
            </h1>
            <p class="text-sm text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
              Engineered with precision for high-productivity SaaS platforms and dashboards. Fully typed, Tailwind CSS v4 native, and built with accessible Lucide Vue icons.
            </p>
          </div>

          <!-- Documentation Tabs -->
          <div class="flex flex-wrap gap-2 shrink-0">
            <button
              v-for="item in navItems"
              :key="item.id"
              type="button"
              class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="
                activeTab === item.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted dark:bg-dark-muted hover:bg-outline/50 dark:hover:bg-dark-outline/50 text-foreground/70 dark:text-dark-foreground/70'
              "
              @click="activeTab = item.id"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 1: WHAT'S NEW SECTION                       -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'whats-new'" class="space-y-6">
          <div class="flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-secondary dark:text-dark-secondary" />
            <h2 class="text-lg font-bold">What's New in Fuse-UI</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <!-- Feature 1: FuseTable -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary flex items-center justify-center">
                <TableIcon class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">FuseTable</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Full-featured data table supporting sortable headers, multi-select rows with bulk actions, pagination, skeleton loading, and automatic filter toolbar integration.
              </p>
            </div>

            <!-- Feature 2: FuseFilters -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-info/10 text-info dark:bg-dark-info/10 dark:text-dark-info flex items-center justify-center">
                <Filter class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">FuseFilters</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Responsive filtering toolbar with real-time search debouncing, multiselect dropdowns, custom slot injection, and automatic empty-state cleanup.
              </p>
            </div>

            <!-- Feature 3: FuseBreadcrumbs -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success flex items-center justify-center">
                <FolderTree class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">FuseBreadcrumbs</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Universal breadcrumbs trail with icon support, mobile overflow auto-scroll, and the <code class="text-[11px] bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">useFuseBreadcrumbs()</code> global composable.
              </p>
            </div>

            <!-- Feature 4: FuseGreetBar -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-warning/10 text-warning dark:bg-dark-warning/10 dark:text-dark-warning flex items-center justify-center">
                <Zap class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">FuseGreetBar Upgrades</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Now supports explicit page titles, descriptions, custom greeting prefixes ("Welcome back"), auto-route detection, and breadcrumb linking.
              </p>
            </div>

            <!-- Feature 5: FuseStatCard -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary flex items-center justify-center">
                <TrendingUp class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">FuseStatCard Formatting</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Automated currency formatting (<code class="text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">GHS</code>, <code class="text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">USD</code>, <code class="text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">EUR</code>), number compacting (<code class="text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">1.2M</code>), and customizable positive/negative trend directions.
              </p>
            </div>

            <!-- Feature 6: Full TypeScript Typings -->
            <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface p-5 rounded-xl space-y-3 shadow-xs">
              <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary flex items-center justify-center">
                <ShieldCheck class="w-5 h-5" />
              </div>
              <h3 class="font-semibold text-base">Complete TypeScript Typings</h3>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60 leading-relaxed">
                Auto-generated <code class="text-[11px] bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">dist/index.d.ts</code> declarations provide autocomplete and prop type safety in modern IDEs.
              </p>
            </div>
          </div>

          <!-- Differences & Comparison Table -->
          <div class="border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface rounded-xl overflow-hidden shadow-xs mt-6">
            <div class="p-4 border-b border-outline dark:border-dark-outline bg-muted/40 dark:bg-dark-muted/40">
              <h3 class="font-semibold text-sm">Component Selection Guide: When to Use What</h3>
            </div>
            <div class="overflow-x-auto text-xs">
              <table class="w-full text-left">
                <thead class="border-b border-outline dark:border-dark-outline bg-muted/20 dark:bg-dark-muted/20 text-foreground/70 dark:text-dark-foreground/70">
                  <tr>
                    <th class="p-3 font-semibold">Component</th>
                    <th class="p-3 font-semibold">Primary Purpose</th>
                    <th class="p-3 font-semibold">When to Use Instead of Alternative</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline dark:divide-dark-outline">
                  <tr>
                    <td class="p-3 font-medium text-primary dark:text-dark-primary">FuseGreetBar</td>
                    <td class="p-3">Top-level application header</td>
                    <td class="p-3 text-foreground/70 dark:text-dark-foreground/70">Use as the global header for greetings, user profile pills, and page titles.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium text-primary dark:text-dark-primary">FuseBreadcrumbs</td>
                    <td class="p-3">Standalone breadcrumb navigation</td>
                    <td class="p-3 text-foreground/70 dark:text-dark-foreground/70">Use when you need a dedicated, icon-rich path trail outside the header.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium text-primary dark:text-dark-primary">FuseTable (filterable)</td>
                    <td class="p-3">All-in-one tabular view</td>
                    <td class="p-3 text-foreground/70 dark:text-dark-foreground/70">Use when your data is displayed as a table; it configures FuseFilters automatically.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-medium text-primary dark:text-dark-primary">FuseFilters</td>
                    <td class="p-3">Standalone filter toolbar</td>
                    <td class="p-3 text-foreground/70 dark:text-dark-foreground/70">Use when filtering non-table views, such as card grids or list items.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 2: DATA TABLE DEMO                          -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'table'" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold">FuseTable Demo</h2>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
                Interactive data table with sorting, search, selection, and action handling.
              </p>
            </div>
          </div>

          <FuseTable
            title="Team Directory"
            :columns="tableColumns"
            :rows="tableRows"
            :page-size="4"
            v-model:page="tablePage"
            selectable
            v-model:selected="selectedRows"
            filterable
            searchable
            striped
            @action="handleTableAction"
          >
            <template #toolbar>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
                @click="alert('Add member triggered')"
              >
                <Plus class="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </template>

            <template #bulk="{ selected }">
              <button
                type="button"
                class="px-2.5 py-1 text-xs font-medium text-error bg-error/10 border border-error/30 rounded-md hover:bg-error/20 transition-colors"
                @click="alert(`Deleting IDs: ${selected.join(', ')}`)"
              >
                Delete Selected ({{ selected.length }})
              </button>
            </template>
          </FuseTable>
        </section>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 3: FORM INPUTS DEMO                         -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'inputs'" class="space-y-4">
          <div>
            <h2 class="text-lg font-bold">FuseInput Form Controls</h2>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
              Unified input handling passwords, selects, textareas, file uploads, and checkboxes.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface dark:bg-dark-surface p-6 border border-outline dark:border-dark-outline rounded-xl">
            <div class="space-y-4">
              <FuseInput
                label="Full Name"
                placeholder="e.g. Ama Mensah"
                v-model="formState.fullName"
                required
              />

              <FuseInput
                type="email"
                label="Corporate Email"
                placeholder="name@enterprise.com"
                v-model="formState.email"
                hint="Used for team communication"
                required
              />

              <FuseInput
                type="password"
                label="Master Key Password"
                placeholder="Enter password"
                v-model="formState.password"
                hint="Includes built-in eye reveal toggle"
              />

              <FuseInput
                type="select"
                label="Enterprise Role"
                :options="roleOptions"
                v-model="formState.role"
                searchable
              />
            </div>

            <div class="space-y-4">
              <FuseInput
                type="multiselect"
                label="Technical Specialties"
                :options="skillOptions"
                v-model="formState.skills"
                searchable
                clearable
              />

              <FuseInput
                type="textarea"
                label="Professional Biography"
                v-model="formState.bio"
                :rows="3"
              />

              <FuseInput
                type="radio"
                label="Subscription Tier"
                :options="[
                  { label: 'Free Tier', value: 'free' },
                  { label: 'Professional Plan', value: 'pro' },
                  { label: 'Enterprise Dedicated', value: 'enterprise' },
                ]"
                v-model="formState.plan"
              />

              <FuseInput
                type="checkbox"
                placeholder="Receive product release notices from Mbills Enterprise"
                v-model="formState.newsletter"
              />
            </div>
          </div>
        </section>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 4: FILTERS DEMO                             -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'filters'" class="space-y-4">
          <div>
            <h2 class="text-lg font-bold">FuseFilters Toolbar</h2>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
              Interactive standalone filter grid with debounced search and active state tracking.
            </p>
          </div>

          <FuseFilters
            show-search
            search-placeholder="Search records by name, role, email..."
            :debounce="250"
            :filters="filterConfig"
            :grid-cols="3"
            v-model="activeFilters"
            v-model:search="searchQuery"
          />

          <div class="p-4 bg-muted/40 dark:bg-dark-muted/40 border border-outline dark:border-dark-outline rounded-xl text-xs font-mono">
            <span class="font-bold text-foreground/80 dark:text-dark-foreground/80">Reactive Filter Output:</span>
            <pre class="mt-2">{{ { search: searchQuery, filters: activeFilters } }}</pre>
          </div>
        </section>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 5: STATS & KPIS DEMO                        -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'stats'" class="space-y-4">
          <div>
            <h2 class="text-lg font-bold">FuseStatCard Metrics</h2>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
              Formatted currency, compact values, positive/negative trends, and tone color coding.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FuseStatCard
              title="Quarterly Revenue"
              type="money"
              :value="182400"
              currency="USD"
              :icon="DollarSign"
              tone="success"
              :trend="{ direction: 'up', label: '+24.5% vs last Q' }"
            />

            <FuseStatCard
              title="Enterprise Clients"
              type="number"
              :value="4200"
              compact
              :icon="Users"
              tone="primary"
              :trend="{ direction: 'up', label: '+8% this month' }"
            />

            <FuseStatCard
              title="Deployment Success"
              type="number"
              :value="99.9"
              suffix="%"
              tone="info"
              :trend="{ direction: 'up', label: '+0.4%' }"
            />

            <FuseStatCard
              title="Monthly Cloud Spend"
              type="money"
              :value="3850"
              currency="GHS"
              tone="warning"
              :trend="{ direction: 'down', label: '-12%', good: true }"
            />
          </div>
        </section>

        <!-- ─────────────────────────────────────────────── -->
        <!-- TAB 6: BREADCRUMBS DEMO                         -->
        <!-- ─────────────────────────────────────────────── -->
        <section v-if="activeTab === 'breadcrumbs'" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold">FuseBreadcrumbs Navigation</h2>
              <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">
                Connected to <code class="text-xs bg-muted dark:bg-dark-muted px-1 py-0.5 rounded">useFuseBreadcrumbs()</code>.
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium border border-outline dark:border-dark-outline rounded-md hover:bg-muted dark:hover:bg-dark-muted transition-colors"
                @click="addBreadcrumb({ label: `Sub-Section ${Math.floor(Math.random() * 100)}` })"
              >
                + Add Crumb
              </button>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium border border-outline dark:border-dark-outline rounded-md hover:bg-muted dark:hover:bg-dark-muted transition-colors"
                @click="resetBreadcrumbDemo"
              >
                Reset
              </button>
            </div>
          </div>

          <div class="p-4 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
            <!-- Standalone breadcrumb reading global composable -->
            <FuseBreadcrumbs />
          </div>
        </section>

        <!-- Developer Credit Footer -->
        <footer class="pt-8 border-t border-outline dark:border-dark-outline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/50 dark:text-dark-foreground/50">
          <p>© 2026 Developer Mbills at Mbills Enterprise. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <span class="hover:text-foreground dark:hover:text-dark-foreground cursor-pointer">Documentation</span>
            <span class="hover:text-foreground dark:hover:text-dark-foreground cursor-pointer">Component API</span>
            <span class="hover:text-foreground dark:hover:text-dark-foreground cursor-pointer">Support</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
