import { RangeInput } from "../../Form/RangeInput/RangeInput"
import { numToThousands } from "../../../../helpers"
import type { IData } from "../../../../types"

interface INumOfObjectsProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const NumOfObjects = (props: INumOfObjectsProps) => {
  const count = numToThousands(props.data.numOfObjects)
  return (
    <div className="row">
      <RangeInput 
        label="Num of Objects"
        name="numOfObjects"
        range={["0", "50000000"]}
        value={props.data.numOfObjects}
        updateValue={props.updateValue}
        endExtra={<strong>{count}</strong>}
      />
    </div>
  )
}
