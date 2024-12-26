"use client";
import React from "react";
import { motion } from "framer-motion";
import { Fan } from "lucide-react";
import AutoType from "./AutoType";

export const AnimatedTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-[#A8D5BA]"
      >
        <Fan className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Full-Stack Developer</span>
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-bold text-white">
        <span>MERN Stack</span>
        <div className="flex items-center gap-x-1.5">
          <span>WEB</span>
          <AutoType />
        </div>
      </h1>

      <p className="text-lg text-gray-300 mt-6 max-w-lg">
        Transforming creative ideas into elegant, high-performance applications
        with modern web technologies and clean code.
      </p>
    </motion.div>
  );
};
