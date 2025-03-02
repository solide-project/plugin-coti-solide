import { COTI_TESTNET, COTI_DEVNET } from "@/lib/chains"

function AddChain() {
    const chains = [COTI_TESTNET, COTI_DEVNET]

    const onClick = async (chainInfo: any) => {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainInfo]
        });
    }

    return (
        <div className="flex gap-2">
            {chains.map((chain, index) => {
                return (
                    <div key={index} className="hover:cursor-pointer"
                        onClick={() => onClick(chain)}>
                        {chain.chainName}
                    </div>
                )
            })}
        </div>
    )
}

export default AddChain