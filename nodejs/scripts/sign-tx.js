import { AppWallet, NETWORK_ID } from '@hydra-sdk/core'
;(async function signTx() {
	const wallet = new AppWallet({
		key: {
			type: 'mnemonic',
			words: '<your mnemonic phrase>'.split(' ')
		},
		networkId: NETWORK_ID.PREPROD
	})

	const cborHex = process.argv[2]
	if (!cborHex) {
		console.error('Please provide a transaction CBOR hex string as a command line argument.')
		process.exit(1)
	}
	const partialSign = process.argv[3] === 'true'

	const signedTx = await wallet.signTx(cborHex, partialSign)
	console.log('Signed Transaction CBOR Hex:')
	console.log(signedTx)
})()
// Usage: node scripts/sign-tx.js <cborHex> [partialSign]
// Example: node scripts/sign-tx.js 83a40081825820... false
// Example for partial sign: node scripts/sign-tx.js 83a40081825820... true
// Note: Replace '83a40081825820...' with your actual transaction CBOR hex string.
