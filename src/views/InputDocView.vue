<script setup>
import { ref } from 'vue'
import { BookOpen, Info } from '@lucide/vue'
import { FuseInput } from '../main.js'
import DemoPreview from './components/DemoPreview.vue'

const formState = ref({
  fullName: 'Ama Mensah',
  email: 'ama@mbills.enterprise',
  password: 'Password@2026',
  role: 'admin',
  skills: ['vue', 'tailwind'],
  rangeVal: 75,
  bio: 'Lead software engineer building enterprise UI systems at Mbills Enterprise.',
  termsAccepted: true,
})

const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Finance Officer', value: 'finance' },
  { label: 'Operations Lead', value: 'operations' },
  { label: 'Staff Member', value: 'staff' },
]

const skillOptions = [
  { label: 'Vue 3 & Composition API', value: 'vue' },
  { label: 'Tailwind CSS v4', value: 'tailwind' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vite & Rollup', value: 'vite' },
]

const inputSnippet = `<template>
  <!-- Text Input -->
  <FuseInput label="Full Name" v-model="form.fullName" required />

  <!-- Email with Auto Mail Icon -->
  <FuseInput type="email" label="Email" v-model="form.email" required />

  <!-- Password with Eye Reveal Toggle -->
  <FuseInput type="password" label="Password" v-model="form.password" hint="Click eye to toggle" />

  <!-- Single Searchable Select Dropdown -->
  <FuseInput type="select" label="Role" :options="roleOptions" v-model="form.role" searchable />

  <!-- Multi-Select Badge Tags -->
  <FuseInput type="multiselect" label="Skills" :options="skillOptions" v-model="form.skills" searchable clearable />

  <!-- Range Slider -->
  <FuseInput type="range" label="Volume" :min="0" :max="100" v-model="form.rangeVal" />

  <!-- Multi-line Textarea -->
  <FuseInput type="textarea" label="Bio" :rows="3" v-model="form.bio" />

  <!-- Checkbox -->
  <FuseInput type="checkbox" placeholder="Accept Terms" v-model="form.termsAccepted" />
</template>

<script setup>
import { ref } from 'vue'
import { FuseInput } from '@maderobills/fuse-ui'
<\/script>`
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-info/10 text-info dark:bg-dark-info/10 dark:text-dark-info text-xs font-semibold">
        <BookOpen class="w-3.5 h-3.5" />
        <span>Form Controls</span>
      </div>
      <h2 class="text-2xl font-bold mt-2">FuseInput: All-in-One Form Controls</h2>
      <p class="text-sm text-foreground/70 dark:text-dark-foreground/70">
        Replaces multiple form wrappers. Simply change <code class="font-mono text-xs bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded">type=""</code> to render text, passwords, selects, multi-select tags, sliders, colors, textareas, and checkboxes.
      </p>
    </div>

    <!-- Why & When to Use Callout -->
    <div class="p-5 rounded-xl border border-info/20 bg-info/5 dark:bg-dark-info/10 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-info dark:text-dark-info flex items-center gap-1.5">
        <Info class="w-4 h-4" />
        <span>Why & When to Use FuseInput</span>
      </h3>
      <p class="text-xs text-foreground/80 dark:text-dark-foreground/80 leading-relaxed">
        Use <code class="font-bold font-mono">FuseInput</code> everywhere you need a form input. Instead of installing multiple external packages for searchable dropdowns, password toggles, tag badges, and custom file pickers, FuseInput delivers them all in a single unified API.
      </p>
    </div>

    <!-- Demo with Code Preview -->
    <DemoPreview title="Form Controls Playground" :code="inputSnippet">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FuseInput
          label="1. Standard Text"
          placeholder="e.g. Kwame Mensah"
          v-model="formState.fullName"
          required
        />
        <FuseInput
          type="email"
          label="2. Corporate Email"
          placeholder="name@enterprise.com"
          v-model="formState.email"
          required
        />
        <FuseInput
          type="password"
          label="3. Password with Reveal Eye"
          placeholder="Enter secure password"
          v-model="formState.password"
          hint="Click eye icon to toggle visibility"
        />
        <FuseInput
          type="select"
          label="4. Select Dropdown"
          :options="roleOptions"
          v-model="formState.role"
          searchable
        />
        <FuseInput
          type="multiselect"
          label="5. Multi-Select Tags"
          :options="skillOptions"
          v-model="formState.skills"
          searchable
          clearable
        />
        <FuseInput
          type="range"
          :label="`6. Range Slider (${formState.rangeVal}%)`"
          :min="0"
          :max="100"
          v-model="formState.rangeVal"
        />
        <div class="md:col-span-2">
          <FuseInput
            type="textarea"
            label="7. Multi-line Textarea"
            placeholder="Write your note..."
            :rows="3"
            v-model="formState.bio"
          />
        </div>
        <div class="md:col-span-3 pt-2">
          <FuseInput
            type="checkbox"
            placeholder="I accept the Mbills Enterprise Terms of Service."
            v-model="formState.termsAccepted"
          />
        </div>
      </div>
    </DemoPreview>
  </div>
</template>

