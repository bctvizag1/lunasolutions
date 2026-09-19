import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/course-detail-page";
import { networkingCourse } from "@/lib/course-data";

export const Route = createFileRoute("/courses/networking-ccna")({
  head: () => ({ meta: [
    { title: "Networking & CCNA Course | Luna Solutions" },
    { name: "description", content: "Learn networking, IP addressing, routing, switching and troubleshooting through practical CCNA-focused labs at Luna Solutions." },
    { property: "og:title", content: "Networking & CCNA Course | Luna Solutions" },
    { property: "og:description", content: "Build practical networking skills with guided routing, switching and troubleshooting labs." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CourseDetailPage course={networkingCourse} />,
});