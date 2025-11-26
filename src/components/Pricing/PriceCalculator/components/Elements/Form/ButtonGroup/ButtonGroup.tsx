import { CalculatorButton } from "../Buttons/CalculatorButton/CalculatorButton"

interface IButtonGroupProps {
  items: string[]
  value: string
  selectItem: (text: string) => void
  mini?: boolean
}

export const ButtonGroup = (props: IButtonGroupProps) => {
  const items = props.items.map(
    item => {
      const onClick = () => props.selectItem(item)
      const active = props.value === item
      return (
        <li key={item}>
          <CalculatorButton onClick={onClick} active={active}>
            {item}
          </CalculatorButton>
        </li>
      )
    }
  )

  return (
    <div className="buttonGroup">
      <ul>
        {items}
      </ul>
    </div>
  )
}
