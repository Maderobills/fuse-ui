# Fuse UI 🚀

A sleek, responsive, and customizable Vue 3 UI component suite crafted for modern admin dashboards, SaaS platforms, and enterprise applications. Built with **Tailwind CSS** and **Lucide Vue**.

---

## ✨ Features

- **📱 Fully Responsive & Mobile-Ready** — Mobile slide-over drawers with backdrop blur, desktop collapse toggle, and automatic mobile header offsets.
- **🎨 Built-in Dark Mode & Theming** — Seamless light and dark mode powered by Tailwind CSS tokens, with an animated Sun/Moon toggle.
- **🧩 Core Components**:
  - `FuseSideBar` — Collapsible navigation sidebar with submenus, tooltips in collapsed view, user profile summary, and role badges.
  - `FuseGreetBar` — Clean top app bar with time-based dynamic greetings ("Good morning, Kwame"), profile navigation, and action slots.
  - `FuseThemeToggler` — Animated smooth theme switcher (supports standalone self-management or controlled `v-model`).
  - `FuseStatCard` — KPI and metrics card with automated currency formatting, compact notations (e.g. `1.2M`), tone color-coding, trend indicators, and skeleton loaders.
  - `FuseInput` — All-in-one form input component supporting text, password (with show/hide eye toggle), searchable select & multiselect, textarea, radio/checkbox groups, and file dropzone with preview.
  - `useFuseTheme` — Shared composable for reading and toggling the active theme from anywhere in your app.

---

## 📦 Installation

```bash
# Install directly from GitHub
npm install github:Maderobills/fuse-ui

# Ensure peer dependencies are installed
npm install vue-router @lucide/vue
```

---

## 🎨 Tailwind CSS Configuration

`fuse-ui` uses Tailwind CSS utility classes and color tokens. Follow the setup matching your Tailwind version:

### Tailwind CSS v4 (Recommended)

In your main CSS stylesheet (e.g. `src/assets/main.css` or `src/assets/theme.css`):

```css
@import "tailwindcss";

/* 1. Tell Tailwind to scan fuse-ui for utility classes */
@source "../../node_modules/@maderobills/fuse-ui";

/* 2. Dark mode variant (class-based) */
@custom-variant dark (&:where(.dark, .dark *));

/* 3. Theme color definitions */
@theme {
  /* Light */
  --color-primary: #031c45;
  --color-secondary: #bc9333;
  --color-background: #f0f2f7;
  --color-foreground: #0a1628;
  --color-surface: #ffffff;
  --color-outline: #c2cde0;
  --color-muted: #e2e7f0;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #06b6d4;

  /* Dark */
  --color-dark-primary: #4a7abf;
  --color-dark-secondary: #d4a94a;
  --color-dark-background: #080f1e;
  --color-dark-foreground: #dde4f0;
  --color-dark-surface: #0f1d35;
  --color-dark-outline: #1e3560;
  --color-dark-muted: #162847;
  --color-dark-success: #059669;
  --color-dark-warning: #d97706;
  --color-dark-error: #dc2626;
  --color-dark-info: #0891b2;
}

@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

### Tailwind CSS v3

In your `tailwind.config.js`:

```javascript
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@maderobills/fuse-ui/**/*.{vue,js,cjs}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#031c45',
        secondary: '#bc9333',
        surface: '#ffffff',
        outline: '#c2cde0',
        muted: '#e2e7f0',
        'dark-surface': '#0f1d35',
        'dark-outline': '#1e3560',
        'dark-muted': '#162847',
        'dark-secondary': '#d4a94a',
      },
    },
  },
}
```

---

## 🚀 Quick Start Example

Here is a full dashboard layout combining `FuseSideBar`, `FuseGreetBar`, `FuseStatCard`, and `FuseInput`:

```vue
<!-- App.vue or Dashboard.vue -->
<script setup>
import { ref } from 'vue'
import {
  FuseSideBar,
  FuseGreetBar,
  FuseThemeToggler,
  FuseStatCard,
  FuseInput,
} from '@maderobills/fuse-ui'
import { LayoutDashboard, Users, Settings, DollarSign, UserCheck } from '@lucide/vue'

