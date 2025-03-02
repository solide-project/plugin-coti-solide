import { sendToLog } from '@/lib/plugins/logger'
import { CtType } from '@/lib/enum'
import { Button } from '@/src/ui/button'
import { Input } from '@/src/ui/input'
import { useState } from 'react'
import { useNativePlugin } from '../native-provider'
import { BrowserProvider, ctString, ctUint, Eip1193Provider } from '@coti-io/coti-ethers'
import SelectType from './select-type'

function ManualDecrypt() {
    const { aesKey } = useNativePlugin()

    const [data, setData] = useState("")
    const [ctType, setCTType] = useState<string>("")
    const [isDisabled, setIsDisabled] = useState(false)

    const handleClick = async () => {
        try {
            // setIsDisabled(true)
            await doDecryption()
        } catch (err: any) {
            sendToLog(`Error: ${err.message}`)
            console.error(err.message)
        } finally {
            setIsDisabled(false)
        }
    }

    const doDecryption = async () => {
        if (!aesKey) {
            throw new Error("Please load AES Key")
        }

        const provider = new BrowserProvider(window.ethereum as Eip1193Provider)
        const signer = await provider.getSigner()
        signer.setAesKey(aesKey)

        let value: ctUint | ctString = {} as ctUint | ctString
        if (ctType === CtType.ctUint.toString()) {
            value = BigInt(data)
        } else if (ctType === CtType.ctString.toString()) {
            value = {
                value: [BigInt(data)]
            } as ctString
        }

        const clearSum = await signer.decryptValue(value)
        sendToLog(`-> ${clearSum.toString()}`)
    }

    return (
        <>
            <div>Decrypt</div>
            <Input type="text" onChange={(e: any) => setData(e.target.value)}
                value={data} />
            <SelectType onValueSelect={(value: string) => setCTType(value)} />
            <Button size="sm" onClick={handleClick} disabled={isDisabled}>
                Decrypt
            </Button>
        </>
    )
}

export default ManualDecrypt
