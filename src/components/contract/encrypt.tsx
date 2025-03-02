import { useSolidePlugin } from '@/lib/plugins/provider'
import { useNativePlugin } from '../native-provider'
import { Button } from '../../ui/button'
import { BrowserProvider, Contract, Eip1193Provider, isAddress } from '@coti-io/coti-ethers'
import { sendToLog } from '@/lib/plugins/logger'
import ContractAddressInput from '../contract-address-input'

function ManualEncrypt() {
    const { aesKey } = useNativePlugin()
    const { selectedContractAddress, selectedCompiledContract } = useSolidePlugin()

    const loadContract = async () => {
        if (!isAddress(selectedContractAddress) || !selectedCompiledContract?.abi) {
            sendToLog("Please compile or load contract")
            return;
        }

        const provider = new BrowserProvider(window.ethereum as Eip1193Provider)
        const signer = await provider.getSigner()
        signer.setAesKey(aesKey)

        const counter = new Contract(selectedContractAddress, selectedCompiledContract.abi, signer)

        // const itValue = await signer.encryptValue(
        //     BigInt(123),
        //     selectedContractAddress,
        //     counter["add"].fragment.selector
        // )

        // console.log(stringifyWithBigInt(itValue))
        // await (
        //     await counter.add(
        //         // itValue
        //         [
        //             BigInt("104661912655050222503141422472416024368678287612494921861282962863506876132499"),
        //             "0x4533a090ed057f2dfc28b5ef5751887c28d5983a8f8e451ca50f5e1a4a81b2f8323c0adad22b4fc6ac27c676acebf78f9d09bac204b6dcc9fe5ec6be1dfd509f1c"
        //         ]
        //     )
        // ).wait()


        const ctSum = await counter.sum()
        console.log(typeof ctSum, ctSum)
        const clearSum = await signer.decryptValue(ctSum)
        console.log(clearSum)
    }

    // const stringifyWithBigInt = (result: any) => {
    //     return JSON.stringify(result, (key, value) =>
    //         typeof value === "bigint" ? value.toString() : value
    //     );
    // }

    return (
        <>
            <div>Interact</div>
            <ContractAddressInput />
            <Button onClick={loadContract}>Test</Button>
            <div>{selectedContractAddress && selectedContractAddress}</div>
            <div>{aesKey && aesKey}</div>
        </>
    )
}

export default ManualEncrypt
