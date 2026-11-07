<script setup>
import { Palette, Sun, Moon } from '@lucide/vue'
import { FuseThemeToggler, useFuseTheme } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const { isDark, toggleTheme } = useFuseTheme()

const themeSnippet = `/* 1. In your src/assets/main.css */
@import "tailwindcss";
@source "../../node_modules/@maderobills/fuse-ui";
@import "@maderobills/fuse-ui/dist/theme.css";

/* 2. Custom Color Tokens (optional override) */
@theme {
  --color-primary: #031c45;
  --color-secondary: #bc9333;
  --color-dark-primary: #4a7abf;
  --color-dark-secondary: #d4a94a;
}`

const togglerSnippet = `<template>
  <!-- Zero-config theme switcher button -->
  <FuseThemeToggler />
</template>

<script setup>
import { FuseThemeToggler, useFuseTheme } from '@maderobills/fuse-ui'

// Optional programmatic access
const { isDark, toggleTheme, setTheme } = useFuseTheme()
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
        <Palette class="w-3.5 h-3.5" />
        <span>Design System</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">Theming & Design Tokens</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Fuse-UI is built with semantic design tokens powered by Tailwind CSS v4 CSS custom properties.
      </p>
    </div>

    <!-- Theme Configuration Code Preview -->
    <DemoPreview title="Tailwind v4 CSS Configuration" :code="themeSnippet">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
        <div class="p-4 rounded-xl border border-outline dark:border-dark-outline bg-primary text-white flex flex-col justify-between h-24">
          <span>Primary</span>
          <span class="font-mono text-[11px] opacity-80">#031c45</span>
        </div>
        <div class="p-4 rounded-xl border border-outline dark:border-dark-outline bg-secondary text-primary font-bold flex flex-col justify-between h-24">
          <span>Secondary</span>
          <span class="font-mono text-[11px] opacity-80">#bc9333</span>
        </div>
        <div class="p-4 rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface text-foreground dark:text-dark-foreground flex flex-col justify-between h-24">
          <span>Surface</span>
          <span class="font-mono text-[11px] opacity-60">#ffffff / #0f1d35</span>
        </div>
        <div class="p-4 rounded-xl border border-outline dark:border-dark-outline bg-muted dark:bg-dark-muted text-foreground dark:text-dark-foreground flex flex-col justify-between h-24">
          <span>Muted</span>
          <span class="font-mono text-[11px] opacity-60">#e2e7f0 / #162847</span>
        </div>
      </div>
    </DemoPreview>

    <!-- Theme Toggler Interactive Demo -->
    <DemoPreview title="FuseThemeToggler & useFuseTheme()" :code="togglerSnippet">
      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-muted/20 dark:bg-dark-muted/20 border border-outline/50 dark:border-dark-outline/50">
        <div class="space-y-1">
          <div class="text-xs font-bold">Interactive Theme Switcher:</div>
          <div class="text-xs font-mono text-foreground/70 dark:text-dark-foreground/70">isDark: {{ isDark }}</div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg shadow-xs"
            @click="toggleTheme"
          >
            toggleTheme()
          </button>
          <FuseThemeToggler />
        </div>
      </div>
    </DemoPreview>
  </div>
</template>

