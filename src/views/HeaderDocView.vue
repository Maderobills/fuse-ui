<script setup>
import { ref } from 'vue'
import {
  PanelTop,
  Info,
  SlidersHorizontal,
  Home,
  Package,
  Users,
  Bell,
  Plus,
  User,
  Settings,
  Sparkles,
  BarChart3,
  Layers,
  ShieldAlert,
} from '@lucide/vue'
import { FuseHeader, FuseThemeToggler } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const headerStyle = ref('full')
const headerVariations = [
  { id: 'full', label: '1. Full Enterprise Header (Customizable + Actions)' },
  { id: 'guest', label: '2. Guest / Unauthenticated State' },
  { id: 'minimal', label: '3. Minimal Sticky Navigation' },
]

const demoUser = ref({
  name: 'Ama Mensah',
  role: 'admin',
  email: 'ama@mbills.local',
  avatar: 'https://i.pravatar.cc/150?u=ama',
})

const lastEvent = ref('')

const handleAction = (key) => {
  lastEvent.value = `Action triggered: "${key}"`
  setTimeout(() => {
    if (lastEvent.value.includes(key)) lastEvent.value = ''
  }, 3500)
}

const handleProfileSelect = (key) => {
  lastEvent.value = `Profile menu selected: "${key}"`
  setTimeout(() => {
    if (lastEvent.value.includes(key)) lastEvent.value = ''
  }, 3500)
}

const handleLogout = () => {
  lastEvent.value = 'User logged out'
  demoUser.value = null
  setTimeout(() => {
    if (lastEvent.value === 'User logged out') lastEvent.value = ''
  }, 3500)
}

const handleLogin = () => {
  demoUser.value = {
    name: 'Ama Mensah',
    role: 'admin',
    email: 'ama@mbills.local',
    avatar: 'https://i.pravatar.cc/150?u=ama',
  }
  lastEvent.value = 'User signed in'
  setTimeout(() => {
    if (lastEvent.value === 'User signed in') lastEvent.value = ''
  }, 3500)
}

const navItems = [
  { label: 'Overview', route: '/docs/components/header', icon: Home },
  {
    label: 'Inventory',
    icon: Package,
    children: [
      { label: 'All Products', route: '/docs/components/table', icon: Package },
      { label: 'Categories', route: '/docs/components/filters', icon: Layers },
      { label: 'Stock Alerts', route: '/docs/components/statcard', icon: ShieldAlert },
    ],
  },
  { label: 'Customers', route: '/docs/recipes/rbac', icon: Users },
  { label: 'Analytics', route: '/docs/recipes/dashboard', icon: BarChart3 },
]

