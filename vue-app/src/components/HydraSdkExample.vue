<script lang="ts" setup>
import {
  AppWallet,
  deserializeTx,
  NETWORK_ID,
  SLOT_CONFIG_NETWORK,
  TimeUtils,
  type UTxO,
} from '@hydra-sdk/core'
import { onMounted, ref } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { TxBuilder } from '@hydra-sdk/transaction'

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

onMounted(() => {
  generateNewWallet()
  generateTransaction()
})

const transactionId = ref('')
const txCborHex = ref('')
const txEstimateFee = ref('')
async function generateTransaction() {
  if (!wallet.value) return
  const inputUTxO: UTxO[] = [
    {
      input: {
        txHash: 'd9fe549ad8e7b54fcb95a7864435c6a38d02aebc95501d7f57ec348c98749f6d',
        outputIndex: 0,
      },
      output: {
        address:
          'addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3',
        amount: [
          { unit: 'lovelace', quantity: '150000000' },
          {
            unit: 'fef67460342d081cb7881318b1f33b87626d1a1042b4c2acbbc0725d7441424f',
            quantity: '1000000',
          },
        ],
      },
    },
  ]

  const tx = await new TxBuilder({})
    .setInputs(inputUTxO)
    .addOutput({
      address:
        'addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3',
      amount: [{ unit: 'lovelace', quantity: String(5_000_000) }],
    })
    .changeAddress(
      'addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3',
    )
    .metadataValue('1', {
      msg: 'Hello, Hydra!',
      timestamp: new Date().toISOString(),
    })
    .invalidAfter(
      TimeUtils.unixTimeToEnclosingSlot(
        Date.now() + 2 * 60 * 60 * 1000,
        SLOT_CONFIG_NETWORK.PREPROD,
      ), // 2 hours from now
    )
    .invalidBefore(TimeUtils.unixTimeToEnclosingSlot(Date.now(), SLOT_CONFIG_NETWORK.PREPROD))
    .complete()

  txCborHex.value = tx.to_hex()
  const txDeserialized = deserializeTx(txCborHex.value)
  txEstimateFee.value = txDeserialized.body().fee().to_str()
  transactionId.value = txDeserialized.transaction_hash().to_hex()

  // DEBUG:
  console.log('txCborHex', txCborHex.value)
  console.log('transactionId', transactionId.value)
  console.log('tx fee: ', txEstimateFee.value)
  console.log('tx body: ', txDeserialized.body().to_json())
}
</script>

<template>
  <!-- <div class="hydra-sdk-example">
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
  </div> -->
  <Tabs default-value="account" class="w-[400px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="account"> Account </TabsTrigger>
      <TabsTrigger value="transaction"> Transaction </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription> Hydra SDK Example </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="mnemonic">Mnemonic</Label>
            <Textarea id="mnemonic" :model-value="mnemonic.join(' ')" rows="2" />
          </div>
          <div class="space-y-1">
            <Label for="baseAddressBech32">Base address Bech32</Label>
            <Input id="baseAddressBech32" :model-value="account.baseAddressBech32" />
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="generateNewWallet">Generate</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="transaction">
      <Card>
        <CardHeader>
          <CardTitle>Transaction</CardTitle>
          <CardDescription> Manage your transactions here. </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="txId">Transaction ID</Label>
            <div class="text-xs leading-[14px]">
              <span class="break-words font-mono bg-gray-200 px-2 rounded-xs">
                {{ transactionId }}
              </span>
            </div>
          </div>
          <div class="space-y-1">
            <Label for="new">Unsigned Transaction Cbor Hex</Label>
            <div class="text-xs leading-[14px]">
              <span class="break-words font-mono bg-gray-200 px-2 rounded-xs">{{ txCborHex }}</span>
            </div>
          </div>
          <div class="space-y-1">
            <Label for="new">Estimate Tx Fee</Label>
            <div class="text-xs leading-[14px]">
              <span class="break-words font-mono rounded-xs"> {{ txEstimateFee }} lovelace </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="generateTransaction()">Generate</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<style scoped>
/* .hydra-sdk-example {
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
} */
</style>
