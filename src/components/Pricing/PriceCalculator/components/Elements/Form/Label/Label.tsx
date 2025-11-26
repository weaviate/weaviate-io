import type { ReactNode } from "react"

interface ILabelProps {
  children: ReactNode
  htmlFor?: string
}

export const Label = (props: ILabelProps) => {
  return (
    <label htmlFor={props.htmlFor}>{props.children}</label>
  )
}
