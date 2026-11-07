<script setup>
import { ref } from 'vue'
import { Filter, Info } from '@lucide/vue'
import { FuseFilters } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const filterSearch = ref('')
const selectedFilters = ref({})
const filterConfigs = [
  {
    key: 'status',
    label: 'Account Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending Review', value: 'pending' },
      { label: 'Suspended', value: 'suspended' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    searchable: true,
    options: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Finance & Accounts', value: 'finance' },
      { label: 'Operations', value: 'operations' },
      { label: 'Human Resources', value: 'hr' },
    ],
  },
]

const filtersSnippet = `<template>
  <FuseFilters
    show-search
    search-placeholder="Search records by name, role, email..."
    :debounce="300"
    :filters="filterConfigs"
    :grid-cols="2"
    v-model="selectedFilters"
    v-model:search="filterSearch"
    @filter-change="onFilterChange"
  >
    <template #actions>
      <button class="btn-primary">Export CSV</button>
    </template>
  </FuseFilters>
</template>

<script setup>
import { ref } from 'vue'
import { FuseFilters } from '@maderobills/fuse-ui'

const filterSearch = ref('')
const selectedFilters = ref({})
const filterConfigs = [
  { key: 'status', label: 'Status', options: [...] },
  { key: 'department', label: 'Department', searchable: true, options: [...] },
]
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warning/10 text-warning dark:bg-dark-warning/10 dark:text-dark-warning text-xs font-semibold">
        <Filter class="w-3.5 h-3.5" />
        <span>Query & Toolbar</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseFilters: Standalone Query Toolbar</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Debounced real-time search with customizable dropdown filters and slot controls.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-warning/20 bg-warning/5 dark:bg-dark-warning/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-warning dark:text-dark-warning flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseFilters</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseFilters</code> whenever filtering data rendered in non-table views, such as card catalogs, grid galleries, or document lists. FuseFilters debounces input queries to prevent overloading backend server APIs.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="Search & Filter Toolbar" :code="filtersSnippet">
      <div class="space-y-4">
        <FuseFilters
          show-search
          search-placeholder="Search records by name, department, role..."
          :debounce="300"
          :filters="filterConfigs"
          :grid-cols="2"
          v-model="selectedFilters"
          v-model:search="filterSearch"
        />

        <div class="p-3.5 rounded-lg bg-muted/30 dark:bg-dark-muted/30 border border-outline dark:border-dark-outline text-xs font-mono">
          <span class="font-bold">Active Filter Output:</span>
          <pre class="mt-1">{{ { search: filterSearch, filters: selectedFilters } }}</pre>
        </div>
      </div>
    </DemoPreview>
  </div>
</template>
