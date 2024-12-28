"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";

const NAVIGATION = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>(NAVIGATION[0].id);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mobile-specific intersection observer
    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Adjusted for mobile viewport
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);

      if (visibleSections.length > 0) {
        // Get the first visible section
        const visibleSection = visibleSections[0];
        setActiveTab(visibleSection.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe all sections
    NAVIGATION.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Get the height of the navbar
    const navbarHeight = 64; // 4rem/64px - matches h-16 in the navbar

    // Calculate scroll position
    const sectionRect = section.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + sectionRect.top;
    const scrollToPosition = absoluteTop - navbarHeight;

    // Perform scroll
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  };

  const handleMobileNavigation = (sectionId: string) => {
    // Close mobile menu first
    setIsOpen(false);
    setActiveTab(sectionId);

    // Small delay to allow menu to close
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const navbar = document.querySelector("nav");
      const navbarHeight = navbar?.offsetHeight || 64;

      // Get element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();

      // Calculate the scroll position
      const scrollPosition =
        window.pageYOffset + elementRect.top - navbarHeight;

      // Perform the scroll
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] shadow-lg">
      <div className="px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveTab("home");
                setIsOpen(false);
              }}
              className="text-xl font-bold text-[#A8D5BA]"
            >
              Masudur Rahman
            </Link>
          </motion.div>

          {/* Desktop Nav - Keep as is */}
          <div className="hidden md:flex space-x-4">
            {NAVIGATION.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 ${
                  activeTab !== id && "hover:text-white/60"
                }`}
              >
                {activeTab === id && (
                  <motion.span
                    layoutId="bubble-desktop"
                    className="absolute inset-0 z-10 mix-blend-difference rounded-full bg-white"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                {label}
              </button>
            ))}
          </div>

          <motion.a
            href="/resume.pdf"
            download
            className="hidden md:inline-flex items-center rounded-md bg-[#f8f9fa] px-4 py-2 text-sm font-medium text-[#0a0a0a]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="mr-2 h-4 w-4" />
            Resume
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-white hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Updated with new handling */}
        {/* Mobile Menu - Updated with new handling */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden overflow-hidden bg-[#0a0a0a]"
        >
          <div className="space-y-1 p-3">
            {NAVIGATION.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleMobileNavigation(id)}
                className={`relative w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeTab === id ? "text-black" : "text-white"
                }`}
              >
                {activeTab === id && (
                  <motion.span
                    layoutId="bubble-mobile"
                    className="absolute inset-0 rounded-md text-black bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {label}
                  {activeTab === id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 h-1.5 w-1.5 rounded-full bg-[#000]"
                    />
                  )}
                </span>
              </button>
            ))}
            <motion.a
              href="/resume.pdf"
              download
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-[#fff] px-3 py-2 text-sm font-medium text-[#0a0a0a]"
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
