import { Layout } from "@/components/layout/Layout";
import { FAQSection } from "@/components/sections/FAQSection";

const FAQPage = () => {
  return (
    <Layout>
      <FAQSection sticky={false} />
    </Layout>
  );
};

export default FAQPage;
