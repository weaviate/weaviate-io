import type { ReactNode } from "react"

interface IRowInfoProps {
  children?: ReactNode
}

export const RowInfo = (props: IRowInfoProps) => {
  return (
    <div className="rowInfo">
      {props.children}
    </div>
  )
}
