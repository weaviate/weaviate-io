import useMeasure from 'react-use-measure';
import { AnimatePresence, motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';
import { calculatePrice } from '../../../helpers/priceHelper';
import type { IData } from '../../../types';

interface IPriceProps {
  data: IData;
}

export const Price = (props: IPriceProps) => {
  const [ref, bounds] = useMeasure({
    debounce: 100,
    scroll: false,
    offsetSize: true,
  });

  const motionProps: MotionProps = {
    initial: { opacity: 0, y: -20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 20, filter: 'blur(10px)' },
    transition: { duration: 0.33 },
  };

  const [price, setPrice] = useState<string>(() => calculatePrice(props.data));

  useEffect(() => {
    setPrice(calculatePrice(props.data));
  }, [props.data]);

  const wrapperMotionProps: MotionProps = {
    animate: { width: Math.max(bounds.width, 40) + 20 },
  };

  // If the number is too large, we need to resize the font to fit it's container.
  const priceClass = () => {
    if (price.length > 7) return 'largest';
    if (price.length > 6) return 'larger';
    if (price.length > 5) return 'large';
    return '';
  };
  const className = `priceContainer ${priceClass()}`;

  return (
    <div className={`price `}>
      <span className="small">$</span>
      <motion.div className="priceWrapper" {...wrapperMotionProps}>
        <AnimatePresence>
          <motion.span
            className={className}
            {...motionProps}
            key={price}
            ref={ref}
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="small">/mo</span>
    </div>
  );
};
