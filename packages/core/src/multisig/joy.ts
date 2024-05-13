import "@joystream/types"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { Keyring } from "@polkadot/keyring"

async function proposeMultisigTransaction() {
  const provider = new WsProvider("wss://rpc.joyutils.org")
  const api = await ApiPromise.create({ provider })

  // Initialize the keyring
  const keyring = new Keyring({ type: "sr25519" })

  // Add an account from its seed phrase
  const sender = keyring.addFromUri("//Alice", { name: "Alice" })

  // Define the multisig account address and other signatories
  // const multiSigAddress = 'multi-sig-account-address';
  // const otherSignatories = ['other-signatory-1', 'other-signatory-2']; // Add other signatories as needed
  // const threshold = 2; // Number of signatures required

  // Specify the recipient and the amount to send
  const recipientAddress = "recipient-address"
  const amount = 1000000000000 // 1 DOT (assuming 10^12 planck per DOT)

  // Construct the call for the transfer

  const transferCall = api.tx.balances.transfer(
    "j4WE7XnLvnRKMNfmPqtwsnKCrT3reXKWvVmLXVyc4V4RSus9c",
    10 * 10 ** 10,
  )

  console.log(transferCall.method.hash.toHex())

  // Propose theosal = api.tx.multisig.approveAsMulti(
  //   //   threshold,
  //   //   otherSignatories,
  //   //   null,
  //   //   multiSigAddress,
  //   //   transferCall
  //   // )
  //   //
  //   // // Sign and send the proposal
  //   // const hash = await proposal.signAndSend(sender);
  //   //
  //   // console.lo multisig transaction
  // const propg(`Proposal submitted with hash: ${hash}`);
}

proposeMultisigTransaction().catch(console.error)
