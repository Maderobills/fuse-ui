<script setup>
import { ref } from 'vue'
import { Table as TableIcon, Info, Eye, Pencil, Trash2, Plus, RefreshCw } from '@lucide/vue'
import { FuseTable } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const tablePage = ref(1)
const tableSelected = ref([])
const tableLoading = ref(false)
const tableStriped = ref(true)
const tableDense = ref(false)

const tableColumns = [
  { key: 'name', label: 'Employee', subKey: 'email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    sortable: true,
    filterable: true,
    badgeTone: {
      active: 'success',
      pending: 'warning',
      suspended: 'error',
    },
  },
  { key: 'department', label: 'Department', sortable: true, filterable: true },
  { key: 'salary', label: 'Monthly Pay', type: 'money', sortable: true, align: 'right' },
  {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
    actions: [
      { name: 'view', label: 'View', icon: Eye, tone: 'neutral' },
      { name: 'edit', label: 'Edit', icon: Pencil, tone: 'primary' },
      { name: 'delete', label: 'Remove', icon: Trash2, tone: 'error' },
    ],
  },
]

const tableRows = [
  { id: 1, name: 'Kwame Mensah', email: 'kwame@mbills.enterprise', status: 'active', department: 'Engineering', salary: 14500 },
  { id: 2, name: 'Ama Osei', email: 'ama@mbills.enterprise', status: 'active', department: 'Engineering', salary: 16200 },
  { id: 3, name: 'Kofi Boateng', email: 'kofi@mbills.enterprise', status: 'pending', department: 'Operations', salary: 11000 },
  { id: 4, name: 'Abena Antwi', email: 'abena@mbills.enterprise', status: 'suspended', department: 'Finance', salary: 13800 },
  { id: 5, name: 'Yaw Sarpong', email: 'yaw@mbills.enterprise', status: 'active', department: 'Finance', salary: 15100 },
]

const handleTableAction = ({ action, row }) => {
  alert(`Action "${action.label || action.name}" clicked for ${row.name}`)
}

const tableSnippet = `<template>
  <FuseTable
    title="Enterprise Staff Directory"
    :columns="tableColumns"
    :rows="tableRows"
    :page-size="10"
    v-model:page="tablePage"
    selectable
    v-model:selected="tableSelected"
    filterable
    searchable
    @action="handleTableAction"
  >
    <template #toolbar>
      <button class="btn-primary">+ Add Member</button>
    </template>

    <template #bulk="{ selected }">
      <button class="btn-danger">
        Delete Selected ({{ selected.length }})
      </button>
    </template>
  </FuseTable>
</template>

<script setup>
import { ref } from 'vue'
import { FuseTable } from '@maderobills/fuse-ui'

const tablePage = ref(1)
const tableSelected = ref([])
const tableColumns = [
  { key: 'name', label: 'Employee', subKey: 'email', sortable: true },
  { key: 'status', label: 'Status', type: 'badge', filterable: true },
  { key: 'department', label: 'Department', sortable: true, filterable: true },
  { key: 'salary', label: 'Monthly Pay', type: 'money', align: 'right' },
  { key: 'actions', label: 'Actions', type: 'actions', actions: [...] },
]
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary text-xs font-semibold">
        <TableIcon class="w-3.5 h-3.5" />
        <span>Data Display</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseTable: Enterprise Data Grid</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Complete tabular data solution with sortable columns, built-in search & filter toolbar, multi-select rows, bulk actions, and pagination.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-dark-primary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseTable</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Instead of manually stitching together pagination buttons, sorting headers, search inputs, and checkboxes, <code class="font-bold font-mono">FuseTable</code> handles all client-side and server-side state automatically with declarative props.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="Enterprise Staff Directory" :code="tableSnippet">
      <template #controls>
        <div class="flex items-center gap-3 text-xs font-medium mr-2">
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" v-model="tableStriped" class="rounded" />
            <span>Striped</span>
          </label>
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" v-model="tableDense" class="rounded" />
            <span>Dense</span>
          </label>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted flex items-center gap-1"
            @click="tableLoading = !tableLoading"
          >
            <RefreshCw class="w-3 h-3" :class="{ 'animate-spin': tableLoading }" />
            <span>Skeleton</span>
          </button>
        </div>
      </template>

      <FuseTable
        title="Enterprise Staff Directory"
        :columns="tableColumns"
        :rows="tableRows"
        :page-size="4"
        v-model:page="tablePage"
        selectable
        v-model:selected="tableSelected"
        filterable
        searchable
        :striped="tableStriped"
        :dense="tableDense"
        :loading="tableLoading"
        @action="handleTableAction"
      >
        <template #toolbar>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
            @click="alert('Add New Staff Member')"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </template>

        <template #bulk="{ selected }">
          <button
            type="button"
            class="px-3 py-1 text-xs font-bold text-error bg-error/10 border border-error/30 rounded-lg hover:bg-error/20 transition-colors"
            @click="alert(`Deleting ${selected.length} records: [${selected.join(', ')}]`)"
          >
            Delete Selected ({{ selected.length }})
          </button>
        </template>
      </FuseTable>
    </DemoPreview>
  </div>
</template>

