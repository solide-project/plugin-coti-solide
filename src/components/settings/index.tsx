import { SettingsIcon } from "lucide-react"
import { buttonVariants } from "../../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover"
import { cn } from "@/lib/utils"
import AddChain from "./add-chain"
import AutoDetect from "./auto-detect"

function PluginSettings() {
    return (
        <>
            <Popover>
                <PopoverTrigger className={cn(buttonVariants({ variant: "default", size: "icon" }))}>
                    <SettingsIcon />
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <AutoDetect />
                    <AddChain />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PluginSettings