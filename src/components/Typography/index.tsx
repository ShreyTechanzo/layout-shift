import { ForwardedRef, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";

import { typographyVariants } from "./helpers";
import { variantMapping } from "./mapping";
import { Variant } from "./types";

export interface TypographyProps {
  /** @default 'body' */
  variant?: Variant;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
  ref?: ForwardedRef<HTMLElement>;
}

export type DistributiveOmit<
  Element,
  TOmitted extends keyof any
> = Element extends any ? Omit<Element, TOmitted> : never;

export default function Typography({
  variant = "body",
  className,
  asChild,
  ...props
}: TypographyProps &
  DistributiveOmit<VariantProps<typeof typographyVariants>, "variant">) {
  const Comp = asChild ? Slot : variantMapping[variant];

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}
