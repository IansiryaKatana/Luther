import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Settings, Mail, Phone, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Faq", path: "/faq" },
  { name: "Projects", path: "/projects" },
  { name: "Testimonials", path: "/testimonials" },
];

export const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isFaqPage = location.pathname === "/faq";
  const isHomePage = location.pathname === "/";

  const headerScrolledClasses = isFaqPage && scrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-black/10"
    : scrolled
      ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
      : "";

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top)] ${
        scrolled ? headerScrolledClasses : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl lg:text-3xl font-bold tracking-tight ${isFaqPage ? "text-black" : "text-primary"}`}
            >
              Luther
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:flex items-center gap-1 bg-muted/30 backdrop-blur-sm rounded-full p-1.5"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "navActive" : "nav"}
                  size="sm"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-4"
          >
            {user && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}
            <a
              href="mailto:Hello@Luther.ae"
              className={`transition-colors text-sm font-medium link-underline ${
                isFaqPage ? "text-black hover:text-black/80" : "text-primary hover:text-primary/80"
              }`}
            >
              Hello@Luther.ae
            </a>
            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                className={`group ${
                  isHomePage
                    ? "!bg-white !text-black border-0 hover:!bg-gray-100 hover:!text-black"
                    : isFaqPage
                      ? "!bg-black !text-white border-black hover:!bg-black/90 hover:!text-white"
                      : ""
                }`}
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button with Sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-full hover:bg-muted/30 transition-colors ${
                    isFaqPage ? "text-black" : "text-foreground"
                  }`}
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-[320px] sm:max-w-[360px] border-l border-border/80 p-0 bg-background/98 backdrop-blur-xl flex flex-col"
              >
                {/* Sheet header – single close */}
                <div className="flex items-center justify-between px-5 h-16 border-b border-border/50 shrink-0">
                  <span className="text-xl font-semibold tracking-tight text-primary">
                    Luther
                  </span>
                  <SheetClose asChild>
                    <button
                      className="p-2.5 -mr-2 rounded-full hover:bg-muted/50 active:bg-muted transition-colors touch-manipulation"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <nav className="px-5 py-6 space-y-0.5">
                    {navLinks.map((link) => (
                      <SheetClose key={link.path} asChild>
                        <Link
                          to={link.path}
                          className={`block py-3.5 text-base font-medium tracking-tight transition-colors ${
                            isActive(link.path)
                              ? "text-primary"
                              : "text-foreground/90 hover:text-primary"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="px-5 py-6 border-t border-border/50 space-y-5">
                    {user && (
                      <SheetClose asChild>
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Settings className="w-4 h-4 shrink-0" />
                          Admin Dashboard
                        </Link>
                      </SheetClose>
                    )}
                    <div className="space-y-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                        Get in touch
                      </p>
                      <div className="space-y-3">
                        <a
                          href="mailto:Hello@Luther.ae"
                          className="flex items-center gap-3 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4 shrink-0 text-muted-foreground" />
                          Hello@Luther.ae
                        </a>
                        <a
                          href="tel:+97142524543"
                          className="flex items-center gap-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4 shrink-0" />
                          (04) 252 4543
                        </a>
                        <a
                          href="tel:+971585897786"
                          className="flex items-center gap-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4 shrink-0" />
                          +971 58 589 7786
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          className="p-2 rounded-full bg-muted/40 text-muted-foreground hover:text-primary hover:bg-muted/60 transition-colors"
                          aria-label={social.name}
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 pt-4 pb-8 border-t border-border/50">
                    <SheetClose asChild>
                      <Link to="/contact">
                        <Button
                          size="lg"
                          variant="hero"
                          className="w-full rounded-full h-12 font-medium gap-2"
                        >
                          Start a Project
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

