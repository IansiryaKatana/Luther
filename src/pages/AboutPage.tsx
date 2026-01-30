import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  MedalIcon,
  UsersThreeIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Marquee } from "@/components/ui/Marquee";

const aboutMarquee = [
  "Brand Strategy",
  "Digital Excellence",
  "Creative Vision",
  "Marketing Innovation",
  "Client Success",
];

const values: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Innovation",
    description:
      "We push boundaries and embrace new ideas to deliver cutting-edge solutions that set our clients apart.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Excellence",
    description:
      "Every project receives our full attention and commitment to delivering exceptional results.",
    icon: MedalIcon,
  },
  {
    title: "Collaboration",
    description:
      "We believe in working closely with our clients, treating every project as a true partnership.",
    icon: UsersThreeIcon,
  },
  {
    title: "Integrity",
    description:
      "We maintain transparency and honesty in all our dealings, building trust that lasts.",
    icon: ShieldCheckIcon,
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero - 90vh */}
      <section className="min-h-[75vh] bg-background flex items-center pt-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-primary text-sm font-medium">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl">
              We're a creative marketing agency based in Dubai
            </h1>
            <p className="text-muted-foreground mt-6 text-xl max-w-2xl">
              With over 8 years of experience, we've helped brands across the
              globe tell their stories and achieve remarkable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee items={aboutMarquee} />

      {/* Values - 75vh */}
      <section className="min-h-[75vh] bg-light-bg flex flex-col justify-center py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-background">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const words = value.description.split(" ");
              return (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.2,
                        ease: [0.22, 1, 0.36, 1],
                        staggerChildren: 0.12,
                        delayChildren: 0.08,
                      },
                    },
                  }}
                  className="group bg-white rounded-[8px] min-h-[320px] md:min-h-[360px] p-6 md:p-8 flex flex-col items-start text-left justify-between transition-colors duration-300 hover:bg-primary"
                >
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    className="shrink-0 text-black transition-colors duration-300 group-hover:text-primary-foreground"
                  >
                    <Icon size={100} weight="thin" color="currentColor" className="shrink-0" />
                  </motion.div>
                  <motion.h3
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    className="text-2xl md:text-3xl font-bold text-background shrink-0 transition-colors duration-300 group-hover:text-primary-foreground"
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.04, delayChildren: 0 },
                      },
                    }}
                    className="text-muted-foreground text-sm md:text-base leading-relaxed flex flex-wrap gap-x-1.5 shrink-0 transition-colors duration-300 group-hover:text-primary-foreground"
                  >
                    {words.map((word, i) => (
                      <motion.span
                        key={i}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="inline"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
