import { Converter } from '@hydra-sdk/core'
import { HydraBridge } from '@hydra-sdk/bridge'
import { HydraApi, wallet, walletAddress } from './config'

async function main() {
	// 1. Query UTxOs
	const utxos = await wallet.queryUTxOs(walletAddress)
	console.log('Found UTxOs:', utxos.length)

	// 2. Select first UTxO to deposit
	const utxoToDeposit = Converter.convertUTxOToUTxOObject([utxos[0]])

	// 3. Request deposit from Hydra node
	const depositTx = await HydraApi.commit(utxoToDeposit)
	console.log('Deposit TX ID:', depositTx.txId)

	// 4. Sign the transaction (Partial sign)
	const signedTx = await wallet.signTx(depositTx.cborHex, true)

	// 5. Submit to Cardano
	await HydraApi.submitL1({
		cborHex: signedTx,
		description: 'Simple deposit',
		type: 'Witnesses Tx ConwayEra'
	})

	console.log('✅ Deposit submitted!')
}

main().catch(console.error)
