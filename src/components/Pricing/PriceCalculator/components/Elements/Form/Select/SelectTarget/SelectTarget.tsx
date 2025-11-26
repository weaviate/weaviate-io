import { forwardRef, type ReactNode, type Ref } from "react"
import { CalculatorButton } from "../../Buttons/CalculatorButton/CalculatorButton"

interface ISelectTargetProps {
  popoverProps: Record<string, unknown> 
  children: ReactNode | ReactNode[]
}

export const SelectTarget = forwardRef((props: ISelectTargetProps, ref: Ref<any>) => {
  return (
    <CalculatorButton
      popoverProps={props.popoverProps}
      ref={ref}
      onClick={null!}
      dropdown
    >
      {props.children}
    </CalculatorButton>
  )
})
