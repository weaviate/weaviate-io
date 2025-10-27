import React, { useState } from "react"
import { Label } from "../../Form/Label/Label"
import { Select } from "../../Form/Select/Select"
import { SelectTarget } from "../../Form/Select/SelectTarget/SelectTarget"
import { addNumSize } from "../../../../helpers"
import type { IData } from "../../../../types"

interface IObjectSizeSelectSelect {
  data: IData
  updateValue: (name: string, value: string) => void
}

export const ObjectSizeSelect = (props: IObjectSizeSelectSelect) => {
  const [ open, updateOpen ] = useState<boolean>(false)

  const target = (
    <SelectTarget popoverProps={null!} ref={null!}>
      {addNumSize(props.data.objectSize)}
    </SelectTarget>
  )
  const levels: IData['objectSize'][] = ["1000", "10000", "100000", "1000000"]
  const items = levels.map(
    level => {
      const onClick = () => {
        updateOpen(false)
        props.updateValue('objectSize', level)
      }
      const active = level === props.data.objectSize
      
      return (
        <li key={level}>
          <button className={active ? 'active' : ''} onClick={onClick}>
            {addNumSize(level)}
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
      <Label>Object Size</Label>
      <Select open={open} onOpenChange={updateOpen} content={content} target={target} />
    </div>
  )
}
