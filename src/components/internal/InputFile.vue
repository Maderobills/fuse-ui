<script setup>
import { onBeforeUnmount, ref, watch, computed } from 'vue'
import { Upload, X } from '@lucide/vue'
import { inputBase, inputError } from './inputStyles.js'

const props = defineProps({
  modelValue: { type: [Object, Array], default: null },
  multiple: { type: Boolean, default: false },
  accept: { type: String, default: '' },
  preview: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
  inputId: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// Each entry keeps its file and (for images) its preview URL together,
// so indexes can never drift apart
const entries = ref([])

const keyOf = (f) => `${f.name}-${f.size}-${f.lastModified}`
const makeEntry = (file) => ({
  key: keyOf(file),
  file,
  url: props.preview && file.type?.startsWith('image/') ? URL.createObjectURL(file) : '',
})
const revoke = (e) => e.url && URL.revokeObjectURL(e.url)

const thumbnails = computed(() => entries.value.filter((e) => e.url))
const plainFiles = computed(() => entries.value.filter((e) => !e.url))

const emitFiles = () => {
  const files = entries.value.map((e) => e.file)
  emit('update:modelValue', props.multiple ? files : (files[0] ?? null))
}

const onChange = (event) => {
  const files = Array.from(event.target.files || [])
  event.target.value = '' // allow picking the same file again
  if (!files.length) return

  if (props.multiple) {
    const seen = new Set(entries.value.map((e) => e.key))
    const fresh = []
    for (const f of files) {
      const k = keyOf(f)
      if (seen.has(k)) continue
      seen.add(k)
      fresh.push(makeEntry(f))
    }
    entries.value = [...entries.value, ...fresh]
  } else {
    entries.value.forEach(revoke)
    entries.value = [makeEntry(files[0])]
  }
  emitFiles()
}

const remove = (entry) => {
  const i = entries.value.findIndex((e) => e.key === entry.key)
  if (i === -1) return
  revoke(entries.value[i])
  entries.value.splice(i, 1)
  emitFiles()
}

// Parent reset (e.g. form.reset → null / [])
watch(
  () => props.modelValue,
  (v) => {
    const empty = v === null || v === undefined || (Array.isArray(v) && v.length === 0)
    if (empty && entries.value.length) {
      entries.value.forEach(revoke)
      entries.value = []
    }
  },
)

onBeforeUnmount(() => entries.value.forEach(revoke))
</script>

<template>
  <div class="space-y-3">
    <input
      :id="inputId"
      type="file"
      class="peer sr-only"
      :multiple="multiple"
      :accept="accept || undefined"
      :disabled="disabled"
      @change="onChange"
    />

    <label
      :for="inputId"
      :class="[
        inputBase,
        error ? inputError : '',
        'flex items-center justify-center gap-2 hover:bg-muted dark:hover:bg-dark-muted',
        'peer-focus-visible:ring-1 peer-focus-visible:ring-primary dark:peer-focus-visible:ring-dark-primary',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      ]"
    >
      <Upload class="w-4 h-4" />
      <span>{{ multiple ? 'Select files' : 'Select file' }}</span>
    </label>

    <ul v-if="plainFiles.length" class="text-xs text-foreground/70 dark:text-dark-foreground/70 space-y-1">
      <li v-for="entry in plainFiles" :key="entry.key" class="flex items-center justify-between gap-2">
        <span class="truncate">{{ entry.file.name }}</span>
        <button
          type="button"
          :aria-label="`Remove ${entry.file.name}`"
          class="shrink-0 hover:text-error dark:hover:text-dark-error"
          @click="remove(entry)"
        >
          <X class="w-3 h-3" />
        </button>
      </li>
    </ul>

    <div v-if="thumbnails.length" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="entry in thumbnails" :key="entry.key" class="relative group">
        <img
          :src="entry.url"
          :alt="entry.file.name"
          class="w-full h-28 object-cover rounded-sm border border-outline dark:border-dark-outline"
        />
        <button
          type="button"
          :aria-label="`Remove ${entry.file.name}`"
          class="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
          @click="remove(entry)"
        >
          <X class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>