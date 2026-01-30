import { useReducedMotion } from "framer-motion";

export function usePremiumEnterMotion() {
  const reduce = useReducedMotion();

  if (reduce) {
    return {
      initial: false as const,
      whileInView: undefined,
      viewport: { once: true } as const,
      transition: undefined,
    };
  }

  return {
    initial: { opacity: 0.6, y: 18, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-25% 0px -55% 0px" } as const,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };
}
