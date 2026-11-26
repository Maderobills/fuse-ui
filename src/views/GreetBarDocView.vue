<script setup>
import { ref } from 'vue'
import { Compass, Info, Smartphone, Layers, CheckCircle2 } from '@lucide/vue'
import { FuseGreetBar, FuseThemeToggler } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const currentUser = {
  name: 'Developer Mbills',
  role: 'admin',
  email: 'mbills@enterprise.local',
  avatar: 'https://i.pravatar.cc/150?u=mbills',
}

const greetStyle = ref('title')
const greetVariations = [
  { id: 'title', label: '1. Title & Description Mode' },
  { id: 'greeting', label: '2. Greeting Mode (Good morning)' },
  { id: 'custom', label: '3. Custom Greeting Prefix' },
  { id: 'crumbs', label: '4. With Auto Breadcrumbs' },
  { id: 'sticky', label: '5. Sticky Frosted Header' },
]

const snippetTitle = `<FuseGreetBar
  title="System Settings & Security"
  description="Manage enterprise access rules and audit policies."
  :user="currentUser"
>
  <template #title-badge>
    <span class="badge">Active</span>
  </template>
  <template #actions>
    <button class="btn-primary">Save Changes</button>
  </template>
  <FuseThemeToggler />
</FuseGreetBar>`

const snippetGreeting = `<FuseGreetBar
  greeting
  :user="currentUser"
  description="Here is what is happening across your campuses today."
>
  <FuseThemeToggler />
</FuseGreetBar>`

const snippetCustom = `<FuseGreetBar
  greeting-prefix="Welcome back to Mbills Enterprise"
  :user="currentUser"
  description="You have 3 system alerts pending review."
>
  <FuseThemeToggler />
</FuseGreetBar>`

const snippetCrumbs = `<FuseGreetBar
  title="Financial Analytics"
  :breadcrumbs="[
    { label: 'Admin', route: '/' },
    { label: 'Reports', route: '/reports' },
    { label: 'Q3 Financial Review' }
  ]"
  :user="currentUser"
>
  <FuseThemeToggler />
</FuseGreetBar>`

const snippetSticky = `<FuseGreetBar
  title="Sticky Dashboard Context"
  description="Stays pinned to the top with a smooth frosted glass backdrop."
  :user="currentUser"
  sticky
>
  <FuseThemeToggler />
</FuseGreetBar>`

