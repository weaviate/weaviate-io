import { RangeInput } from "../../Form/RangeInput/RangeInput"
import type { IData } from "../../../../types"

interface IRecallAccuracyProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const RecallAccuracy = (props: IRecallAccuracyProps) => {
  return (
    <div className="row">
      <RangeInput 
        label="Recall"
        name="recallAccuracy"
        value={props.data.recallAccuracy}
        updateValue={props.updateValue}
        startExtra="Low"
        endExtra="High"
      />
    </div>
  )
}
