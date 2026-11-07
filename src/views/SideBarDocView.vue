<script setup>
import { Layers, Info } from '@lucide/vue'
import DemoPreview from './components/DemoPreview.vue'

const sidebarSnippet = `<template>
  <!-- Main application shell layout -->
  <div class="flex h-screen overflow-hidden">
    <FuseSideBar
      brand-name="Fuse-UI"
      brand-tagline="Mbills Enterprise"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/dashboard"
      profile-route="/profile"
      v-model:expanded="isExpanded"
      @navigate="handleNavigate"
      @logout="handleLogout"
    />

    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FuseSideBar } from '@maderobills/fuse-ui'
import { navItems } from './navigation/navItems.js'

const isExpanded = ref(true)
const currentUser = {
  name: 'Kwame Mensah',
  role: 'admin',
  email: 'kwame@school.edu',
  avatar: 'https://i.pravatar.cc/150?u=kwame',
}

const handleNavigate = (item) => {
  console.log('Navigated to:', item.route)
}

const handleLogout = () => {
  // Clear auth session & redirect
}
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
        <Layers class="w-3.5 h-3.5" />
        <span>Layout Shell</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseSideBar: Application Navigation Shell</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Collapsible responsive sidebar supporting nested submenus, active route indicators, user card, role badges, and mobile drawer overlay.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-dark-secondary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseSideBar</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseSideBar</code> as the outer shell of your SaaS dashboard. It handles two-way width collapsing, tooltips in collapsed mode, mobile hamburger slide-out overlay, and emits clean navigation and logout events.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="FuseSideBar Setup & Usage" :code="sidebarSnippet">
      <div class="p-6 rounded-xl bg-muted/20 dark:bg-dark-muted/20 border border-outline/50 dark:border-dark-outline/50 space-y-4">
        <div class="text-xs font-bold text-primary dark:text-dark-primary">Live Visual Verification:</div>
        <p class="text-xs text-foreground/70 dark:text-dark-foreground/70 leading-relaxed">
          The sidebar on the left of this documentation hub is a live working instance of <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">FuseSideBar</code>. Try collapsing it using the toggle chevron at the bottom, or clicking on any menu item to test route navigation.
        </p>
      </div>
    </DemoPreview>
  </div>
</template>
