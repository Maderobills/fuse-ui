<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from '@lucide/vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },

  // Badge: image wins over icon if both are given
  icon: { type: [Object, Function], default: null },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },

  // Value
  type: {
    type: String,
    default: 'number',
    validator: (v) => ['info', 'number', 'money'].includes(v),
  },
  value: { type: [String, Number], default: 0 },
  // Pre-formatted string always wins over `value`
  formatted: { type: String, default: null },

  // Money / number formatting
  currency: { type: String, default: 'GHS' },
  // Symbols shown instead of the code. Codes not listed here (e.g. GHS) print as "GHS 1,200.00"
  currencySymbols: {
    type: Object,
    default: () => ({ USD: '$', EUR: '€', GBP: '£' }),
  },
  decimals: { type: Number, default: undefined }, // default: 2 for money, 0 for number
  compact: { type: Boolean, default: false }, // 1.2K, 3.4M
  suffix: { type: String, default: '' }, // e.g. '%' or ' days'
  locale: { type: String, default: 'en-GH' },

  tone: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'warning', 'error', 'info'].includes(v),
  },
  /** { direction: 'up' | 'down', label: '+12% vs last month', good?: boolean } */
  trend: { type: Object, default: null },
  loading: { type: Boolean, default: false },
})

const toneMap = {
  primary: { iconBg: 'bg-primary/10 dark:bg-dark-primary/10', iconText: 'text-primary dark:text-dark-primary' },
  success: { iconBg: 'bg-success/10 dark:bg-dark-success/10', iconText: 'text-success dark:text-dark-success' },
  warning: { iconBg: 'bg-warning/10 dark:bg-dark-warning/10', iconText: 'text-warning dark:text-dark-warning' },
  error: { iconBg: 'bg-error/10 dark:bg-dark-error/10', iconText: 'text-error dark:text-dark-error' },
  info: { iconBg: 'bg-info/10 dark:bg-dark-info/10', iconText: 'text-info dark:text-dark-info' },
}
const toneClasses = computed(() => toneMap[props.tone] ?? toneMap.primary)

const displayValue = computed(() => {
  if (props.formatted !== null) return props.formatted
  if (props.type === 'info') return String(props.value)

  const n = Number(props.value)
  if (!Number.isFinite(n)) return '—'

  const isMoney = props.type === 'money'
  const decimals = props.decimals ?? (isMoney ? 2 : 0)

  const body = new Intl.NumberFormat(
    props.locale,
    props.compact
      ? { notation: 'compact', maximumFractionDigits: 1 }
      : { minimumFractionDigits: decimals, maximumFractionDigits: decimals },
  ).format(Math.abs(n))

  const sign = n < 0 ? '-' : ''
  if (!isMoney) return `${sign}${body}${props.suffix}`

  const symbol = props.currencySymbols[props.currency] ?? props.currency
  const gap = /^[A-Za-z]+$/.test(symbol) ? ' ' : '' // "GHS 1,200" but "$1,200"
  return `${sign}${symbol}${gap}${body}${props.suffix}`
})

// `good` lets a falling expense be green: { direction: 'down', good: true }
const trendGood = computed(() => props.trend?.good ?? props.trend?.direction === 'up')
</script>

<template>
  <div
    class="bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-sm p-4 flex flex-col gap-3"
    :aria-busy="loading"
  >
    <!-- Title + badge -->
    <div class="flex items-start justify-between gap-3">
      <p class="text-xs font-medium text-foreground/60 dark:text-dark-foreground/60 truncate">
        {{ title }}
      </p>

      <slot name="icon">
        <div
          v-if="image || icon"
          class="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 overflow-hidden"
          :class="image ? '' : toneClasses.iconBg"
        >
          <img v-if="image" :src="image" :alt="imageAlt || title" class="w-full h-full object-cover" />
          <component :is="icon" v-else class="w-4 h-4" :class="toneClasses.iconText" />
        </div>
      </slot>
    </div>

    <!-- Value -->
    <div v-if="loading" class="h-8 w-24 bg-muted dark:bg-dark-muted rounded-sm animate-pulse" />
    <slot v-else name="value" :value="displayValue">
      <p class="text-2xl font-semibold tracking-tight tabular-nums text-foreground dark:text-dark-foreground">
        {{ displayValue }}
      </p>
    </slot>

    <!-- Description -->
    <p
      v-if="description && !loading"
      class="text-xs text-foreground/50 dark:text-dark-foreground/50 -mt-1.5"
    >
      {{ description }}
    </p>

    <!-- Trend -->
    <div v-if="trend && !loading" class="flex items-center gap-1">
      <component
        :is="trend.direction === 'up' ? TrendingUp : TrendingDown"
        class="w-3.5 h-3.5"
        :class="trendGood ? 'text-success dark:text-dark-success' : 'text-error dark:text-dark-error'"
      />
      <span
        class="text-xs font-medium"
        :class="trendGood ? 'text-success dark:text-dark-success' : 'text-error dark:text-dark-error'"
      >
        {{ trend.label }}
      </span>
    </div>

    <slot name="footer" />
  </div>
</template>