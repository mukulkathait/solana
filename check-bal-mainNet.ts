import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function validatePublicKey(walletAddress: string): Promise<PublicKey | null>{
    try {
        const publicKey = new PublicKey(walletAddress)
        return publicKey
    } catch (error) {
        console.error("ERROR: Invalid Public Key", error)
        return null
    }
}

async function checkBalance(publicKey: PublicKey): Promise<number>{
    const connection = new Connection(clusterApiUrl("mainnet-beta"))
    try {
        const balanceInLamports = await connection.getBalance(publicKey)
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        return balanceInSOL;
    } catch (error) {
        throw new Error(`ERROR: Error fetching balance for ${publicKey.toString()} : ${error}`);
    }
}

const suppliedPublicKey = process.argv[2];
if(!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!")
}

async function main() {
    const publicKey = await validatePublicKey(suppliedPublicKey);

    if (publicKey) {
        try {
            const balance = await checkBalance(publicKey);
            console.log(
                `Finished! The balance for the wallet at address ${publicKey.toString()} is ${balance.toFixed(2)} SOL!`
            );
        } catch (error) {
            console.error(error.message);
        }
    }
}

main();