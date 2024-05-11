import { GovernanceView } from "./Governance"
import { Web3Provider } from "./Web3Provider"
import { FC } from "react"

export const App: FC = () => {
  return (
    <Web3Provider>
      <w3m-button />
      <GovernanceView />
    </Web3Provider>
  )
}