const searchQuery = ref('')
const selectedRole = ref('all')

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  { label: 'Users', icon: Users, route: '/users' },
  { label: 'Settings', icon: Settings, route: '/settings' },
]

const currentUser = {
  name: 'Kwame Mensah',
  role: 'admin',
  email: 'kwame@school.edu',
  avatar: 'https://i.pravatar.cc/150?u=kwame',
}

const roleOptions = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admins', value: 'admin' },
  { label: 'Managers', value: 'manager' },
  { label: 'Students', value: 'student' },
]
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden">
    <!-- Sidebar -->
    <FuseSideBar
      brand-name="SchoolHub"
      brand-tagline="Management Portal"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/"
      profile-route="/profile"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Bar -->
      <FuseGreetBar :user="currentUser" greeting>
        <template #theme-toggle>
          <FuseThemeToggler />
        </template>
      </FuseGreetBar>

      <!-- Dashboard View -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        <!-- Stat Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FuseStatCard
            title="Total Revenue"
            type="money"
            :value="148500"
            currency="USD"
            :icon="DollarSign"
            tone="success"
            :trend="{ direction: 'up', label: '+18% vs last month' }"
          />

          <FuseStatCard
            title="Active Students"
            type="number"
            :value="2450"
            compact
            :icon="UserCheck"
            tone="primary"
            :trend="{ direction: 'up', label: '+4.2%' }"
          />

          <FuseStatCard
            title="Course Completion"
            type="number"
            :value="87"
            suffix="%"
            tone="info"
          />

          <FuseStatCard
            title="Pending Invoices"
            type="money"
            :value="12400"
            currency="GHS"
            tone="warning"
            :trend="{ direction: 'down', label: '-5%', good: true }"
          />
        </div>

        <!-- Form Inputs Example -->
        <div class="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-outline dark:border-dark-outline space-y-4 max-w-xl">
          <h2 class="text-base font-semibold">User Search & Filters</h2>
          
          <FuseInput
            type="search"
            label="Search Directory"
            placeholder="Search by name, email..."
            v-model="searchQuery"
            clearable
          />

          <FuseInput
            type="select"
            label="Filter by Role"
            :options="roleOptions"
            v-model="selectedRole"
            searchable
          />
        </div>
      </main>
    </div>
  </div>
</template>
```

---

## 📖 Component API Reference

### 1. `FuseSideBar`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `navigationItems` | `Array` | *required* | Array of route objects `{ label, icon, route, children }`. |
| `brandName` | `String` | `''` | Brand text displayed at the top of the sidebar. |
| `brandTagline` | `String` | `''` | Secondary subtitle displayed under the brand name. |
| `logoLight` | `String` | `''` | Image URL or SVG string for light mode logo. |
| `logoDark` | `String` | `''` | Image URL or SVG string for dark mode logo. |
| `homeRoute` | `String` | `'/'` | Destination URL when clicking the logo. |
| `user` | `Object` | `null` | `{ name, role, avatar }`. Passing `null` displays guest view. |
| `profileRoute` | `String` | `'/profile'`| URL routed to when clicking the user profile card. |
| `guestLabel` | `String` | `'Welcome, Guest'` | Text shown when `user` prop is null. |
| `roleClasses` | `Object` | `{ admin: '...', ... }` | Map of user roles to Tailwind text color classes. |
| `v-model:expanded` | `Boolean` | `true` | Controls whether desktop sidebar is expanded or collapsed. |

#### Slots & Events
- `#logo="{ expanded }"`: Custom brand/logo component.
- `#footer="{ expanded }"`: Custom slot beneath the user profile card.
- `@logout`: Emitted when clicking the logout button on the user card.

---

