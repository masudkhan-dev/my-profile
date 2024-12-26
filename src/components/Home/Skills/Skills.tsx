"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SparklesText from "@/components/ui/sparkles-text";

// Define TypeScript interfaces
interface Category {
  id: CategoryId;
  label: string;
}

interface Skill {
  icon: string;
  name: string;
}

type CategoryId = "frontend" | "backend" | "tools" | "design" | "deployment";

const categories: Category[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
  { id: "design", label: "Design" },
  { id: "deployment", label: "Deployment" },
];

const skillsByCategory: Record<CategoryId, Skill[]> = {
  frontend: [
    { icon: "/Service/javascript.svg", name: "JavaScript" },
    { icon: "/Service/react.svg", name: "React" },
    { icon: "/Service/NextJs.svg", name: "Next.js" },
    { icon: "/Service/bootstrap.svg", name: "Bootstrap" },
    { icon: "/Service/tailwind.svg", name: "Tailwind" },
    { icon: "/Service/framer-motion.svg", name: "Framer Motion" },
  ],
  backend: [
    { icon: "/Service/node.svg", name: "Node.js" },
    { icon: "/Service/express.svg", name: "Express" },
    { icon: "/Service/mongoDB.svg", name: "MongoDB" },
    { icon: "/Service/jwt.svg", name: "JWT" },
    { icon: "/Service/firebase.svg", name: "Firebase" },
  ],
  tools: [
    { icon: "/Service/git.svg", name: "Git" },
    { icon: "/Service/github.svg", name: "GitHub" },
    { icon: "/Service/vscode.svg", name: "VS Code" },
    { icon: "/Service/zed.png", name: "Zed" },
    { icon: "/Service/NPM.svg", name: "NPM" },
    { icon: "/Service/yarn.svg", name: "Yarn" },
    { icon: "/Service/Bun.svg", name: "Bun" },
    { icon: "/Service/archlinux.svg", name: "Arch Linux" },
  ],
  design: [
    { icon: "/Service/figma.svg", name: "Figma" },
    { icon: "/Service/Adobe_Photoshop.svg", name: "Photoshop" },
    { icon: "/Service/gimp.svg", name: "GIMP" },
    { icon: "/Service/wordpress.svg", name: "WordPress" },
  ],
  deployment: [
    { icon: "/Service/vercel.svg", name: "Vercel" },
    { icon: "/Service/firebase.svg", name: "Firebase" },
    { icon: "/Service/netlify.svg", name: "Netlify" },
    { icon: "/Service/surge.svg", name: "Surge" },
  ],
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState<CategoryId>("frontend");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTab = localStorage.getItem(
      "activeSkillTab"
    ) as CategoryId | null;
    if (savedTab && Object.keys(skillsByCategory).includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  // Handle hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black animate-pulse">
        <div className="container mx-auto px-4 py-16" />
      </div>
    );
  }

  return (
    <section id="skills" className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <SparklesText
          text="Skills"
          className="text-center text-5xl md:text-5xl mb-6 sm:mb-8 lg:mb-10"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                localStorage.setItem("activeSkillTab", tab.id);
              }}
              className={`
                relative rounded-full px-3 py-1.5 text-sm font-medium 
                text-white outline-sky-400 transition focus-visible:outline-2
                ${activeTab !== tab.id ? "hover:text-white/60" : ""}
              `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto"
        >
          {skillsByCategory[activeTab].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center p-3 sm:p-4 bg-[#0a0a0a] rounded-lg 
                hover:bg-white/10 transition-colors"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2">
                <Image
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  fill
                  sizes="(max-width: 640px) 2rem, (max-width: 1024px) 2.5rem, 3rem"
                  className="object-contain"
                  priority={index < 5}
                />
              </div>
              <span className="text-xs sm:text-sm text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
