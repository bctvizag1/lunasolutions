import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/course-detail-page";
import { aiAgentsCourse } from "@/lib/course-data";

export const Route = createFileRoute("/courses/ai-agents")({
  head: () => ({ meta: [
    { title: "AI Agents Course | Luna Solutions" },
    { name: "description", content: "Learn agentic AI, RAG, tool use, memory, workflow orchestration and evaluation through a practical agent project." },
    { property: "og:title", content: "AI Agents Course | Luna Solutions" },
    { property: "og:description", content: "Design AI systems that reason, use tools and complete controlled workflows." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CourseDetailPage course={aiAgentsCourse} />,
});