// components/ProjectModal.tsx
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import { ProjectModalProps } from "./Project";

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : `/works/${project.image.split("/").pop()}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-30 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="p-6">
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-6">
            <Image
              src={imageUrl}
              alt={project.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-[#0a0a0a] text-blue-400 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-gray-400 mb-6">{project.fullDescription}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white bg-[#0a0a0a] px-4 py-2 rounded transition-colors hover:bg-[#1a1a1a]"
              >
                <Github size={20} />
                <span>View Code</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
