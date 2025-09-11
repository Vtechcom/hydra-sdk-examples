# React + Vite + Hydra SDK Example

This example demonstrates how to integrate Hydra SDK into a React application using Vite build tool.

## 🚀 Quick Start

### Option 1: Use This Example

1. **Navigate to this directory:**
   ```bash
   cd react-app-with-vite
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

Follow these steps to create a new React + Vite project with Hydra SDK from scratch:

#### 1. Create a new Vite project

```bash
npm create vite@latest my-app -- --template react
cd ./my-app
```

#### 2. Install Hydra SDK packages

```bash
pnpm add @hydra-sdk/core @hydra-sdk/transaction @hydra-sdk/bridge
```

#### 3. Install required Vite plugins (as dev dependencies)

```bash
pnpm add vite-plugin-wasm vite-plugin-top-level-await vite-plugin-node-polyfills -D
```

#### 4. Configure Vite

Update your `vite.config.js` file:

```javascript
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

#### 5. Update your React component

Replace the content of `src/App.jsx` with:

```jsx
import { useState } from 'react'
import { AppWallet, NETWORK_ID } from '@hydra-sdk/core'
import './App.css'

function App() {
  // Generate a new mnemonic phrase
  const [mnemonic, setMnemonic] = useState(AppWallet.brew())
  const [account, setAccount] = useState(null)

  const generateNewWallet = () => {
    const newMnemonic = AppWallet.brew()
    setMnemonic(newMnemonic)
    
    // Create wallet instance
    const wallet = new AppWallet({
      networkId: NETWORK_ID.PREPROD, // Use PREPROD for testing
      key: {
        type: 'mnemonic',
        words: newMnemonic
      }
    })
    setAccount(wallet.getAccount())
  }

  return (
    <div className="App">
      <h1>React + Vite + Hydra SDK</h1>
      <div className="card">
        <button onClick={generateNewWallet}>
          Generate New Wallet
        </button>
        <div className="wallet-info">
          <h3>Wallet Address:</h3>
          <p className="address">
            {account ? account.baseAddressBech32 : 'Click generate to create new account'}
          </p>
          <h3>Mnemonic Phrase:</h3>
          <p className="mnemonic">
            {account ? mnemonic.join(' ') : 'Click generate to generate mnemonic'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
```

#### 6. Run your application

```bash
pnpm dev
```

## 📦 Dependencies

### Hydra SDK Packages

- **@hydra-sdk/core** - Core functionality for wallet and transactions
- **@hydra-sdk/bridge** - Bridge for blockchain interaction  
- **@hydra-sdk/transaction** - Utilities for transaction handling

### Vite Plugins (Dev Dependencies)

- **vite-plugin-wasm** - WebAssembly support for Hydra SDK
- **vite-plugin-top-level-await** - Top-level await support
- **vite-plugin-node-polyfills** - Node.js polyfills for browser compatibility

## 🔧 Configuration Details

### Why These Plugins Are Needed

1. **vite-plugin-wasm**: Hydra SDK uses WebAssembly for cryptographic operations
2. **vite-plugin-top-level-await**: Enables async/await at the module level
3. **vite-plugin-node-polyfills**: Provides Node.js APIs like `Buffer` and `process` in the browser

### Important Configuration Options

```javascript
nodePolyfills({
  globals: {
    Buffer: true,    // Required for cryptographic operations
    global: true,    // Required for some SDK dependencies
    process: true    // Required for environment detection
  }
})
```

```javascript
optimizeDeps: {
  exclude: ['@hydra-sdk/cardano-wasm']  // Exclude WASM from optimization
}
```

```javascript
define: {
  global: 'globalThis'  // Define global for browser compatibility
}
```

## ✨ Demo Features

This example demonstrates:

- ✅ **Wallet Generation**: Create new wallets with mnemonic phrases
- ✅ **Address Display**: Show Bech32 wallet addresses
- ✅ **Network Configuration**: Connect to Cardano PREPROD testnet
- ✅ **State Management**: React state management with Hydra SDK

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🌐 Network Configuration

This example uses the **PREPROD** testnet for development and testing:

```javascript
networkId: NETWORK_ID.PREPROD
```

For mainnet, change to:
```javascript
networkId: NETWORK_ID.MAINNET
```

## 🐛 Troubleshooting

### Common Issues

1. **WASM Loading Errors**
   - Ensure `vite-plugin-wasm` is installed and configured
   - Check browser WebAssembly support

2. **Buffer/Process Not Defined**
   - Verify `vite-plugin-node-polyfills` configuration
   - Ensure globals are properly set

3. **Module Resolution Errors**
   - Check all Hydra SDK packages are installed
   - Verify Vite configuration is correct

4. **Build Errors**
   - Ensure `@hydra-sdk/cardano-wasm` is excluded from optimization
   - Check that all required plugins are in devDependencies

## 🔗 Resources

- [Hydra SDK Documentation](https://hydra-sdk.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Cardano Developer Portal](https://developers.cardano.org/)

## 📄 License

This example is released under the MIT License.