### 2. `FuseGreetBar`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `user` | `Object` | `null` | `{ name, email, avatar }` used for greeting and profile pill. |
| `profileRoute` | `String` | `'/profile'` | Destination when clicking user avatar pill on the right. |
| `greeting` | `Boolean` | `false` | Shows "Good morning / afternoon / evening, Name" on the left. |
| `mobileMenuOffset` | `Boolean` | `true` | Adds `pl-12 lg:pl-0` so the fixed mobile menu button doesn't cover text. |

#### Slots
- `#left`: Overrides default greeting text (e.g., page title or breadcrumbs).
- `#actions`: Extra buttons, search bars, or notification bells.
- `#theme-toggle`: Right-aligned slot for `<FuseThemeToggler />`.
- `default`: Anything placed directly inside `<FuseGreetBar>...</FuseGreetBar>` renders in the right actions area.

---

### 3. `FuseThemeToggler`

| Prop / Event | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isDark` | `Boolean` | `undefined` | Controlled state. If omitted, the toggler manages theme automatically. |
| `@toggle` | `(next: boolean)` | - | Emitted whenever the user toggles theme. |
| `v-model:isDark` | `Boolean` | - | Sync with your own reactive variable. |

---

### 4. `FuseStatCard`

A versatile card component for rendering numbers, monetary metrics, indicators, and trends.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | *required* | Card header title. |
| `value` | `Number \| String` | `0` | Raw numeric or string value to format and display. |
| `type` | `'number' \| 'money' \| 'info'` | `'number'` | Determines value formatting style. |
| `formatted` | `String` | `null` | Custom string that overrides automatic formatting when provided. |
| `description` | `String` | `''` | Subtext printed below the value. |
| `icon` | `Component` | `null` | Lucide icon or custom Vue component. |
| `image` | `String` | `''` | Avatar or image URL (takes precedence over `icon`). |
| `tone` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Accent color applied to the icon badge background and text. |
| `currency` | `String` | `'GHS'` | Currency code (e.g., `'USD'`, `'EUR'`, `'GBP'`, `'GHS'`). |
| `currencySymbols` | `Object` | `{ USD: '$', EUR: '€', GBP: '£' }` | Maps currency codes to symbols. Codes not listed display as `"CODE 1,200.00"`. |
| `decimals` | `Number` | `2` for money, `0` for number | Number of decimal places to render. |
| `compact` | `Boolean` | `false` | Shortens large numbers (e.g. `1,200` &rarr; `1.2K`, `3,400,000` &rarr; `3.4M`). |
| `suffix` | `String` | `''` | Appended string (e.g. `'%'`, `' days'`). |
| `locale` | `String` | `'en-GH'` | Locale string passed to `Intl.NumberFormat`. |
| `trend` | `Object` | `null` | `{ direction: 'up' \| 'down', label: '+12%', good?: boolean }`. Set `good: true` for falling costs. |
| `loading` | `Boolean` | `false` | Displays an animated skeleton placeholder. |

#### Slots
- `#icon`: Replaces the top-right icon badge.
- `#value="{ value }"`: Custom value presentation.
- `#footer`: Additional content at the bottom of the card.

---

### 5. `FuseInput`

An all-in-one input component supporting text fields, secure passwords with toggle, selects, radio/checkboxes, textareas, and file dropzones.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `String` | `'text'` | Input type (see Supported Types below). |
| `v-model` | `Any` | `null` | Two-way binding for the input value. |
| `label` | `String` | `''` | Accessible label rendered above the input. |
| `placeholder` | `String` | `''` | Placeholder text (also acts as label for standalone checkbox). |
| `options` | `Array` | `[]` | Array of options `[{ label, value }]` for select, dropdown, radio, or checkbox groups. |
| `error` | `String` | `''` | Validation error message (adds red ring and alert message). |
| `hint` | `String` | `''` | Help text displayed beneath the input when there is no error. |
| `required` | `Boolean` | `false` | Appends a red asterisk `*` to the label. |
| `disabled` | `Boolean` | `false` | Disables user interaction and styles input as muted. |
| `readonly` | `Boolean` | `false` | Prevents value changes while retaining normal contrast. |
| `clearable` | `Boolean` | `false` | Shows a clear button to reset input value. |
| `searchable` | `Boolean` | `false` | Enables real-time search filtering in `select` / `dropdown` modes. |
| `multiple` | `Boolean` | `false` | Enables multi-tag selection for `select` modes. |
| `rows` | `Number` | `3` | Visible text lines when `type="textarea"`. |
| `icon` | `Component \| Boolean` | `undefined` | Custom icon component. Pass `false` to disable auto-icon. |
| `fileType` | `String` | `''` | Native `accept` attribute for `type="file"` (e.g., `'image/*', '.pdf'`). |
| `preview` | `Boolean` | `false` | Shows thumbnail previews for uploaded images in `type="file"`. |

