<script setup>
import { FolderTree, BookOpen, Info, Layers } from '@lucide/vue'
import { FuseBreadcrumbs, useFuseBreadcrumbs } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const { setBreadcrumbs, addBreadcrumb } = useFuseBreadcrumbs()

const staticCrumbItems = [
  { label: 'Documentation Hub', route: '/docs/whats-new', icon: BookOpen },
  { label: 'Data Display', route: '/docs/components/table', icon: Layers },
  { label: 'FuseTable Guide' },
]

const staticSnippet = `<template>
  <!-- Static items prop with Lucide icons -->
  <FuseBreadcrumbs :items="staticCrumbItems" />
</template>

<script setup>
import { FuseBreadcrumbs } from '@maderobills/fuse-ui'
import { BookOpen, Layers } from '@lucide/vue'

const staticCrumbItems = [
  { label: 'Docs Hub', route: '/', icon: BookOpen },
  { label: 'Data Display', route: '/table', icon: Layers },
  { label: 'FuseTable Guide' },
]
<\/script>`

const dynamicSnippet = `<template>
  <!-- Zero props: automatically reads global reactive store -->
  <FuseBreadcrumbs />
</template>

<script setup>
import { FuseBreadcrumbs, useFuseBreadcrumbs } from '@maderobills/fuse-ui'

const { setBreadcrumbs, addBreadcrumb } = useFuseBreadcrumbs()

// Set full trail anywhere in router or page:
setBreadcrumbs([
  { label: 'Home', route: '/' },
  { label: 'Rentals', route: '/rentals' },
  { label: 'Rental #1042' },
])
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success text-xs font-semibold">
        <FolderTree class="w-3.5 h-3.5" />
        <span>Navigation Trails</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseBreadcrumbs Guide</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Wayfinding trails reading from static items props or dynamically from the global reactive store.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-success/20 bg-success/5 dark:bg-dark-success/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-success dark:text-dark-success flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseBreadcrumbs</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseBreadcrumbs</code> for nested application hierarchies. It supports mobile overflow auto-scrolling, customizable separator slots, and connects directly to the <code class="font-mono text-xs">useFuseBreadcrumbs()</code> global store.
      </p>
    </div>

    <!-- Static Breadcrumbs Demo -->
    <DemoPreview title="Style 1: Static Items Prop (with Icons)" :code="staticSnippet">
      <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
        <FuseBreadcrumbs :items="staticCrumbItems" />
      </div>
    </DemoPreview>

    <!-- Dynamic Breadcrumbs Demo -->
    <DemoPreview title="Style 2: Zero-Prop Global Composable Store" :code="dynamicSnippet">
      <div class="space-y-4">
        <div class="flex justify-end">
          <button
            type="button"
            class="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white shadow-xs"
            @click="addBreadcrumb({ label: `Step #${Math.floor(Math.random() * 100)}` })"
          >
            + Add Dynamic Step
          </button>
        </div>
        <div class="p-4 rounded-xl border border-outline/50 dark:border-dark-outline/50 bg-muted/20 dark:bg-dark-muted/20">
          <FuseBreadcrumbs />
        </div>
      </div>
    </DemoPreview>
  </div>
</template>

