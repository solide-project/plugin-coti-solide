import ContractInvoke from './encrypt'
import { CollapsibleChevron } from '../shared/CollapsibleChevron'

function ContractCollapsible() {
    return (
        <CollapsibleChevron name="Contract">
            <ContractInvoke />
        </CollapsibleChevron>
    )
}

export default ContractCollapsible
