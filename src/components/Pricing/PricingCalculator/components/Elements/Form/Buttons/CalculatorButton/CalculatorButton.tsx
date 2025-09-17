import type { ReactNode, Ref } from "react"

interface ICalculatorButtonProps {
  children: ReactNode | ReactNode
  onClick: () => void
  active?: boolean
  // When used as a target for the popover.
  popoverProps?: Record<string, unknown>
  ref?: Ref<any>
  dropdown?: boolean
}


export const CalculatorButton = (props: ICalculatorButtonProps) => {
  const { active, onClick, dropdown, popoverProps } = props
  const className = `
    calculatorButton ${active ? 'active' : ''} ${dropdown ? 'dropdown' : ''}
  `
  return (
    <button className={className} onClick={onClick} ref={props.ref} {...popoverProps}>
      <div>{props.children}</div>
    </button>
  )
}
