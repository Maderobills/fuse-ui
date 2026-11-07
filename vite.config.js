import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      vue(),
      tailwindcss(),
      {
        name: 'copy-dts',
        closeBundle() {
          try {
            const distDir = fileURLToPath(new URL('./dist', import.meta.url))
            const srcDts = fileURLToPath(new URL('./src/index.d.ts', import.meta.url))
            const distDts = fileURLToPath(new URL('./dist/index.d.ts', import.meta.url))
            const srcTheme = fileURLToPath(new URL('./src/assets/theme.css', import.meta.url))
            const distTheme = fileURLToPath(new URL('./dist/theme.css', import.meta.url))

            if (!fs.existsSync(distDir)) {
              fs.mkdirSync(distDir, { recursive: true })
            }
            if (fs.existsSync(srcDts)) {
              fs.copyFileSync(srcDts, distDts)
            }
            if (fs.existsSync(srcTheme)) {
              fs.copyFileSync(srcTheme, distTheme)
            }
          } catch (err) {
            console.warn('[copy-dts] Warning copying assets:', err.message)
          }
        },
      },
    ],
    build: isLib
      ? {
          outDir: 'dist',
          emptyOutDir: false,
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
        }
      : {
          outDir: 'dist',
          emptyOutDir: false,
        },
  }
})
