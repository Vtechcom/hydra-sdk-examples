# Hydra SDK – Node.js Example

Also available in Vietnamese: [README_VI.md](./README_VI.md)

A minimal example of using Hydra SDK in a Node.js (ESM) environment, including sample scripts to verify the runtime and sign transactions.

## Requirements

- Node.js >= 18.x (20.x recommended)
- pnpm or npm
- ES Modules enabled ("type": "module" in package.json is already configured)

### Install Node.js >= 18 (Windows)

- Recommended: use nvm-windows
  1. Download installer from https://github.com/coreybutler/nvm-windows/releases
  2. After installation, open PowerShell and run:
     - `nvm install 20` (or any >= 18)
     - `nvm use 20`
  3. Verify: `node -v` (should be >= 18)

- Or download from https://nodejs.org (choose LTS >= 18)

## Install dependencies

From the `hydra-sdk-examples/nodejs` folder:

```powershell
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

Main packages:
- `@hydra-sdk/core`
- `@hydra-sdk/transaction`
- `@hydra-sdk/cardano-wasm` (auto-detects Node.js build)

## Folder structure

```
nodejs/
  package.json
  README.md
  README_EN.md
  README_VI.md
  scripts/
    environment-test.js   # Check environment & build/sign a sample tx
    sign-tx.js            # Sign a CBOR hex transaction via CLI
```

## Available scripts

### 1) Environment check + build/sign tx (environment-test.js)

This script demonstrates:
- Detecting Node.js environment
- Generating a mnemonic and initializing `AppWallet` (PREPROD)
- Building a sample transaction with `TxBuilder`
- Getting the tx id, then signing the transaction

Run:

```powershell
node .\scripts\environment-test.js
```

Expected output (short):
- Environment info (Node version, platform, cwd, ...)
- Generated mnemonic
- Account address
- Constructed txId
- Signed transaction CBOR hex

Notes:
- The input UTxO in the example is mock data; it only demonstrates the pipeline Builder → Tx → Sign.
- For real usage, replace it with your wallet's UTxOs.

### 2) Sign a transaction from CBOR hex (sign-tx.js)

This script takes a transaction CBOR hex as an argument and signs it using the configured mnemonic.

Edit `scripts/sign-tx.js` to set your mnemonic:

```js
const wallet = new AppWallet({
  key: { type: 'mnemonic', words: '<your mnemonic phrase>'.split(' ') },
  networkId: NETWORK_ID.PREPROD
})
```

Run signing:

```powershell
# Full signing
node .\scripts\sign-tx.js <CBOR_HEX> false

# Partial signing
node .\scripts\sign-tx.js <CBOR_HEX> true
```

Example:

```powershell
node .\scripts\sign-tx.js 83a40081825820... false
```

Output: Prints the signed transaction CBOR hex.

## Troubleshooting

- WASM or module import errors: ensure Node >= 18 and `type: module` in package.json.
- Missing dependencies: run `pnpm install` or `npm install` in this folder.
- Signing failures: check your mnemonic, networkId (PREPROD/Mainnet), and CBOR hex validity.
- Testing with real fees/UTxOs: fund a PREPROD wallet and use actual UTxOs when building txs.

## License

This example is released under the Apache 2.0 License.
