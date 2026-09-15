import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LeetCode from "@/components/LeetCode";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import type { ExperienceEntry, LeetCodeEntry, ProjectEntry } from "@/data/types";

type AppProps = {
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  leetcode: LeetCodeEntry;
};

export default function App({ experience, projects, leetcode }: AppProps) {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <LeetCode leetcode={leetcode} />
      <Stack />
      <Education />
      <Contact />
    </>
  );
}
