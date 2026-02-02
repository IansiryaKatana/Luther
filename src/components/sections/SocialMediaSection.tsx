import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePremiumEnterMotion } from "@/hooks/use-premium-enter-motion";

const socialLinks = [
  {
    name: "Twitter",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    url: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    url: "https://instagram.com",
  },
  {
    name: "Dribbble",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm7.885 5.556a10.185 10.185 0 012.084 6.18c-.305-.063-3.36-.687-6.435-.297-.066-.157-.127-.318-.192-.476-.186-.451-.39-.908-.6-1.347 3.417-1.395 4.961-3.39 5.143-3.66zm-1.08-1.239c-.153.231-1.545 2.127-4.844 3.382a62.39 62.39 0 00-3.859-6.047A10.207 10.207 0 0112 1.812c2.546 0 4.883.934 6.805 2.505zM8.196 2.382a69.176 69.176 0 013.835 5.983c-4.833 1.285-9.102 1.267-9.563 1.259a10.23 10.23 0 015.728-7.242zM1.813 12.006v-.315c.448.01 5.428.067 10.589-1.467.296.579.576 1.168.838 1.757-.138.039-.279.078-.418.121-5.413 1.75-8.29 6.536-8.496 6.883a10.196 10.196 0 01-2.513-6.979zm4.133 8.413c.13-.218 2.268-4.434 8.093-6.644.023-.007.046-.015.069-.02a48.98 48.98 0 012.208 7.856 10.204 10.204 0 01-10.37-1.192zm12.186.074a50.08 50.08 0 00-2.064-7.448c2.88-.46 5.404.295 5.714.393a10.207 10.207 0 01-3.65 7.055z" />
      </svg>
    ),
    url: "https://dribbble.com",
  },
  {
    name: "Behance",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.672 1.45.672 2.41 0 .75-.137 1.4-.41 1.95-.273.55-.656 1-.1147 1.35-.49.35-1.07.61-1.74.78-.67.17-1.4.26-2.193.26H0V4.51h6.938v-.007zM6.545 9.66c.56 0 1.01-.13 1.36-.4.35-.27.52-.7.52-1.27 0-.33-.06-.6-.18-.8-.12-.2-.29-.35-.5-.45s-.45-.17-.72-.2c-.27-.04-.56-.05-.86-.05H3.42v3.18h3.12l.005-.01zm.2 5.87c.34 0 .66-.03.97-.1.31-.07.58-.19.82-.36.24-.17.43-.4.57-.68.14-.29.21-.65.21-1.09 0-.87-.24-1.49-.71-1.85-.47-.36-1.12-.54-1.93-.54H3.42v4.63h3.33l-.005-.01zM21.69 12.15c.08.79-.01 1.52-.28 2.18-.27.66-.68 1.22-1.22 1.68-.54.46-1.18.81-1.93 1.05-.75.24-1.57.36-2.45.36-.88 0-1.7-.12-2.45-.36-.75-.24-1.39-.59-1.93-1.05-.54-.46-.96-1.02-1.26-1.68-.3-.66-.44-1.41-.44-2.23s.15-1.57.44-2.22c.3-.65.72-1.21 1.26-1.67.54-.46 1.18-.82 1.93-1.07.75-.25 1.57-.37 2.45-.37.88 0 1.69.12 2.44.37.75.25 1.39.61 1.93 1.07.54.46.95 1.02 1.23 1.68.28.66.42 1.4.42 2.22 0 .03-.01.06-.01.08h-7.86c-.01.39.04.75.13 1.08.1.33.26.62.48.87.23.25.51.45.86.59.35.14.75.21 1.22.21.61 0 1.12-.13 1.53-.41.41-.27.71-.64.91-1.11h2.55l.01.02zm-2.66-3.18c-.06-.36-.18-.67-.36-.93-.17-.26-.39-.48-.65-.65-.26-.17-.56-.3-.89-.38-.33-.08-.68-.12-1.05-.12-.38 0-.73.04-1.05.13-.32.09-.61.22-.87.4-.25.18-.46.4-.62.67-.16.27-.26.57-.31.91h5.8zM15.15 5.63h5.7v1.33h-5.7V5.63z" />
      </svg>
    ),
    url: "https://behance.net",
  },
];

export const SocialMediaSection = () => {
  const enterMotion = usePremiumEnterMotion();
  return (
    <motion.section
      id="social"
      className="lg:sticky lg:top-20 z-[18] bg-light-bg min-h-screen flex items-center py-0"
      {...enterMotion}
    >
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-foreground/70 text-sm font-medium">Contact me</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background">
            Our social media reach
          </h2>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {socialLinks.slice(0, 3).map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 h-40 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg font-semibold text-background">{social.name}</span>
              <div className="self-end w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background group-hover:scale-110 transition-transform">
                {social.icon}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.a
            href={socialLinks[3].url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 h-40 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
          >
            <span className="text-lg font-semibold text-background">{socialLinks[3].name}</span>
            <div className="self-end w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background group-hover:scale-110 transition-transform">
              {socialLinks[3].icon}
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="bg-primary rounded-2xl p-6 h-40 flex flex-col justify-between group transition-colors duration-300 block"
            >
              <span className="text-lg font-semibold text-background">Get in touch</span>
              <div className="self-end w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
