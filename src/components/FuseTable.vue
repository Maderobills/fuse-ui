<script setup>
import { computed, ref, watch } from 'vue'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from '@lucide/vue'
import FuseFilters from './FuseFilters.vue'
import FuseInput from './FuseInput.vue'
import TableCell from './internal/TableCell.vue'

const props = defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' },
  title: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  emptyText: { type: String, default: 'No records found' },
  emptyDescription: { type: String, default: '' },

  // Look
  striped: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
  dense: { type: Boolean, default: false },
  stickyHeader: { type: Boolean, default: false },
  maxHeight: { type: String, default: '' }, // e.g. '28rem'
  rowClickable: { type: Boolean, default: false },

  // Features
  selectable: { type: Boolean, default: false },
  pageSize: { type: Number, default: 0 }, // 0 = no pagination
  /** Server-side mode: table won't filter/sort/slice; you handle the events and pass `total` */
  manual: { type: Boolean, default: false },
  total: { type: Number, default: null },

  // Filters
  filterable: { type: Boolean, default: false }, // show FuseFilters
  filterBy: { type: Array, default: null }, // column keys used as filters (default: all columns with filterable: true)
  filterPicker: { type: Boolean, default: false }, // let users choose which headers filter
  filterCols: { type: Number, default: 4 },
  searchable: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Search...' },
  searchKeys: { type: Array, default: null }, // default: key + subKey of text-like columns
  searchDebounce: { type: Number, default: 0 },
})

const emit = defineEmits(['action', 'row-click', 'sort-change', 'filter-change', 'search-change', 'page-change'])

const selected = defineModel('selected', { type: Array, default: () => [] })
const page = defineModel('page', { type: Number, default: 1 })

const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' }
const colAlign = (c) => c?.align ?? (c?.type === 'actions' ? 'right' : 'left')

