import { Input } from '../ui/input'
import { useNativePlugin } from './native-provider'
import { CopyText } from './shared/CopyText'

function AesKey() {
    const { aesKey, setAESKey } = useNativePlugin()

    return (
        <>
            <div>AES Key</div>
            <div className="flex gap-2">
                <Input type="text" onChange={(e: any) => setAESKey(e.target.value)} value={aesKey} className="h-8" />
                <CopyText payload={aesKey} />
            </div>
        </>
    )
}

export default AesKey
