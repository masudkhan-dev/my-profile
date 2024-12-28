// page.tsx
import Contact from "@/components/Home/Contact/Contact";
import Hero from "@/components/Home/Hero/Hero";
import Projects from "@/components/Home/Projects/Projects";
import Services from "@/components/Home/Services/Services";
import Skills from "@/components/Home/Skills/Skills";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <section id="home" className="min-h-fit">
        <Suspense fallback={<Loading />}>
          <Hero />
        </Suspense>
      </section>
      <section id="services" className="min-h-fit">
        <Suspense fallback={<Loading />}>
          <Services />
        </Suspense>
      </section>
      <section id="skills" className="min-h-fit">
        <Suspense fallback={<Loading />}>
          <Skills />
        </Suspense>
      </section>
      <section id="projects" className="min-h-fit">
        <Suspense fallback={<Loading />}>
          <Projects />
        </Suspense>
      </section>
      <section id="contact" className="min-h-fit">
        <Suspense fallback={<Loading/>}>
          <Contact />
        </Suspense>
      </section>
    </main>
  );
}
