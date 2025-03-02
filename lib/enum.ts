export enum CtType {
    ctUint = "ctUint",
    ctString = "ctString"
}

export const hexToDecimal = (hex: string): number => parseInt(hex, 16)
export const hexToString = (hex: string): string => hexToDecimal(hex).toString()