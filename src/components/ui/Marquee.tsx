import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
  variant?: "dark" | "light" | "primary";
}

export const Marquee = ({
  items,
  direction = "left",
  speed = "normal",
  className = "",
  variant = "dark",
}: MarqueeProps) => {
  const speedClass = {
    fast: "animate-marquee",
    normal: "animate-marquee",
    slow: "animate-marquee-slow",
  };

  const bgClass =
    variant === "primary"
      ? "bg-primary"
      : variant === "dark"
        ? "bg-background"
        : "bg-light-bg";

  const textClass =
    variant === "primary"
      ? "text-black"
      : variant === "dark"
        ? "text-foreground"
        : "text-background";

  const iconClass =
    variant === "primary" ? "text-black" : "text-primary";

  return (
    <div className={`overflow-hidden py-5 ${bgClass} ${className}`}>
      <div
        className={`flex whitespace-nowrap ${speedClass[speed]} ${
          direction === "right" ? "animate-marquee-reverse" : ""
        }`}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, itemIndex) => (
              <div key={`${setIndex}-${itemIndex}`} className="flex items-center">
                <span className={`text-lg font-semibold mx-8 ${textClass}`}>
                  {item}
                </span>
                <Asterisk className={`w-5 h-5 flex-shrink-0 ${iconClass}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
