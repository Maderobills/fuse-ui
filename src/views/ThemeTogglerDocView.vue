<script setup>
import { Sun, Palette } from '@lucide/vue'
import { FuseThemeToggler, useFuseTheme } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const { isDark, toggleTheme } = useFuseTheme()

const togglerSnippet = `<template>
  <!-- 1. Zero-config toggle button in template -->
  <FuseThemeToggler />

  <!-- 2. Or programmatically via composable: -->
  <button @click="toggleTheme">Toggle Dark Mode</button>
  <button @click="setTheme(true)">Force Dark</button>
  <button @click="setTheme(false)">Force Light</button>
</template>

<script setup>
import { FuseThemeToggler, useFuseTheme } from '@maderobills/fuse-ui'

const { isDark, toggleTheme, setTheme } = useFuseTheme()
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
        <Sun class="w-3.5 h-3.5" />
        <span>Theming & State</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseThemeToggler & useFuseTheme()</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Automatic and programmatic dark mode management for Tailwind CSS applications.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="Dark Mode Switcher" :code="togglerSnippet">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20 space-y-4">
          <div class="text-xs font-bold">Interactive Component:</div>
          <FuseThemeToggler />
        </div>

        <div class="p-6 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20 space-y-4">
          <div class="text-xs font-bold font-mono">useFuseTheme() State: isDark = {{ isDark }}</div>
          <button
            type="button"
            class="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold shadow-xs"
            @click="toggleTheme"
          >
            toggleTheme()
          </button>
        </div>
      </div>
    </DemoPreview>
  </div>
</template>

