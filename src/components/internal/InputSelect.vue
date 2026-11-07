<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ChevronDown, Search, X, Check } from '@lucide/vue'
import { inputBase, inputError } from './inputStyles.js'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, Array], default: null },
  options: { type: Array, default: () => [] }, // [{ label, value }]
  multiple: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: String, default: '' },
  inputId: { type: String, default: '' },
  labelId: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const rootRef = ref(null)
const searchRef = ref(null)

const isEmpty = (v) => v === null || v === undefined || v === ''

const selectedValues = computed(() => {
  if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : []
  return isEmpty(props.modelValue) ? [] : [props.modelValue]
})

const labelOf = (value) => props.options.find((o) => o.value === value)?.label ?? String(value)
const isSelected = (value) => selectedValues.value.includes(value)
const displayLabel = computed(() => (selectedValues.value.length ? labelOf(selectedValues.value[0]) : ''))

const filteredOptions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!props.searchable || !q) return props.options
  return props.options.filter(
    (o) => String(o.label).toLowerCase().includes(q) || String(o.value).toLowerCase().includes(q),
  )
})

const canInteract = computed(() => !props.disabled && !props.readonly)
const showClear = computed(() => props.clearable && canInteract.value && selectedValues.value.length > 0)

const toggle = () => {
  if (canInteract.value) isOpen.value = !isOpen.value
}

const choose = (option) => {
  if (props.multiple) {
    const next = isSelected(option.value)
      ? selectedValues.value.filter((v) => v !== option.value)
      : [...selectedValues.value, option.value]
    emit('update:modelValue', next)
  } else {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
}

const removeValue = (value) => {
  emit('update:modelValue', selectedValues.value.filter((v) => v !== value))
}

const clearAll = () => emit('update:modelValue', props.multiple ? [] : null)

const onKeydown = (e) => {
  if (e.key === 'Escape') isOpen.value = false
  else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (canInteract.value) isOpen.value = true
  }
}

const onOutside = (e) => {
  if (rootRef.value && !rootRef.value.contains(e.target)) isOpen.value = false
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('mousedown', onOutside)
    nextTick(() => searchRef.value?.focus())
  } else {
    document.removeEventListener('mousedown', onOutside)
    searchQuery.value = ''
  }
})

onBeforeUnmount(() => document.removeEventListener('mousedown', onOutside))
</script>

<template>
  <div ref="rootRef" class="relative">
    <div
      :id="inputId"
      role="combobox"
      tabindex="0"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-labelledby="labelId || undefined"
      :aria-disabled="disabled"
      :class="[
        inputBase,
        error ? inputError : '',
        'flex items-center justify-between gap-2',
        disabled ? 'bg-muted dark:bg-dark-muted cursor-not-allowed opacity-70' : 'cursor-pointer',
        isOpen ? 'ring-1 ring-primary dark:ring-dark-primary border-primary dark:border-dark-primary' : '',
      ]"
      @click="toggle"
      @keydown="onKeydown"
    >
      <div class="flex-1 flex flex-wrap gap-1 min-h-5 min-w-0">
        <template v-if="multiple && selectedValues.length">
          <span
            v-for="value in selectedValues"
            :key="value"
            class="inline-flex items-center px-2 py-1 bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary text-sm rounded-sm border border-primary/20 dark:border-dark-primary/20"
          >
            {{ labelOf(value) }}
            <button
              type="button"
              :disabled="disabled || readonly"
              :aria-label="`Remove ${labelOf(value)}`"
              class="ml-1 hover:text-primary/70 dark:hover:text-dark-primary/70 focus:outline-none"
              @click.stop="removeValue(value)"
            >
              <X class="w-3 h-3" />
            </button>
          </span>
        </template>

        <span
          v-else
          class="truncate"
          :class="displayLabel ? 'text-foreground dark:text-dark-foreground' : 'text-foreground/50 dark:text-dark-foreground/50'"
        >
          {{ displayLabel || placeholder }}
        </span>
      </div>

      <button
        v-if="showClear"
        type="button"
        aria-label="Clear selection"
        class="text-foreground/40 dark:text-dark-foreground/40 hover:text-foreground/70 dark:hover:text-dark-foreground/70 focus:outline-none"
        @click.stop="clearAll"
      >
        <X class="w-4 h-4" />
      </button>

      <ChevronDown
        class="w-5 h-5 shrink-0 text-foreground/40 dark:text-dark-foreground/40 transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </div>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        role="listbox"
        :aria-multiselectable="multiple"
        class="absolute z-50 w-full mt-1 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-sm shadow-xl overflow-hidden"
      >
        <div v-if="searchable" class="p-3 border-b border-outline dark:border-dark-outline">
          <div class="relative">
            <input
              ref="searchRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 text-sm bg-background dark:bg-dark-background border border-outline dark:border-dark-outline rounded-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary text-foreground dark:text-dark-foreground placeholder:text-foreground/50 dark:placeholder:text-dark-foreground/50"
              @keydown.escape="isOpen = false"
            />
            <Search class="w-4 h-4 text-foreground/40 dark:text-dark-foreground/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div class="max-h-48 overflow-y-auto scrollbar-thin">
          <template v-if="filteredOptions.length">
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              role="option"
              :aria-selected="isSelected(option.value)"
              class="px-4 py-3 text-sm cursor-pointer hover:bg-muted dark:hover:bg-dark-muted flex items-center justify-between transition-colors border-b border-outline/30 dark:border-dark-outline/30 last:border-0"
              :class="isSelected(option.value) ? 'bg-primary/5 dark:bg-dark-primary/5 text-primary dark:text-dark-primary' : 'text-foreground dark:text-dark-foreground'"
              @click="choose(option)"
            >
              <span>{{ option.label }}</span>
              <Check v-if="isSelected(option.value)" class="w-4 h-4 text-primary dark:text-dark-primary" />
            </div>
          </template>
          <div v-else class="px-4 py-3 text-foreground/60 dark:text-dark-foreground/60 text-sm text-center">
            {{ searchQuery ? 'No matching options found' : 'No options available' }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>