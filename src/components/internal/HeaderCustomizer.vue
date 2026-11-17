<script setup>
import { ArrowUp, ArrowDown, RotateCcw } from '@lucide/vue'
import { HEADER_LABELS } from './headerLayout.js'

const props = defineProps({
  order: { type: Array, required: true },
  hidden: { type: Array, required: true },
})
const emit = defineEmits(['update:order', 'update:hidden', 'reset'])

const move = (index, dir) => {
  const j = index + dir
  if (j < 0 || j >= props.order.length) return
  const next = [...props.order]
  ;[next[index], next[j]] = [next[j], next[index]]
  emit('update:order', next)
}

const setVisible = (key, visible) => {
  emit('update:hidden', visible ? props.hidden.filter((k) => k !== key) : [...props.hidden, key])
}

const MOVE_BTN =
  'p-1 rounded-sm text-foreground/50 dark:text-dark-foreground/50 hover:text-foreground dark:hover:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <p class="text-xs font-semibold text-foreground dark:text-dark-foreground">Customize header</p>
      <button
        type="button"
        class="inline-flex items-center gap-1 text-[11px] text-foreground/60 dark:text-dark-foreground/60 hover:text-primary dark:hover:text-dark-primary transition-colors"
        @click="emit('reset')"
      >
        <RotateCcw class="w-3 h-3" /> Reset
      </button>
    </div>

    <ul class="space-y-1">
      <li
        v-for="(key, i) in order"
        :key="key"
        class="flex items-center gap-2 px-2 py-1.5 rounded-sm"
        :class="key === 'spacer' ? 'border border-dashed border-outline dark:border-dark-outline' : 'hover:bg-muted/60 dark:hover:bg-dark-muted/60'"
      >
        <input
          v-if="key !== 'spacer'"
          :id="`hdr-opt-${key}`"
          type="checkbox"
          class="w-4 h-4 accent-primary dark:accent-dark-primary"
          :checked="!hidden.includes(key)"
          @change="setVisible(key, $event.target.checked)"
        />
        <label
          v-if="key !== 'spacer'"
          :for="`hdr-opt-${key}`"
          class="flex-1 text-xs font-medium text-foreground dark:text-dark-foreground cursor-pointer"
        >
          {{ HEADER_LABELS[key] }}
        </label>
        <span v-else class="flex-1 text-[11px] italic text-foreground/50 dark:text-dark-foreground/50">
          {{ HEADER_LABELS.spacer }}
        </span>

        <button type="button" :class="MOVE_BTN" :disabled="i === 0" :aria-label="`Move ${HEADER_LABELS[key]} up`" @click="move(i, -1)">
          <ArrowUp class="w-3.5 h-3.5" />
        </button>
        <button type="button" :class="MOVE_BTN" :disabled="i === order.length - 1" :aria-label="`Move ${HEADER_LABELS[key]} down`" @click="move(i, 1)">
          <ArrowDown class="w-3.5 h-3.5" />
        </button>
      </li>
    </ul>
  </div>
</template>