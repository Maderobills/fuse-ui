<script>
</script>

<script setup>
import { computed, ref, useAttrs } from 'vue'
import { Eye, EyeOff, Mail, Lock, Phone, Calendar, Hash, Search } from '@lucide/vue'
import InputSelect from './internal/InputSelect.vue'
import InputFile from './internal/InputFile.vue'
import { inputBase, inputError } from './internal/inputStyles.js'
import { nextId } from './internal/useUid.js'

// class/style go to the wrapper; everything else goes to the real <input>
defineOptions({ inheritAttrs: false })

const TEXT_TYPES = [
  'text', 'email', 'password', 'search', 'number', 'tel', 'url',
  'date', 'time', 'datetime-local', 'month', 'week', 'color', 'range',
]
const SELECT_TYPES = ['dropdown', 'select', 'multiselect']

const AUTO_ICONS = {
  email: Mail,
  password: Lock,
  tel: Phone,
  number: Hash,
  search: Search,
  date: Calendar,
  time: Calendar,
  'datetime-local': Calendar,
  month: Calendar,
  week: Calendar,
}

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (v) => [
      'text', 'email', 'password', 'search', 'number', 'tel', 'url',
      'date', 'time', 'datetime-local', 'month', 'week', 'color', 'range',
      'dropdown', 'select', 'multiselect', 'textarea', 'radio', 'checkbox', 'file',
    ].includes(v),
  },
  label: { type: String, default: '' },
  /** Also used as the inline text of a single checkbox */
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
  options: { type: Array, default: () => [] }, // [{ label, value }]
  multiple: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  name: { type: String, default: '' },
  id: { type: String, default: '' },
  className: { type: String, default: '' },
  fileType: { type: String, default: '' }, // accept="..."
  preview: { type: Boolean, default: false },
  /** Component = custom icon, false = no icon, undefined = automatic by type */
  icon: { type: [Object, Function, Boolean], default: undefined },
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])
const attrs = useAttrs()

const generatedId = nextId('fuse-input')
const inputId = computed(() => props.id || generatedId)
const labelId = computed(() => `${inputId.value}-label`)

const fieldRef = ref(null)
const showPassword = ref(false)

const kind = computed(() => {
  if (TEXT_TYPES.includes(props.type)) return 'text'
  if (SELECT_TYPES.includes(props.type)) return 'select'
  return props.type // textarea | radio | checkbox | file
})
const isMultiple = computed(() => props.multiple || props.type === 'multiselect')
const isGroup = computed(
  () => kind.value === 'radio' || (kind.value === 'checkbox' && props.options.length > 0),
)

const inputType = computed(() => (props.type === 'password' && showPassword.value ? 'text' : props.type))

const leftIcon = computed(() => {
  if (kind.value !== 'text' || props.icon === false) return null
  return props.icon || AUTO_ICONS[props.type] || null
})

const fieldClasses = computed(() => [
  inputBase,
  props.error ? inputError : '',
  leftIcon.value ? 'pl-11' : '',
  props.type === 'password' ? 'pr-11' : '',
])

const describedBy = computed(() => {
  if (props.error) return `${inputId.value}-error`
  if (props.hint) return `${inputId.value}-hint`
  return undefined
})

// Everything except class/style → the actual form control
const inputAttrs = () => {
  const { class: _c, style: _s, ...rest } = attrs
  return rest
}

const setValue = (value) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const onInput = (e) => setValue(e.target.value)

const isChecked = (value) => Array.isArray(props.modelValue) && props.modelValue.includes(value)

const toggleCheckbox = (value, checked) => {
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const next = checked ? (current.includes(value) ? current : [...current, value]) : current.filter((v) => v !== value)
  setValue(next)
}

defineExpose({
  focus: () => fieldRef.value?.focus(),
  blur: () => fieldRef.value?.blur(),
})
</script>

