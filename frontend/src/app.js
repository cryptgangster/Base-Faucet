import React, { useState } from 'react';
import Web3 from 'web3';

const FaucetApp = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const requestTokens = async () => {
    if (!Web3.utils.isAddress(address)) {
      setMessage("Invalid address");
      return;
    }

    try {
      const response = await fetch('/request-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Base Testnet Faucet</h1>
      <input 
        type="text" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Enter your wallet address" 
      />
      <button onClick={requestTokens}>Request Tokens</button>
      <p>{message}</p>
    </div>
  );
};

export default FaucetApp;
