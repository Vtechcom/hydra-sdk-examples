# Hydra SDK Examples

A collection of examples demonstrating how to use Hydra SDK in popular JavaScript frameworks.

## 📁 Directory Structure

```
hydra-sdk-examples/
├── README.md                          # Main documentation
├── react-app-with-vite/               # React with Vite (JavaScript) example
│   ├── package.json                   # Dependencies configuration
│   ├── vite.config.js                 # Vite configuration
│   ├── src/
│   │   ├── App.jsx                    # Main component demonstrating Hydra SDK
│   │   ├── main.jsx                   # Entry point
│   │   └── assets/                    # Static assets
│   └── public/                        # Public files
├── react-app-with-typescript/         # React with Vite (TypeScript) example
│   ├── package.json                   # Dependencies configuration
│   ├── vite.config.ts                 # Vite configuration (TS)
│   ├── src/
│   │   ├── App.tsx                    # Main component demonstrating Hydra SDK
│   │   ├── main.tsx                   # Entry point
│   │   └── assets/                    # Static assets
│   └── public/                        # Public files
└── vue-app/                           # Vue.js with TypeScript example
    ├── package.json                   # Dependencies configuration
    ├── vite.config.ts                 # Vite configuration with TypeScript
    ├── src/
    │   ├── App.vue                    # Main Vue application
    │   ├── main.ts                    # Entry point
    │   ├── components/                # Vue components
    │   │   └── HydraSdkExample.vue    # Hydra SDK demo component
    │   └── views/                     # Vue views
    └── public/                        # Public files
```

## 🚀 Running the Examples

### React App with Vite (JavaScript)

This example demonstrates how to integrate Hydra SDK into a React application using Vite.
   - Folder: `react-app-with-vite`
   - README: ./react-app-with-vite/README.md
   - [Readmore](./react-app-with-vite/README.md)

### React App with TypeScript (Vite)

This example demonstrates how to integrate Hydra SDK into a React + TypeScript application using Vite.
   - Folder: `react-app-with-typescript`
   - README: ./react-app-with-typescript/README.md
   - [Readmore](./react-app-with-typescript/README.md)

### Vue App with TypeScript

This example demonstrates how to integrate Hydra SDK into a Vue.js application with TypeScript support using Vite.
   - Folder: `vue-app`
   - README: ./vue-app/README.md
   - [Readmore](./vue-app/README.md)

## 📦 Hydra SDK Packages Used

The examples use the following main packages:

- @hydra-sdk/core (v1.0.11): Core functionality for wallet and transactions
- @hydra-sdk/bridge (v1.0.11): Bridge for blockchain interaction
- @hydra-sdk/transaction (v1.0.11): Utilities for transaction handling

## 🔧 Important Configuration

### Vite Configuration

All examples use similar Vite configurations with necessary plugins:

- vite-plugin-node-polyfills: Polyfills for Node.js modules (Buffer, process)
- vite-plugin-wasm: WebAssembly support
- vite-plugin-top-level-await: Top-level await support

React (TypeScript) and Vue use vite.config.ts; React (JavaScript) uses vite.config.js.

### Network Configuration

All examples use the PREPROD network for testing:

```javascript
const wallet = new AppWallet({
  networkId: NETWORK_ID.PREPROD, // Test network
  key: {
    type: 'mnemonic',
    words: mnemonic
  }
})
```

## 🛠️ Troubleshooting

### Common Issues

1. Module resolution errors
   - Ensure all dependencies are installed
   - Check polyfills configuration in Vite config

2. WASM loading issues
   - Verify vite-plugin-wasm is configured correctly
   - Check if browser supports WebAssembly

3. Network connection issues
   - Ensure stable internet connection
   - Check network ID configuration

4. TypeScript compilation errors (TS examples)
   - Run your type-check script if available (e.g., `pnpm type-check`)
   - Ensure Hydra SDK types are properly imported
   - Check tsconfig settings

## 📚 Documentation References

- Hydra SDK Documentation: https://sdk.hydrawallet.app/
- Vite Documentation: https://vitejs.dev/
- React Documentation: https://react.dev/
- Vue.js Documentation: https://vuejs.org/
- TypeScript Documentation: https://typescriptlang.org/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

## 📄 License

This project is released under the Apache 2.0 License.
