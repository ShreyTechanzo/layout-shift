"use client";

import { RefObject, useRef } from "react";

import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CardProps {
  title: string;
  description: string;
  listTitle: string;
  listItems: string[];
  /**
   * If true, the card will be expanded by default
   * @default false
   */
  isExpanded?: boolean;
  className?: string;
  isTouch: boolean;
  index: number;
  programmaticScroll: RefObject<boolean>;
  setExpandedIndex: (index: number | null) => void;
}

const MotionStack = motion.create(Stack);

export default function Card({
  title,
  description,
  listTitle,
  listItems,
  isExpanded = false,
  className,
  isTouch,
  index,
  programmaticScroll,
  setExpandedIndex,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleHoverStart() {
    if (isTouch) return;

    setExpandedIndex(index);
  }

  function handleHoverEnd() {
    if (isTouch) return;

    setExpandedIndex(null);
  }

  function handleClick() {
    programmaticScroll.current = true;

    if (!isTouch) return;

    setExpandedIndex(index);

    setTimeout(() => {
      programmaticScroll.current = false;
    }, 500);

    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth", inline: "center" });
  }

  return (
    <MotionStack
      ref={ref}
      layout
      data-card
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      initial={{ background: "transparent", backdropFilter: "initial" }}
      animate={{
        backgroundColor: isExpanded ? "#0e111360" : "transparent",
        backdropFilter: isExpanded ? "blur(0.625rem)" : "initial",
        transition: {
          backgroundColor: { duration: 0.2 },
          backdropFilter: { duration: 0.2 },
        },
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      justifyContent="flex-end"
      className={cn(
        "min-w-92 p-10 transition-[background] hover:transition-[background] gap-2 overflow-hidden max-mobile-max:min-w-68",
        className
      )}
    >
      <Typography
        variant="heading2"
        className={cn("font-normal leading-[1.2] max-w-80 text-cyan-800")}
      >
        {title}
      </Typography>

      <MotionStack
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          transition: { duration: 0.4, opacity: { duration: 0.6 } },
        }}
        className="gap-6"
      >
        <Typography variant="body" className={cn("font-normal leading-[1.3]")}>
          {description}
        </Typography>
        <Stack className="gap-2">
          <Typography
            variant="body"
            className={cn("font-bold leading-[1] uppercase")}
          >
            {listTitle}
          </Typography>
          <Stack asChild className="gap-1.5 list-disc [&>*]:ml-4">
            <ul>
              {listItems.map((item, index) => {
                return (
                  <li key={index}>
                    <Typography
                      variant="body"
                      className="font-normal leading-[1.3]"
                    >
                      {item}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </Stack>
        </Stack>
      </MotionStack>
    </MotionStack>
  );
}
