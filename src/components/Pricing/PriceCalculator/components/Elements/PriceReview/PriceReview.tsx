import React from "react"
import { motion } from "framer-motion"
import type { MotionProps } from "framer-motion"
import { Price } from "../Price/Price"
import type { IData } from "../../../types"

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

  if (props.data.plan === 'premium') {
    return (
      <div className="priceReview premium">
        <h1>For premium plans, please get in touch for a personalised rate.</h1>
        <motion.button {...motionProps}>
          <a className="linkCTA" href="/pricing#contact-sales">Contact Sales</a>
        </motion.button>
      </div>
    )
  }
  
  return (
    <div className="priceReview">
      <h1>Your estimated cost:</h1>
      <Price data={props.data} />
      <motion.button {...motionProps}>
        <a className="linkCTA" href="https://console.weaviate.cloud/">Get started</a>
      </motion.button>
      <a href="/pricing#contact-sales">Contact Sales Team for more information</a>
    </div>
  )
}
