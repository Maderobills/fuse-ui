<script setup>
import { Lightbulb } from '@lucide/vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
        <Lightbulb class="w-3.5 h-3.5" />
        <span>Architecture Guide</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">Component Selection Guide: When to Use What</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Inspiration from Tailwind CSS and Vue documentation: choose the ideal component based on your screen requirements.
      </p>
    </div>

    <div class="rounded-xl border border-outline dark:border-dark-outline bg-surface dark:bg-dark-surface overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-muted/30 dark:bg-dark-muted/30 border-b border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70">
            <tr>
              <th class="p-4 font-bold">Component</th>
              <th class="p-4 font-bold">Core Purpose</th>
              <th class="p-4 font-bold">When to Use This</th>
              <th class="p-4 font-bold">Why not an alternative?</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline dark:divide-dark-outline">
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseSideBar</td>
              <td class="p-4">Primary left navigation shell</td>
              <td class="p-4">App layout container; handles route transitions and user profile pill.</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Handles mobile overlay drawer, collapsible widths, and tooltips automatically.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseGreetBar</td>
              <td class="p-4">Top contextual page banner</td>
              <td class="p-4">Above main view content to show page title, breadcrumb trail, and actions.</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Automatically derives page titles and descriptions from route.meta.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseTable</td>
              <td class="p-4">Full data grid with filters & sorting</td>
              <td class="p-4">Tabular records (orders, users, inventory, logs).</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Integrates FuseFilters, row selection, bulk actions, and pagination out of the box.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseStatCard</td>
              <td class="p-4">KPI metric cards</td>
              <td class="p-4">Dashboards showing money, user counts, or uptime.</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Formats GHS/USD currency, compacts (1.2M), and colors positive/negative trends.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseInput</td>
              <td class="p-4">Unified form element (15+ types)</td>
              <td class="p-4">Any form: login, registration, settings, profile edits.</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Single tag handles password eye toggles, multiselect tags, and file previews.</td>
            </tr>
            <tr class="hover:bg-muted/10">
              <td class="p-4 font-bold text-primary dark:text-dark-primary">FuseFilters</td>
              <td class="p-4">Search & filter toolbar</td>
              <td class="p-4">Card grids or non-table catalog lists.</td>
              <td class="p-4 text-foreground/70 dark:text-dark-foreground/70">Debounces search queries automatically to avoid overloading backend servers.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

