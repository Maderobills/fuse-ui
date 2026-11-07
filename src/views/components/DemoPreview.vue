<script setup>
import { ref } from 'vue'
import { Eye, Code, Copy, Check } from '@lucide/vue'

const props = defineProps({
  title: { type: String, default: 'Live Demo' },
  code: { type: String, required: true },
})

const activeTab = ref('preview')
const copied = ref(false)

const copy = () => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="border border-outline dark:border-dark-outline rounded-xl bg-surface dark:bg-dark-surface shadow-xs overflow-hidden">
    <!-- Header with Title, Controls, and Preview/Code Tab Switcher -->
    <div class="p-4 border-b border-outline dark:border-dark-outline flex flex-wrap items-center justify-between gap-4 bg-muted/20 dark:bg-dark-muted/20">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">
          {{ title }}
        </span>
        <slot name="badge"></slot>
      </div>

      <div class="flex items-center gap-3">
        <slot name="controls"></slot>

        <div class="flex items-center gap-1 bg-muted/60 dark:bg-dark-muted/60 p-1 rounded-lg border border-outline dark:border-dark-outline">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5"
            :class="activeTab === 'preview' ? 'bg-surface dark:bg-dark-surface shadow-xs text-foreground dark:text-dark-foreground' : 'text-foreground/60 dark:text-dark-foreground/60 hover:text-foreground'"
            @click="activeTab = 'preview'"
          >
            <Eye class="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5"
            :class="activeTab === 'code' ? 'bg-surface dark:bg-dark-surface shadow-xs text-foreground dark:text-dark-foreground' : 'text-foreground/60 dark:text-dark-foreground/60 hover:text-foreground'"
            @click="activeTab = 'code'"
          >
            <Code class="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Live Preview Stage -->
    <div v-show="activeTab === 'preview'" class="p-6">
      <slot></slot>
    </div>

    <!-- Formatted Code Stage -->
    <div v-show="activeTab === 'code'" class="p-5 bg-black/95 text-slate-100 font-mono text-xs overflow-x-auto relative">
      <button
        type="button"
        class="absolute top-4 right-4 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans flex items-center gap-1 transition-colors"
        @click="copy"
      >
        <Check v-if="copied" class="w-3 h-3 text-emerald-400" />
        <Copy v-else class="w-3 h-3" />
        <span>{{ copied ? 'Copied!' : 'Copy Code' }}</span>
      </button>

      <pre class="leading-relaxed whitespace-pre font-mono"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

