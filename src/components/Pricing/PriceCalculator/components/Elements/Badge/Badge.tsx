import { motion } from 'framer-motion';

interface IBadgeProps {
  text: string;
}

const badgeVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // Custom easing for smooth feel
    },
  },
};

export const Badge = (props: IBadgeProps) => {
  const { text } = props;

  return (
    <motion.div
      className="badge"
      variants={badgeVariants}
      initial="initial"
      animate="animate"
    >
      <span className="badge-text">{text}</span>
    </motion.div>
  );
};
