<script setup>
import { computed } from 'vue'
import { Image as ImageIcon } from '@lucide/vue'
import TableBadge from './TableBadge.vue'

const props = defineProps({
  column: { type: Object, required: true },
  row: { type: Object, required: true },
  align: { type: String, default: 'left' },
})
const emit = defineEmits(['action'])

const JUSTIFY = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }
const IMG = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' }

const ICON_TONES = {
  primary: { bg: 'bg-primary/10 dark:bg-dark-primary/10', text: 'text-primary dark:text-dark-primary' },
  success: { bg: 'bg-success/10 dark:bg-dark-success/10', text: 'text-success dark:text-dark-success' },
  warning: { bg: 'bg-warning/10 dark:bg-dark-warning/10', text: 'text-warning dark:text-dark-warning' },
  error: { bg: 'bg-error/10 dark:bg-dark-error/10', text: 'text-error dark:text-dark-error' },
  info: { bg: 'bg-info/10 dark:bg-dark-info/10', text: 'text-info dark:text-dark-info' },
}

const ACTION_TONES = {
  neutral: 'text-foreground/60 hover:text-foreground hover:bg-muted dark:text-dark-foreground/60 dark:hover:text-dark-foreground dark:hover:bg-dark-muted',
  primary: 'text-primary hover:bg-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10',
  success: 'text-success hover:bg-success/10 dark:text-dark-success dark:hover:bg-dark-success/10',
  warning: 'text-warning hover:bg-warning/10 dark:text-dark-warning dark:hover:bg-dark-warning/10',
  error: 'text-error hover:bg-error/10 dark:text-dark-error dark:hover:bg-dark-error/10',
  info: 'text-info hover:bg-info/10 dark:text-dark-info dark:hover:bg-dark-info/10',
}

const isEmpty = (v) => v === null || v === undefined || v === ''
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

const value = computed(() => props.row[props.column.key])

const text = computed(() => {
  if (props.column.format) return props.column.format(value.value, props.row)
  return isEmpty(value.value) ? '—' : String(value.value)
})

// Description line shown below the main text
const sub = computed(() => {
  const k = props.column.subKey
  const v = k ? props.row[k] : null
  return isEmpty(v) ? null : v
})

// Status badge: from this cell's own value (type "badge") or from another field (statusKey)
const status = computed(() => {
  const c = props.column
  const raw = c.type === 'badge' ? value.value : c.statusKey ? props.row[c.statusKey] : null
  if (isEmpty(raw)) return null
  return { label: c.labels?.[raw] ?? capitalize(String(raw)), tone: c.tones?.[raw] ?? 'neutral' }
})

const imageSrc = computed(() => (props.column.imageKey ? props.row[props.column.imageKey] : null))

const initials = computed(() =>
  String(text.value === '—' ? '?' : text.value)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)

const iconComponent = computed(() =>
  props.column.iconFor ? props.column.iconFor(props.row) : props.column.icon || null,
)
const iconTone = computed(() => {
  const t = props.column.iconToneFor ? props.column.iconToneFor(props.row) : props.column.iconTone
  return ICON_TONES[t] ?? ICON_TONES.primary
})

const visibleActions = computed(() =>
  (props.column.actions ?? []).filter((a) => (a.show ? a.show(props.row) : true)),
)
</script>

<template>
  <!-- Actions: icon buttons (default) or labelled buttons -->
  <div v-if="column.type === 'actions'" class="flex items-center gap-1" :class="JUSTIFY[align]">
    <template v-for="a in visibleActions" :key="a.key">
      <button
        v-if="(column.actionStyle ?? 'icon') === 'icon'"
        type="button"
        :title="a.label"
        :aria-label="a.label"
        :disabled="a.disabled ? a.disabled(row) : false"
        class="p-1.5 rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        :class="ACTION_TONES[a.tone] ?? ACTION_TONES.neutral"
        @click.stop="emit('action', { action: a.key, row })"
      >
        <component :is="a.icon" v-if="a.icon" class="w-4 h-4" />
        <span v-else class="text-xs font-medium">{{ a.label }}</span>
      </button>

      <button
        v-else
        type="button"
        :disabled="a.disabled ? a.disabled(row) : false"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm border border-outline dark:border-dark-outline transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        :class="ACTION_TONES[a.tone] ?? ACTION_TONES.neutral"
        @click.stop="emit('action', { action: a.key, row })"
      >
        <component :is="a.icon" v-if="a.icon" class="w-3.5 h-3.5" />
        {{ a.label }}
      </button>
    </template>
  </div>

  <!-- Profile: avatar + name (+ status) + description below -->
  <div v-else-if="column.type === 'profile'" class="flex items-center gap-3 min-w-0" :class="JUSTIFY[align]">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="text"
      class="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-outline dark:ring-dark-outline"
    />
    <div
      v-else
      class="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold bg-primary/10 text-primary dark:bg-dark-secondary/15 dark:text-dark-secondary"
    >
      {{ initials }}
    </div>
    <div class="min-w-0 text-left">
      <div class="flex items-center gap-2">
        <span class="font-medium truncate">{{ text }}</span>
        <TableBadge v-if="status" :tone="status.tone">{{ status.label }}</TableBadge>
      </div>
      <p v-if="sub" class="text-xs text-foreground/50 dark:text-dark-foreground/50 truncate">{{ sub }}</p>
    </div>
  </div>

  <!-- Image thumbnail -->
  <div v-else-if="column.type === 'image'" class="flex" :class="JUSTIFY[align]">
    <img
      v-if="value"
      :src="value"
      :alt="column.label"
      class="object-cover border border-outline dark:border-dark-outline"
      :class="[IMG[column.size ?? 'md'], column.rounded ? 'rounded-full' : 'rounded-sm']"
    />
    <div
      v-else
      class="flex items-center justify-center bg-muted dark:bg-dark-muted border border-outline dark:border-dark-outline"
      :class="[IMG[column.size ?? 'md'], column.rounded ? 'rounded-full' : 'rounded-sm']"
    >
      <ImageIcon class="w-4 h-4 text-foreground/30 dark:text-dark-foreground/30" />
    </div>
  </div>

  <!-- Icon -->
  <div v-else-if="column.type === 'icon'" class="flex" :class="JUSTIFY[align]">
    <div class="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" :class="iconTone.bg">
      <component :is="iconComponent" v-if="iconComponent" class="w-4 h-4" :class="iconTone.text" />
    </div>
  </div>

  <!-- Badge only -->
  <div v-else-if="column.type === 'badge'" class="flex" :class="JUSTIFY[align]">
    <TableBadge v-if="status" :tone="status.tone">{{ status.label }}</TableBadge>
    <span v-else class="text-foreground/40 dark:text-dark-foreground/40">—</span>
  </div>

  <!-- Text: value (+ status badge) with optional description below -->
  <div v-else class="min-w-0">
    <div class="flex items-center gap-2" :class="JUSTIFY[align]">
      <span :class="sub ? 'font-medium' : ''">{{ text }}</span>
      <TableBadge v-if="status" :tone="status.tone">{{ status.label }}</TableBadge>
    </div>
    <p v-if="sub" class="text-xs text-foreground/50 dark:text-dark-foreground/50">{{ sub }}</p>
  </div>
</template>