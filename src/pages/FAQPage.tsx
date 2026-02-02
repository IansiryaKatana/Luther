import { Layout } from "@/components/layout/Layout";
import { FAQSection } from "@/components/sections/FAQSection";

const FAQPage = () => {
  return (
    <Layout>
      <div className="pt-20 sm:pt-24">
        <FAQSection sticky={false} />
      </div>
    </Layout>
  );
};

export default FAQPage;
