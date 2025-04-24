import { RefObject, useEffect, useRef, useState } from 'react';

import { useMediaQuery } from '@/lib/hooks/use-mediaQuery';
import { useEventListener } from 'usehooks-ts';

export function useIsTouch(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export function useSlider() {
  const isTouch = useMediaQuery('(hover: none)');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleSetExpandedIndex(index: number | null) {
    setExpandedIndex(index);
  }

  const ref = useRef<HTMLDivElement>(null);

  const programmaticScroll = useRef<boolean>(false);

  function handleScroll() {
    const container = ref.current;
    const allowAutoScroll = programmaticScroll.current;

    // Not for non-touch devices and if programmatic scroll is active
    if (!container || allowAutoScroll || !isTouch) return;

    const children = Array.from(container.children);
    // Removed divider elements
    const cards = children.filter((child) => (child as HTMLElement).dataset.card);

    // INFO: If scrolled to end of the slider it expand the LAST item
    if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth) {
      setExpandedIndex(cards.length - 1);
      return;
    }

    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();

      const isFullyVisible = rect.left >= containerRect.left && rect.right <= containerRect.right;

      if (isFullyVisible) {
        setExpandedIndex(i);
        return;
      }
    }
  }

  useEventListener('scroll', handleScroll, ref as RefObject<HTMLDivElement>);

  // Expand first item by default on mobile
  useEffect(() => {
    if (isTouch) {
      setExpandedIndex(0);
    } else {
      setExpandedIndex(null);
    }
  }, [isTouch]);

  return { ref, isTouch, programmaticScroll, expandedIndex, handleSetExpandedIndex };
}
