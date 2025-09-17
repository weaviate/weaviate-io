import type { ReactNode } from "react"

interface ISelectContentHeaderProps {
  onClose: () => void
  content?: ReactNode
}

export const SelectContentHeader = (props: ISelectContentHeaderProps) => {
  const onClick = () => props.onClose()

  return !props.content ? null : (
    <header className="selectContentHeader">
      <div className="content">{props.content}</div>
      <div className="controls">
        <button onClick={onClick}>x</button>
      </div>
    </header>
  )
}