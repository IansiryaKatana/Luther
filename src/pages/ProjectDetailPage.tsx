import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useProject, useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock, Asterisk, Loader2 } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id ?? "");
  const { data: allProjects = [] } = useProjects();

  const projects = allProjects;
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  const featuredImage =
    project?.featured_image_url || project?.image_url || undefined;
  const displayDate =
    project?.date ||
    (project?.created_at
      ? new Date(project.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "");

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (isError || !project) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            <Link to="/projects">
              <Button variant="outline">Back to Projects</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/projects"
                className="hover:text-foreground transition-colors"
              >
                Projects
              </Link>
              <span>/</span>
              <span className="text-foreground">{project.title}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-6 text-primary text-sm mb-6">
              {displayDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{displayDate}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.category && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {project.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <section className="bg-background pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={featuredImage}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              {project.content ? (
                <div
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    About The Project
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description ||
                      "No additional content has been added for this project yet."}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {project.category && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Category
                  </h3>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
              )}
              {project.duration && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Project Duration
                  </h3>
                  <p className="text-muted-foreground">{project.duration}</p>
                </div>
              )}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Services Provided
                </h3>
                <ul className="space-y-3">
                  {[
                    "Brand Strategy",
                    "Visual Identity",
                    "Web Design",
                    "Marketing Collateral",
                  ].map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <Asterisk className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-background py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject ? (
              <Link to={`/projects/${prevProject.id}`} className="order-2 sm:order-1">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Previous Project
                </Button>
              </Link>
            ) : (
              <div className="order-2 sm:order-1" />
            )}
            <Link
              to="/projects"
              className="order-1 sm:order-2"
            >
              <Button variant="outline">All Projects</Button>
            </Link>
            {nextProject ? (
              <Link to={`/projects/${nextProject.id}`} className="order-3">
                <Button variant="ghost" className="group">
                  Next Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div className="order-3" />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetailPage;
