// components/Projects.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SparklesText from "@/components/ui/sparkles-text";
import { axiosPublic } from "@/components/hooks/axiosPublic";
import { Project } from "./Project";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"web" | "team" | "mobile">("web");

  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/project.json");
      return data;
    },
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error)
    return <div className="text-white">{(error as Error).message}</div>;

  const tabs = [
    { id: "web" as const, label: "Web" },
    { id: "team" as const, label: "Team" },
    { id: "mobile" as const, label: "Apps" },
  ];

  const filteredProjects =
    projects?.filter((project) => project.category === filter) ?? [];
  const displayedProjects = filteredProjects.slice(0, 3);

  refetch();

  return (
    <section id="projects" className="-mt-48 md:-mt-20">
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <div className="bg-black px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <SparklesText text="My Projects" className="text-white text-5xl" />
          <p className="text-gray-400 mt-5">
            Explore my latest projects showcasing my expertise in web
            development, mobile applications, and innovative solutions.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`${
                  filter === tab.id ? "" : "hover:text-white/60"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {filter === tab.id && (
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
        </div>

        {displayedProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400 font-medium">
              Projects coming soon...
            </p>
            <p className="text-gray-500 mt-2">
              Stay tuned for exciting updates!
            </p>
          </motion.div>
        )}

        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center pb-8"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 rounded bg-[#0a0a0a] text-white font-medium inline-flex items-center gap-2 box-shadow"
              >
                Wanna More?
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
