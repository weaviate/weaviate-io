import { useState } from "react"
import { Label } from "src/components/Elements/Form/Label/Label"
import { Select } from "src/components/Elements/Form/Select/Select"
import { SelectTarget } from "src/components/Elements/Form/Select/SelectTarget/SelectTarget"
import { addCommas } from "src/helpers"
import type { IData } from "src/types"

interface IVectorDimensionsSelectProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const VectorDimensionsSelect = (props: IVectorDimensionsSelectProps) => {
  const [ open, updateOpen ] = useState<boolean>(false)

  const target = (
    <SelectTarget popoverProps={null!} ref={null!}>
      {addCommas(props.data.vectorDimensions)}
    </SelectTarget>
  )
  
  const levels: IData['vectorDimensions'][] = [
    '256', '384', '512', '768', '1024', '1536', '3072', '4096', '10752'
  ]
  
  const items = levels.map(
    level => {
      const onClick = () => {
        updateOpen(false)
        props.updateValue('vectorDimensions', level)
      }
      const active = level === props.data.vectorDimensions

      return (
        <li key={level}>
          <button className={active ? 'active' : ''} onClick={onClick}>
            {addCommas(level)}
          </button>
        </li>
      )
    }
  )

  const content = (
    <div>
      <ul className="selectList">
        {items}
      </ul>
    </div>
  )

  return (
    <div className="row single">
      <Label>Vector Dimensions</Label>
      <Select open={open} onOpenChange={updateOpen} content={content} target={target} />
    </div>
  )
}
