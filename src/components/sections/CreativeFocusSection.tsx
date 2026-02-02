import { motion, useScroll, useTransform } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { Briefcase, TrendingUp, Users, Monitor } from "lucide-react";
import { useRef } from "react";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";

const creativeFocusMarquee = [
  "Corporate websites",
  "Blogs",
  "Social media management",
  "Videography",
  "UI/UX design",
  "Web development",
  "Ecommerce",
];

const focusAreas = [
  {
    icon: Briefcase,
    title: "Business strategy",
    description: "Comprehensive market analysis and strategic planning",
  },
  {
    icon: TrendingUp,
    title: "Financial & management controls",
    description: "Data-driven performance optimization",
  },
  {
    icon: Users,
    title: "Human resources management",
    description: "Building high-performance teams",
  },
  {
    icon: Monitor,
    title: "Information technology",
    description: "Digital transformation solutions",
  },
];

export const CreativeFocusSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const enterMotion = usePremiumEnterMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.section
      id="creative-focus"
      ref={containerRef}
      className="lg:sticky lg:top-20 z-[14] section-light py-0 min-h-screen"
      {...enterMotion}
    >
      {/* Marquee */}
      <Marquee items={creativeFocusMarquee} variant="primary" speed="slow" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Title with Parallax */}
          <motion.div
            style={{ y: titleY }}
            className="lg:sticky lg:top-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-muted-foreground text-sm font-semibold tracking-wide">
                Our creative focus
              </span>
              <h2 className="text-headline mt-6">
                Our creative
                <br />
                focus
              </h2>
            </motion.div>
          </motion.div>

          {/* Right - Focus Areas */}
          <div className="space-y-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-light-bg rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <area.icon className="w-6 h-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-background mb-2">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {area.description}
                    </p>
                    <div className="mt-4 h-1 bg-primary rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
