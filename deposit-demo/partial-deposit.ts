import { Converter, Deserializer, UTxO } from '@hydra-sdk/core'
import { TxBuilder } from '@hydra-sdk/transaction'
import { HydraApi, wallet, walletAddress } from './config'

async function main() {
	// 1. Query UTxOs
	const l1UTxOs = await wallet.queryUTxOs(walletAddress)

	// 2. Define deposit amount
	const depositLovelace = 12_000_000 // 12 ADA

	// 3. Build blueprint transaction
	const txBuilder = new TxBuilder({
		isHydra: true,
		params: { minFeeA: 0, minFeeB: 0 }
	})

	const blueprintTx = await txBuilder
		.setInputs(l1UTxOs)
		.addOutput({
			address: walletAddress,
			amount: [{ unit: 'lovelace', quantity: String(depositLovelace) }]
		})
		.setFee('0')
		.complete()

	// 4. Extract UTxOs used in blueprint
	const txInputs = Deserializer.deserializeTx(blueprintTx.to_hex()).body().inputs()
	const utxosToUse: UTxO[] = []

	for (let i = 0; i < txInputs.len(); i++) {
		const input = txInputs.get(i)
		const utxo = l1UTxOs.find(
			u => u.input.txHash === input.transaction_id().to_hex() && u.input.outputIndex === input.index()
		)
		if (utxo) utxosToUse.push(utxo)
	}

	// 5. Request deposit with blueprint and change address
	const depositTx = await HydraApi.partialDeposit(
		blueprintTx.to_hex(),
		Converter.convertUTxOToUTxOObject(utxosToUse),
		walletAddress // Change returned here
	)

	console.log('Deposit TX ID:', depositTx.txId)

	// 6. Sign and submit
	const signedTx = await wallet.signTx(depositTx.cborHex, true)
	await HydraApi.submitL1({
		cborHex: signedTx,
		description: 'Partial deposit',
		type: 'Witnesses Tx ConwayEra'
	})

	console.log('✅ Partial deposit complete!')
}

main().catch(console.error)
