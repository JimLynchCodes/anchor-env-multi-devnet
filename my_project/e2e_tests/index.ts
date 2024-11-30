import { Connection, PublicKey, LAMPORTS_PER_SOL, TransactionInstruction, Transaction } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
// import * as sb from "@switchboard-xyz/on-demand";

async function main() {


    const { Connection, Keypair, PublicKey, Transaction, SystemProgram } = require('@solana/web3.js');

    // Replace with your Solana program ID
    const PROGRAM_ID = new PublicKey('G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb');
    const PROGRAM_KEYPAIR = '../target/deploy/staging-keypair.json';

    // Connection to a Solana cluster (e.g., devnet)
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Load the payer keypair (update the path if necessary)
    const payer = Keypair.fromSecretKey(
        Uint8Array.from(require(PROGRAM_KEYPAIR)) // Path to your keypair JSON
    );

    // Instruction to call "initialize" on the program
    async function initialize() {
        console.log('Initializing...');

        // Create a transaction instruction
        const instruction = new Transaction().add({
            keys: [], // Add required keys based on your program's "initialize" definition
            programId: PROGRAM_ID,
            data: Buffer.alloc(0), // Empty buffer; update if "initialize" requires input
        });

        // Sign and send the transaction
        const signature = await connection.sendTransaction(instruction, [payer]);
        console.log('Transaction signature:', signature);

        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');
        console.log('Initialization complete.');
    }

    initialize().catch(console.error);



    // Convert string to PublicKey
    // const programId = new PublicKey("G8wijYorkKGjFkwNQ8zoUdWR67NoZ3Jwc3t4Q2dFJREb");

    // const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // for devnet

    // // const { keypair, program1 } = await sb.AnchorUtils.loadEnv();

    // const myProgramPath = "/Users/jim/.single_die_program_keypair.json";
    // const myProgramKeypair = await anchor.initKeypairFromFile(myProgramPath);
    // const pid = myProgramKeypair.publicKey;
    // const idl = (await anchor.Program.fetchIdl(pid, program1?.provider))!;
    // const program = new anchor.Program(idl, program1?.provider);

    // console.log("program: ", program); 

    // 
    //   const myProgram = await myAnchorProgram(provider, myProgramPath);
    //   console.log("My program", myProgram.programId.toString());
    //   return myProgram;

    // const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed"); // for mainnet
    // const connection = new Connection("http://localhost:8899", "confirmed"); // for localnet

    // const [escrowPDA] = PublicKey.findProgramAddressSync(
    //     [Buffer.from("stateEscrow")],
    //     programId
    // );

    // async function getEscrowBalance() {
    // const balance = await connection.getBalance(escrowPDA);
    // console.log("Escrow Address:", escrowPDA.toString());
    // console.log("Escrow Balance:", balance / LAMPORTS_PER_SOL, "SOL");
    // }

    // getEscrowBalance();

    // async function initialize() {
    //     console.log("Escrow PDA:", escrowPDA.toString());

    //     // Construct the instruction to call "initialize"
    // const initializeInstruction = new TransactionInstruction({
    //     keys: [
    //         {
    //             pubkey: payer.publicKey, // The payer's public key
    //             isSigner: true,         // Signer is required
    //             isWritable: true,       // Needs to write data to this account
    //         },
    //         {
    //             pubkey: escrowPDA,      // Escrow account derived PDA
    //             isSigner: false,        // PDA is derived and not a signer
    //             isWritable: true,       // Writable to store initialization state
    //         },
    //         {
    //             pubkey: SystemProgram.programId, // System program is required
    //             isSigner: false,
    //             isWritable: false,
    //         },
    //     ],
    //     programId, // Your program's ID
    //     data: Buffer.from([]), // Data for the "initialize" instruction (empty if no arguments)
    // });

    //     // Create a transaction
    // const transaction = new Transaction().add(initializeInstruction);

    //     // Send and confirm the transaction
    //     const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
    //     console.log("Transaction Signature:", signature);

    //     // Check the escrow balance after initialization
    //     const balance = await connection.getBalance(escrowPDA);
    //     console.log("Escrow Balance:", balance / LAMPORTS_PER_SOL, "SOL");
    // }

    // initialize().catch((err) => {
    //     console.error(err);
    // });

}

main()