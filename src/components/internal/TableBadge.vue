<script setup>
defineProps({
  tone: { type: String, default: 'neutral' }, // primary | success | warning | error | info | neutral
})

const TONES = {
  primary: 'bg-primary/10 text-primary border-primary/30 dark:bg-dark-primary/10 dark:text-dark-primary dark:border-dark-primary/30',
  success: 'bg-success/10 text-success border-success/30 dark:bg-dark-success/10 dark:text-dark-success dark:border-dark-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30 dark:bg-dark-warning/10 dark:text-dark-warning dark:border-dark-warning/30',
  error: 'bg-error/10 text-error border-error/30 dark:bg-dark-error/10 dark:text-dark-error dark:border-dark-error/30',
  info: 'bg-info/10 text-info border-info/30 dark:bg-dark-info/10 dark:text-dark-info dark:border-dark-info/30',
  neutral: 'bg-muted text-foreground/70 border-outline dark:bg-dark-muted dark:text-dark-foreground/70 dark:border-dark-outline',
}
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-medium border whitespace-nowrap"
    :class="TONES[tone] ?? TONES.neutral"
  >
    <slot />
  </span>
</template>