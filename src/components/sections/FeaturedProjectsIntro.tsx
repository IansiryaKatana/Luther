import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Marquee } from "@/components/ui/Marquee";
import { useRef } from "react";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";

const statsMarquee = [
  "96% client retention rate",
  "8+ years of experience",
  "24 projects delivered",
  "18 satisfied clients",
];

export const FeaturedProjectsIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const enterMotion = usePremiumEnterMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.section
      id="featured"
      ref={containerRef}
      className="lg:sticky lg:top-20 z-[11] bg-background min-h-0 lg:min-h-screen flex flex-col"
      {...enterMotion}
    >
      {/* Stats Marquee */}
      <Marquee items={statsMarquee} speed="normal" variant="dark" />

      {/* Featured Projects Header */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 lg:py-32 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-semibold tracking-wide">
                Featured projects
              </span>
            </div>
            
            <h2 className="text-headline text-foreground mb-10">
              We blend creativity with technical marketing expertise
            </h2>
            
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Become our client
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Content - Abstract Pattern with Parallax */}
          <motion.div
            style={{ y }}
            className="lg:col-span-5 hidden lg:flex justify-center items-center"
          >
            <div className="relative w-80 h-80">
              {/* Animated circles */}
              <motion.div
                style={{ rotate }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground/20"
                  />
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="90"
                    ry="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground/20"
                  />
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="90"
                    ry="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground/20"
                    transform="rotate(60 100 100)"
                  />
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="90"
                    ry="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground/20"
                    transform="rotate(120 100 100)"
                  />
                </svg>
              </motion.div>
              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary glow-lime" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
