import { useSolidePlugin } from "@/lib/plugins/provider"
import { Switch } from "../../ui/switch"

function AutoDetect() {
    const { useAutoDetect, setUseAutoDetect } = useSolidePlugin()

    return (
        <div className="flex justify-between items-center">
            <div>Enable IDE Auto Detect</div>
            <Switch
                checked={useAutoDetect}
                onCheckedChange={() => setUseAutoDetect(!useAutoDetect)}
            />
        </div>
    )
}

export default AutoDetect