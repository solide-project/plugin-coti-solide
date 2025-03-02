import { CollapsibleChevron } from '../shared/CollapsibleChevron'
import ManualDecrypt from './decrypt'

function ManualCollapsible() {
    return (
        <CollapsibleChevron name="Manual">
            <ManualDecrypt />
        </CollapsibleChevron>
    )
}

export default ManualCollapsible