const actions = [
  { key: 'new_order', label: 'New Order', icon: Plus },
  { key: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
]

const profileMenu = [
  { key: 'profile', label: 'My Profile', icon: User, route: '/docs/recipes/rbac' },
  { key: 'settings', label: 'Workspace Settings', icon: Settings, route: '/docs/theming' },
]

const snippetFull = `<FuseHeader
  brand-name="StockFuse"
  brand-tagline="Inventory & POS"
  logo-light="/favicon.svg"
  home-route="/docs/components/header"
  :nav-items="navItems"
  :actions="actions"
  :user="currentUser"
  :profile-menu="profileMenu"
  sticky
  customizable
  storage-key="stockfuse-header"
  @action="onAction"
  @profile-select="onProfileSelect"
  @logout="onLogout"
>
  <template #actions>
    <FuseThemeToggler />
  </template>
</FuseHeader>`

const snippetGuest = `<!-- user is null: renders a stylish "Sign in" button -->
<FuseHeader
  brand-name="CloudPortal"
  brand-tagline="Public Access"
  home-route="/"
  :nav-items="[
    { label: 'Features', route: '/features' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'Docs', route: '/docs' },
  ]"
  :user="null"
  @login="showLoginModal = true"
>
  <template #actions>
    <FuseThemeToggler />
  </template>
</FuseHeader>`

const snippetMinimal = `<FuseHeader
  brand-name="Studio"
  home-route="/"
  :nav-items="navItems"
  :user="currentUser"
  :show-logout="false"
/>`

const currentSnippet = () => {
  if (headerStyle.value === 'full') return snippetFull
  if (headerStyle.value === 'guest') return snippetGuest
  return snippetMinimal
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
        <PanelTop class="w-3.5 h-3.5" />
        <span>Layout & Navigation</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseHeader: Top Application Navigation Bar</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Reconfigurable top application header featuring brand branding, dropdown navigation, quick action shortcuts, user profile popover, sticky placement, and interactive reorderable sections with local storage persistence.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-dark-secondary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseHeader</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseHeader</code> when your application uses horizontal navigation, top-bar branding, or SaaS portals that allow end users to customize their toolbar layout. While <code class="font-bold font-mono">FuseSideBar</code> powers vertical side layouts and <code class="font-bold font-mono">FuseGreetBar</code> displays subpage breadcrumbs/greetings, <code class="font-bold font-mono">FuseHeader</code> serves as the primary top application shell.
      </p>
    </div>

    <!-- Style Variation Selector -->
    <div class="flex flex-wrap items-center gap-2 p-3 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl">
      <span class="text-xs font-bold text-foreground/60 dark:text-dark-foreground/60 mr-2">Try Different Configurations:</span>
      <button
        v-for="mode in headerVariations"
        :key="mode.id"
        type="button"
        class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
        :class="headerStyle === mode.id ? 'bg-primary text-white shadow-xs' : 'bg-muted dark:bg-dark-muted hover:bg-outline/40'"
        @click="headerStyle = mode.id"
      >
        {{ mode.label }}
      </button>
    </div>

    <!-- Event Feedback Banner -->
    <div
      v-if="lastEvent"
      class="px-4 py-2.5 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary dark:text-dark-secondary text-xs font-semibold flex items-center justify-between transition-all"
    >
      <div class="flex items-center gap-2">
        <Sparkles class="w-4 h-4 shrink-0" />
        <span>{{ lastEvent }}</span>
      </div>
      <button type="button" class="text-[11px] underline opacity-80 hover:opacity-100" @click="lastEvent = ''">
        Dismiss
      </button>
    </div>

    <!-- Live Interactive Demo -->
    <DemoPreview :title="headerVariations.find(v => v.id === headerStyle)?.label || 'Live Demo'" :code="currentSnippet()">
      <div class="rounded-xl border border-outline/60 dark:border-dark-outline/60 overflow-hidden bg-background dark:bg-dark-background p-2">
        <!-- 1. Full Enterprise Header -->
        <div v-if="headerStyle === 'full'" class="rounded-lg overflow-hidden border border-outline dark:border-dark-outline">
          <FuseHeader
            brand-name="StockFuse"
            brand-tagline="Inventory & POS"
            logo-light="/favicon.svg"
            home-route="/docs/components/header"
            :nav-items="navItems"
            :actions="actions"
            :user="demoUser"
            :profile-menu="profileMenu"
            customizable
            storage-key="stockfuse-header-demo"
            @action="handleAction"
            @profile-select="handleProfileSelect"
            @logout="handleLogout"
            @login="handleLogin"
          >
            <template #actions>
              <FuseThemeToggler />
            </template>
          </FuseHeader>
        </div>

        <!-- 2. Guest Header -->
        <div v-else-if="headerStyle === 'guest'" class="rounded-lg overflow-hidden border border-outline dark:border-dark-outline">
          <FuseHeader
            brand-name="CloudPortal"
            brand-tagline="Public Access Portal"
            logo-light="/favicon.svg"
            home-route="/docs/components/header"
            :nav-items="[
              { label: 'Documentation', route: '/docs/whats-new', icon: Home },
              { label: 'Components', route: '/docs/components/table', icon: Package },
              { label: 'Installation', route: '/docs/installation', icon: Settings },
            ]"
            :user="null"
            @login="handleLogin"
          >
            <template #actions>
              <FuseThemeToggler />
            </template>
          </FuseHeader>
        </div>

        <!-- 3. Minimal Sticky Header -->
        <div v-else class="rounded-lg overflow-hidden border border-outline dark:border-dark-outline">
          <FuseHeader
            brand-name="Studio Minimal"
            home-route="/docs/components/header"
            :nav-items="navItems"
            :user="demoUser"
            :show-logout="false"
            @profile-select="handleProfileSelect"
          >
            <template #actions>
              <FuseThemeToggler />
            </template>
          </FuseHeader>
        </div>
      </div>
    </DemoPreview>

    <!-- Architecture & Section Customizer Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5">
        <div class="flex items-center gap-2">
          <SlidersHorizontal class="w-4 h-4 text-secondary dark:text-dark-secondary" />
          <h3 class="font-bold text-sm">Interactive Section Customizer</h3>
        </div>
        <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
          When <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">customizable</code> is enabled, users see a sliders button. Opening it allows toggling sections on/off and reordering them up/down without complex drag-and-drop dependencies.
        </p>
        <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
          Pass <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">storage-key="my-app-header"</code> to automatically persist the user's customized layout order in <code class="font-mono text-[11px]">localStorage</code>.
        </p>
      </div>

      <div class="p-5 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface space-y-2.5">
        <div class="flex items-center gap-2">
          <Layers class="w-4 h-4 text-primary dark:text-dark-primary" />
          <h3 class="font-bold text-sm">Built-in Layout Sections</h3>
        </div>
        <ul class="text-xs text-foreground/70 dark:text-dark-foreground/70 space-y-1.5">
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">logo</code>: Light & dark adaptive logo image with link.</li>
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">brand</code>: Brand title and optional secondary subtitle tagline.</li>
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">nav</code>: Desktop popover dropdowns + mobile hamburger menu.</li>
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">spacer</code>: Flexible divider pushing following sections to the right.</li>
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">actions</code>: Icon action buttons with badges + <code class="font-mono">#actions</code> slot.</li>
          <li><code class="font-bold font-mono text-primary dark:text-dark-primary">profile</code>: User avatar, name, dropdown menu, or guest sign-in button.</li>
        </ul>
      </div>
    </div>

    <!-- Props Reference Table -->
    <div class="space-y-3">
      <h3 class="text-base font-bold">FuseHeader Props Reference</h3>
      <div class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-muted/30 dark:bg-dark-muted/30 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
              <tr>
                <th class="p-3.5 font-bold">Prop</th>
                <th class="p-3.5 font-bold">Type</th>
                <th class="p-3.5 font-bold">Default</th>
                <th class="p-3.5 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline dark:divide-dark-outline">
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">brandName</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Brand or application title displayed in header.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">brandTagline</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Small tagline beneath the brand title.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">logoLight</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Image source URL for light mode logo.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">logoDark</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Image source URL for dark mode logo.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">homeRoute</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">'/'</td>
                <td class="p-3.5">Route navigated to when clicking the logo or brand name.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">navItems</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array</td>
                <td class="p-3.5 font-mono">[]</td>
                <td class="p-3.5">Navigation items <code class="font-mono">[{ label, route?, path?, icon?, children?: [...] }]</code>.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">actions</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array</td>
                <td class="p-3.5 font-mono">[]</td>
                <td class="p-3.5">Quick action buttons <code class="font-mono">[{ key, label, icon?, route?, badge? }]</code>.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">user</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Object | null</td>
                <td class="p-3.5 font-mono">null</td>
                <td class="p-3.5">User profile object <code class="font-mono">{ name, email, role, avatar }</code>. When <code class="font-mono">null</code>, shows "Sign in".</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">profileMenu</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array</td>
                <td class="p-3.5 font-mono">[]</td>
                <td class="p-3.5">Dropdown items in user profile popover <code class="font-mono">[{ key, label, icon?, route?, tone? }]</code>.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">showLogout</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">true</td>
                <td class="p-3.5">Shows logout button at bottom of profile popover.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">sticky</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">false</td>
                <td class="p-3.5">Pins header to top of viewport with <code class="font-mono">sticky top-0 z-40</code>.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">customizable</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">false</td>
                <td class="p-3.5">Renders the layout customizer button allowing users to reorder and toggle sections.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">storageKey</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Key used to persist customized layout in <code class="font-mono">localStorage</code>.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">v-model:layout</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array</td>
                <td class="p-3.5 font-mono">['logo', 'brand', 'nav', 'spacer', 'actions', 'profile']</td>
                <td class="p-3.5">Order array of all sections.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">v-model:hidden</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array</td>
                <td class="p-3.5 font-mono">[]</td>
                <td class="p-3.5">Array of disabled section keys to hide from the header.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Events & Slots Reference -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h3 class="text-base font-bold">Events</h3>
        <div class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-muted/30 dark:bg-dark-muted/30 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
              <tr>
                <th class="p-3 font-bold">Event</th>
                <th class="p-3 font-bold">Payload</th>
                <th class="p-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline dark:divide-dark-outline">
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">@action</td>
                <td class="p-3 font-mono">actionKey: string</td>
                <td class="p-3">Fired when a quick action without a <code class="font-mono">route</code> is clicked.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">@profile-select</td>
                <td class="p-3 font-mono">itemKey: string</td>
                <td class="p-3">Fired when a profile menu item without a <code class="font-mono">route</code> is clicked.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">@logout</td>
                <td class="p-3 font-mono">-</td>
                <td class="p-3">Fired when the user clicks Logout in profile popover.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">@login</td>
                <td class="p-3 font-mono">-</td>
                <td class="p-3">Fired when the "Sign in" button is clicked in guest mode.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-base font-bold">Slots</h3>
        <div class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-muted/30 dark:bg-dark-muted/30 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
              <tr>
                <th class="p-3 font-bold">Slot</th>
                <th class="p-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline dark:divide-dark-outline">
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#logo</td>
                <td class="p-3">Custom logo markup replacing default image rendering.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#brand</td>
                <td class="p-3">Custom brand markup replacing default title and tagline.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#actions</td>
                <td class="p-3">Additional controls placed in the quick action group (e.g. <code class="font-mono">&lt;FuseThemeToggler /&gt;</code>).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
