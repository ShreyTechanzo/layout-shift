"use client";

import Stack from "@/components/Stack";

import Card from "../card";
import { whyChooseUsData } from "../data";
import { useSlider } from "./vm";

export default function Slider() {
  const {
    ref,
    isTouch,
    programmaticScroll,
    expandedIndex,
    handleSetExpandedIndex,
  } = useSlider();

  return (
    <div>
      <div className="h-140" />
      <Stack
        ref={ref}
        direction="row"
        className="background-container min-h-140 max-h-144 max-2xl:aspect-[2.5] min-2xl:h-[44rem] w-full text-black overflow-x-auto hide-scrollbar bg-amber-200"
        divider={
          <div className="min-w-[0.5px] w-[0.5px] h-full bg-muted opacity-50" />
        }
      >
        {/* CAUTION: Keep this div to prevent layout shift on first item when item is touching top of the screen */}
        {/* <div className="h-full min-h-140" /> */}

        {whyChooseUsData.map((item, index) => (
          <Card
            key={item.title}
            {...item}
            isExpanded={expandedIndex === index}
            index={index}
            isTouch={isTouch}
            programmaticScroll={programmaticScroll}
            setExpandedIndex={handleSetExpandedIndex}
          />
        ))}
      </Stack>
      <div className="h-140" />
    </div>
  );
}
