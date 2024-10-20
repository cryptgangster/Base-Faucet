const express = require('express');
const Web3 = require('web3');
const app = express();
const faucetContractABI = require('./faucetABI.json'); // ABI of the contract
const faucetContractAddress = 'YOUR_FAUCET_CONTRACT_ADDRESS'; // Address of the deployed contract

// Base testnet provider
const web3 = new Web3('https://base-testnet-url');  // Replace with the Base testnet RPC URL
const faucetContract = new web3.eth.Contract(faucetContractABI, faucetContractAddress);

// Middleware to parse JSON
app.use(express.json());

// Endpoint to request tokens
app.post('/request-tokens', async (req, res) => {
  const { address } = req.body;

  // Validate the address
  if (!web3.utils.isAddress(address)) {
    return res.status(400).send('Invalid address');
  }

  try {
    // Call the contract to send tokens
    const tx = await faucetContract.methods.requestTokens().send({
      from: 'YOUR_FAUCET_OWNER_ADDRESS',  // Replace with the address that holds tokens
      to: address,
      gas: 2000000
    });

    res.send('Tokens successfully sent to ' + address);
  } catch (error) {
    console.error('Error sending tokens:', error);
    res.status(500).send('Failed to send tokens: ' + error.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
