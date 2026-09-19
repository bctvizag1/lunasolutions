import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/course-detail-page";
import { generativeAiCourse } from "@/lib/course-data";

export const Route = createFileRoute("/courses/generative-ai")({
  head: () => ({ meta: [
    { title: "Generative AI Course | Luna Solutions" },
    { name: "description", content: "Learn prompt engineering, large language models, Hugging Face and AI APIs by building practical generative AI applications." },
    { property: "og:title", content: "Generative AI Course | Luna Solutions" },
    { property: "og:description", content: "Move from prompting models to building useful, responsible AI applications." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CourseDetailPage course={generativeAiCourse} />,
});