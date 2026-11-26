<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

defineProps({
  align: { type: String, default: 'right' }, // 'left' | 'right'
  panelClass: { type: String, default: '' },
})

const open = defineModel('open', { type: Boolean, default: false })
const rootRef = ref(null)

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const onOutside = (e) => {
  if (rootRef.value && !rootRef.value.contains(e.target)) close()
}
const onKey = (e) => {
  if (e.key === 'Escape') close()
}
const detach = () => {
  document.removeEventListener('mousedown', onOutside)
  document.removeEventListener('keydown', onKey)
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
  } else {
    detach()
  }
})
onBeforeUnmount(detach)
</script>

<template>
  <div ref="rootRef" class="relative">
    <slot name="trigger" :open="open" :toggle="toggle" :close="close" />

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute top-full mt-2 z-50 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-xl shadow-lg max-w-[calc(100vw-1.5rem)] overflow-hidden"
        :class="[align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left', panelClass]"
      >
        <slot :close="close" />
      </div>
    </Transition>
  </div>
</template>
