import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import wasm from 'vite-plugin-wasm'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    wasm(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['@hydra-sdk/cardano-wasm'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
