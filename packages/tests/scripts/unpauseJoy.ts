import {
  councilAccounts,
  joyApi,
  proposerAccount,
  proposerStakeAccount,
  sendExtrinsic,
  setupJoyApi,
  waitUntilBlock,
} from "../src/setup"
import { NETWORKS } from "@joystream/argo-core"

async function main() {
  await setupJoyApi()

  const evmChainId = NETWORKS.hardhat.chainId
  const joyBridgeOperator = councilAccounts[0]
  const joyBridgePauser = councilAccounts[1]

  const generalProposalParams = joyApi.createType(
    "PalletProposalsCodexGeneralProposalParams",
    {
      memberId: councilAccounts.length,
      title: "Update Argo config",
      description: "Update Argo config",
      stakingAccountId: proposerStakeAccount.address,
    },
  )
  const proposalDetails = joyApi.createType(
    "PalletProposalsCodexProposalDetails",
    {
      UpdateArgoBridgeConstraints: joyApi.createType(
        "PalletArgoBridgeBridgeConstraints",
        {
          operatorAccount: joyBridgeOperator.address,
          pauserAccounts: [joyBridgePauser.address],
          bridgingFee: 4_000,
          thawnDuration: 20,
          remoteChains: [evmChainId],
        },
      ),
    },
  )
  await sendExtrinsic(
    joyApi.tx.proposalsCodex.createProposal(
      generalProposalParams,
      proposalDetails,
    ),
    proposerAccount,
  )

  // we only need 3 votes to approve
  for (let i = 0; i < 3; i++) {
    const voteKind = joyApi.createType(
      "PalletProposalsEngineVoteKind",
      "Approve",
    )
    await sendExtrinsic(
      joyApi.tx.proposalsEngine.vote(i, 1, voteKind, "0x0"),
      councilAccounts[i],
    )
  }

  await sendExtrinsic(joyApi.tx.argoBridge.initUnpauseBridge(), joyBridgePauser)
  const currentBlock = await joyApi.query.system.number()

  await waitUntilBlock(joyApi, currentBlock.toNumber() + 21)

  await sendExtrinsic(
    joyApi.tx.argoBridge.finishUnpauseBridge(),
    joyBridgeOperator,
  )
}

await main()
