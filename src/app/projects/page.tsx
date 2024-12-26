"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SparklesText from "@/components/ui/sparkles-text";
import ProjectModal from "@/components/Home/Projects/ProjectModal";
import ProjectCard from "@/components/Home/Projects/ProjectCard";
import { Project } from "@/components/Home/Projects/Project";
import { axiosPublic } from "@/components/hooks/axiosPublic";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"web" | "team" | "mobile">("web");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/project.json");
      return data as Project[];
    },
  });

  const tabs = [
    { id: "web" as const, label: "Web" },
    { id: "team" as const, label: "Team" },
    { id: "mobile" as const, label: "Apps" },
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === filter
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading)
    return <div className="text-white text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-white text-center py-20">
        Error: {(error as Error).message}
      </div>
    );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-20">
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
                onClick={() => {
                  setFilter(tab.id);
                  setCurrentPage(1);
                }}
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

        {visibleProjects.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="wait">
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-white disabled:text-gray-500"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full ${
                        currentPage === page
                          ? "bg-white text-black"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-white disabled:text-gray-500"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400 font-medium">
              No projects found in this category
            </p>
            <p className="text-gray-500 mt-2">
              Please check other categories or check back later!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
