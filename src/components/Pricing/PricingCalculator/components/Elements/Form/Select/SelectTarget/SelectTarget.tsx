import type { ReactNode, Ref } from "react"
import { CalculatorButton } from "src/components/Elements/Form/Buttons/CalculatorButton/CalculatorButton"

interface ISelectTargetProps {
  popoverProps: Record<string, unknown> 
  ref: Ref<any>
  children: ReactNode | ReactNode[]
}

export const SelectTarget = (props: ISelectTargetProps) => {
  return (
    <CalculatorButton
      popoverProps={props.popoverProps}
      ref={props.ref}
      onClick={null!}
      dropdown
    >
      {props.children}
    </CalculatorButton>
  )
}
