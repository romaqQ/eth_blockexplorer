import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import './App.css';
const { Utils } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Explorer({ blockNumber, setBlockNumber }) {
  const [blockData, setBlockData] = useState("");
  const [transData, setTransData] = useState("");
  const [transaction, setTransaction] = useState("");
 
   async function onSelect(evt){
      const selectedTransaction = evt.target.value;
      setTransaction(selectedTransaction);

      if (selectedTransaction){
        console.log(selectedTransaction);
        console.log(transData);
        console.log(selectedTransaction.toString());
        console.log(transData[selectedTransaction.toString()]);
      }
    }

    useEffect(() => {
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
      }
      async function getBlockStats(blockNumber){
        setBlockData(await alchemy.core.getBlockWithTransactions(blockNumber)); 
      }
 
    if (blockNumber === undefined) {
      getBlockNumber();
      getBlockStats(blockNumber);
      } else {
      console.log(blockNumber);
      console.log(blockData);
    if (blockData !== undefined) {
      if (blockData.transactions !== undefined){
        setTransData(blockData.transactions.reduce((obj, curr) => (
          {...obj, [curr.hash]: curr}), {})); 
      }
    } 
      }}, 
      [blockNumber, setBlockNumber, blockData]);
    
    return (
      <form className="container block">
        <h1>Block Explorer</h1>
          <button onClick={() => undefined}>
            Get Latest Block Data
          </button>
          <h2>Block Contents</h2>
          
          {
            Object.keys(blockData).length !== 0 ?
            <div className="css-fix">
              Blocknumber: {blockNumber} {"\n"}
              Number of Transactions: {blockData.transactions.length} {"\n"}
              Value of Transactions: {blockData.transactions.map((u) => parseFloat(Utils.formatEther(u.value))).reduce(
                (a,b) => a + b, 0).toFixed(2)
              } Ether {"\n"}
              Gas Limit: {blockData.gasLimit.toString()} {"\n"}
              Gas Used: {blockData.gasUsed.toString()}
            </div>
            :
            <div>
              Fetching Data
            </div>
          }
            
          <h2> Transactions </h2>
            <select onChange={onSelect} value={transaction}>
              <option value=""> Choose a transaction</option>
              { Object.keys(blockData).length !== 0 ?
                blockData.transactions.map((u,i) => (
                  <option key={i} value={u.hash}>
                    {i} - {u.hash.slice(0,10)}...
                  </option>
                )) : ""
              }
            </select>
            <h2> Transactions Data </h2>
            {
              transaction ?
              <div className="css-fix">
                Transaction Hash: {transaction} {"\n"}
                From: {transData[transaction].from} {"\n"}
                To: {transData[transaction].to} {"\n"}
                Value: {Utils.formatEther(transData[transaction].value)} {"\n"}
              </div>
              :
              <div>
                Select Transaction Hash
              </div>
            } 
             
      </form>
    );
}
export default Explorer;