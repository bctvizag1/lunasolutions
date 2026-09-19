import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/course-detail-page";
import { cyberCourse } from "@/lib/course-data";

export const Route = createFileRoute("/courses/cyber-security")({
  head: () => ({ meta: [
    { title: "Cyber Security Course | Luna Solutions" },
    { name: "description", content: "Learn security fundamentals, OSINT, network defence and ethical security assessment through controlled practical labs." },
    { property: "og:title", content: "Cyber Security Course | Luna Solutions" },
    { property: "og:description", content: "Build responsible, practical cyber security and defensive analysis skills." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CourseDetailPage course={cyberCourse} />,
});