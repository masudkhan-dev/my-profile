"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroButton } from "./HeroButton";
import Terminal from "./Terminal";
import { AnimatedTitle } from "./AnimatedTitle";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <AnimatedTitle />
            <HeroButton />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Terminal />
            <div className="absolute -inset-0.5 bg-neutral-900/20 rounded-lg blur-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
