<script setup>
import { LayoutDashboard, DollarSign, Users, Info } from '@lucide/vue'
import { FuseStatCard } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const statSnippet = `<template>
  <!-- 1. Money format with currency -->
  <FuseStatCard
    title="Gross Revenue"
    type="money"
    :value="148500"
    currency="GHS"
    :icon="DollarSign"
    tone="success"
    :trend="{ direction: 'up', label: '+18.4% vs last mo', good: true }"
  />

  <!-- 2. Compact Big Numbers (displays 1.3M) -->
  <FuseStatCard
    title="Total Active Users"
    type="number"
    :value="1254300"
    compact
    :icon="Users"
    tone="primary"
    :trend="{ direction: 'up', label: '+4.2% today' }"
  />

  <!-- 3. Percentage Suffix -->
  <FuseStatCard
    title="Server Uptime"
    type="number"
    :value="99.98"
    suffix="%"
    tone="info"
    :trend="{ direction: 'neutral', label: 'Zero downtime' }"
  />

  <!-- 4. Inverted Trend (Cost Down = Good) -->
  <FuseStatCard
    title="AWS Infrastructure Cost"
    type="money"
    :value="2400"
    currency="USD"
    tone="warning"
    :trend="{ direction: 'down', label: '-8.5% optimized', good: true }"
  />
</template>

<script setup>
import { FuseStatCard } from '@maderobills/fuse-ui'
import { DollarSign, Users } from '@lucide/vue'
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary dark:bg-dark-secondary/10 dark:text-dark-secondary text-xs font-semibold">
        <LayoutDashboard class="w-3.5 h-3.5" />
        <span>Data Display</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseStatCard: KPI Metrics</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Format currency values, compact large counts (e.g. 1.2M), and display positive/negative trends.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-dark-secondary/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseStatCard</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseStatCard</code> at the top of dashboard overviews. It automatically formats currency numbers (GHS, USD, EUR), abbreviates thousands/millions into clean compact notation, and calculates positive/negative trend directions.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="KPI Metric Cards" :code="statSnippet">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FuseStatCard
          title="Gross Revenue"
          type="money"
          :value="148500"
          currency="GHS"
          :icon="DollarSign"
          tone="success"
          :trend="{ direction: 'up', label: '+18.4% vs last mo', good: true }"
        />
        <FuseStatCard
          title="Total Active Users"
          type="number"
          :value="1254300"
          compact
          :icon="Users"
          tone="primary"
          :trend="{ direction: 'up', label: '+4.2% today', good: true }"
        />
        <FuseStatCard
          title="Server Uptime"
          type="number"
          :value="99.98"
          suffix="%"
          tone="info"
          :trend="{ direction: 'neutral', label: 'Zero downtime' }"
        />
        <FuseStatCard
          title="AWS Infrastructure Cost"
          type="money"
          :value="2400"
          currency="USD"
          tone="warning"
          :trend="{ direction: 'down', label: '-8.5% optimized', good: true }"
        />
      </div>
    </DemoPreview>
  </div>
</template>
