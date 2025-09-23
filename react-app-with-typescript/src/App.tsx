import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import hydraSdkLogo from './assets/hydra-sdk.png'
import { AppWallet, deserializeTx, hexToString, NETWORK_ID, stringToHex, type Account, type UTxO } from '@hydra-sdk/core'
import { TxBuilder } from '@hydra-sdk/transaction'
import './App.css'

function App() {
	// Generate a new mnemonic phrase
	const [mnemonic, setMnemonic] = useState(AppWallet.brew())
	const [account, setAccount] = useState<Account | null>(null)

	const generateNewWallet = () => {
		setMnemonic(AppWallet.brew())
		// Create wallet instance
		const wallet = new AppWallet({
			networkId: NETWORK_ID.PREPROD, // Use PREPROD for testing
			key: {
				type: 'mnemonic',
				words: mnemonic
			}
		})
		setAccount(wallet.getAccount())
	}

	const [unsignedTxCbor, setUnsignedTxCbor] = useState('')
	const [txId, setTxId] = useState('')

	const buildTransaction = async () => {
		const txBuilder = new TxBuilder()

		// Build a transaction
		const inputUTxO: UTxO[] = [
			{
				input: {
					txHash: 'd9fe549ad8e7b54fcb95a7864435c6a38d02aebc95501d7f57ec348c98749f6d',
					outputIndex: 0
				},
				output: {
					address: 'addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3',
					amount: [
						{ unit: 'lovelace', quantity: '150000000' },
						{ unit: 'fef67460342d081cb7881318b1f33b87626d1a1042b4c2acbbc0725d7441424f', quantity: '1000000' }
					]
				}
			}
		]
		const tx = await txBuilder
			.setInputs(inputUTxO)
			.addOutput({
				address: 'addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3',
				amount: [{ unit: 'lovelace', quantity: String(5_000_000) }]
			})
			.changeAddress('addr_test1qrsx72hrv8ens90hwkezg7ysyhwvcjmyzdveyf88ppq7a0lwu7gv0wuuf9lhzm7wclvj5ntgcfa53j0rqxmu237x20xsne56q3')
			.metadataValue('1', {
				msg: 'Hello, Hydra!',
				timestamp: new Date().toISOString()
			})
			.complete()

		setUnsignedTxCbor(tx.to_hex())

		const deserializedTx = deserializeTx(tx.to_hex())
		console.log('deserializedTx', deserializedTx.body().to_json())
		const _txId = deserializedTx.transaction_hash().to_hex()
		setTxId(_txId)
		// test Buffer polyfill
		const txIdHex = stringToHex(_txId)
		console.log('>>> / txIdHex:', txIdHex)
		console.log('>>> / txIdStr:', hexToString(txIdHex))
	}

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://sdk.hydrawallet.app" target="_blank">
					<img src={hydraSdkLogo} className="logo hydra-sdk" alt="HydraSDK logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React + Hydra SDK</h1>
			<div className="card">
				<button onClick={() => generateNewWallet()}>Generate wallet</button>
				<p className="text-block">
					<span className="title">Base Address: </span>
					{account ? account.baseAddressBech32 : 'Click generate to create new account'}
				</p>
				<p className="text-block">
					<span className="title">Mnemonic: </span>
					{account ? mnemonic.join(' ') : 'Click generate to generate mnemonic'}
				</p>
			</div>
			<div className="card">
				<button onClick={() => buildTransaction()}>Build transaction</button>
				<p className="text-block">
					<span className="title">Transaction ID: </span>
					{txId ? txId : 'Click build transaction to create new transaction'}
				</p>
				<p className="cbor-tx">{unsignedTxCbor ? unsignedTxCbor : 'Click build transaction to create new transaction'}</p>
			</div>
		</>
	)
}

export default App
