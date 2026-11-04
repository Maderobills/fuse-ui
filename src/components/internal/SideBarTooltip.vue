<script setup>
import { computed } from 'vue'

const props = defineProps({
  align: { type: String, default: 'center' }, // 'center' | 'top'
  interactive: { type: Boolean, default: false }, // true = hoverable/clickable flyout
  contentClass: {
    type: String,
    default: 'px-3 py-1.5 whitespace-nowrap rounded-lg shadow-md',
  },
})

const pos = computed(() => (props.align === 'top' ? 'top-0' : 'top-1/2 -translate-y-1/2'))
const arrowPos = computed(() => (props.align === 'top' ? 'top-3' : 'top-1/2 -translate-y-1/2'))
</script>

<template>
  <!-- pl-3 (not ml-3) bridges the gap so hover isn't lost between button and flyout -->
  <div
    class="hidden lg:block absolute left-full pl-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
    :class="[pos, interactive ? '' : 'pointer-events-none']"
  >
    <div class="relative">
      <div
        class="bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline"
        :class="contentClass"
      >
        <slot />
      </div>
      <div class="absolute right-full border-[6px] border-transparent border-r-outline dark:border-r-dark-outline" :class="arrowPos" />
      <div class="absolute right-full ml-px border-[5px] border-transparent border-r-surface dark:border-r-dark-surface" :class="arrowPos" />
    </div>
  </div>
</template>