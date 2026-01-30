import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsIntro } from "@/components/sections/FeaturedProjectsIntro";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { CreativeFocusSection } from "@/components/sections/CreativeFocusSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProjectsIntro />
      <ProjectsGrid />
      <CreativeFocusSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <FAQSection />
      <SocialMediaSection />
    </Layout>
  );
};

export default Index;
