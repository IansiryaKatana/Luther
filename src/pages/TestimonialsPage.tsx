import { Layout } from "@/components/layout/Layout";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const TestimonialsPage = () => {
  return (
    <Layout>
      <div className="pt-20 sm:pt-24">
        <TestimonialsSection limit={undefined} sticky={false} />
      </div>
    </Layout>
  );
};

export default TestimonialsPage;
