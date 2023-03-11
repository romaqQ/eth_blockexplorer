import { useEffect, useState } from 'react';
import Explorer from "./Explorer";
import Wallet from "./Wallet";
import './App.css';

// Refer to the README doc for more information about using API

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [account, setAccount] = useState("");
  
  return (
    <div className="App">
      <Explorer
        blockNumber={blockNumber}
        setBlockNumber={setBlockNumber}
      />
      <Wallet
        account={account}
        setAccount={setAccount}
      />
    </div>
  
  );
}

export default App;
