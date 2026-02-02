import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { projects as fallbackProjects } from "@/components/sections/ProjectsGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectsPage = () => {
  const { data: dbProjects, isLoading } = useProjects();

  // Use DB projects if available, otherwise fallback
  const projects = dbProjects && dbProjects.length > 0 
    ? dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        date: p.date || new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: p.duration || '',
        image: p.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        logo: p.logo_url || undefined,
        category: p.category || undefined,
      }))
    : fallbackProjects;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background pt-24 sm:pt-28 pb-8 sm:pb-12 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">
              Featured Projects
            </h1>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              Explore our portfolio of successful projects where creativity meets
              strategic marketing excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid / Mobile Carousel - content-sized on mobile, no forced 100vh */}
      <section className="bg-background py-8 sm:py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Mobile: Carousel */}
              <div className="md:hidden">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {projects.map((project, index) => (
                      <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full">
                        <Link to={`/projects/${project.id}`} className="block group">
                          <div className="mb-4">
                            <div className="flex items-center gap-3 text-primary text-sm mb-2">
                              <span>{project.date}</span>
                              {project.time && <span>{project.time}</span>}
                              {project.category && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                  {project.category}
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground mt-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="overflow-hidden rounded-xl">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 border-border bg-background/90 hover:bg-background" />
                  <CarouselNext className="right-2 border-border bg-background/90 hover:bg-background" />
                </Carousel>
              </div>

              {/* Desktop: Grid */}
              <div className="hidden md:block">
              {/* First Row - 2 Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {projects.slice(0, 2).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/projects/${project.id}`} className="block group">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 text-primary text-sm mb-2">
                          <span>{project.date}</span>
                          {project.time && <span>{project.time}</span>}
                          {project.category && (
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                              {project.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Second Row - 3 Projects */}
              {projects.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {projects.slice(2, 5).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                    >
                      <Link to={`/projects/${project.id}`} className="block group">
                        <div className="mb-4">
                          <div className="flex items-center gap-3 text-primary text-sm mb-2">
                            <span>{project.date}</span>
                            {project.time && <span>{project.time}</span>}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {project.description}
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Additional Projects */}
              {projects.length > 5 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  {projects.slice(5).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link to={`/projects/${project.id}`} className="block group">
                        <div className="mb-4">
                          <div className="flex items-center gap-3 text-primary text-sm mb-2">
                            <span>{project.date}</span>
                            {project.time && <span>{project.time}</span>}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {project.description}
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
