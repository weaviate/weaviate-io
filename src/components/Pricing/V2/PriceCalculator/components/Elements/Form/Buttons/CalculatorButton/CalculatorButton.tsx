import { forwardRef, type ReactNode, type Ref } from "react"

interface ICalculatorButtonProps {
  children: ReactNode | ReactNode
  onClick: () => void
  active?: boolean
  // When used as a target for the popover.
  popoverProps?: Record<string, unknown>
  dropdown?: boolean
}


export const CalculatorButton = forwardRef((props: ICalculatorButtonProps, ref?: Ref<any>) => {
  const { active, onClick, dropdown, popoverProps } = props
  const className = `
    calculatorButton ${active ? 'active' : ''} ${dropdown ? 'dropdown' : ''}
  `
  return (
    <button className={className} onClick={onClick} ref={ref} {...popoverProps}>
      <div>{props.children}</div>
    </button>
  )
})
