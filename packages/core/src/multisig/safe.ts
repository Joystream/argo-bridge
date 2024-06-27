// import SafeApiKit from "@safe-global/api-kit"
// import Safe, {
//   EthersAdapter,
//   type SafeAccountConfig,
//   SafeFactory,
// } from "@safe-global/protocol-kit"
// import type { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
// import { ethers } from "ethers"
//
// const SAFE_ADDRESS = process.env.SAFE_ADDRESS!
//
// const RPC_URL = "https://eth-sepolia.public.blastapi.io"
// const provider = new ethers.JsonRpcProvider(RPC_URL)
//
// const owner1Signer = new ethers.Wallet(
//   process.env.OWNER_1_PRIVATE_KEY!,
//   provider,
// )
//
// const ethAdapterOwner1 = new EthersAdapter({
//   ethers,
//   signerOrProvider: owner1Signer,
// })
//
// const apiKit = new SafeApiKit({
//   chainId: 11155111n,
// })
//
// async function test() {
//   // const safe = await Safe.create({
//   //   ethAdapter: ethAdapterOwner1,
//   //   safeAddress: SAFE_ADDRESS,
//   // });
//
//   // const destination = owner1Signer.address;
//   // const amount = ethers.parseUnits("0.005", "ether").toString();
//   //
//   // const safeTransactionData: MetaTransactionData = {
//   //   to: destination,
//   //   data: "0x",
//   //   value: amount,
//   // };
//
//   // const safeTransaction = await safe.createTransaction({
//   //   transactions: [safeTransactionData],
//   // });
//   // console.log(safeTransaction.data);
//   // console.log(safeTransaction.signatures);
//   // const txHash = await safe.getTransactionHash(safeTransaction);
//   // console.log(txHash);
//   //
//   // const sig = await safe.signHash(txHash);
//
//   // await apiKit.proposeTransaction({
//   //   safeAddress: SAFE_ADDRESS,
//   //   safeTransactionData: safeTransaction.data,
//   //   safeTxHash: txHash,
//   //   senderAddress: owner1Signer.address,
//   //   senderSignature: sig.data,
//   // });
//   //
//   const pendingTransactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
//   // console.log(pendingTransactions.results);
//   //
//   const transaction = pendingTransactions.results[0]
//   console.log(transaction)
//
//   //
//   // const executeTxResponse = await safe.executeTransaction(safeTransaction);
//   // const receipt = await executeTxResponse.transactionResponse?.wait();
//   //
//   // console.log("Transaction executed:");
//   // console.log(`https://sepolia.etherscan.io/tx/${receipt?.hash}`);
//   //
//   // const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });
//   //
//   // const safeAccountConfig: SafeAccountConfig = {
//   //   owners: [owner1Signer.address],
//   //   threshold: 1,
//   // };
//   //
//   //
//   // const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig });
//   //
//   // const safeAddress = await protocolKitOwner1.getAddress();
//   //
//   // console.log("Your Safe has been deployed:");
//   // console.log(`https://sepolia.etherscan.io/address/${safeAddress}`);
//   // console.log(`https://app.safe.global/sep:${safeAddress}`);
// }
//
// test().catch(console.error)
