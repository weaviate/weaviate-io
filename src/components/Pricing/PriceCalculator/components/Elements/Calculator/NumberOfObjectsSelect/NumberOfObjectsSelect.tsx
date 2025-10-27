import React, { useState } from "react"
import { Label } from "../../Form/Label/Label"
import { Select } from "../../Form/Select/Select"
import { SelectTarget } from "../../Form/Select/SelectTarget/SelectTarget"
import { addCommas } from "../../../../helpers"
import type { IData } from "../../../../types"

interface INumberOfObjectsSelectProps {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const NumberOfObjectsSelect = (props: INumberOfObjectsSelectProps) => {
  const [ open, updateOpen ] = useState<boolean>(false)
  const target = (
    <SelectTarget popoverProps={null!} ref={null!}>
      {addCommas(props.data.numOfObjects)}
    </SelectTarget>
  )

  const levels: IData['numOfObjects'][] = [
    '1000', '10000', '100000', '1000000', '10000000'
  ]
  
  const items = levels.map(
    level => {
      const onClick = () => {
        updateOpen(false)
        props.updateValue('numOfObjects', level)
      }
      const active = level === props.data.numOfObjects

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
      <Label>Number of Objects</Label>
      <Select open={open} onOpenChange={updateOpen} content={content} target={target} />
    </div>
  )
}
