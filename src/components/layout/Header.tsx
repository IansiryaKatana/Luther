import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Settings, Mail, Phone, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? headerScrolledClasses : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
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
              <SheetContent side="right" className="w-full sm:max-w-none border-none p-0 bg-background flex flex-col">
                {/* Custom Header in Sheet */}
                <div className="flex items-center justify-between px-6 h-20 border-b border-border/50">
                  <span className="text-2xl font-bold tracking-tight text-primary">
                    Luther
                  </span>
                  <div className="flex items-center gap-2">
                    <SheetClose asChild>
                      <button className="p-2 rounded-full hover:bg-muted/30 transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </SheetClose>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
                  <div className="space-y-8">
                    <nav className="flex flex-col gap-2">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <SheetClose asChild>
                            <Link
                              to={link.path}
                              className={`text-4xl font-bold tracking-tighter hover:text-primary transition-colors flex items-center justify-between group py-2 ${
                                isActive(link.path) ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {link.name}
                              <ArrowRight className={`w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 ${isActive(link.path) ? "opacity-100 translate-x-0" : ""}`} />
                            </Link>
                          </SheetClose>
                        </motion.div>
                      ))}
                    </nav>

                    <div className="space-y-6 pt-8 border-t border-border/50">
                      {user && (
                        <SheetClose asChild>
                          <Link to="/admin" className="flex items-center gap-3 text-xl font-medium text-muted-foreground hover:text-primary transition-colors">
                            <Settings className="w-6 h-6" />
                            Admin Dashboard
                          </Link>
                        </SheetClose>
                      )}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Get in touch</h4>
                        <a href="mailto:Hello@Luther.ae" className="flex items-center gap-3 text-2xl font-bold text-foreground hover:text-primary transition-colors">
                          <Mail className="w-6 h-6" />
                          Hello@Luther.ae
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-6">
                        {socialLinks.map((social) => (
                          <a key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                            <social.icon className="w-6 h-6" />
                          </a>
                        ))}
                      </div>
                      <SheetClose asChild>
                        <Link to="/contact">
                          <Button size="lg" className="rounded-full px-8 gap-2">
                            Start a Project
                            <ArrowUpRight className="w-5 h-5" />
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                    
                    {/* Secondary Close Button as per user rule */}
                    <div className="mt-8 pt-8 border-t border-border/50 flex justify-center">
                      <SheetClose asChild>
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4 mr-2" />
                          Close Menu
                        </Button>
                      </SheetClose>
                    </div>
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

