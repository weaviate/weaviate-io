import { AnimatePresence, motion, type MotionProps } from "motion/react"
import type { ChangeEventHandler, KeyboardEventHandler } from "react"
import { Label } from "src/components/Elements/Form/Label/Label"

interface IToggleProps {
  checked: boolean
  updateChecked: (checked: boolean) => void
}

export const Toggle = (props: IToggleProps) => {
  const { checked, updateChecked } = props
  
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.updateChecked(e.target.checked)
  }

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    e.key === 'Enter' && props.updateChecked(!props.checked)
  }

  const motionPropsYes: MotionProps = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 10, },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.33 }
  }

  const motionPropsNo: MotionProps = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 28, },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.33 }
  }

  const motionPropsDisk: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, left: checked ? 33 : 0 }
  }

  const onClick = () => updateChecked(!checked)

  return (
    <div 
      className={`toggle ${props.checked ? 'active' : ''}`} 
      tabIndex={0}
      onClick={onClick} 
      onKeyDown={onKeyDown}
    >
      <Label htmlFor="highAvailability">High Availability</Label>
      <input 
        id="highAvailability"
        type="checkbox" 
        checked={checked}
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        readOnly
        onChange={onChange}
        tabIndex={-1}
      />

      <div className="togglerWrapper">
        <div className="toggler">
          <motion.div {...motionPropsDisk} className="disk" />
          <div className="text">
            <AnimatePresence>
              { checked && <motion.span {...motionPropsYes}>Yes</motion.span>}
            </AnimatePresence>
            <AnimatePresence>
              {!checked && <motion.span {...motionPropsNo}>No</motion.span>}
            </AnimatePresence>
          </div>
      </div>
      </div>
    </div>
  )
}
