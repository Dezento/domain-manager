import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: 
  [ VueRouter({
    /* options */
    }),
    vue({
      reactivityTransform: true,
    }),
    Pages(),
    Components({
      dts: true,
    }),
    AutoImport({
      include: [/\.[tj]s$/, /\.vue$/, /\.vue\?vue/],
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        'vee-validate',
      ],
      dirs: ['src/composables'],
      vueTemplate: true,
    }),
  ]
})
