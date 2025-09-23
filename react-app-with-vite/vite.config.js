import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    nodePolyfills({
      globals: {
        Buffer: true
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@hydra-sdk/cardano-wasm']
  },
  define: {
    global: 'globalThis'
  }
})