const currentSnippet = () => {
  if (greetStyle.value === 'title') return snippetTitle
  if (greetStyle.value === 'greeting') return snippetGreeting
  if (greetStyle.value === 'custom') return snippetCustom
  if (greetStyle.value === 'sticky') return snippetSticky
  return snippetCrumbs
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
        <Compass class="w-3.5 h-3.5" />
        <span>Context Header & Top Banner</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseGreetBar: Usage & Anatomy</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Top contextual header banner designed for enterprise applications. Supports time-based greetings, static page titles, automatic router breadcrumbs, sticky frosted glass placement, and seamless mobile responsiveness.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-dark-primary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseGreetBar</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseGreetBar</code> at the top of every dashboard subpage. Rather than building separate breadcrumbs, page headers, user profile cards, and theme switchers from scratch, FuseGreetBar ties them together into one cohesive, responsive, and frosted-glass bar.
      </p>
    </div>

    <!-- Mobile Experience Callout -->
    <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-dark-secondary/10 space-y-2.5">
      <h3 class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary flex items-center gap-1.5">
        <Smartphone class="w-4 h-4" />
        <span>Full Mobile Experience Highlights</span>
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80 dark:text-dark-foreground/80">
        <div class="flex items-start gap-2">
          <CheckCircle2 class="w-4 h-4 text-secondary dark:text-dark-secondary shrink-0 mt-0.5" />
          <span><strong>Zero Floating Button Overlap:</strong> <code class="font-mono text-[11px]">mobileMenuOffset</code> reserves 56px–64px left margin on mobile, ensuring FuseSideBar's hamburger button never covers text.</span>
        </div>
        <div class="flex items-start gap-2">
          <CheckCircle2 class="w-4 h-4 text-secondary dark:text-dark-secondary shrink-0 mt-0.5" />
          <span><strong>Scrollable Breadcrumbs:</strong> Long breadcrumb trails scroll horizontally with hidden scrollbars, preventing multi-line wrapping and page clipping.</span>
        </div>
        <div class="flex items-start gap-2">
          <CheckCircle2 class="w-4 h-4 text-secondary dark:text-dark-secondary shrink-0 mt-0.5" />
          <span><strong>Compact Profile & Action Buttons:</strong> Action slots and profile avatar pills adapt intelligently on small viewports with active touch feedback.</span>
        </div>
        <div class="flex items-start gap-2">
          <CheckCircle2 class="w-4 h-4 text-secondary dark:text-dark-secondary shrink-0 mt-0.5" />
          <span><strong>Custom Menu Trigger Slot:</strong> Use <code class="font-mono text-[11px]">#menu-button</code> to embed your own inline mobile navigation trigger directly within the flow.</span>
        </div>
      </div>
    </div>

    <!-- Style Variation Selector -->
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

    <!-- Demo with Code Preview -->
    <DemoPreview :title="greetVariations.find(v => v.id === greetStyle)?.label || 'Live Demo'" :code="currentSnippet()">
      <div v-if="greetStyle === 'title'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          title="System Settings & Security"
          description="Manage your enterprise access rules and audit logging policies."
          :user="currentUser"
          :mobile-menu-offset="false"
        >
          <template #title-badge>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/15 text-success">Active</span>
          </template>
          <template #actions>
            <button type="button" class="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md shadow-xs active:scale-95 transition-transform">
              Save Changes
            </button>
          </template>
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>

      <div v-else-if="greetStyle === 'greeting'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          greeting
          :user="currentUser"
          description="Here is what is happening across your campuses today."
          :mobile-menu-offset="false"
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>

      <div v-else-if="greetStyle === 'custom'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          greeting-prefix="Welcome back to Mbills Enterprise"
          :user="currentUser"
          description="You have 3 system alerts pending your review."
          :mobile-menu-offset="false"
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>

      <div v-else-if="greetStyle === 'sticky'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          title="Sticky Frosted Header"
          description="Pins smoothly to top of viewport with backdrop blur and sleek borders."
          :user="currentUser"
          sticky
          :mobile-menu-offset="false"
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>

      <div v-else class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          title="Financial Analytics"
          :breadcrumbs="[
            { label: 'Admin', route: '/' },
            { label: 'Reports', route: '/reports' },
            { label: 'Q3 Financial Review' }
          ]"
          :user="currentUser"
          :mobile-menu-offset="false"
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>
    </DemoPreview>

    <!-- Props Reference Table -->
    <div class="space-y-3">
      <h3 class="text-base font-bold">FuseGreetBar Props Reference</h3>
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
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">title</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Custom page title or header text.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">description</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Subtitle or contextual summary beneath title.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">greeting</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">false</td>
                <td class="p-3.5">Shows contextual greeting ("Good morning", "Good afternoon", "Good evening") with user's name.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">greetingPrefix</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">''</td>
                <td class="p-3.5">Overrides time-based greeting prefix (e.g. "Welcome back").</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">breadcrumbs</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Array | Boolean</td>
                <td class="p-3.5 font-mono">false</td>
                <td class="p-3.5">Explicit array of <code class="font-mono">[{ label, route? }]</code> OR <code class="font-mono">true</code> to auto-derive from route / global store.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">autoRoute</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">true</td>
                <td class="p-3.5">Auto-derive title and description from <code class="font-mono">route.meta</code> if not explicitly provided.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">user</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Object | null</td>
                <td class="p-3.5 font-mono">null</td>
                <td class="p-3.5">User profile object <code class="font-mono">{ name, email, avatar }</code>. Renders avatar pill when provided.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">profileRoute</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">String</td>
                <td class="p-3.5 font-mono">'/profile'</td>
                <td class="p-3.5">Route navigated to when user profile pill is clicked.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">mobileMenuOffset</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">true</td>
                <td class="p-3.5">Adds 56px–64px left padding on mobile viewports so text never overlaps FuseSideBar's fixed toggle button. Set to <code class="font-mono">false</code> if not using FuseSideBar.</td>
              </tr>
              <tr class="hover:bg-muted/10">
                <td class="p-3.5 font-mono font-bold text-primary dark:text-dark-primary">sticky</td>
                <td class="p-3.5 font-mono text-secondary dark:text-dark-secondary">Boolean</td>
                <td class="p-3.5 font-mono">false</td>
                <td class="p-3.5">Pins the header to the top of the viewport with <code class="font-mono">sticky top-0 z-30</code> and frosted glass backdrop blur.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Slots Reference Table -->
    <div class="space-y-3">
      <h3 class="text-base font-bold">FuseGreetBar Slots Reference</h3>
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
              <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#menu-button</td>
              <td class="p-3">Optional slot before title to place custom inline mobile menu toggle buttons.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#title-badge</td>
              <td class="p-3">Badge or tag rendered right beside the page title (e.g. status indicator, counter).</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#actions</td>
              <td class="p-3">Action buttons placed on the right (e.g. Save, Export, New Item).</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#theme-toggle</td>
              <td class="p-3">Slot for <code class="font-mono">&lt;FuseThemeToggler /&gt;</code> before the profile avatar pill.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-3 font-mono font-bold text-primary dark:text-dark-primary">#left</td>
              <td class="p-3">Scoped slot to completely customize the left title, greeting, and breadcrumb markup.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
