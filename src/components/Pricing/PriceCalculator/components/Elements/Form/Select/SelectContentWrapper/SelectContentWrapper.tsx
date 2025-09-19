import { FloatingFocusManager, FloatingOverlay, FloatingPortal, type FloatingContext, FloatingArrow } from "@floating-ui/react"
import { forwardRef, type ReactNode, type Ref } from "react";
import { SelectContentHeader } from "../SelectContentHeader/SelectContentHeader";
import { SelectContentFooter } from "../SelectContentFooter/SelectContentFooter";

interface ISelectContentWrapperProps {
  context: FloatingContext
  ref: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties
  floatingProps: Record<string, unknown>
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  onOpenChange: (open: boolean) => void
  arrowRef: React.MutableRefObject<null>
}

export const SelectContentWrapper = forwardRef((props: ISelectContentWrapperProps, ref: Ref<any>) => {
  const { context, floatingStyles, floatingProps } = props
  const onClose = () => props.onOpenChange(false)
  return (
    <FloatingPortal>
      <FloatingOverlay />
      <FloatingFocusManager context={context} modal={false}>
        <div ref={ref} style={floatingStyles} {...floatingProps} className="selectContentWrapper">
          <FloatingArrow ref={props.arrowRef} context={context} tipRadius={3} width={10} height={6} />
          <SelectContentHeader content={props.header} onClose={onClose} />
          <div className="selectContent">{props.children}</div>
          <SelectContentFooter content={props.footer} />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
})
