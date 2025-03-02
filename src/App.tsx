import { useEffect } from 'react';
import OnBoardingButton from './components/onboarding-button'
import AesKey from './components/aes-key-input';
import { ConnectWallet } from './components/connector/connect-wallet';
import { CollapsibleChevron } from './components/shared/CollapsibleChevron';
import PluginSettings from './components/settings';
import ContractCollapsible from './components/contract'
import ManualCollapsible from './components/manual';
import { useNativePlugin } from './components/native-provider';
import { hexToString } from '@/lib/enum';
import { AlertCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'

function App() {
  const { isValidChain, setIsValidChain } = useNativePlugin()

  useEffect(() => {
    const applyStyles = (event: MessageEvent) => {
      if (event.data.type === "apply-styles") {
        event.data.css.forEach((href: string) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document.head.appendChild(link);
        });

        // document.body.style.fontFamily = event.data.fontFamily;
        // document.body.style.fontSize = event.data.fontSize;
      }
    };

    window.addEventListener("message", applyStyles);
    return () => window.removeEventListener("message", applyStyles);
  }, []);

  useEffect(() => {
    (async () => {
      const chainId = await window.ethereum
        .request({ method: "eth_chainId" })
      handleChainChanged(chainId)

      window.ethereum
        .on("chainChanged", handleChainChanged)

      function handleChainChanged(chainHex: any) {
        const chainId = hexToString(chainHex)
        console.log("Plugin:", chainId)
        if (chainId === "7082400" || chainId === "13068200") {
          setIsValidChain(true)
          return;
        }

        setIsValidChain(false)
      }
    })()
  }, [])

  return (
    <div className="px-2 py-2 bg-grayscale-025">
      <div className="py-2 text-center font-semibold text-grayscale-350">Coti Privacy Plugin</div>
      <div className="flex items-center gap-2">
        <ConnectWallet />
        {!isValidChain &&
          <Popover>
            <PopoverTrigger>
              <AlertCircle />
            </PopoverTrigger>
            <PopoverContent>Please connect to COTI to use all features</PopoverContent>
          </Popover>}
      </div>
      <CollapsibleChevron name="Onboarding">
        <OnBoardingButton />
        <AesKey />
      </CollapsibleChevron>

      <ContractCollapsible />
      <ManualCollapsible />
      <PluginSettings />
    </div>
  )
}

export default App
