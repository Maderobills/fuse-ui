<script setup>
import { RouterLink } from 'vue-router'
import SideBarTooltip from './SidebarTooltip.vue'

defineProps({
  to: { type: String, required: true },
  label: { type: String, default: '' },
  icon: { type: [Object, Function], default: null },
  expanded: { type: Boolean, default: true },
})
const emit = defineEmits(['navigate'])
</script>

<template>
  <RouterLink :to="to" custom v-slot="{ navigate, isActive }">
    <div class="relative group">
      <button
        type="button"
        @click="() => { navigate(); emit('navigate') }"
        class="flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left"
        :class="[
          isActive
            ? 'bg-primary/10 text-primary dark:bg-dark-secondary/10 dark:text-dark-secondary'
            : 'text-foreground/60 dark:text-dark-foreground/60 hover:bg-muted dark:hover:bg-dark-muted hover:text-foreground dark:hover:text-dark-foreground',
          expanded ? 'gap-3' : 'lg:justify-center lg:px-2',
        ]"
      >
        <component
          :is="icon"
          v-if="icon"
          class="w-4.5 h-4.5 shrink-0 transition-colors"
          :class="isActive ? 'text-primary dark:text-dark-secondary' : 'text-foreground/40 dark:text-dark-foreground/40 group-hover:text-foreground/70 dark:group-hover:text-dark-foreground/70'"
        />
        <span v-show="expanded" class="text-xs font-medium tracking-wide">{{ label }}</span>
      </button>

      <SideBarTooltip v-if="!expanded">
        <span class="text-xs font-medium text-foreground/80 dark:text-dark-foreground/80">{{ label }}</span>
      </SideBarTooltip>
    </div>
  </RouterLink>
</template>