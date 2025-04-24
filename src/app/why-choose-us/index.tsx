import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { cn } from "@/lib/utils";

import Slider from "./slider";

export interface WhyChooseUsProps {
  className?: string;
}

export default function WhyChooseUs({ className }: WhyChooseUsProps) {
  return (
    <Stack className={cn("gap-10 overflow-hidden", className)}>
      <Typography
        variant="heading2"
        className="font-bold leading-[1.1] mx-auto"
      >
        Why Choose Us?
      </Typography>
      <Slider />
    </Stack>
  );
}
