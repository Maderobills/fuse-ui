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

Here is a full dashboard layout combining `FuseSideBar`, `FuseGreetBar`, and `FuseThemeToggler`:

```vue
<!-- App.vue or DefaultLayout.vue -->
<script setup>
import { FuseSideBar, FuseGreetBar, FuseThemeToggler } from '@maderobills/fuse-ui'
import { LayoutDashboard, Users, Settings, BookOpen } from '@lucide/vue'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  {
    label: 'Academic',
    icon: BookOpen,
    children: [
      { label: 'Courses', route: '/courses' },
      { label: 'Exams', route: '/exams' },
    ],
  },
  { label: 'Users', icon: Users, route: '/users' },
  { label: 'Settings', icon: Settings, route: '/settings' },
]

const currentUser = {
  name: 'Kwame Mensah',
  role: 'admin', // matches roleClasses in FuseSideBar
  email: 'kwame@school.edu',
  avatar: 'https://i.pravatar.cc/150?u=kwame', // optional image URL
}
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden">
    <!-- Sidebar Navigation -->
    <FuseSideBar
      brand-name="SchoolHub"
      brand-tagline="Management Portal"
      :navigation-items="navItems"
      :user="currentUser"
      home-route="/"
      profile-route="/profile"
      @logout="console.log('User logged out')"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Bar -->
      <FuseGreetBar :user="currentUser" greeting>
        <template #theme-toggle>
          <!-- Self-managed theme toggler -->
          <FuseThemeToggler />
        </template>
      </FuseGreetBar>

      <!-- Page View -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <router-view />
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

### 4. `useFuseTheme()` Composable

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
Without this, Tailwind v4 purges all unused classes and will not style the sidebar.

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
