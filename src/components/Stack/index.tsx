import React, {
  Children,
  isValidElement,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  Ref,
  useMemo,
} from "react";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";

import stackVariants from "./mappings";

type StackVariants = VariantProps<typeof stackVariants>;

export interface StackProps extends StackVariants {
  className?: string;
  children?: ReactNode;
  divider?: ReactNode;
  asChild?: boolean;
  ref?: Ref<HTMLDivElement>;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
}

function Stack({
  direction,
  justifyContent,
  alignItems,
  flexWrap,
  className,
  children: _children,
  divider,
  asChild = false,
  ...props
}: StackProps) {
  const Comp = asChild ? Slot : "div";

  const children = useMemo(() => {
    const childrenArray = Children.toArray(_children);

    if (childrenArray.length === 0) return null;

    // When `asChild` is true, we need to wrap the child with a new React element
    if (
      asChild &&
      childrenArray.length === 1 &&
      isValidElement(childrenArray[0])
    ) {
      const firstChild = childrenArray[0] as ReactElement<{
        children: ReactNode;
      }>; // Explicitly type it

      return React.cloneElement(firstChild, {
        children: Children.toArray(firstChild.props.children).flatMap(
          (child, index) => {
            if (index === 0) {
              return child;
            }
            return (
              <React.Fragment key={index}>
                {divider}
                {child}
              </React.Fragment>
            );
          }
        ),
      });
    }

    // Default behavior when `asChild` is false
    return childrenArray.flatMap((child, index) => {
      if (index === 0) {
        return child;
      }
      return (
        <React.Fragment key={index}>
          {divider}
          {child}
        </React.Fragment>
      );
    });
  }, [_children, divider, asChild]);

  return (
    <Comp
      className={cn(
        stackVariants({ direction, justifyContent, alignItems, flexWrap }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Stack;
