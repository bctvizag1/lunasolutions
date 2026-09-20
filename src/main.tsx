import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { CourseDetailPage } from "@/components/course-detail-page";
import {
  aiAgentsCourse,
  azureCourse,
  cyberCourse,
  generativeAiCourse,
  networkingCourse,
} from "@/lib/course-data";
import { LunaHome } from "@/routes/index";
import "@/styles.css";

const pages = {
  "/courses/networking-ccna": networkingCourse,
  "/courses/azure-cloud": azureCourse,
  "/courses/cyber-security": cyberCourse,
  "/courses/generative-ai": generativeAiCourse,
  "/courses/ai-agents": aiAgentsCourse,
} as const;

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Luna Solutions | IT Training Institute for Networking, Azure, Cyber Security & AI",
    description: "Luna Solutions offers practical, industry-focused training in Networking, Microsoft Azure, Cyber Security, Generative AI and AI Agents.",
  },
  "/courses/networking-ccna": {
    title: "Networking & CCNA Course | Luna Solutions",
    description: "Learn networking, IP addressing, routing, switching and troubleshooting through practical CCNA-focused labs at Luna Solutions.",
  },
  "/courses/azure-cloud": {
    title: "Microsoft Azure Cloud Course | Luna Solutions",
    description: "Learn Azure cloud computing, virtual machines, storage, networking and application hosting through practical projects.",
  },
  "/courses/cyber-security": {
    title: "Cyber Security Course | Luna Solutions",
    description: "Learn security fundamentals, OSINT, network defence and ethical security assessment through controlled practical labs.",
  },
  "/courses/generative-ai": {
    title: "Generative AI Course | Luna Solutions",
    description: "Learn prompt engineering, large language models, Hugging Face and AI APIs by building practical generative AI applications.",
  },
  "/courses/ai-agents": {
    title: "AI Agents Course | Luna Solutions",
    description: "Learn agentic AI, RAG, tool use, memory, workflow orchestration and evaluation through a practical agent project.",
  },
};

function normalizedPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  return path || "/";
}

function updatePageMeta(path: string) {
  const metadata = pageMeta[path] ?? pageMeta["/"] ?? {
    title: "Luna Solutions | IT Training Institute",
    description: "Practical technology training from Luna Solutions.",
  };
  document.title = metadata.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
}

function App() {
  const [path, setPath] = useState(() => normalizedPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPath(normalizedPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    updatePageMeta(path);
  }, [path]);

  const course = pages[path as keyof typeof pages];
  if (course) return <CourseDetailPage course={course} />;
  if (path === "/") return <LunaHome />;

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center text-foreground">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Page not found</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold">Let’s get you back on track.</h1>
        <a href="/" className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground">Return home</a>
      </div>
    </main>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The app root element is missing.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);