import { CtType } from "@/lib/enum"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"


interface SelectTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  onValueSelect: (value: string) => void
}

function SelectType({
  onValueSelect
}: SelectTypeProps) {
  return (
    <Select onValueChange={onValueSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={CtType.ctString.toString()}>{CtType.ctString.toString()}</SelectItem>
        <SelectItem value={CtType.ctUint.toString()}>{CtType.ctUint.toString()}</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectType
