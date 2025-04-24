import { useEffect, useState } from "react";

type UseMediaQueryOptions = {
  defaultValue?: boolean;
};

export function useMediaQuery(
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {}
): boolean {
  const [matches, setMatches] = useState<boolean>(defaultValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Mark that we're now in a client environment
  }, []);

  useEffect(() => {
    if (!mounted) return; // Ensure media query logic runs only after mount

    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(matchMedia.matches);

    handleChange(); // Update state immediately after hydration

    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query, mounted]);

  return mounted ? matches : defaultValue; // Return defaultValue until hydration completes
}
