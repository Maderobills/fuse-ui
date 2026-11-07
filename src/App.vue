<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import {
  FuseSideBar,
  FuseGreetBar,
  FuseThemeToggler,
} from './main.js'

import { navItems } from './navigation/navItems.js'
import { Code } from '@lucide/vue'

const route = useRoute()
const router = useRouter()

const currentUser = {
  name: 'Developer Mbills',
  role: 'admin',
  email: 'mbills@enterprise.local',
  avatar: 'https://i.pravatar.cc/150?u=mbills',
}

const handleSidebarNavigate = (item) => {
  if (item?.route) {
    router.push(item.route)
  }
}
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden font-sans">
    <!-- Collapsible App Navigation Shell -->
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

    <!-- Main Content Stage -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Universal Top Context Header -->
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

      <!-- Dynamic Routed View Body -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-10">
        <RouterView />

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
