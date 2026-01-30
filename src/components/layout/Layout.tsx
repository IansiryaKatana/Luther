import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ScrollProgress } from "./ScrollProgress";
import { NoiseTexture } from "@/components/effects/NoiseTexture";
import { PageTransition } from "@/components/PageTransition";
import { ContactSection } from "@/components/sections/ContactSection";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/contact";

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col relative">
        <NoiseTexture />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        {!hideFooter && <ContactSection />}
      </div>
    </PageTransition>
  );
};
