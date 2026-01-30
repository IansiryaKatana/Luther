import { Layout } from "@/components/layout/Layout";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const TestimonialsPage = () => {
  return (
    <Layout>
      <TestimonialsSection limit={undefined} sticky={false} />
    </Layout>
  );
};

export default TestimonialsPage;
