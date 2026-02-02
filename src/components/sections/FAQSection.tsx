import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";
import { useFAQs, FAQ as DBFAQ } from "@/hooks/useFAQs";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const fallbackFAQs: FAQItem[] = [
  {
    id: "1",
    question: "What is your typical project timeline?",
    answer:
      "The timeline for a project typically ranges from 4 to 8 weeks, depending on the scope and complexity. After an initial consultation, I'll provide a detailed timeline with key milestones so you know what to expect at each stage.",
  },
  {
    id: "2",
    question: "Do you offer ongoing maintenance and support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages to ensure your website or marketing campaigns continue to perform optimally. This includes regular updates, security patches, performance monitoring, and content updates as needed.",
  },
  {
    id: "3",
    question: "Can you work with existing brand guidelines?",
    answer:
      "Absolutely! We love working with established brand guidelines and can seamlessly integrate your existing visual identity into new projects. If you don't have brand guidelines yet, we can help create them as part of our branding services.",
  },
  {
    id: "4",
    question: "How do you handle revisions and feedback?",
    answer:
      "We believe in a collaborative approach. Each project includes multiple revision rounds to ensure you're completely satisfied. We use structured feedback sessions and clear communication channels to incorporate your input efficiently.",
  },
  {
    id: "5",
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply reach out through our contact form or email us directly. We'll schedule an initial consultation to discuss your goals, requirements, and vision. From there, we'll provide a detailed proposal and timeline for your project.",
  },
];

// Transform DB FAQ to display format
const transformFAQ = (dbFAQ: DBFAQ): FAQItem => ({
  id: dbFAQ.id,
  question: dbFAQ.question,
  answer: dbFAQ.answer,
});

interface FAQSectionProps {
  /** Enable sticky scroll behavior (homepage). Disable on standalone page. */
  sticky?: boolean;
}

export const FAQSection = ({ sticky = true }: FAQSectionProps) => {
  const { data: dbFAQs, isLoading } = useFAQs();
  const enterMotion = usePremiumEnterMotion();

  // Use DB FAQs if available, otherwise fallback
  const faqs = dbFAQs && dbFAQs.length > 0 
    ? dbFAQs.map(transformFAQ) 
    : fallbackFAQs;

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center section-light">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <motion.section
      id="faq"
      className={`section-light min-h-screen py-16 sm:py-24 md:py-32 ${sticky ? "lg:sticky lg:top-20 z-[17]" : ""}`}
      {...enterMotion}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-headline">
            Got questions?
          </h2>
        </motion.div>

        {/* FAQ Accordion - No borders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-white rounded-2xl px-4 sm:px-6 md:px-8 border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-6 text-background">
                    <span className="text-base sm:text-lg font-semibold pr-4 flex-1 min-w-0">
                      <span className="text-muted-foreground mr-3">
                        0{index + 1}/
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { fallbackFAQs as faqs };
