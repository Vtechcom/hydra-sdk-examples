# React + TypeScript + Hydra SDK (Vite) Example

This example demonstrates how to integrate Hydra SDK into a React application using TypeScript with Vite.

## 🚀 Quick Start

### Option 1: Use This Example

1. Navigate to this directory:
   ```bash
   cd react-app-with-typescript
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open your browser:
   - Visit: `http://localhost:5173`

### Option 2: Create From Scratch

Follow these steps to create a new React + TypeScript + Vite project and integrate Hydra SDK:

#### 1. Create a Vite + React + TS project

```bash
npm create vite@latest my-app -- --template react-ts
cd ./my-app
```

#### 2. Install Hydra SDK packages

```bash
pnpm add @hydra-sdk/core @hydra-sdk/cardano-wasm @hydra-sdk/transaction @hydra-sdk/bridge
# or
npm i @hydra-sdk/core @hydra-sdk/cardano-wasm @hydra-sdk/transaction @hydra-sdk/bridge
```

#### 3. Install Vite plugins (devDependencies)

```bash
pnpm add -D vite-plugin-wasm vite-plugin-top-level-await vite-plugin-node-polyfills
# recommended (Node types for Buffer/process)
pnpm add -D @types/node
```

#### 4. Configure Vite

Create/update `vite.config.ts`:

```ts
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
      globals: {
        Buffer: true,
        global: true,
        process: true
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
```

Optional (recommended) tsconfig for Vite/Node types:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
```

#### 5. Update React component (TypeScript)

Replace `src/App.tsx` with:

```tsx
import { useState } from 'react'
import { AppWallet, NETWORK_ID } from '@hydra-sdk/core'
import './App.css'

type Account = {
  baseAddressBech32: string
}

function App() {
  // Generate a new mnemonic
  const [mnemonic, setMnemonic] = useState<string[]>(AppWallet.brew())
  const [account, setAccount] = useState<Account | null>(null)

  const generateNewWallet = () => {
    const newMnemonic = AppWallet.brew()
    setMnemonic(newMnemonic)

    // Create wallet instance
    const wallet = new AppWallet({
      networkId: NETWORK_ID.PREPROD, // PREPROD for testing
      key: {
        type: 'mnemonic',
        words: newMnemonic
      }
    })

    // getAccount provides baseAddressBech32
    setAccount(wallet.getAccount() as Account)
  }

  return (
    <div className="App">
      <h1>React + TypeScript + Hydra SDK</h1>
      <div className="card">
        <button onClick={generateNewWallet}>
          Generate New Wallet
        </button>
        <div className="wallet-info">
          <h3>Wallet Address:</h3>
          <p className="address">
            {account ? account.baseAddressBech32 : 'Click Generate to create a new account'}
          </p>
          <h3>Mnemonic Phrase:</h3>
          <p className="mnemonic">
            {mnemonic.join(' ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
```

#### 6. Run the application

```bash
pnpm dev
```

## 📦 Dependencies

### Hydra SDK

- @hydra-sdk/core — Core wallet/transaction functionality
- @hydra-sdk/bridge — Blockchain interaction bridge
- @hydra-sdk/transaction — Transaction utilities

### Vite Plugins (Dev)

- vite-plugin-wasm — WebAssembly support for Hydra SDK
- vite-plugin-top-level-await — Top-level await support
- vite-plugin-node-polyfills — Node.js API polyfills in the browser

## 🔧 Configuration Details

### Why These Plugins

1. vite-plugin-wasm: Hydra SDK uses WASM for cryptographic operations
2. vite-plugin-top-level-await: Enables await at the module level
3. vite-plugin-node-polyfills: Provides Buffer, process, global in the browser

### Important Options

```ts
nodePolyfills({
  globals: {
    Buffer: true,    // Required for crypto operations
    global: true,    // Required by some dependencies
    process: true    // Required for env detection
  }
})
```

```ts
optimizeDeps: {
  exclude: ['@hydra-sdk/cardano-wasm']  // Exclude WASM from optimization
}
```

```ts
define: {
  global: 'globalThis'  // Define global for browser compatibility
}
```

TypeScript (recommended):

```json
{
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
```

## ✨ Demo Features

- ✅ Create new wallet with mnemonic
- ✅ Display Bech32 address
- ✅ PREPROD network configuration (testnet)
- ✅ State management with React + TypeScript

## 🛠️ Scripts

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build
- `pnpm lint` — Run ESLint (if configured)

## 🌐 Network Configuration

Use PREPROD for development/testing:

```ts
networkId: NETWORK_ID.PREPROD
```

Switch to mainnet:

```ts
networkId: NETWORK_ID.MAINNET
```

## 🐛 Troubleshooting

1. WASM loading errors
   - Ensure vite-plugin-wasm is installed and configured
   - Check browser WebAssembly support

2. Buffer/process not defined
   - Verify vite-plugin-node-polyfills configuration
   - Add `@types/node` and update `tsconfig.json` if needed

3. Module resolution errors
   - Check all Hydra SDK packages are installed
   - Verify Vite configuration

4. Build errors
   - Ensure `@hydra-sdk/cardano-wasm` is excluded from optimizeDeps
   - Check that plugins are in devDependencies

## 🔗 Resources

- Hydra SDK: https://sdk.hydrawallet.app/
- Vite: https://vitejs.dev/
- React: https://react.dev/
- Cardano Developer Portal: https://developers.cardano.org/

## 📄 License

This example is released under the MIT License.
