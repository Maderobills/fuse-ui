import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-dts',
      closeBundle() {
        fs.copyFileSync(
          new URL('./src/index.d.ts', import.meta.url),
          new URL('./dist/index.d.ts', import.meta.url),
        )
      },
    },
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@lucide/vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' },
      },
    },
  },
})