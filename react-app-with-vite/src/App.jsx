import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import hydraSdkLogo from './assets/hydra-sdk.png'
import { AppWallet, NETWORK_ID } from '@hydra-sdk/core'
import './App.css'

function App() {

  // Generate a new mnemonic phrase
  const [mnemonic, setMnemonic] = useState(AppWallet.brew())
  const [account, setAccount] = useState(null)

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
        <button onClick={() => generateNewWallet()}>
          Generate wallet
        </button>
        <p>
          {account ? account.baseAddressBech32 : 'Click generate to create new account'}
        </p>
        <p>
          {account ? mnemonic.join(' ') : 'Click generate to generate mnemonic'}
        </p>
      </div>
    </>
  )
}

export default App
