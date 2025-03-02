import { BrowserProvider, Eip1193Provider } from '@coti-io/coti-ethers'
import { useState } from 'react'
import { Button } from '../ui/button'
import { sendToLog } from '@/lib/plugins/logger'
import { useNativePlugin } from './native-provider'

function OnBoardingButton() {
    const { isValidChain, setAESKey } = useNativePlugin()

    const [isDisabled, setIsDisabled] = useState(false)

    const handleOnClick = async () => {
        try {
            setIsDisabled(true)
            // await doOnboarding();
            await Promise.race([
                doOnboarding(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: Operation took too long. Please try again')),
                    5_000
                ))
            ]);
        } catch (err: any) {
            sendToLog(`Error: ${err.message}`)
            console.error(err.message)
        } finally {
            setIsDisabled(false)
        }
    }

    const doOnboarding = async () => {
        const provider = new BrowserProvider(window.ethereum as Eip1193Provider)
        const signer = await provider.getSigner()
        await signer.generateOrRecoverAes()

        sendToLog(`Onboarding ${signer.address}...`)
        const info = signer.getUserOnboardInfo()
        if (!info) {
            throw new Error("Fail to get Onboarding Info. Please try again")
        }

        setAESKey(info.aesKey)
        sendToLog(`AES Key: ${info.aesKey}`)
        sendToLog(`Tx: ${info.txHash}`)
    }

    return (
        <>
            {isValidChain
                ? <Button onClick={handleOnClick} disabled={isDisabled}>
                    {isDisabled ? "Loading..." : "Onboard"}
                </Button>
                : <Button variant="destructive" disabled={true}>
                    Change to COTI network to Onboard
                </Button>}
        </>
    )
}

export default OnBoardingButton
