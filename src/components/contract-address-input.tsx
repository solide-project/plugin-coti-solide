import { useSolidePlugin } from '@/lib/plugins/provider'
import { Input } from '../ui/input'
import { CopyText } from './shared/CopyText'

function ContractAddressInput() {
    const { selectedContractAddress, setSelectedContractAddress } = useSolidePlugin()

    return (
        <>
            <div>Load Contract</div>
            <div className="flex gap-2">
                <Input type="text" onChange={(e: any) => setSelectedContractAddress(e.target.value)}
                    value={selectedContractAddress} />
                <CopyText payload={selectedContractAddress} />
            </div>
        </>
    )
}

export default ContractAddressInput
