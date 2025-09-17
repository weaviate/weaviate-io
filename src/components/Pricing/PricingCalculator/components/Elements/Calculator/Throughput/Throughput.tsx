import { RangeInput } from "src/components/Elements/Form/RangeInput/RangeInput"
import type { IData } from "src/types"

interface IThroughputProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const Throughput = (props: IThroughputProps) => {
  return (
    <div className="row">
      <RangeInput
        label="Throughput"
        name="throughput"
        value={props.data.throughput}
        updateValue={props.updateValue}
        startExtra="Fast"
        endExtra="Faster"
      />
    </div>
  )
}
