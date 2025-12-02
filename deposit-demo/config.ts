import { AppWallet, NETWORK_ID, ProviderUtils, UTxOObject } from '@hydra-sdk/core'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const blockfrostProvider = new ProviderUtils.BlockfrostProvider({
	apiKey: process.env.BLOCKFROST_API_KEY || '',
	network: 'preprod'
})

export const wallet = new AppWallet({
	key: {
		type: 'mnemonic',
		words: 'your mnemonic phrase here'.split(' ')
	},
	networkId: NETWORK_ID.PREPROD,
	fetcher: blockfrostProvider.fetcher,
	submitter: blockfrostProvider.submitter
})

export const walletAddress = wallet.getAccount().baseAddressBech32

export class HydraApi {
	private static client = axios.create({
		baseURL: 'http://localhost:4001',
		headers: { 'Content-Type': 'application/json' }
	})

	static async commit(utxo: UTxOObject) {
		try {
			const response = await this.client.post('/commit', { ...utxo })
			return response.data as {
				cborHex: string
				description: string
				txId: string
				type: 'Tx ConwayEra'
			}
		} catch (error: any) {
			console.error('Error during commit:', error)
			throw error
		}
	}

	static async partialDeposit(blueprintTxCbor: string, utxo: UTxOObject, changeAddress: string) {
		try {
			const response = await this.client.post('/commit', {
				blueprintTx: {
					cborHex: blueprintTxCbor,
					type: 'Tx ConwayEra',
					description: 'Partial deposit'
				},
				utxo,
				changeAddress
			})
			return response.data as {
				cborHex: string
				description: string
				txId: string
				type: 'Tx ConwayEra'
			}
		} catch (error: any) {
			console.error('Error during partial deposit:', error.message)
			throw error
		}
	}

	static async blueprintCommit(blueprintTxCbor: string, utxo: UTxOObject) {
		try {
			console.log('Blueprint commit body:', {
				blueprintTx: {
					cborHex: blueprintTxCbor,
					type: 'Tx ConwayEra',
					description: 'Blueprint commit'
				},
				utxo
			})
			const response = await this.client.post('/commit', {
				blueprintTx: {
					cborHex: blueprintTxCbor,
					type: 'Tx ConwayEra',
					description: 'Blueprint commit'
				},
				utxo
			})
			return response.data as {
				cborHex: string
				description: string
				txId: string
				type: 'Tx ConwayEra'
			}
		} catch (error: any) {
			console.error('Error during blueprint commit:', error.message)
			throw error
		}
	}

	static async submitL1(tx: { cborHex: string; description: string; type: string }) {
		const { data } = await this.client.post('/cardano-transaction', tx)
		return data
	}
}
