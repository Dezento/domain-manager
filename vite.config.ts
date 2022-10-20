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
  plugins: [ VueRouter({
    /* options */
    }),
    vue(),
    Pages(),
    Components({
      dts: true,
    }),
    AutoImport({
      imports: [
        'vue',
        //'vue/macros',
        'vue-router',
        '@vueuse/core',
        'vee-validate',
      ],
      dts: true,
      dirs: ['src/composables'],
      vueTemplate: true,
    }),
  ]
})
