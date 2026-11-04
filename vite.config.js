import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  rollupOptions: {
  external: ['vue', 'vue-router', '@lucide/vue'],
  output: { globals: { vue: 'Vue' } },
},
})
