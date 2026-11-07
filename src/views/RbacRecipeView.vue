<script setup>
import { ref } from 'vue'
import { Shield, Info } from '@lucide/vue'
import { getFilteredNavItems } from '../navigation/navItems.js'
import DemoPreview from './components/DemoPreview.vue'

const currentDemoRole = ref('admin')
const availableRoles = [
  { label: 'Admin (Full Access)', value: 'admin' },
  { label: 'Manager (Operations & Sales)', value: 'manager' },
  { label: 'Staff (Operations only)', value: 'staff' },
  { label: 'Accountant (Finance & Reports)', value: 'accountant' },
]

const rbacSnippet = `// In your navigation configuration file:
export const getNavItemsForRole = (role) => {
  return navItems
    .map((group) => ({
      ...group,
      children: group.children?.filter((item) => {
        // If roles is omitted, accessible to all users
        if (!item.roles || item.roles.length === 0) return true
        return item.roles.includes(role)
      }),
    }))
    // Hide parent categories with 0 accessible children
    .filter((group) => !group.children || group.children.length > 0)
}

// In your Vue component:
const userRole = computed(() => authStore.user?.role || 'staff')
const accessibleNav = computed(() => getNavItemsForRole(userRole.value))

<FuseSideBar :navigation-items="accessibleNav" />`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
        <Shield class="w-3.5 h-3.5" />
        <span>Architecture Recipe</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">Role-Based Access Control (RBAC) Navigation</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Filter navigation menus dynamically based on user role permissions (e.g. admin, manager, staff, accountant).
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-dark-secondary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>How RBAC Works in Fuse-UI</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Assign a <code class="font-bold font-mono">roles: ['admin', 'manager']</code> array to any navigation item. Items without a roles array remain visible to all authenticated users. Parent groups automatically hide when their children are inaccessible.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="RBAC Live Simulator" :code="rbacSnippet">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-sm">Switch User Role:</h3>
            <p class="text-xs text-foreground/60 dark:text-dark-foreground/60">Watch navigation items dynamically re-filter in real time</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="r in availableRoles"
              :key="r.value"
              type="button"
              class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
              :class="currentDemoRole === r.value ? 'bg-primary text-white shadow-xs' : 'bg-muted dark:bg-dark-muted hover:bg-outline/40'"
              @click="currentDemoRole = r.value"
            >
              {{ r.label }}
            </button>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-muted/20 dark:bg-dark-muted/20 border border-outline/50 dark:border-dark-outline/50 space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary">
            Accessible Sections for [{{ currentDemoRole.toUpperCase() }}]:
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div
              v-for="group in getFilteredNavItems('', currentDemoRole)"
              :key="group.label"
              class="p-3 rounded-lg bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline space-y-1"
            >
              <div class="font-bold text-xs flex items-center gap-1.5 text-primary dark:text-dark-primary">
                <component :is="group.icon" class="w-3.5 h-3.5" />
                <span>{{ group.label }}</span>
              </div>
              <ul class="text-[11px] text-foreground/70 dark:text-dark-foreground/70 pl-5 list-disc space-y-0.5">
                <li v-for="child in group.children" :key="child.label">{{ child.label }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DemoPreview>
  </div>
</template>
