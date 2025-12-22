import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { Price } from '../Price/Price';
import type { IData } from '../../../types';

interface IPriceReviewProps {
  data: IData;
}

const backgroundVariants = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const PriceReview = (props: IPriceReviewProps) => {
  const motionProps: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.05, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' },
    whileFocus: { scale: 1.05, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' },
    transition: { duration: 0.1 },
  };

  const { plan, deploymentType } = props.data;

  const gradientContent = (
    <>
      <motion.div
        className="priceReview-background priceReview-background-green"
        initial={backgroundVariants.initial}
        animate={{ opacity: plan === 'flex' ? 1 : 0 }}
        exit={backgroundVariants.exit}
        transition={backgroundVariants.transition}
      />
      <motion.div
        className="priceReview-background priceReview-background-blue"
        initial={backgroundVariants.initial}
        animate={{ opacity: plan === 'premium' ? 1 : 0 }}
        exit={backgroundVariants.exit}
        transition={backgroundVariants.transition}
      />
      <motion.div
        className="priceReview-background priceReview-background-pink"
        initial={backgroundVariants.initial}
        animate={{
          opacity: plan === 'premium' && deploymentType === 'dedicated' ? 1 : 0,
        }}
        exit={backgroundVariants.exit}
        transition={backgroundVariants.transition}
      />
    </>
  );

  if (plan === 'premium' && deploymentType === 'dedicated') {
    return (
      <div className="priceReview premium">
        {gradientContent}
        <div className="priceReview-content">
          <h1>
            For enterprise plans, please get in touch for a personalised rate.
          </h1>
          <motion.button {...motionProps}>
            <a className="linkCTA" href="/pricing#contact-sales">
              Contact Sales
            </a>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="priceReview">
      {gradientContent}
      <div className="priceReview-content">
        <h1>Your estimated cost:</h1>
        <Price data={props.data} />
        <motion.button {...motionProps}>
          <a className="linkCTA" href="/go/console">
            Get started
          </a>
        </motion.button>
        <a href="/pricing#contact-sales">
          Contact Sales Team for more information
        </a>
      </div>
    </div>
  );
};
