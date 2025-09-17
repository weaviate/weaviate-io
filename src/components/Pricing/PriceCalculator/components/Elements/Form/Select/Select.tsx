import { useState, cloneElement, type ReactElement, type ReactNode, useRef } from 'react'
import { useTransitionStyles, useFloating, autoUpdate, offset, flip, useClick, useDismiss, useRole, useInteractions, type Placement, arrow } from '@floating-ui/react'
import { SelectContentWrapper } from './SelectContentWrapper/SelectContentWrapper'

interface ISelectProps {
  target: ReactElement
  content: ReactElement
  placement?: Placement
  header?: ReactNode
  footer?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Select = (props: ISelectProps) => {
  const [ internalOpen, setInternalOpen ] = useState(false)
  const arrowRef = useRef(null)

  const open = props.open ?? internalOpen
  const onOpenChange = props.onOpenChange ?? setInternalOpen

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: props.placement ?? 'bottom-end',
    whileElementsMounted: autoUpdate,
    middleware: [ 
      offset(5), 
      flip({ fallbackAxisSideDirection: 'start' }),
      arrow({ element: arrowRef })
    ]
  })

  const { isMounted, styles } = useTransitionStyles(context);
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click, dismiss, role
  ])

  const target = cloneElement(props.target, {...{
    ref: refs.setReference, popoverProps: getReferenceProps()
  }})

  const content = (
    <SelectContentWrapper
      context={context}
      floatingProps={getFloatingProps()}
      floatingStyles={{...floatingStyles, ...styles}}
      children={props.content}
      header={props.header}
      onOpenChange={onOpenChange}
      footer={props.footer}
      arrowRef={arrowRef}
      ref={refs.setFloating}
    />
  )

  return (
    <>
      { target }
      { isMounted && content }
    </>
  )
}
