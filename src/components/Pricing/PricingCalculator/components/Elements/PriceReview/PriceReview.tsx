import { motion, type MotionProps } from "motion/react"
import { Price } from "src/components/Elements/Price/Price"
import type { IData } from "src/types"

interface IPriceReviewProps {
  data: IData
}

export const PriceReview = (props: IPriceReviewProps) => {
  const motionProps: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {  scale: 1.05, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' },
    whileFocus: {  scale: 1.05, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' },
    transition: { duration: 0.1 }
  }
  
  return (
    <div className="priceReview">
      <h1>Your estimated cost:</h1>
      <Price data={props.data} />
      <motion.button {...motionProps}>
        <span>Get started</span>
      </motion.button>
      <a href="">Contact Sales Team for more info</a>
    </div>
  )
}
