import type { ReactNode } from "react"

interface ISelectContentFooterProps {
  content: ReactNode
}

export const SelectContentFooter = (props: ISelectContentFooterProps) => {
  return !props.content ? null : (
    <footer className="selectContentFooter">
      {props.content}
    </footer>
  )
}