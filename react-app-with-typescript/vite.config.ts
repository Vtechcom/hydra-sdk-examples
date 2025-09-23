import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		wasm(),
		topLevelAwait(),
		nodePolyfills({
			include: ['buffer'],
			globals: {
				Buffer: true,
				global: false,
				process: false
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
