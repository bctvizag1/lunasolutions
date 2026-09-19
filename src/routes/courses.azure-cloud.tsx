import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/course-detail-page";
import { azureCourse } from "@/lib/course-data";

export const Route = createFileRoute("/courses/azure-cloud")({
  head: () => ({ meta: [
    { title: "Microsoft Azure Cloud Course | Luna Solutions" },
    { name: "description", content: "Learn Azure cloud computing, virtual machines, storage, networking and application hosting through practical projects." },
    { property: "og:title", content: "Microsoft Azure Cloud Course | Luna Solutions" },
    { property: "og:description", content: "Build and manage practical cloud infrastructure with Microsoft Azure." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CourseDetailPage course={azureCourse} />,
});