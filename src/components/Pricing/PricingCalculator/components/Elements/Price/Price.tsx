import useMeasure from 'react-use-measure'
import { AnimatePresence, motion, type MotionProps } from "motion/react"
import { calculatePrice } from "src/helpers/priceHelper"
import type { IData } from "src/types"

interface IPriceProps {
  data: IData
}

export const Price = (props: IPriceProps) => {
  const [ ref, bounds ] = useMeasure({ debounce: 100 })
  
  const motionProps: MotionProps = {
    initial: { opacity: 0, y: -20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 20, filter: 'blur(10px)' },
    transition: { duration: 0.33 }
  }

  const price = calculatePrice(props.data).toLocaleString()

  const wrapperMotionProps: MotionProps = {
    animate: { width: Math.max(bounds.width, 40) + 20 }
  }

  // If the number is too large, we need to resize the font to fit it's container.
  const className = `priceContainer ${price.length > 5 ? 'large' : ''}`

  return (
    <div className={`price `}>
      <span className="small">$</span>
      <motion.div className="priceWrapper" {...wrapperMotionProps}>
        <AnimatePresence>
          <motion.span className={className} {...motionProps} key={price} ref={ref}>
            {price}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="small">/mo</span>
    </div>
  )
}
