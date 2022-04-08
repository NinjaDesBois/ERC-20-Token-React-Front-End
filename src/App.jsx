import { useState,useEffect } from 'react';
import {ethers} from 'ethers';
import './App.css';
import Token from './artifacts/contracts/Token.sol/Token.json'

const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {

  const [balance , SetBalance] = useState();
  
  useEffect(() => {
   getBalance();
  } , [])

  async function getBalance() {
    if(typeof window.ethereum !== "undefined");
    const accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
    const providers = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress , Token.abi , providers);
    const balance = await contract.balanceOf(accounts[0]);
    SetBalance(balance.toString());
  }

  return (
    <div className="App">
       <h1>You have {balance/10**18} NZX</h1>
    </div>
  );
}

export default App;
