"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  section: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", section: "home" },
  { id: "services", label: "Services", section: "services" },
  { id: "skills", label: "Skills", section: "skills" },
  { id: "projects", label: "Projects", section: "projects" },
  { id: "contact", label: "Contact", section: "contact" },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].id);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    setActiveTab(sectionId);
    setIsOpen(false);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#0a0a0a] z-50 shadow-lg">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              onClick={scrollToTop}
              className="text-[#A8D5BA] text-xl font-bold"
            >
              Masudur Rahman
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`${
                  activeTab === item.id ? "" : "hover:text-white/60"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {activeTab === item.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden md:block">
            <motion.a
              href="/your-resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-[#f8f9fa] text-[#0a0a0a]"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/60"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="md:hidden overflow-hidden bg-[#0a0a0a]"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.section)}
              className="block w-full px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-gray-700"
            >
              {item.label}
            </button>
          ))}
          <motion.a
            href="/your-resume.pdf"
            download
            whileTap={{ scale: 0.95 }}
            className="block w-full px-3 py-2 rounded-md bg-[#f8f9fa] text-[#0a0a0a] text-sm font-medium  text-center mt-4"
          >
            <span className="inline-flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </span>
          </motion.a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
