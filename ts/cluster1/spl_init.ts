import { Keypair, Connection, Commitment, Transaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createAssociatedTokenAccount, createMint, getOrCreateAssociatedTokenAccount, MintLayout, mintTo, TOKEN_2022_PROGRAM_ID, transfer } from '@solana/spl-token';
import wallet from "../../Turbin3-wallet.json"
import { mintArgs } from "@metaplex-foundation/mpl-token-metadata";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://turbine-solanad-4cde.devnet.rpcpool.com/168dd64f-ce5e-4e19-a836-f6482ad6b396", commitment);
// const mint = new PublicKey("HoT68ZHyFW37XBqn9BnQUM39wSLVuurWNfX1VX7xvZPg");

(async () => {
    try {
        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
        console.log("mint created: ", mint.toBase58());
        const createATAIns = await createAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        const mintToIns = await mintTo(connection, keypair, mint, createATAIns, keypair.publicKey, 100);
        console.log("txn sig: ", mintToIns);
        const destATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, new PublicKey("CFDe5xEYrJGhAQ2DpmCQZUP6wyA7XrMUE1ku7azNSP7v"))
        const transferTxn = await transfer(connection, keypair, createATAIns, destATA.address, keypair.publicKey,1)
        console.log("txn sig for transfer: " ,transferTxn);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
