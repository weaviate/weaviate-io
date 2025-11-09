import { AnimatePresence, motion } from 'framer-motion';
import type { TDeploymentType, TPlan } from '../../../../types';
import { Badge } from '../../Badge/Badge';

interface ISwitchProps {
  values: TDeploymentType[];
  selectedValue: TDeploymentType;
  updateValue: (value: TDeploymentType) => void;
  label: string;
  badge_text: string;
  plan: TPlan;
}

export const Switch = ({
  values,
  selectedValue,
  updateValue,
  label,
  badge_text,
  plan,
}: ISwitchProps) => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleClick = (value: TDeploymentType) => {
    updateValue(value);
  };

  return (
    <div className="switch-container">
      <div className="label-with-badge">
        <div className="label">{label}</div>
        <Badge plan={plan} text={badge_text} />
      </div>
      <div className="label">{label}</div>
      <div className="switch">
        {values.map((value) => (
          <motion.button
            key={value}
            className={`switch-option ${
              selectedValue === value ? 'active' : ''
            }`}
            onClick={() => handleClick(value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="switch-text"
            >
              {capitalize(String(value))}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
