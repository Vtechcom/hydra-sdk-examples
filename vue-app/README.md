# Vue 3 + TypeScript + Vite + Hydra SDK Example

This example demonstrates how to integrate Hydra SDK into a Vue.js application using TypeScript and Vite build tool.

## 🚀 Quick Start

### Option 1: Use This Example

1. **Navigate to this directory:**
   ```bash
   cd vue-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser:**
   - Visit: `http://localhost:5173`

### Option 2: Create From Scratch

Follow these steps to create a new Vue 3 + TypeScript + Vite project with Hydra SDK from scratch:

#### 1. Create a new Vue project

```bash
npm create vue@latest my-vue-app
cd ./my-vue-app
```

When prompted, select:
- ✅ TypeScript
- ✅ Router (optional)
- ❌ Other options (as needed)

#### 2. Install Hydra SDK packages

```bash
pnpm add @hydra-sdk/core @hydra-sdk/transaction @hydra-sdk/bridge
```

#### 3. Install required Vite plugins (as dev dependencies)

```bash
pnpm add vite-plugin-wasm vite-plugin-top-level-await vite-plugin-node-polyfills -D
```

#### 4. Configure Vite

Update your `vite.config.ts` file:

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    wasm(),
    topLevelAwait(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
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
```

#### 5. Create Hydra SDK component

Create `src/components/HydraSdkExample.vue`:

```vue
<script lang="ts" setup>
import { AppWallet, NETWORK_ID } from '@hydra-sdk/core'
import { ref } from 'vue'

const mnemonic = ref(AppWallet.brew())
const wallet = ref(
  new AppWallet({
    networkId: NETWORK_ID.PREPROD,
    key: {
      type: 'mnemonic',
      words: mnemonic.value,
    },
  }),
)
const account = ref(wallet.value.getAccount())

function generateNewWallet() {
  mnemonic.value = AppWallet.brew()
  wallet.value = new AppWallet({
    networkId: NETWORK_ID.PREPROD,
    key: {
      type: 'mnemonic',
      words: mnemonic.value,
    },
  })
  account.value = wallet.value.getAccount()
}
</script>

<template>
  <div class="hydra-sdk-example">
    <h2>Hydra SDK Example</h2>
    <button @click="generateNewWallet">Generate New Wallet</button>
    <h3>Mnemonic</h3>
    <p class="break-words">
      {{ mnemonic }}
    </p>
    <h3>Base Address (Bech32)</h3>
    <p class="base-address">
      {{ account.baseAddressBech32 }}
    </p>
  </div>
</template>

<style scoped>
.hydra-sdk-example {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 1rem;
  font-weight: 700;
}
button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}
button:hover {
  background-color: #369870;
}
p {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}
.break-words {
  word-break: break-all;
}
.base-address {
  font-weight: 600;
  color: #333;
  overflow-x: auto;
}
</style>
```

#### 6. Update your main view

Update `src/views/HomeView.vue` to use the component:

```vue
<script setup lang="ts">
import HydraSdkExample from '@/components/HydraSdkExample.vue'
</script>

<template>
  <main>
    <HydraSdkExample />
  </main>
</template>
```

#### 7. Run your application

```bash
pnpm dev
```

## 📦 Dependencies

### Hydra SDK Packages

- **@hydra-sdk/core** - Core functionality for wallet and transactions
- **@hydra-sdk/bridge** - Bridge for blockchain interaction  
- **@hydra-sdk/transaction** - Utilities for transaction handling

### Vue Dependencies

- **vue** - Vue.js 3 framework
- **vue-router** - Vue Router for navigation

### Vite Plugins (Dev Dependencies)

- **@vitejs/plugin-vue** - Vue.js support for Vite
- **vite-plugin-vue-devtools** - Vue DevTools integration
- **vite-plugin-wasm** - WebAssembly support for Hydra SDK
- **vite-plugin-top-level-await** - Top-level await support
- **vite-plugin-node-polyfills** - Node.js polyfills for browser compatibility

## 🔧 Configuration Details

### Why These Plugins Are Needed

1. **@vitejs/plugin-vue**: Core Vue.js support for Vite
2. **vite-plugin-vue-devtools**: Enhanced development experience with Vue DevTools
3. **vite-plugin-wasm**: Hydra SDK uses WebAssembly for cryptographic operations
4. **vite-plugin-top-level-await**: Enables async/await at the module level
5. **vite-plugin-node-polyfills**: Provides Node.js APIs like `Buffer` and `process` in the browser

### Important Configuration Options

```typescript
nodePolyfills({
  globals: {
    Buffer: true,    // Required for cryptographic operations
    global: true,    // Required for some SDK dependencies
    process: true    // Required for environment detection
  }
})
```

```typescript
optimizeDeps: {
  exclude: ['@hydra-sdk/cardano-wasm']  // Exclude WASM from optimization
}
```

```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))  // Path alias for imports
  }
}
```

## ✨ Demo Features

This example demonstrates:

- ✅ **Wallet Generation**: Create new wallets with mnemonic phrases
- ✅ **Address Display**: Show Bech32 wallet addresses
- ✅ **Network Configuration**: Connect to Cardano PREPROD testnet
- ✅ **Vue 3 Composition API**: Modern Vue.js patterns with `<script setup>`
- ✅ **TypeScript Integration**: Full type safety with Hydra SDK
- ✅ **Reactive State**: Vue reactivity with Hydra SDK objects

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

## 🌐 Network Configuration

This example uses the **PREPROD** testnet for development and testing:

```typescript
networkId: NETWORK_ID.PREPROD
```

For mainnet, change to:
```typescript
networkId: NETWORK_ID.MAINNET
```

## 🎯 Vue-specific Features

### Composition API with `<script setup>`
- Modern Vue 3 syntax for cleaner, more maintainable code
- Better TypeScript integration and type inference

### Reactive State Management
```typescript
const mnemonic = ref(AppWallet.brew())
const wallet = ref(new AppWallet({...}))
const account = ref(wallet.value.getAccount())
```

### Component Architecture
- Modular design with reusable components
- Clean separation of concerns
- Scoped styling for component isolation

## 🐛 Troubleshooting

### Common Issues

1. **WASM Loading Errors**
   - Ensure `vite-plugin-wasm` is installed and configured
   - Check browser WebAssembly support

2. **Buffer/Process Not Defined**
   - Verify `vite-plugin-node-polyfills` configuration
   - Ensure globals are properly set

3. **TypeScript Compilation Errors**
   - Run `pnpm type-check` to identify type issues
   - Ensure all Hydra SDK types are properly imported
   - Check TypeScript configuration in tsconfig files

4. **Module Resolution Errors**
   - Check all Hydra SDK packages are installed
   - Verify Vite configuration is correct
   - Ensure path aliases are properly configured

5. **Build Errors**
   - Ensure `@hydra-sdk/cardano-wasm` is excluded from optimization
   - Check that all required plugins are in devDependencies
   - Verify TypeScript compilation passes

## 🔗 Resources

- [Hydra SDK Documentation](https://sdk.hydrawallet.app/)
- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://typescriptlang.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Cardano Developer Portal](https://developers.cardano.org/)

## 📄 License

This example is released under the Apache 2.0 License.
