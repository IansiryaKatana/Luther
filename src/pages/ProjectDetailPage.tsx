import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useProject, useProjects } from "@/hooks/useProjects";
import { useProjectGallery } from "@/hooks/useProjectGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock, Asterisk, Loader2 } from "lucide-react";

const THUMBNAILS_VISIBLE = 3;

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id ?? "");
  const { data: allProjects = [] } = useProjects();
  const { data: galleryImages = [] } = useProjectGallery(id ?? null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id, galleryImages.length]);

  const hasGallery = galleryImages.length > 0;
  const mainImageUrl = hasGallery
    ? galleryImages[selectedImageIndex]?.image_url
    : project?.featured_image_url || project?.image_url || undefined;

  const thumbStart = useMemo(() => {
    if (galleryImages.length <= THUMBNAILS_VISIBLE) return 0;
    const half = Math.floor(THUMBNAILS_VISIBLE / 2);
    return Math.max(0, Math.min(selectedImageIndex - half, galleryImages.length - THUMBNAILS_VISIBLE));
  }, [galleryImages.length, selectedImageIndex]);

  const visibleThumbnails = useMemo(
    () => galleryImages.slice(thumbStart, thumbStart + THUMBNAILS_VISIBLE),
    [galleryImages, thumbStart]
  );

  const displayDate =
    project?.date ||
    (project?.created_at
      ? new Date(project.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "");

  const projects = allProjects;
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

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
      {/* Hero: full-width bg = featured/gallery image, title/desc/meta bottom left, thumbnails bottom right */}
      <section
        className={`relative w-full min-h-[85vh] flex flex-col justify-end pt-24 sm:pt-28 ${!mainImageUrl ? "bg-zinc-900" : ""}`}
        style={{
          backgroundImage: mainImageUrl ? `url(${mainImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            {/* Bottom left: title, description, meta */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/80 mb-3">
                  <Link to="/" className="hover:text-white transition-colors shrink-0">
                    Home
                  </Link>
                  <span className="shrink-0">/</span>
                  <Link to="/projects" className="hover:text-white transition-colors shrink-0">
                    Projects
                  </Link>
                  <span className="shrink-0">/</span>
                  <span className="text-white truncate min-w-0" title={project.title}>
                    {project.title}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 break-words drop-shadow-sm">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-4 drop-shadow-sm">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/90 text-sm">
                  {displayDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{displayDate}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{project.duration}</span>
                    </div>
                  )}
                  {project.category && (
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Bottom right: 3 thumbnails + flattened dots */}
            {hasGallery && galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-end shrink-0"
              >
                <div className="flex gap-2">
                  {visibleThumbnails.map((img, i) => {
                    const globalIndex = thumbStart + i;
                    const isSelected = globalIndex === selectedImageIndex;
                    return (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => setSelectedImageIndex(globalIndex)}
                        className={`rounded-lg overflow-hidden border-2 transition-all shrink-0 w-16 h-16 sm:w-20 sm:h-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
                          isSelected
                            ? "border-white opacity-100 ring-2 ring-white/50"
                            : "border-white/40 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
                {galleryImages.length > 1 && (
                  <div className="flex gap-1.5 mt-2 justify-end">
                    {galleryImages.map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                          i === selectedImageIndex
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Project details: white/light section — content, category, duration, services */}
      <section className="bg-zinc-100 text-zinc-900 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-6">
                Project details
              </h2>
              {project.content ? (
                <div
                  className="prose prose-zinc prose-lg max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-li:text-zinc-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:max-w-full prose-img:w-full"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              ) : (
                <p className="text-zinc-700 text-lg leading-relaxed">
                  {project.description ||
                    "No additional content has been added for this project yet."}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden"
            >
              {project.category && (
                <div className="p-6 border-b border-zinc-200">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    Category
                  </h3>
                  <p className="text-zinc-900 font-medium">{project.category}</p>
                </div>
              )}
              {project.duration && (
                <div className="p-6 border-b border-zinc-200">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    Project duration
                  </h3>
                  <p className="text-zinc-900 font-medium">{project.duration}</p>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Services provided
                </h3>
                <ul className="space-y-2">
                  {[
                    "Brand Strategy",
                    "Visual Identity",
                    "Web Design",
                    "Marketing Collateral",
                  ].map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 text-zinc-600"
                    >
                      <Asterisk className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Nav below project description */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-zinc-200">
            {prevProject ? (
              <Link to={`/projects/${prevProject.id}`} className="order-2 sm:order-1">
                <Button variant="outline" size="sm" className="group text-zinc-700 border-zinc-300 hover:bg-zinc-200">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Previous Project
                </Button>
              </Link>
            ) : (
              <div className="order-2 sm:order-1" />
            )}
            <Link to="/projects" className="order-1 sm:order-2">
              <Button variant="secondary" size="sm" className="text-zinc-700 bg-zinc-200 hover:bg-zinc-300">
                All Projects
              </Button>
            </Link>
            {nextProject ? (
              <Link to={`/projects/${nextProject.id}`} className="order-3">
                <Button variant="outline" size="sm" className="group text-zinc-700 border-zinc-300 hover:bg-zinc-200">
                  Next Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
