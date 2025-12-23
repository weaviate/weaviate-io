import { CalculatorButton } from '../Buttons/CalculatorButton/CalculatorButton';
import { motion } from 'framer-motion';

interface IButtonGroupProps {
  items: string[];
  value: string;
  selectItem: (text: string) => void;
  mini?: boolean;
}

export const ButtonGroup = (props: IButtonGroupProps) => {
  const items = props.items.map((item) => {
    const onClick = () => props.selectItem(item);
    const active = props.value === item;
    return (
      <motion.li
        key={item}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        <CalculatorButton onClick={onClick} active={active}>
          {item}
        </CalculatorButton>
      </motion.li>
    );
  });

  return (
    <div className="buttonGroup">
      <ul>{items}</ul>
    </div>
  );
};
