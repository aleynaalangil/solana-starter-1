import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("HvBZx48zk3i3jGMuWTHGZ7xxuVqo1ieMcdyZJ2n79N2");

// Recipient address
const to = new PublicKey("8QKrGYdHpK4pQZR1w8B9wPLHo4Zp8A6tQbD5BVRtY7Zm");

(async () => {
    try {
        const createATAIns = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        const destATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, new PublicKey("8QKrGYdHpK4pQZR1w8B9wPLHo4Zp8A6tQbD5BVRtY7Zm"))
                const transferTxn = await transfer(connection, keypair, createATAIns.address, destATA.address, keypair.publicKey,1)
                console.log("txn sig for transfer: " ,transferTxn);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();