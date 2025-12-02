import { TxBuilder } from '@hydra-sdk/transaction'
import { wallet, walletAddress } from './config'
import { DatumUtils, Deserializer } from '@hydra-sdk/core'

async function lock() {
	try {
		// Always-true contract (for demo purposes)
		const contract = {
			cborHex:
				'585e585c01010029800aba2aba1aab9eaab9dab9a4888896600264653001300600198031803800cc0180092225980099b8748008c01cdd500144c8cc892898050009805180580098041baa0028b200c180300098019baa0068a4d13656400401',
			address: 'addr_test1wrf8enqnl26m0q5cfg73lxf4xxtu5x5phcrfjs0lcqp7uagh2hm3k'
		}

		const addressUTxO = await wallet.queryUTxOs(walletAddress)
		console.log(`Found ${addressUTxO.length} UTxOs`)

		// Build datum (example for time lock)
		const { paymentCredentialHash: pubKeyHash } = Deserializer.deserializeAddress(walletAddress)
		const system_unlocked_at = String(Date.now() + 10 * 60 * 1000) // now + 10 minutes

		const datum = DatumUtils.mkConstr(0, [DatumUtils.mkBytes(pubKeyHash!), DatumUtils.mkInt(BigInt(system_unlocked_at))])

		// Build transaction to lock funds
		const txBuilder = new TxBuilder()
		const txLock = await txBuilder
			.setInputs(addressUTxO)
			.addOutput({
				address: contract.address,
				amount: [{ unit: 'lovelace', quantity: String(5_000_000) }]
			})
			.txOutInlineDatumValue(datum)
			.changeAddress(walletAddress)
			.complete()

		console.log('Lock TX:', txLock.to_hex())

		// Sign and submit
		const signedCbor = await wallet.signTx(txLock.to_hex())
		console.log('Signed TX:', signedCbor)

		const txHash = await wallet.submitTx(signedCbor)
		console.log('✅ Locked funds to contract:', txHash)
		console.log('Script address:', contract.address)
	} catch (error) {
		console.error('Error creating lock transaction:', error)
	}
}

lock()
