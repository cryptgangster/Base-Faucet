const express = require('express');
const app = express();
const Web3 = require('web3');
const web3 = new Web3('https://base-testnet-url');  // Base testnet URL

app.use(express.json());

app.post('/request-tokens', async (req, res) => {
    const { address } = req.body;

    // Call contract to request tokens
    // Rate limit logic (check timestamps, etc.)
    // Send tokens to the address

    res.send('Tokens sent to ' + address);
});

app.listen(3000, () => console.log('Faucet running on port 3000'));
