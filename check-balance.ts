import {Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js"
import "dotenv/config"
import {getKeypairFromEnvironment} from "@solana-developers/helpers"

const Keypair = getKeypairFromEnvironment("SECRET_KEY")

const connection = new Connection(clusterApiUrl('devnet'))
const publicKey = new PublicKey(Keypair.publicKey.toBase58())
const balanceInLamports = await connection.getBalance(publicKey)
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
)