import { HighAvailability } from "src/components/Elements/Calculator/HighAvailability/HighAvailability"
import { ButtonGroup } from "src/components/Elements/Form/ButtonGroup/ButtonGroup"
import type { IData, TPlan } from "src/types"

interface IPlansProps {
  updateValue: (n: string, v: string) => void
  data: IData
  mini?: boolean
}

export const Plans = (props: IPlansProps) => {
  const items: TPlan[] = [ 'flex', 'plus', 'premium']
  const selectItem = (item: string) => props.updateValue('plan', item)

  return (
    <div className="row">
      <HighAvailability />
      <ButtonGroup 
        items={items} 
        value={props.data.plan}
        selectItem={selectItem} 
        mini={props.mini}
      />
    </div>
  )
}
