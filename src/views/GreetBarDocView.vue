<script setup>
import { ref } from 'vue'
import { Compass, Info } from '@lucide/vue'
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

const currentSnippet = () => {
  if (greetStyle.value === 'title') return snippetTitle
  if (greetStyle.value === 'greeting') return snippetGreeting
  if (greetStyle.value === 'custom') return snippetCustom
  return snippetCrumbs
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
        <Compass class="w-3.5 h-3.5" />
        <span>Header Component</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseGreetBar: Usage & Anatomy</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Top header banner designed for enterprise applications. Supports greeting mode, static title mode, automatic router breadcrumbs, and action slots.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-dark-primary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseGreetBar</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseGreetBar</code> at the top of every dashboard subpage. Rather than building separate breadcrumbs, page headers, user cards, and theme switchers from scratch, FuseGreetBar ties them together in one cohesive responsive bar.
      </p>
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
        >
          <template #title-badge>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/15 text-success">Active</span>
          </template>
          <template #actions>
            <button type="button" class="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md shadow-xs">
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
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>

      <div v-else-if="greetStyle === 'custom'" class="border border-outline/50 dark:border-dark-outline/50 rounded-xl overflow-hidden">
        <FuseGreetBar
          greeting-prefix="Welcome back to Mbills Enterprise"
          :user="currentUser"
          description="You have 3 system alerts pending your review."
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
        >
          <FuseThemeToggler />
        </FuseGreetBar>
      </div>
    </DemoPreview>
  </div>
</template>
