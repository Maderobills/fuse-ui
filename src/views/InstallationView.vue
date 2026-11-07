<script setup>
import { ref } from 'vue'
import { Terminal, Check, Copy } from '@lucide/vue'

const copied = ref(false)
const copyInstall = () => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText('npm install github:Maderobills/fuse-ui')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
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
          class="px-2.5 py-1 text-[11px] rounded bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1"
          @click="copyInstall"
        >
          <Check v-if="copied" class="w-3 h-3 text-emerald-400" />
          <Copy v-else class="w-3 h-3" />
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
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
</template>

