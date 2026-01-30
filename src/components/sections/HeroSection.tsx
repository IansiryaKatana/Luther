import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Asterisk, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";
import { useHeroSettings } from "@/hooks/useHeroSettings";

const fallbackServices = [
  "Branding and identity",
  "Social media strategy",
  "Events & marketing",
  "Photography & videography",
];

const fallbackSettings = {
  background_type: "video" as const,
  video_url: "https://assets.mixkit.co/videos/preview/mixkit-desert-road-from-above-2943-large.mp4",
  poster_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  image_url: null,
  tagline: "International marketing",
  title: "Luther",
  button_text: "Start your project",
  services: fallbackServices,
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const enterMotion = usePremiumEnterMotion();
  const { data: heroSettings, isLoading } = useHeroSettings();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Use database settings or fallback
  const settings = heroSettings || fallbackSettings;
  const services = settings.services || fallbackServices;

  if (isLoading) {
    return (
      <div className="lg:sticky lg:top-20 z-[10] bg-background p-[5px]">
        <div className="relative overflow-hidden border border-border rounded-3xl min-h-[calc(100vh-10px)] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div id="hero" className="lg:sticky lg:top-20 z-[10] bg-background p-[5px]">
      <motion.section
        ref={containerRef}
        className="relative overflow-hidden border border-border rounded-3xl min-h-[calc(100vh-10px)]"
        {...enterMotion}
      >
        {/* Background with Parallax */}
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          {settings.background_type === "video" && settings.video_url ? (
            <video
              key={settings.video_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={settings.poster_url || undefined}
              src={settings.video_url}
            />
          ) : settings.image_url ? (
            <img
              src={settings.image_url}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-10px)] flex flex-col justify-center pt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-muted-foreground text-lg mb-6"
              >
                {settings.tagline}
              </motion.p>

              <h1 className="text-display text-foreground">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block"
                >
                  {settings.title}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-block text-[0.4em] align-top ml-4 text-muted-foreground"
                >
                  ®
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-10"
              >
                <Link to="/contact">
                  <Button variant="hero" size="xl" className="group">
                    {settings.button_text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Services */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <Asterisk className="w-4 h-4 text-primary flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-foreground/90 text-lg font-medium group-hover:text-primary transition-colors">
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};
