import { RangeInput } from "../../Form/RangeInput/RangeInput"
import type { IData } from "../../../../types"

interface IDataTieringProps {
  data: IData
  updateValue: (name: string, value: string) => void
  display?: boolean
}

export const DataTiering = (props: IDataTieringProps) => {
  return !props.display ? null : (
    <div className="row">
      <RangeInput 
        label="DataTiering"
        name="dataTiering"
        value={props.data.dataTiering}
        updateValue={props.updateValue}
        startExtra="None"
        endExtra="Aggresive"
      />
    </div>
  )
}