const isEmpty = (v) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)
const capitalize = (s) => (typeof s === 'string' && s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
const keyOf = (row, i) => row?.[props.rowKey] ?? i

/* ───────────── Filters ───────────── */
const activeFilters = ref({})
const searchQuery = ref('')

const safeColumns = computed(() => (Array.isArray(props.columns) ? props.columns : []))
const safeRows = computed(() => (Array.isArray(props.rows) ? props.rows : []))

const filterableColumns = computed(() => safeColumns.value.filter((c) => c?.filterable))
const activeFilterKeys = ref(props.filterBy ? [...props.filterBy] : filterableColumns.value.map((c) => c.key))

watch(
  () => props.filterBy,
  (v) => {
    if (v) activeFilterKeys.value = [...v]
  },
)

watch(filterableColumns, (cols) => {
  if (!props.filterBy && activeFilterKeys.value.length === 0 && cols.length > 0) {
    activeFilterKeys.value = cols.map((c) => c.key)
  }
})

const pickerOptions = computed(() =>
  filterableColumns.value.map((c) => ({ label: c.filterLabel ?? c.label, value: c.key })),
)

const uniqueOptions = (field, column) => {
  const seen = new Set()
  for (const r of safeRows.value) {
    if (r && !isEmpty(r[field])) seen.add(r[field])
  }
  return [...seen]
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
    .map((v) => ({ value: v, label: column?.labels?.[v] ?? capitalize(String(v)) }))
}

const filterConfigs = computed(() =>
  filterableColumns.value
    .filter((c) => activeFilterKeys.value.includes(c.key))
    .map((c) => {
      const field = c.filterKey ?? c.key
      return {
        key: field,
        label: c.filterLabel ?? c.label,
        multiple: c.filterMultiple,
        searchable: c.filterSearchable,
        // In manual mode rows are only the current page, so pass filterOptions yourself
        options: c.filterOptions ?? uniqueOptions(field, c),
      }
    }),
)

// When a header is removed in the picker, drop its active filter value
watch(activeFilterKeys, (keys) => {
  const allowed = new Set(
    filterableColumns.value.filter((c) => keys.includes(c.key)).map((c) => c.filterKey ?? c.key),
  )
  const entries = Object.entries(activeFilters.value)
  const kept = entries.filter(([k]) => allowed.has(k))
  if (kept.length !== entries.length) {
    activeFilters.value = Object.fromEntries(kept)
    emit('filter-change', { ...activeFilters.value })
  }
})

const searchFields = computed(
  () =>
    props.searchKeys ??
    safeColumns.value
      .filter((c) => c && !['actions', 'image', 'icon'].includes(c.type))
      .flatMap((c) => [c.key, c.subKey].filter(Boolean)),
)

/* ───────────── Sort ───────────── */
const sort = ref({ key: null, dir: 'asc' })

const toggleSort = (col) => {
  if (!col?.sortable) return
  const s = sort.value
  if (s.key !== col.key) sort.value = { key: col.key, dir: 'asc' }
  else if (s.dir === 'asc') sort.value = { key: col.key, dir: 'desc' }
  else sort.value = { key: null, dir: 'asc' }
  emit('sort-change', { ...sort.value })
}

const ariaSort = (col) => {
  if (!col?.sortable) return undefined
  if (sort.value.key !== col.key) return 'none'
  return sort.value.dir === 'asc' ? 'ascending' : 'descending'
}

const compare = (a, b) => {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

/* ───────────── Pipeline: search → filter → sort → page ───────────── */
const processedRows = computed(() => {
  if (props.manual) return safeRows.value
  let list = safeRows.value

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter((r) => searchFields.value.some((k) => String(r?.[k] ?? '').toLowerCase().includes(q)))
  }

  for (const [field, val] of Object.entries(activeFilters.value)) {
    list = list.filter((r) => (Array.isArray(val) ? val.includes(r?.[field]) : r?.[field] === val))
  }

  if (sort.value.key) {
    const col = safeColumns.value.find((c) => c.key === sort.value.key)
    const dir = sort.value.dir === 'asc' ? 1 : -1
    const valueOf = (r) => (col?.sortValue ? col.sortValue(r) : r?.[sort.value.key])
    list = [...list].sort((x, y) => dir * compare(valueOf(x), valueOf(y)))
  }
  return list
})

const totalCount = computed(() => (props.manual ? (props.total ?? safeRows.value.length) : processedRows.value.length))
const pageCount = computed(() => (props.pageSize > 0 ? Math.max(1, Math.ceil(totalCount.value / props.pageSize)) : 1))

const displayRows = computed(() => {
  if (props.manual || props.pageSize <= 0) return processedRows.value
  const start = (page.value - 1) * props.pageSize
  return processedRows.value.slice(start, start + props.pageSize)
})

watch([activeFilters, searchQuery, sort], () => (page.value = 1), { deep: true })
watch(pageCount, (n) => {
  if (page.value > n) page.value = n
})
watch(page, (v) => emit('page-change', v))

const goTo = (n) => (page.value = Math.min(Math.max(1, n), pageCount.value))

const rangeText = computed(() => {
  const n = totalCount.value
  const base =
    n === 0
      ? '0 results'
      : props.pageSize > 0
        ? `${(page.value - 1) * props.pageSize + 1}–${Math.min(page.value * props.pageSize, n)} of ${n}`
        : `${n} result${n === 1 ? '' : 's'}`
  return props.selectable && selected.value.length ? `${selected.value.length} selected · ${base}` : base
})

/* ───────────── Selection ───────────── */
const pageKeys = computed(() => displayRows.value.map(keyOf))
const isSelected = (key) => selected.value.includes(key)
const allSelected = computed(() => pageKeys.value.length > 0 && pageKeys.value.every(isSelected))
const someSelected = computed(() => !allSelected.value && pageKeys.value.some(isSelected))

const toggleAll = (checked) => {
  const set = new Set(selected.value)
  pageKeys.value.forEach((k) => (checked ? set.add(k) : set.delete(k)))
  selected.value = [...set]
}
const toggleRow = (key, checked) => {
  selected.value = checked ? [...selected.value, key] : selected.value.filter((k) => k !== key)
}

/* ───────────── Layout ───────────── */
const cellPad = computed(() => (props.dense ? 'px-3 py-2' : 'px-4 py-3'))
const totalCols = computed(() => safeColumns.value.length + (props.selectable ? 1 : 0))
const skeletonRows = computed(() => (props.pageSize > 0 ? Math.min(props.pageSize, 8) : 5))
const scrolls = computed(() => props.stickyHeader || !!props.maxHeight)
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Filters -->
    <FuseFilters
      v-if="filterable || searchable"
      v-model="activeFilters"
      v-model:search="searchQuery"
      :filters="filterConfigs"
      :show-search="searchable"
      :search-placeholder="searchPlaceholder"
      :debounce="searchDebounce"
      :grid-cols="filterCols"
      @filter-change="emit('filter-change', $event)"
      @search-change="emit('search-change', $event)"
    >
      <FuseInput
        v-if="filterable && filterPicker && pickerOptions.length"
        v-model="activeFilterKeys"
        type="multiselect"
        label="Filter by"
        placeholder="Choose columns"
        :options="pickerOptions"
      />
      <template v-if="$slots['filters-actions']" #actions>
        <slot name="filters-actions" />
      </template>
    </FuseFilters>

    <!-- Table card -->
    <div class="bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-sm overflow-hidden">
      <div
        v-if="title || $slots.toolbar"
        class="flex items-center justify-between gap-3 px-4 py-3 border-b border-outline dark:border-dark-outline"
      >
        <h3 class="text-sm font-semibold text-foreground dark:text-dark-foreground">{{ title }}</h3>
        <div class="flex items-center gap-2"><slot name="toolbar" /></div>
      </div>

      <div class="overflow-x-auto" :class="scrolls ? 'overflow-y-auto' : ''" :style="maxHeight ? { maxHeight } : undefined">
        <table class="min-w-full text-sm text-foreground dark:text-dark-foreground">
          <thead>
            <tr class="border-b border-outline dark:border-dark-outline">
              <th
                v-if="selectable"
                scope="col"
                class="w-10 bg-muted dark:bg-dark-muted"
                :class="[cellPad, stickyHeader ? 'sticky top-0 z-10' : '']"
              >
                <input
                  type="checkbox"
                  aria-label="Select all rows on this page"
                  class="w-4 h-4 accent-primary dark:accent-dark-primary"
                  :checked="allSelected"
                  :indeterminate="someSelected"
                  @change="toggleAll($event.target.checked)"
                />
              </th>

              <th
                v-for="col in safeColumns"
                :key="col.key"
                scope="col"
                :aria-sort="ariaSort(col)"
                :style="col.width ? { width: col.width } : undefined"
                class="text-xs font-semibold uppercase tracking-wide whitespace-nowrap bg-muted dark:bg-dark-muted text-foreground/60 dark:text-dark-foreground/60"
                :class="[
                  cellPad,
                  ALIGN[colAlign(col)],
                  stickyHeader ? 'sticky top-0 z-10' : '',
                  col.hideOnMobile ? 'hidden md:table-cell' : '',
                ]"
              >
                <button
                  v-if="col.sortable"
                  type="button"
                  class="inline-flex items-center gap-1 uppercase tracking-wide hover:text-foreground dark:hover:text-dark-foreground transition-colors"
                  @click="toggleSort(col)"
                >
                  {{ col.label }}
                  <ChevronUp v-if="sort.key === col.key && sort.dir === 'asc'" class="w-3.5 h-3.5" />
                  <ChevronDown v-else-if="sort.key === col.key" class="w-3.5 h-3.5" />
                  <ChevronsUpDown v-else class="w-3.5 h-3.5 opacity-40" />
                </button>
                <template v-else>{{ col.label }}</template>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-outline dark:divide-dark-outline">
            <!-- Loading skeleton -->
            <template v-if="loading">
              <tr v-for="n in skeletonRows" :key="`sk-${n}`">
                <td v-if="selectable" :class="cellPad"><div class="h-4 w-4 rounded-sm bg-muted dark:bg-dark-muted animate-pulse" /></td>
                <td
                  v-for="col in safeColumns"
                  :key="col.key"
                  :class="[cellPad, col.hideOnMobile ? 'hidden md:table-cell' : '']"
                >
                  <div class="h-4 w-3/4 rounded-sm bg-muted dark:bg-dark-muted animate-pulse" />
                </td>
              </tr>
            </template>

            <!-- Empty -->
            <tr v-else-if="!displayRows.length">
              <td :colspan="totalCols" class="px-4 py-12 text-center">
                <slot name="empty">
                  <p class="text-sm font-medium text-foreground/70 dark:text-dark-foreground/70">{{ emptyText }}</p>
                  <p v-if="emptyDescription" class="text-xs mt-1 text-foreground/50 dark:text-dark-foreground/50">
                    {{ emptyDescription }}
                  </p>
                </slot>
              </td>
            </tr>

            <!-- Rows -->
            <template v-else>
              <tr
                v-for="(row, i) in displayRows"
                :key="keyOf(row, i)"
                class="transition-colors"
                :class="[
                  striped ? 'even:bg-muted/30 dark:even:bg-dark-muted/30' : '',
                  hover ? 'hover:bg-muted/50 dark:hover:bg-dark-muted/50' : '',
                  rowClickable ? 'cursor-pointer' : '',
                  isSelected(keyOf(row, i)) ? 'bg-primary/5 dark:bg-dark-primary/5' : '',
                ]"
                @click="rowClickable && emit('row-click', row)"
              >
                <td v-if="selectable" :class="cellPad">
                  <input
                    type="checkbox"
                    :aria-label="`Select row ${i + 1}`"
                    class="w-4 h-4 accent-primary dark:accent-dark-primary"
                    :checked="isSelected(keyOf(row, i))"
                    @click.stop
                    @change="toggleRow(keyOf(row, i), $event.target.checked)"
                  />
                </td>

                <td
                  v-for="col in safeColumns"
                  :key="col.key"
                  class="align-middle"
                  :class="[cellPad, ALIGN[colAlign(col)], col.hideOnMobile ? 'hidden md:table-cell' : '']"
                >
                  <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :column="col" :index="i">
                    <TableCell :column="col" :row="row" :align="colAlign(col)" @action="emit('action', $event)" />
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div
        v-if="pageSize > 0 || selectable"
        class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-outline dark:border-dark-outline text-xs text-foreground/60 dark:text-dark-foreground/60"
      >
        <div class="flex items-center gap-3">
          <span>{{ rangeText }}</span>
          <slot v-if="selected.length" name="bulk" :selected="selected" />
        </div>

        <div v-if="pageSize > 0" class="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            :disabled="page <= 1"
            class="p-1.5 rounded-sm border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="goTo(page - 1)"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <span class="tabular-nums">Page {{ page }} of {{ pageCount }}</span>
          <button
            type="button"
            aria-label="Next page"
            :disabled="page >= pageCount"
            class="p-1.5 rounded-sm border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="goTo(page + 1)"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
