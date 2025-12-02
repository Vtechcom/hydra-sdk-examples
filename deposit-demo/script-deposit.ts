import { emptyRedeemer, TxBuilder } from '@hydra-sdk/transaction'
import { HydraApi, wallet, walletAddress } from './config'
import { Converter, Deserializer } from '@hydra-sdk/core'

async function main() {
	// 1. Define script details (from lock-to-contract.ts)
	const contract = {
		cborHex:
			'585e585c01010029800aba2aba1aab9eaab9dab9a4888896600264653001300600198031803800cc0180092225980099b8748008c01cdd500144c8cc892898050009805180580098041baa0028b200c180300098019baa0068a4d13656400401',
		address: 'addr_test1wrf8enqnl26m0q5cfg73lxf4xxtu5x5phcrfjs0lcqp7uagh2hm3k'
	}

	// 2. Query script UTxOs
	const l1UTxOs = await wallet.queryUTxOs(contract.address)
	console.log('Found contract UTxOs:', l1UTxOs.length)

	// 3. Query wallet UTxOs (needed for fees)
	const walletUtxos = await wallet.queryUTxOs(walletAddress)
	console.log('Found wallet UTxOs:', walletUtxos.length)

	// 4. Find the specific UTxO to deposit (change to your locked tx hash)
	const depositTxId = '878e06dab94c40f52ea36069540b55a38be8c03919082e25fcc333531a0fd3b5'
	const depositUTxO = l1UTxOs.find(utxo => utxo.input.txHash === depositTxId)

	if (!depositUTxO) {
		throw new Error('Deposit UTxO not found. Run lock-to-contract.ts first!')
	}

	console.log('Found deposit UTxO:', depositUTxO.input.txHash)

	// 5. Build blueprint transaction with script input
	const txBuilder = new TxBuilder({
		isHydra: true,
		params: { minFeeA: 0, minFeeB: 0 }
	})

	const redeemer = emptyRedeemer()
	const blueprintTx = await txBuilder
		.setInputs(walletUtxos)
		.txIn(depositUTxO.input.txHash, depositUTxO.input.outputIndex, depositUTxO.output.amount, depositUTxO.output.address)
		.txInScript(contract.cborHex, 'V3')
		.txInRedeemerValue(redeemer)
		.addOutput({
			address: walletAddress,
			amount: depositUTxO.output.amount
		})
		.setFee('0')
		.changeAddress(walletAddress)
		.complete()

	console.log('Blueprint TX:', blueprintTx.to_hex())
	console.log('Blueprint TX ID:', Deserializer.deserializeTx(blueprintTx.to_hex()).transaction_hash().to_hex())

	// 6. Request deposit from Hydra node
	try {
		const depositTx = await HydraApi.partialDeposit(
			blueprintTx.to_hex(),
			Converter.convertUTxOToUTxOObject([depositUTxO]),
			walletAddress
		)

		console.log('Script deposit TX ID:', depositTx.txId)

		// 7. Sign and submit
		const signedTx = await wallet.signTx(depositTx.cborHex, true)
		await HydraApi.submitL1({
			cborHex: signedTx,
			description: 'Script deposit',
			type: 'Witnesses Tx ConwayEra'
		})

		console.log('✅ Script UTxO deposited!')
	} catch (error: any) {
		console.error('Error during script deposit:', error.message)
		throw error
	}
}

main().catch(console.error)
