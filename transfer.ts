/* reference:  https://www.soldev.app/course/intro-to-writing-data */

import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js"
import "dotenv/config"
import {getKeypairFromEnvironment} from "@solana-developers/helpers"

// const suppliedToPubkey = process.argv[2] || null;
const suppliedToPubkey = process.env.DEMO_PUBLIC_KEY

console.log(suppliedToPubkey)

if(!suppliedToPubkey) {
    console.log("Please provide a public key to sent to")
    process.exit(1)
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY")

console.log(`suppliedToPubkey: ${suppliedToPubkey}`)

const toPubkey = new PublicKey(suppliedToPubkey)

const connection = new Connection("https://api.devnet.solana.com", "confirmed")

// await airdropIfRequired(
//     connection,
//     keypair.publicKey,
//     1 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL,
//   );

console.log(`Loaded our own keypair, the destination public key, and connected to Solana`)

const transaction = new Transaction()
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
})

transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(
    connection,
    transaction, 
    [senderKeypair,]
)

console.log(`Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`)
console.log(`Transaction signature is ${signature}`)

/* Transaction Signature : 
    4wXW9csqMsHbkzhhQD7tmNKgj7uhiv3y2MouFMBCTQLW2Wn2R7t52UbmsQhnsHcYb9vv6cLLMxYzxfK2wNer1pzG */