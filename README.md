# Hydra SDK Examples

A collection of examples demonstrating how to use Hydra SDK in popular JavaScript frameworks.

## 📁 Directory Structure

```
hydra-sdk-examples/
├── README.md                    # Main documentation
├── react-app-with-vite/        # React with Vite example
│   ├── package.json            # Dependencies configuration
│   ├── vite.config.js          # Vite configuration
│   ├── src/
│   │   ├── App.jsx             # Main component demonstrating Hydra SDK
│   │   ├── main.jsx            # Entry point
│   │   └── assets/             # Static assets
│   └── public/                 # Public files
└── vue-app/                    # Vue.js with TypeScript example
    ├── package.json            # Dependencies configuration
    ├── vite.config.ts          # Vite configuration with TypeScript
    ├── src/
    │   ├── App.vue             # Main Vue application
    │   ├── main.ts             # Entry point
    │   ├── components/         # Vue components
    │   │   └── HydraSdkExample.vue  # Hydra SDK demo component
    │   └── views/              # Vue views
    └── public/                 # Public files
```

## 🚀 Running the Examples

### React App with Vite

This example demonstrates how to integrate Hydra SDK into a React application using Vite.

#### System Requirements
- Node.js >= 16.0.0
- pnpm (recommended) or npm/yarn

#### Setup Steps

1. **Navigate to the example directory:**
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
   - The application will display the Hydra SDK demo interface

#### Demo Features

- ✅ **Create new wallet:** Generate mnemonic phrase and create account
- ✅ **Display wallet address:** Show base address in Bech32 format
- ✅ **Display mnemonic:** Show 24 recovery words

#### Additional Commands

```bash
# Build for production
pnpm build

# Preview build
pnpm preview

# Lint code
pnpm lint
```

### Vue App with TypeScript

This example demonstrates how to integrate Hydra SDK into a Vue.js application with TypeScript support using Vite.

#### System Requirements
- Node.js >= 20.19.0 or >= 22.12.0
- pnpm (recommended) or npm/yarn

#### Setup Steps

1. **Navigate to the example directory:**
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
   - The application will display the Hydra SDK demo interface

#### Demo Features

- ✅ **Create new wallet:** Generate mnemonic phrase and create account
- ✅ **Display wallet address:** Show base address in Bech32 format
- ✅ **Display mnemonic:** Show recovery words with proper formatting
- ✅ **TypeScript support:** Full type safety with Hydra SDK

#### Additional Commands

```bash
# Build for production
pnpm build

# Preview build
pnpm preview

# Type check
pnpm type-check

# Format code
pnpm format
```

#### Vue-specific Features

- **Composition API:** Uses Vue 3 Composition API with `<script setup>`
- **Reactive state:** Mnemonic and wallet state managed with Vue reactivity
- **Component architecture:** Modular component structure with HydraSdkExample component
- **TypeScript integration:** Full TypeScript support throughout the application

## 📦 Hydra SDK Packages Used

The examples use the following main packages:

- **@hydra-sdk/core** (v1.0.7): Core functionality for wallet and transactions
- **@hydra-sdk/bridge** (v1.0.9): Bridge for blockchain interaction
- **@hydra-sdk/transaction** (v1.0.10): Utilities for transaction handling

## 🔧 Important Configuration

### Vite Configuration

Both React and Vue examples use similar Vite configurations with necessary plugins:

- **vite-plugin-node-polyfills**: Polyfills for Node.js modules
- **vite-plugin-wasm**: WebAssembly support
- **vite-plugin-top-level-await**: Top-level await support

The Vue example additionally includes:
- **@vitejs/plugin-vue**: Vue.js support for Vite
- **vite-plugin-vue-devtools**: Vue DevTools integration

### Network Configuration

Both examples use the PREPROD network for testing:

**React example:**
```javascript
const wallet = new AppWallet({
  networkId: NETWORK_ID.PREPROD, // Test network
  key: {
    type: 'mnemonic',
    words: mnemonic
  }
})
```

**Vue example:**
```typescript
const wallet = ref(
  new AppWallet({
    networkId: NETWORK_ID.PREPROD,
    key: {
      type: 'mnemonic',
      words: mnemonic.value,
    },
  }),
)
```

## 🛠️ Troubleshooting

### Common Issues

1. **Module resolution errors:**
   - Ensure all dependencies are properly installed
   - Check polyfills configuration in vite.config.js

2. **WASM loading issues:**
   - Verify vite-plugin-wasm is configured correctly
   - Check if browser supports WebAssembly

3. **Network connection issues:**
   - Ensure stable internet connection
   - Check network ID configuration

4. **TypeScript compilation errors (Vue example):**
   - Run `pnpm type-check` to identify type issues
   - Ensure all Hydra SDK types are properly imported
   - Check TypeScript configuration in tsconfig files

## 📚 Documentation References

- [Hydra SDK Documentation](https://sdk.hydrawallet.app/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vue.js Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://typescriptlang.org/)

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

## 📄 License

This project is released under the MIT License.
