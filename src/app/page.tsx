"use client";
import Contact from "@/components/Home/Contact/Contact";
import Hero from "@/components/Home/Hero/Hero";
import Projects from "@/components/Home/Projects/Projects";
import Services from "@/components/Home/Services/Services";
import Skills from "@/components/Home/Skills/Skills";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
