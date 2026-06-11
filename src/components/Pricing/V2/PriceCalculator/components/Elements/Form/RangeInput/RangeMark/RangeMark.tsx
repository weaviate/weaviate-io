import type { ReactNode } from "react"

interface IRangeMarkProps {
  rangeMark?: ReactNode | string
}

export const RangeMark = (props: IRangeMarkProps) => (
  <div className="rangeMark">
    <div>{props.rangeMark}</div>
  </div>
)