<template>
  <div :class="['space-y-2', className, $attrs.class]" :style="$attrs.style">
    <!-- Label (groups render their own legend) -->
    <label
      v-if="label && !isGroup"
      :id="labelId"
      :for="kind === 'select' ? undefined : inputId"
      class="block text-sm font-medium text-foreground dark:text-dark-foreground"
    >
      {{ label }}
      <span v-if="required" class="text-error dark:text-dark-error ml-1">*</span>
    </label>

    <div class="relative">
      <!-- Text-like inputs -->
      <template v-if="kind === 'text'">
        <input
          :id="inputId"
          ref="fieldRef"
          :type="inputType"
          :value="modelValue ?? ''"
          :name="name || undefined"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :readonly="readonly"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
          :class="fieldClasses"
          v-bind="inputAttrs()"
          @input="onInput"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        />

        <component
          :is="leftIcon"
          v-if="leftIcon"
          class="w-5 h-5 text-foreground/40 dark:text-dark-foreground/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />

        <button
          v-if="type === 'password'"
          type="button"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 dark:text-dark-foreground/40 hover:text-foreground/60 dark:hover:text-dark-foreground/60 transition-colors focus:outline-none"
          @click="showPassword = !showPassword"
        >
          <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
        </button>
      </template>

      <!-- Textarea -->
      <textarea
        v-else-if="kind === 'textarea'"
        :id="inputId"
        ref="fieldRef"
        :value="modelValue ?? ''"
        :name="name || undefined"
        :placeholder="placeholder"
        :rows="rows"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
        :class="[inputBase, error ? inputError : '', 'resize-none']"
        v-bind="inputAttrs()"
        @input="onInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />

      <!-- Radio group -->
      <fieldset v-else-if="kind === 'radio'" class="space-y-3">
        <legend v-if="label" class="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
          {{ label }}
          <span v-if="required" class="text-error dark:text-dark-error ml-1">*</span>
        </legend>
        <div v-for="option in options" :key="option.value" class="flex items-center gap-3">
          <input
            :id="`${inputId}-${option.value}`"
            type="radio"
            :name="name || inputId"
            :checked="modelValue === option.value"
            :disabled="disabled"
            class="w-4 h-4 accent-primary dark:accent-dark-primary"
            @change="setValue(option.value)"
          />
          <label
            :for="`${inputId}-${option.value}`"
            class="text-xs font-medium text-foreground dark:text-dark-foreground cursor-pointer"
          >
            {{ option.label }}
          </label>
        </div>
      </fieldset>

      <!-- Checkbox: group or single -->
      <fieldset v-else-if="kind === 'checkbox'" class="space-y-3">
        <template v-if="options.length">
          <legend v-if="label" class="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
            {{ label }}
            <span v-if="required" class="text-error dark:text-dark-error ml-1">*</span>
          </legend>
          <div v-for="option in options" :key="option.value" class="flex items-center gap-3">
            <input
              :id="`${inputId}-${option.value}`"
              type="checkbox"
              :checked="isChecked(option.value)"
              :disabled="disabled"
              class="w-4 h-4 rounded-sm accent-primary dark:accent-dark-primary"
              @change="toggleCheckbox(option.value, $event.target.checked)"
            />
            <label
              :for="`${inputId}-${option.value}`"
              class="text-xs font-medium text-foreground dark:text-dark-foreground cursor-pointer"
            >
              {{ option.label }}
            </label>
          </div>
        </template>

        <div v-else class="flex items-center gap-3">
          <input
            :id="inputId"
            type="checkbox"
            :checked="!!modelValue"
            :disabled="disabled"
            class="w-4 h-4 rounded-sm accent-primary dark:accent-dark-primary"
            @change="setValue($event.target.checked)"
          />
          <label :for="inputId" class="text-xs font-medium text-foreground dark:text-dark-foreground cursor-pointer">
            {{ placeholder || 'Check me' }}
          </label>
        </div>
      </fieldset>

      <!-- Select / multiselect -->
      <InputSelect
        v-else-if="kind === 'select'"
        :model-value="modelValue"
        :options="options"
        :multiple="isMultiple"
        :searchable="searchable"
        :clearable="clearable"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :error="error"
        :input-id="inputId"
        :label-id="labelId"
        @update:model-value="setValue"
      />

      <!-- File -->
      <InputFile
        v-else-if="kind === 'file'"
        :model-value="modelValue"
        :multiple="isMultiple"
        :accept="fileType"
        :preview="preview"
        :disabled="disabled"
        :error="error"
        :input-id="inputId"
        @update:model-value="setValue"
      />
    </div>

    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="text-sm text-error dark:text-dark-error"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      :id="`${inputId}-hint`"
      class="text-xs text-foreground/50 dark:text-dark-foreground/50"
    >
      {{ hint }}
    </p>
  </div>
</template>