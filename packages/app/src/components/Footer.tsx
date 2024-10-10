import CmcIcon from '../assets/CmcIcon'
import JoystreamIcon from '../assets/JoystreamIcon'
import UniswapIcon from '../assets/UniswapIcon'
import { ExternalLinkIcon, GithubIcon } from 'lucide-react'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="mt-auto py-5 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a
            href="https://app.uniswap.org/explore/tokens/base/0x8761155c814c807cd3ccd15b256d69d3c10f198c"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center"
          >
            <UniswapIcon className="h-4 w-4 mr-1 mb-1" />
            Uniswap <ExternalLinkIcon className="inline-block ml-1 h-3 w-3" />
          </a>
          <a
            href="https://coinmarketcap.com/currencies/joystream/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center"
          >
            <CmcIcon className="h-3 w-3 mr-1" />
            CoinMarketCap{' '}
            <ExternalLinkIcon className="inline-block ml-1 h-3 w-3" />
          </a>
          <a
            href="https://joystream.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center"
          >
            <JoystreamIcon className="h-3 w-3 mr-1" />
            Joystream <ExternalLinkIcon className="inline-block ml-1 h-3 w-3" />
          </a>
          <a
            href="https://github.com/joystream/argo-bridge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center"
          >
            <GithubIcon className="h-3 w-3 mr-1" />
            GitHub <ExternalLinkIcon className="inline-block ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}
