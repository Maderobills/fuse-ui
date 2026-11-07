<script setup>
import { useRouter } from 'vue-router'
import {
  Sparkles,
  Table as TableIcon,
  Compass,
  FolderTree,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
} from '@lucide/vue'

const router = useRouter()
</script>

<template>
  <div class="space-y-10">
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
          Whether you are a seasoned software engineer or non-technical business builder, Fuse-UI provides ready-to-use, accessible, and beautifully styled dashboard components. Modular architecture with dedicated view pages and interactive code previews.
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

    <!-- What's New Feature Cards Grid -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-secondary/10 dark:bg-dark-secondary/10 flex items-center justify-center text-secondary dark:text-dark-secondary">
          <Sparkles class="w-4 h-4" />
        </div>
        <div>
          <h2 class="text-xl font-bold tracking-tight">What's New in This Release</h2>
          <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Recent architectural upgrades, safe fallbacks, and router improvements</p>
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
            Auto-generated <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-[11px]">dist/index.d.ts</code> declarations provide autocomplete and prop type safety in modern IDEs.
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
  </div>
</template>
