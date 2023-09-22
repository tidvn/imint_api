const axios = require('axios');
const { Transaction, Keypair } = require('@solana/web3.js');
const { Buffer } = require('buffer');

exports.createTransaction = async (req, res) => {

  try {
    const data = {
      creator_wallet: "9XNHHJDXixJzvwvT4ooFLfq1B1fW1815A1HuhksnGBtN",
      merkle_tree: "BHywfinsxfz2naaaFAKQmFbxLPMPtPxfQ3cfnmEykaoj",
      is_delegate_authority: true,
      collection_address: "",
      max_supply: 0 ,
      primary_sale_happened: true,
      is_mutable: true,
    };

    const {network,metadata_uri,receiver} = req.body;
    
      data.network = network || "devnet";
      data.metadata_uri = metadata_uri || "https://gateway.pinata.cloud/ipfs/QmYmUb5MHZwYovnQg9qANTJUi7R8VaE5CetfssczaSWn5K"
      !receiver ? res.status(500).json({ error: 'not have receiver ' }) : (data.receiver = data.fee_payer = receiver);
    const headers = {
      'accept': 'application/json',
      'x-api-key': '4K7aiItHJ0EvuZqk',
      'Content-Type': 'application/json',
    };
    console.log(`request from ${data.receiver}`)
    const results = await axios.post('https://api.shyft.to/sol/v1/nft/compressed/mint', data, { headers })
    const response = results.data

    const b64encoded = process.env.PRIVATE_KEY
    const Privatekey = new Uint8Array(Buffer.from(b64encoded, 'base64'));
    const encodedTransaction = response.result.encoded_transaction
    const keypair = Keypair.fromSecretKey(Privatekey);
    const transaction = Transaction.from(
      Buffer.from(encodedTransaction, 'base64')
    );
    transaction.partialSign(keypair);

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });

    const transactionBase64 = serializedTransaction.toString("base64");

    res.status(200).json({ encoded_transaction: transactionBase64 });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


