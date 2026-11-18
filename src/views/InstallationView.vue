<script setup>
import { Terminal } from '@lucide/vue'
import InstallTabs from './components/InstallTabs.vue'
</script>

<template>
  <div class="space-y-8">
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
    <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 class="font-bold text-base flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
          <span>Install the Package</span>
        </h3>
        <span class="text-xs text-foreground/60 dark:text-dark-foreground/60">
          Supports npm, pnpm, yarn, and bun
        </span>
      </div>
      <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
        Choose your package manager and install from the npm registry or directly from GitHub:
      </p>
      
      <InstallTabs />
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
    <!-- Step 4: Component Import Example -->
    <div class="p-6 border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface space-y-3">
      <h3 class="font-bold text-base flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">4</span>
        <span>Use Components in Your SFCs</span>
      </h3>
      <p class="text-xs text-foreground/70 dark:text-dark-foreground/70">
        You can use components globally or import them individually with full TypeScript support:
      </p>
      <div class="bg-black/90 text-slate-100 p-4 rounded-xl text-xs font-mono space-y-1">
        <p><span class="text-slate-400">&lt;script setup&gt;</span></p>
        <p><span class="text-purple-400">import</span> { FuseHeader, FuseSideBar, FuseGreetBar, FuseTable, FuseStatCard } <span class="text-purple-400">from</span> <span class="text-emerald-300">'@maderobills/fuse-ui'</span></p>
        <p><span class="text-slate-400">&lt;/script&gt;</span></p>
      </div>
    </div>
  </div>
</template>

