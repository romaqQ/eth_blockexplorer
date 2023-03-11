import { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import './App.css';
const { Utils } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Wallet({ account, setAccount}) {
  const [accountBalance, setAccountBalance] = useState(0);
  const [ownedNfts, setOwnedNfts] = useState("");
  const [accountNonce, setAccountNonce] = useState(0);

  async function onChange(evt){
    const selectedAccount = evt.target.value;

    setAccount(selectedAccount);
    if (selectedAccount){
      setAccountBalance(Utils.formatEther(await alchemy.core.getBalance(selectedAccount, "latest")));
      setAccountNonce(await alchemy.core.getTransactionCount(selectedAccount, "latest"));
      setOwnedNfts(await alchemy.nft.getNftsForOwner(selectedAccount));

      console.log("Account: ", account);
      console.log("Account Balance in Eth: ", accountBalance);
      console.log("Account Nonce: ", accountNonce);
      console.log("Nfts Owned: ", ownedNfts);
      }
    }
 
    return (
      <form className="container account">
        <h1>Account Explorer</h1>
        <label className='css-fix'>
          Input your account in "0x..." format {"\n"}
          <input
            placeholder="Type an address, for example: 0x..."
            value={account}
            onChange={onChange}></input>
        </label>
          {
             accountBalance ?
            <h3> Account Stats
            <div className="css-fix">
              Account: {account} {"\n"}
              Balance: {accountBalance} Ether {"\n"}
              Nonce: {accountNonce} {"\n"}
              Owned Nfts: { 
                Object.keys(ownedNfts).length !== 0 ?
                  ownedNfts.totalCount :
                  "0"
              } {"\n"}
            </div>
            </h3>
            :
            <div>
              Fetching Data
            </div>
          }             
      </form>
    );
}
export default Wallet;