<script setup>
import { ref, computed } from 'vue'
import {
  Terminal,
  Check,
  Copy,
  Package,
  GitBranch,
  Layers,
  CheckCircle2,
} from '@lucide/vue'

const props = defineProps({
  packageName: {
    type: String,
    default: '@maderobills/fuse-ui',
  },
  githubRepo: {
    type: String,
    default: 'github:Maderobills/fuse-ui',
  },
  peerDependencies: {
    type: Array,
    default: () => ['vue-router', '@lucide/vue'],
  },
  showSourceToggle: {
    type: Boolean,
    default: true,
  },
  showPeerToggle: {
    type: Boolean,
    default: true,
  },
})

const managers = [
  { id: 'npm', label: 'npm', cmd: 'npm install', listCmd: 'npm list' },
  { id: 'pnpm', label: 'pnpm', cmd: 'pnpm add', listCmd: 'pnpm list' },
  { id: 'yarn', label: 'yarn', cmd: 'yarn add', listCmd: 'yarn list' },
  { id: 'bun', label: 'bun', cmd: 'bun add', listCmd: 'bun pm ls' },
]

const activeManager = ref('npm')
const activeSource = ref('npm') // 'npm' | 'github'
const includePeers = ref(false)
const copied = ref(false)

const currentPkg = computed(() => {
  return activeSource.value === 'github' ? props.githubRepo : props.packageName
})

const fullCommand = computed(() => {
  const manager = managers.find((m) => m.id === activeManager.value) || managers[0]
  let cmd = `${manager.cmd} ${currentPkg.value}`
  if (includePeers.value && props.peerDependencies?.length) {
    cmd += ` ${props.peerDependencies.join(' ')}`
  }
  return cmd
})

const verifyCommand = computed(() => {
  const manager = managers.find((m) => m.id === activeManager.value) || managers[0]
  return `${manager.listCmd} ${props.packageName}`
})

const copyCommand = () => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(fullCommand.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="rounded-2xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface shadow-xs overflow-hidden">
    <!-- Top toolbar: Package manager tabs & options -->
    <div class="p-3 md:p-4 border-b border-outline dark:border-dark-outline bg-muted/20 dark:bg-dark-muted/20 flex flex-wrap items-center justify-between gap-3">
      <!-- Package Manager Tabs -->
      <div class="flex items-center gap-1 bg-muted/70 dark:bg-dark-muted/70 p-1 rounded-xl border border-outline/60 dark:border-dark-outline/60">
        <button
          v-for="mgr in managers"
          :key="mgr.id"
          type="button"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
          :class="activeManager === mgr.id
            ? 'bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary shadow-xs'
            : 'text-foreground/70 dark:text-dark-foreground/70 hover:text-foreground dark:hover:text-dark-foreground'"
          @click="activeManager = mgr.id"
        >
          {{ mgr.label }}
        </button>
      </div>

      <!-- Filters/Options: Registry vs GitHub & Peer Deps -->
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <!-- Source Toggle -->
        <div v-if="showSourceToggle" class="flex items-center gap-1 bg-muted/50 dark:bg-dark-muted/50 p-0.5 rounded-lg border border-outline/50 dark:border-dark-outline/50">
          <button
            type="button"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5"
            :class="activeSource === 'npm'
              ? 'bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary shadow-xs font-semibold'
              : 'text-foreground/60 dark:text-dark-foreground/60 hover:text-foreground'"
            @click="activeSource = 'npm'"
          >
            <Package class="w-3 h-3" />
            <span>npm Registry</span>
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5"
            :class="activeSource === 'github'
              ? 'bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary shadow-xs font-semibold'
              : 'text-foreground/60 dark:text-dark-foreground/60 hover:text-foreground'"
            @click="activeSource = 'github'"
          >
            <GitBranch class="w-3 h-3" />
            <span>GitHub</span>
          </button>
        </div>

        <!-- Peer dependencies checkbox -->
        <label
          v-if="showPeerToggle && peerDependencies?.length"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-outline/50 dark:border-dark-outline/50 bg-surface dark:bg-dark-surface text-[11px] font-medium text-foreground/80 dark:text-dark-foreground/80 cursor-pointer select-none hover:bg-muted/30 transition-colors"
        >
          <input
            v-model="includePeers"
            type="checkbox"
            class="w-3.5 h-3.5 rounded accent-primary dark:accent-dark-primary cursor-pointer"
          />
          <span>Include peer deps</span>
        </label>
      </div>
    </div>

    <!-- Terminal Code Box -->
    <div class="relative bg-slate-950 text-slate-100 font-mono text-xs overflow-hidden">
      <!-- Window header bar -->
      <div class="px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          <span class="ml-2 font-mono text-slate-400 flex items-center gap-1">
            <Terminal class="w-3 h-3 text-slate-500" />
            <span>terminal — {{ activeManager }}</span>
          </span>
        </div>

        <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">
          {{ activeSource === 'github' ? 'Git Source' : 'Registry' }}
        </span>
      </div>

      <!-- Command text & copy button -->
      <div class="p-4 flex items-center justify-between gap-4 overflow-x-auto">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="text-emerald-400 font-bold select-none">$</span>
          <code class="text-emerald-300 font-semibold tracking-tight whitespace-nowrap">
            {{ fullCommand }}
          </code>
        </div>

        <button
          type="button"
          class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all flex items-center gap-1.5 shadow-sm"
          :class="copied
            ? 'bg-emerald-500 text-white'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/15 active:scale-95'"
          @click="copyCommand"
        >
          <Check v-if="copied" class="w-3.5 h-3.5" />
          <Copy v-else class="w-3.5 h-3.5" />
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <!-- Bottom helper bar: Peer dependencies info & verification note -->
    <div class="px-4 py-3 bg-muted/15 dark:bg-dark-muted/15 border-t border-outline/40 dark:border-dark-outline/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-foreground/60 dark:text-dark-foreground/60">
      <div class="flex items-center gap-1.5">
        <CheckCircle2 class="w-3.5 h-3.5 text-success shrink-0" />
        <span>Compatible with <strong>Vue 3.4+</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS v4 & v3</strong>.</span>
      </div>

      <div class="font-mono text-[10px] text-foreground/50 dark:text-dark-foreground/50">
        Verify: <code class="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">{{ verifyCommand }}</code>
      </div>
    </div>
  </div>
</template>
