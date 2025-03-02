"use client"

import React, { createContext, useContext, useState } from "react"

export const NativePluginProvider = ({ children }: NativePluginProviderProps) => {
    const [aesKey, setAESKey] = useState<any>("")
    const [isValidChain, setIsValidChain] = useState(false)

    return (
        <PluginContext.Provider
            value={{
                aesKey,
                setAESKey,
                isValidChain,
                setIsValidChain,
            }}
        >
            {children}
        </PluginContext.Provider>
    )
}

interface NativePluginProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const PluginContext = createContext({
    aesKey: "",
    setAESKey: (_: any) => { },
    isValidChain: false,
    setIsValidChain: (_: any) => { },
})

export const useNativePlugin = () => useContext(PluginContext)
