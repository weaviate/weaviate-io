import { RangeInput } from "src/components/Elements/Form/RangeInput/RangeInput"
import type { IData } from "src/types"

interface IVectorDimensionsProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const VectorDimensions = (props: IVectorDimensionsProps) => {
  return (
    <div className="row">
      <RangeInput 
        label="Vector Dimensions"
        name="vectorDimensions"
        step="1"
        range={["128", "4096"]}
        value={props.data.vectorDimensions}
        updateValue={props.updateValue}
        endExtra={<strong>{props.data.vectorDimensions}</strong>}
      />
    </div>
  )
}
