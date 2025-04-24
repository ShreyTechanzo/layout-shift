import { cva } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      heading1: "text-heading1 leading-15",
      heading2: "text-[36px] leading-10 max-mobile-max:text-heading3",
      heading3: "text-heading3 leading-7.5",
      heading4: "text-heading4 leading-5",
      body: "text-body leading-4.5",
      small: "text-small leading-4",
      tiny: "text-tiny leading-4",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
