"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { SolidePluginsMessage } from './messages'
import { hexToString } from "../enum"

export const SolidePluginProvider = ({ children }: SolidePluginProviderProps) => {
    const [selectedContractAddress, setSelectedContractAddress] = useState("")
    const [selectedCompiledContract, setSelectedCompiledContract] = useState<any>(
        {} as any
    )

    const [useAutoDetect, setUseAutoDetect] = useState(true)

    useEffect(() => {
        (async () => {
            const handleMessage = async (event: MessageEvent) => {
                if (event.origin !== "http://localhost:3001"
                    && event.origin !== "https://solide0x.tech"
                    // && event.origin !== "http://localhost:5173"
                ) {
                    // console.error("Unauthorized message origin");
                    return;
                }

                const { target, data } = event.data;
                console.log(event)
                if (target === SolidePluginsMessage.SOLIDE_COMPILATION_DETAILS.toString()) {
                    const compilationDetail = JSON.parse(JSON.parse(data))
                    setSelectedCompiledContract(compilationDetail)
                } else if (target === SolidePluginsMessage.SOLIDE_CONTRACT_ADDRESS.toString()) {
                    setSelectedContractAddress(data)
                } else if (target === SolidePluginsMessage.SOLIDE_CHAIN_CHANGED.toString()) {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: data }],
                    });
                }
            };

            window.addEventListener("message", handleMessage);
            return () => window.removeEventListener("message", handleMessage);
        })()
    }, []);

    return (
        <PluginContext.Provider
            value={{
                selectedCompiledContract,
                setSelectedCompiledContract,
                selectedContractAddress,
                setSelectedContractAddress,
                useAutoDetect,
                setUseAutoDetect,
            }}
        >
            {children}
        </PluginContext.Provider>
    )
}

interface SolidePluginProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const PluginContext = createContext({
    selectedCompiledContract: {} as any,
    setSelectedCompiledContract: (_: any) => { },
    selectedContractAddress: "",
    setSelectedContractAddress: (_: any) => { },
    useAutoDetect: true,
    setUseAutoDetect: (_: any) => { },
})

export const useSolidePlugin = () => useContext(PluginContext)
