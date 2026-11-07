<script setup>
import { computed, onBeforeUnmount } from 'vue'
import { X } from '@lucide/vue'
import FuseInput from './FuseInput.vue'

const props = defineProps({
  /** [{ key, label, options: [{ label, value }], placeholder?, searchable?, multiple?, clearable? }] */
  filters: {
    type: Array,
    default: () => [],
    validator: (list) => list.every((f) => f.key && f.label && Array.isArray(f.options)),
  },
  showSearch: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Search...' },
  /** ms to wait before emitting search-change (0 = emit on every keystroke) */
  debounce: { type: Number, default: 0 },
  gridCols: {
    type: Number,
    default: 4,
    validator: (v) => [1, 2, 3, 4, 5, 6].includes(v),
  },
  clearLabel: { type: String, default: 'Clear All Filters' },
})

const emit = defineEmits(['filter-change', 'search-change', 'clear-filters'])

// Both work with or without v-model
// v-model        → { classId: 2, status: 'active' }  (only active filters are stored)
// v-model:search → 'ama'
const values = defineModel({ type: Object, default: () => ({}) })
const search = defineModel('search', { type: String, default: '' })

const GRID = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
}
const gridClasses = computed(() => `grid ${GRID[props.gridCols] ?? GRID[4]} gap-4`)

const isEmpty = (v) =>
  v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)

const fieldValue = (filter) => values.value[filter.key] ?? (filter.multiple ? [] : null)

const hasActive = computed(() => Object.keys(values.value).length > 0 || !!search.value)

const setFilter = (key, value) => {
  const next = { ...values.value }
  if (isEmpty(value)) delete next[key]
  else next[key] = value
  values.value = next
  emit('filter-change', { ...next })
}

let timer
const onSearchInput = (value) => {
  search.value = value ?? ''
  clearTimeout(timer)
  if (props.debounce > 0) {
    timer = setTimeout(() => emit('search-change', search.value), props.debounce)
  } else {
    emit('search-change', search.value)
  }
}

const clearAll = () => {
  clearTimeout(timer)
  values.value = {}
  search.value = ''
  emit('clear-filters')
  emit('filter-change', {})
  emit('search-change', '')
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div
    class="w-full space-y-2 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-sm p-2 md:p-4"
  >
    <!-- Search -->
    <FuseInput
      v-if="showSearch"
      type="search"
      label="Search"
      :model-value="search"
      :placeholder="searchPlaceholder"
      @update:model-value="onSearchInput"
    />

    <!-- Filters -->
    <div v-if="filters.length || $slots.default" :class="gridClasses">
      <FuseInput
        v-for="filter in filters"
        :key="filter.key"
        type="select"
        :label="filter.label"
        :options="filter.options"
        :model-value="fieldValue(filter)"
        :multiple="filter.multiple"
        :searchable="filter.searchable"
        :clearable="filter.clearable !== false"
        :placeholder="filter.placeholder || `Select ${filter.label.toLowerCase()}`"
        @update:model-value="setFilter(filter.key, $event)"
      />

      <!-- Extra controls: drop any FuseInput in here (a date, for example) -->
      <slot />
    </div>

    <!-- Actions -->
    <div v-if="hasActive || $slots.actions" class="flex items-center justify-end gap-2 pt-2">
      <slot name="actions" />
      <button
        v-if="hasActive"
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 bg-error/10 dark:bg-dark-error/10 text-error dark:text-dark-error border border-error/30 dark:border-dark-error/30 rounded-sm hover:bg-error/20 dark:hover:bg-dark-error/20 transition-colors text-sm font-medium"
        @click="clearAll"
      >
        <X class="w-4 h-4" />
        <span>{{ clearLabel }}</span>
      </button>
    </div>
  </div>
</template>