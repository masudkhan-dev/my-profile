"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Circle, Facebook } from "lucide-react";
import { motion } from "framer-motion";

import SparklesText from "@/components/ui/sparkles-text";
import Link from "next/link";

const Contact = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "masudkhan.dev@gmail.com" },
    { icon: Phone, label: "Phone", value: "+880 1627 282572" },
    { icon: MapPin, label: "Location", value: "Sirajganj, Rajshahi" },
  ];

  return (
    <div id="contact" className="min-h-screen bg-black text-white">
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-20"
        >
          {/* Header Section */}
          <motion.div
            variants={fadeUpVariants}
            className="space-y-6 text-center"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Circle className="w-3 h-3 fill-current text-green-500 animate-pulse" />
              <span className="text-sm">Available for projects</span>
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tightest"></h1>
            <SparklesText
              text="Let's Work Together"
              className="text-white text-center mb-10"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className="bg-[#0a0a0a] h-52 flex justify-center items-center box-shadow">
              <SparklesText
                text="Masudur Rahman"
                className="text-white text-center text-3xl md:text-6xl"
              />
            </div>

            {/* Contact Info Section */}
            <motion.div variants={fadeUpVariants} className="space-y-12">
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUpVariants}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-[#0a0a0a] rounded box-shadow transition-colors duration-300 group-hover:bg-white/10" />
                    <div className="relative p-6 flex items-center space-x-4">
                      <item.icon className="w-6 h-6" />
                      <div>
                        <p className="text-lg font-medium">{item.value}</p>
                      </div>
                      <motion.div
                        animate={{ x: hoveredIndex === index ? 5 : 0 }}
                        className="ml-auto"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Follow Me</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/masudkhan.dev"
                    target="blank"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-[#0a0a0a] rounded box-shadow"
                    >
                      <Facebook className="text-2xl" />
                    </motion.button>
                  </Link>
                  <Link href="https://github.com/masudkhan-dev" target="blank">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-[#0a0a0a] rounded box-shadow"
                    >
                      <Github className=" text-2xl" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
