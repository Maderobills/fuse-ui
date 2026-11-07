<script setup>
import { computed, onMounted } from 'vue'
import { Sun, Moon } from '@lucide/vue'
import { useFuseTheme } from '../composables/useFuseTheme.js'

const props = defineProps({
  /** Pass this to control the theme yourself; leave it out and fuseui manages it */
  isDark: { type: Boolean, default: undefined },
})

const emit = defineEmits(['toggle'])

const theme = useFuseTheme()
const controlled = computed(() => props.isDark !== undefined)
const dark = computed(() => (controlled.value ? props.isDark : theme.isDark.value))

const onClick = () => {
  const next = !dark.value
  if (!controlled.value) theme.setTheme(next)
  emit('toggle', next)
}

onMounted(() => {
  if (!controlled.value) theme.initTheme()
})
</script>

<template>
  <button
    type="button"
    @click="onClick"
    class="relative flex items-center justify-center h-9 w-9 rounded-xl bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline hover:bg-muted dark:hover:bg-dark-muted transition-colors"
    :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-150 ease-out"
      leave-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -rotate-45 scale-75"
      leave-to-class="opacity-0 -rotate-45 scale-75"
    >
      <!-- Dark mode: Sun in gold -->
      <Sun v-if="dark" key="sun" class="w-4 h-4 text-dark-secondary" />
      <!-- Light mode: Moon in navy -->
      <Moon v-else key="moon" class="w-4 h-4 text-primary" />
    </Transition>
  </button>
</template>