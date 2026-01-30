import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";
import { useTestimonials, Testimonial as DBTestimonial } from "@/hooks/useTestimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  content: string;
  role?: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Chloe Barrett",
    role: "CEO, TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "I was blown away by the creativity and precision. They turned vague ideas into a beautiful brand experience. The process was smooth, supportive, and extremely efficient from start to finish.",
  },
  {
    id: "2",
    name: "Daniel Rhodes",
    role: "Founder, Innovate Labs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "Their design skills are exceptional, and the final result speaks for itself. Fast delivery, collaborative process, and stunning visuals. I'm incredibly proud to showcase our new online identity.",
  },
  {
    id: "3",
    name: "Samuel Reed",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "From concept to launch, they handled everything with professionalism and creativity. The branding and website exceeded expectations. Their communication was excellent, and they truly understood our vision perfectly.",
  },
  {
    id: "4",
    name: "Maya Turner",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    content:
      "Working with this team was an absolute game-changer. They brought my brand to life with smart strategy, bold design, and flawless execution. I recommend them to anyone serious about growth.",
  },
];

// Transform DB testimonial to display format
const transformTestimonial = (dbTestimonial: DBTestimonial): Testimonial => ({
  id: dbTestimonial.id,
  name: dbTestimonial.author_name,
  avatar: dbTestimonial.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  rating: dbTestimonial.rating || 5,
  content: dbTestimonial.content,
  role: dbTestimonial.author_role || undefined,
});

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-card rounded-3xl p-8 hover:bg-dark-elevated transition-colors duration-300 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-medium">
            {testimonial.rating}.0/5
          </span>
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-primary text-primary"
              />
            ))}
          </div>
        </div>
        <Quote className="w-10 h-10 text-muted-foreground/20" />
      </div>

      {/* Content */}
      <p className="text-foreground font-medium leading-relaxed mb-8 text-lg">
        {testimonial.content}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <span className="text-foreground font-semibold block">{testimonial.name}</span>
          {testimonial.role && (
            <span className="text-muted-foreground text-sm">{testimonial.role}</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  /** Max number of testimonials to show. Omit to show all (e.g. on /testimonials page). */
  limit?: number;
  /** Enable sticky scroll behavior (homepage). Disable on standalone page. */
  sticky?: boolean;
}

export const TestimonialsSection = ({ limit = 4, sticky = true }: TestimonialsSectionProps) => {
  const { data: dbTestimonials, isLoading } = useTestimonials();
  const enterMotion = usePremiumEnterMotion();

  // Use DB testimonials if available, otherwise fallback
  const testimonials = dbTestimonials && dbTestimonials.length > 0 
    ? dbTestimonials.map(transformTestimonial) 
    : fallbackTestimonials;
  const display = limit != null ? testimonials.slice(0, limit) : testimonials;

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <motion.section
      id="testimonials"
      className={`bg-background min-h-0 py-12 md:py-24 lg:py-32 overflow-hidden ${sticky ? "lg:min-h-screen lg:sticky lg:top-20 z-[16]" : ""}`}
      {...enterMotion}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-headline text-foreground">
            What others say
            <br />
            about our impact
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-sm font-medium">
              Their honest take
            </span>
          </div>
        </motion.div>

        {/* Testimonials Carousel — dots only */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {display.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/4"
              >
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6 md:mt-8" />
        </Carousel>
      </div>
    </motion.section>
  );
};

export { fallbackTestimonials as testimonials };
