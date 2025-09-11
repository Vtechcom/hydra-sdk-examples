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
