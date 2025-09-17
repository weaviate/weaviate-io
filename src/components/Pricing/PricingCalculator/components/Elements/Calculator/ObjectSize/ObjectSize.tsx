import { RangeInput } from "src/components/Elements/Form/RangeInput/RangeInput"
import type { IData } from "src/types"

interface IObjectSizeProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const ObjectSize = (props: IObjectSizeProps) => {
  return (
    <div className="row">
      <RangeInput 
        label="Object Size"
        name="objectSize"
        value={props.data.objectSize}
        updateValue={props.updateValue}
        endExtra={<strong>{props.data.objectSize}K</strong>}
      />
    </div>
  )
}