#### Supported Input Types:
- **Text & Numeric**: `'text'`, `'email'`, `'password'`, `'search'`, `'number'`, `'tel'`, `'url'`
- **Date & Time**: `'date'`, `'time'`, `'datetime-local'`, `'month'`, `'week'`
- **Special**: `'color'`, `'range'`
- **Selection**: `'select'`, `'dropdown'`, `'multiselect'`
- **Multi-line**: `'textarea'`
- **Choices**: `'checkbox'`, `'radio'`
- **Upload**: `'file'`

#### Automatic Icons:
`FuseInput` automatically supplies intuitive Lucide icons based on type:
- `email` &rarr; `Mail`
- `password` &rarr; `Lock` (with toggleable `Eye` / `EyeOff` password reveal)
- `search` &rarr; `Search`
- `tel` &rarr; `Phone`
- `number` &rarr; `Hash`
- `date`, `time`, `datetime-local` &rarr; `Calendar`

#### Usage Examples:

```vue
<!-- Password with automatic Show/Hide toggle -->
<FuseInput
  type="password"
  label="Account Password"
  v-model="password"
  required
  hint="Must be at least 8 characters"
/>

<!-- Searchable Multi-Select -->
<FuseInput
  type="select"
  label="Assign Subjects"
  :options="[
    { label: 'Mathematics', value: 'math' },
    { label: 'Physics', value: 'phy' },
    { label: 'Chemistry', value: 'chem' },
  ]"
  v-model="selectedSubjects"
  multiple
  searchable
  clearable
/>

<!-- Radio Option Group -->
<FuseInput
  type="radio"
  label="Notification Frequency"
  :options="[
    { label: 'Immediate', value: 'instant' },
    { label: 'Daily Digest', value: 'daily' },
    { label: 'Weekly Summary', value: 'weekly' },
  ]"
  v-model="frequency"
/>

<!-- File Upload with Image Previews -->
<FuseInput
  type="file"
  label="Upload ID Card"
  file-type="image/*"
  preview
  v-model="idFile"
/>
```

---

### 6. `useFuseTheme()` Composable

Use this anywhere in your app to read or change the theme without creating custom wrappers:

```javascript
import { useFuseTheme } from '@maderobills/fuse-ui'

const { isDark, toggleTheme, setTheme, initTheme } = useFuseTheme()

// isDark: Readonly Ref<boolean>
// toggleTheme(): Flips between dark and light
// setTheme(true): Forces dark mode
```

---

## 💡 Pro-Tips & Troubleshooting

### 1. Styles Look Unformatted?
Make sure your CSS includes `@source` pointing to `fuse-ui`:
```css
@source "../../node_modules/@maderobills/fuse-ui";
```
Without this, Tailwind v4 purges all unused classes and will not style the components.

### 2. Mobile Menu Overlaps Header Text?
`FuseSideBar` uses a fixed floating hamburger button on mobile screens (`lg:hidden`). `FuseGreetBar` automatically leaves space for it when `mobileMenuOffset` is enabled (default `true`).

### 3. Customizing Brand Colors
You don't need to fork the repo to change theme colors! Simply override any of the `--color-*` variables in your `@theme` block:
```css
@theme {
  --color-primary: #1e40af; /* Change primary to your brand color */
  --color-surface: #f8fafc;
}
```

---

## 📄 License
MIT © Maderobills
