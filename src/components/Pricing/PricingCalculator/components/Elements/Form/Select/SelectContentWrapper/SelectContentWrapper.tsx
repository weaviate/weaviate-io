import { FloatingFocusManager, FloatingOverlay, FloatingPortal, type FloatingContext, FloatingArrow } from "@floating-ui/react"
import type { ReactNode, Ref } from "react";
import { SelectContentHeader } from "../SelectContentHeader/SelectContentHeader";
import { SelectContentFooter } from "../SelectContentFooter/SelectContentFooter";

interface ISelectContentWrapperProps {
  context: FloatingContext
  ref: (node: HTMLElement | null) => void;
  arrowRef: Ref<any>
  floatingStyles: React.CSSProperties
  floatingProps: Record<string, unknown>
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  onOpenChange: (open: boolean) => void
}

export const SelectContentWrapper = (props: ISelectContentWrapperProps) => {
  const { context, ref, floatingStyles, floatingProps, arrowRef } = props
  const onClose = () => props.onOpenChange(false)
  return (
    <FloatingPortal>
      <FloatingOverlay />
      <FloatingFocusManager context={context} modal={false}>
        <div ref={ref} style={floatingStyles} {...floatingProps} className="selectContentWrapper">
          <FloatingArrow ref={arrowRef} context={context} tipRadius={3} width={10} height={6} />
          <SelectContentHeader content={props.header} onClose={onClose} />
          <div className="selectContent">{props.children}</div>
          <SelectContentFooter content={props.footer} />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}