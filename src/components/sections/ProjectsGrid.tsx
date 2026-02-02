import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";
import { useProjects, Project as DBProject } from "@/hooks/useProjects";

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  logo?: string;
  category?: string;
}

// Fallback projects for when database is empty
const fallbackProjects: Project[] = [
  {
    id: "avantgarde",
    title: "Avantgarde Estate & Co. Limited",
    description: "Where innovation meets strength, redefining modern construction through design and precision.",
    date: "October 30, 2025",
    time: "1:19 pm",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: "Branding",
  },
  {
    id: "orion",
    title: "Orion Holding Limited",
    description: "Breaking boundaries in business solutions through strategy, creativity, and innovation.",
    date: "October 28, 2025",
    time: "11:19 am",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    category: "Marketing",
  },
  {
    id: "fairmont",
    title: "Fairmont PM",
    description: "Building a construction identity defined by integrity, precision, and timeless design.",
    date: "November 20, 2025",
    time: "12:34 pm",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Branding",
  },
  {
    id: "urbanhub",
    title: "Urban Hub",
    description: "Redefining student living through vibrant design, digital innovation, and community-first storytelling.",
    date: "October 28, 2025",
    time: "11:19 am",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Digital",
  },
  {
    id: "unityliving",
    title: "Unity Living",
    description: "Unity Living offers safe, secure, and stylish student accommodation in prime locations in United Kingdom.",
    date: "October 28, 2025",
    time: "11:19 am",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    category: "Strategy",
  },
];

// Transform DB project to display format
const transformProject = (dbProject: DBProject): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  description: dbProject.description || '',
  date: dbProject.date || new Date(dbProject.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  time: dbProject.duration || '',
  image: dbProject.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  logo: dbProject.logo_url || undefined,
  category: dbProject.category || undefined,
});

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "medium";
}

const ProjectCard = ({ project, index, size = "large" }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.97, 1, 0.97]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full p-4 sm:p-6 md:p-8 lg:p-10 bg-background overflow-hidden"
    >
      <Link to={`/projects/${project.id}`} className="block group h-full flex flex-col min-h-0">
        <div className="mb-5 shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-primary text-sm mb-3">
            <span className="font-medium">{project.date}</span>
            <span className="text-muted-foreground">{project.time}</span>
            {project.category && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                {project.category}
              </span>
            )}
          </div>
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors duration-300 ${
            size === "large" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}>
            {project.title}
            <ArrowUpRight className="inline-block w-5 h-5 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
          </h3>
          <p className="text-muted-foreground mt-3 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        <motion.div style={{ scale }} className="overflow-hidden rounded-2xl relative flex-1 min-h-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <motion.img
            style={{ y }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Mobile Carousel Component
const MobileCarousel = ({ projectsList, rowIndex }: { projectsList: Project[]; rowIndex: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const itemWidth = scrollWidth / projectsList.length;
      containerRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const itemWidth = scrollWidth / projectsList.length;
      const newIndex = Math.round(containerRef.current.scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projectsList.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-screen min-h-[420px] snap-start border border-border"
          >
            <ProjectCard project={project} index={index} size={rowIndex === 0 ? "large" : "medium"} />
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projectsList.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const ProjectsGrid = () => {
  const { data: dbProjects, isLoading } = useProjects();
  const enterMotion = usePremiumEnterMotion();

  // Use DB projects if available, otherwise fallback
  const projects = dbProjects && dbProjects.length > 0 
    ? dbProjects.map(transformProject) 
    : fallbackProjects;

  const firstRow = projects.slice(0, 2);
  const secondRow = projects.slice(2, 5);
  const allProjectsForCarousel = projects.slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Single carousel (all projects) */}
      <motion.section
        id="projects-mobile"
        className="md:hidden min-h-0 bg-background flex flex-col py-6 sm:py-8 md:py-0 overflow-hidden"
        {...enterMotion}
      >
        <div className="w-full px-2 sm:px-4">
          <MobileCarousel projectsList={allProjectsForCarousel} rowIndex={0} />
        </div>
      </motion.section>

      {/* Desktop: First Row - 2 Projects (100vh - 40px) — top-20 = below sticky header */}
      <motion.section
        id="projects-row-1"
        className="hidden md:flex lg:sticky lg:top-20 z-[12] min-h-[calc(100vh-40px)] bg-background items-stretch"
        {...enterMotion}
      >
        <div className="w-full min-h-[calc(100vh-40px)] grid grid-cols-2 border border-border divide-x divide-border">
          {firstRow.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} size="large" />
          ))}
        </div>
      </motion.section>

      {/* Desktop: Second Row - 3 Projects (100vh) — top-20 = below sticky header */}
      {secondRow.length > 0 && (
        <motion.section
          id="projects-row-2"
          className="hidden md:flex lg:sticky lg:top-20 z-[13] min-h-screen bg-background items-stretch"
          {...enterMotion}
        >
          <div className="w-full min-h-screen grid grid-cols-3 border border-border divide-x divide-border">
            {secondRow.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 2} size="medium" />
            ))}
          </div>
        </motion.section>
      )}
    </>
  );
};

export { fallbackProjects as projects };
