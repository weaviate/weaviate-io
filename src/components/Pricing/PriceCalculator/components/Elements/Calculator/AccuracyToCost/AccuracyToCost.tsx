import { IData } from "../../../../types"
import { RangeInput } from "../../Form/RangeInput/RangeInput"

interface IAccuracyToCostProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const AccuracyToCost = (props: IAccuracyToCostProps) => {
  return (
    <div className="row">
      <RangeInput
        label="Accuracy/Cost"
        name="throughput"
        value={props.data.throughput}
        updateValue={props.updateValue}
        startExtra="Accuracy"
        endExtra="Cost"
        step="10"
      />
    </div>
  )
}
