import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Asterisk, Loader2 } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { useRef } from "react";
import {
  useHowWeWorkSteps,
  useHowWeWorkStats,
  useServicesMarquee,
  HowWeWorkStep,
  HowWeWorkStat,
  ServiceMarquee,
} from "@/hooks/useHowWeWork";

const fallbackServicesMarquee = [
  "Corporate websites",
  "Blogs",
  "Social media management",
  "Videography",
  "UI/UX design",
  "Web development",
  "Ecommerce",
];

const fallbackProcessSteps = [
  {
    phase: "Discovery",
    number: "01",
    title: "We dive deep into your personal goals and long-term vision",
    duration: "13 - 15 days",
    points: [
      "Initial consultation: Understand the client's vision, goals, and target audience.",
      "Research: Analyze competitors and industry trends to gather insights.",
      "Define scope: Set the project's objectives, deliverables, and timelines.",
    ],
  },
  {
    phase: "Design",
    number: "02",
    title: "We create mockups that bring your brand to life",
    duration: "13 - 15 days",
    points: [
      "Wireframing: Create low-fidelity wireframes to map out the site's structure.",
      "Style guide creation: Develop a design language including colors, fonts, and UI elements.",
      "Prototype development: Build clickable prototypes for client feedback.",
    ],
  },
  {
    phase: "Build",
    number: "03",
    title: "Using codes & tools, we bring your vision to life",
    duration: "13 - 15 days",
    points: [
      "Page construction: Build out the website structure using selected tools.",
      "Content integration: Import and format content (text, images, videos).",
      "Basic SEO setup: Optimize on-page elements for search engines.",
    ],
  },
  {
    phase: "Marketing",
    number: "04",
    title: "Your vision goes live, ready to make an impact",
    duration: "13 - 15 days",
    points: [
      "Client review: Present the site to the client for feedback.",
      "Revisions: Make necessary changes based on client feedback.",
    ],
  },
];

const fallbackStats = [
  {
    value: "95+",
    label: "Customer satisfaction",
    unit: "Percent",
    isHighlighted: true,
  },
  {
    value: "10+",
    label: "Of experience",
    unit: "Years",
    isHighlighted: false,
  },
  {
    value: "24+",
    label: "Completed",
    unit: "Projects",
    isHighlighted: false,
  },
];

// Transform DB step to display format
const transformStep = (dbStep: HowWeWorkStep) => ({
  phase: dbStep.phase,
  number: dbStep.step_number,
  title: dbStep.title,
  duration: dbStep.duration || "",
  points: dbStep.points,
});

// Transform DB stat to display format
const transformStat = (dbStat: HowWeWorkStat) => ({
  value: dbStat.stat_value,
  label: dbStat.label,
  unit: dbStat.unit,
  isHighlighted: dbStat.is_highlighted || false,
});

// Transform DB service to display format
const transformService = (dbService: ServiceMarquee) => dbService.service_name;

export const HowWeWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: dbSteps, isLoading: stepsLoading } = useHowWeWorkSteps();
  const { data: dbStats, isLoading: statsLoading } = useHowWeWorkStats();
  const { data: dbServices, isLoading: servicesLoading } = useServicesMarquee();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const statsY = useTransform(scrollYProgress, [0.5, 1], [100, 0]);

  const isLoading = stepsLoading || statsLoading || servicesLoading;

  // Use DB data if available, otherwise fallback
  const servicesMarquee = dbServices && dbServices.length > 0
    ? dbServices.map(transformService)
    : fallbackServicesMarquee;

  const processSteps = dbSteps && dbSteps.length > 0
    ? dbSteps.map(transformStep)
    : fallbackProcessSteps;

  const stats = dbStats && dbStats.length > 0
    ? dbStats.map(transformStat)
    : fallbackStats;

  if (isLoading) {
    return (
      <section className="relative z-[15] isolate bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section
      id="how-we-work"
      ref={containerRef}
      className="relative z-[15] isolate bg-background min-h-screen"
    >
      {/* Services Marquee */}
      <Marquee items={servicesMarquee} speed="normal" variant="dark" />

      <div className="container mx-auto px-6 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="text-muted-foreground text-sm font-semibold tracking-wide">
            Company branding & web design
          </span>
          <h2 className="text-headline text-foreground mt-6">
            How we work
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="border-t border-border">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="py-14 border-b border-border group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Phase Badge & Number */}
                <div className="lg:col-span-3 flex items-center gap-6">
                  <span className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold group-hover:border-primary group-hover:text-primary transition-colors duration-300">
                    {step.phase}
                  </span>
                  <div className="flex items-center gap-2">
                    <Asterisk className="w-5 h-5 text-primary" />
                    <span className="text-3xl font-bold text-foreground">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Title & Points */}
                <div className="lg:col-span-7">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8">
                    {step.title}
                  </h3>
                  <ul className="space-y-4">
                    {step.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-start gap-4 text-muted-foreground"
                      >
                        <Asterisk className="w-4 h-4 text-primary flex-shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration */}
                <div className="lg:col-span-2 flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats: mobile 2 per row, desktop one row (flex) resized to fit */}
        <motion.div
          style={{ y: statsY }}
          className="grid grid-cols-2 md:flex md:flex-nowrap gap-2 sm:gap-4 md:gap-4 lg:gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`rounded-2xl md:rounded-2xl p-3 sm:p-6 md:p-4 lg:p-6 min-w-0 md:flex-1 ${stat.isHighlighted ? "stats-lime" : "stats-dark"}`}
            >
              <div className="flex items-baseline gap-0.5 flex-nowrap mb-2 sm:mb-4 md:mb-3 lg:mb-4">
                <span className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold whitespace-nowrap">{stat.value}</span>
                <span className="text-xs sm:text-sm md:text-xs lg:text-sm opacity-70 font-medium whitespace-nowrap flex-shrink-0">{stat.unit}</span>
              </div>
              <div className="text-xs sm:text-base md:text-sm lg:text-base font-semibold mt-0.5 md:mt-1 line-clamp-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
