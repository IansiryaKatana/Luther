import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <footer ref={containerRef} className="bg-background">
      <div className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content with Parallax */}
            <motion.div style={{ y: leftY }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-sm font-semibold tracking-wide">
                    Get in touch
                  </span>
                </div>
                <h2 className="text-headline text-foreground mb-8">
                  Let's create
                  <br />
                  something
                  <br />
                  amazing
                </h2>
                <p className="text-muted-foreground text-xl max-w-md leading-relaxed">
                  Ready to elevate your brand? Let's discuss how we can help you
                  achieve your marketing goals.
                </p>

                <Link to="/contact" className="inline-block mt-10">
                  <Button variant="hero" size="lg" className="group">
                    Become our client
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Contact Info with Parallax */}
            <motion.div style={{ y: rightY }} className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "Hello@Luther.ae",
                  href: "mailto:Hello@Luther.ae",
                  isLink: true,
                },
                {
                  icon: Phone,
                  title: "Landline",
                  value: "(04) 252 4543",
                  href: "tel:+97142524543",
                  isLink: true,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+971 58 589 7786",
                  href: "tel:+971585897786",
                  isLink: true,
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Dubai, United Arab Emirates",
                  isLink: false,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4 sm:gap-5 group min-w-0"
                >
                  <div className="p-4 bg-card rounded-2xl group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1 text-lg">
                      {item.title}
                    </h3>
                    {item.isLink ? (
                      <a
                        href={item.href}
                        className={`transition-colors ${
                          item.title === "Email"
                            ? "text-primary hover:text-primary/80"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Luther International Marketing. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
