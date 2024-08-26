
"use client";
import Header from "@/components/Header";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Project from "@/components/Project";
import { useEffect, useState, useRef } from "react";
export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionOffsets = [
        aboutRef.current?.offsetTop || 0,
        experienceRef.current?.offsetTop || 0,
        projectRef.current?.offsetTop || 0,
      ];
      const sectionHeights = [
        aboutRef.current?.offsetHeight || 0,
        experienceRef.current?.offsetHeight || 0,
        projectRef.current?.offsetHeight || 0,
      ];

      let newActiveSection = '';

      for (let i = 0; i < sectionOffsets.length; i++) {
        if (
          scrollY >= sectionOffsets[i] &&
          scrollY < sectionOffsets[i] + sectionHeights[i]
        ) {
          newActiveSection = ['#about', '#experience', '#project'][i];
          break;
        }
      }

      if (newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative mx-auto flex flex-col lg:flex-row min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 md:px-12 lg:px-24 lg:py-0">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      <div className="w-full lg:w-1/2 pt-8 lg:pt-20 lg:py-20">
      <section id="about" ref={aboutRef}>
        <About />
      </section>
      <section id="experience" ref={experienceRef}>
        <Experience />
      </section>
      <section id="project" ref={projectRef}>
        <Project />
      </section>
      <section id="contact" className="mt-20">
         <p className="py-4 px-2 text-sm" >Crafted with Next.js, Tailwind CSS, and TypeScript, this portfolio was coded in Visual Studio Code. Deployed seamlessly on Vercel, with every word presented in the clean and modern Inter typeface. 
         </p> 
      </section>
      </div>
    </main>
  );
}
