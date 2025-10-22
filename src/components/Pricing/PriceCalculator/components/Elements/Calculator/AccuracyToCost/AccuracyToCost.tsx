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
        name="accuracyToCost"
        value={props.data.accuracyToCost}
        updateValue={props.updateValue}
        startExtra="Accuracy"
        endExtra="Cost"
        range={["1", "5"]}
        step="1"
      />
    </div>
  )
}
