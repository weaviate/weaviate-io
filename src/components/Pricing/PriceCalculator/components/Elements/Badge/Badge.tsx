import { motion } from 'framer-motion';
import type { TPlan } from '../../../types';

interface IBadgeProps {
  plan: TPlan;
  text: string;
}

const gradientVariants = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const Badge = (props: IBadgeProps) => {
  const { plan, text } = props;

  return (
    <div className="badge">
      <motion.div
        className="badge-gradient badge-gradient-green"
        initial={gradientVariants.initial}
        animate={{ opacity: plan === 'flex' ? 1 : 0 }}
        exit={gradientVariants.exit}
        transition={gradientVariants.transition}
      />
      <motion.div
        className="badge-gradient badge-gradient-blue"
        initial={gradientVariants.initial}
        animate={{ opacity: plan === 'plus' ? 1 : 0 }}
        exit={gradientVariants.exit}
        transition={gradientVariants.transition}
      />
      <motion.div
        className="badge-gradient badge-gradient-pink"
        initial={gradientVariants.initial}
        animate={{ opacity: plan === 'premium' ? 1 : 0 }}
        exit={gradientVariants.exit}
        transition={gradientVariants.transition}
      />
      <span className="badge-text">{text}</span>
    </div>
  );
};

