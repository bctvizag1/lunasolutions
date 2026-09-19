import networkingImage from "@/assets/course-networking.jpg";
import azureImage from "@/assets/course-azure-cloud.jpg";
import cyberImage from "@/assets/course-cyber-security.jpg";
import generativeAiImage from "@/assets/course-generative-ai.jpg";
import aiAgentsImage from "@/assets/course-ai-agents.jpg";
import type { CourseDetails } from "@/components/course-detail-page";

export const networkingCourse: CourseDetails = {
  code: "CC",
  eyebrow: "Networking foundation",
  title: "Networking & CCNA",
  tagline: "Understand how modern networks connect, communicate and stay reliable.",
  overview: "Develop a strong foundation in networking through guided configuration, troubleshooting and hands-on practice. Progress from core concepts to the routing and switching skills used in real IT environments.",
  image: networkingImage,
  imageAlt: "Students configuring switches and studying network topology in a practical networking lab",
  topics: [
    { title: "Network fundamentals", description: "Understand network models, devices, cabling, protocols and how data moves between systems." },
    { title: "IP addressing & subnetting", description: "Plan IPv4 networks, calculate subnets and assign addresses with confidence." },
    { title: "Switching", description: "Configure VLANs, trunk links and inter-VLAN connectivity for organised local networks." },
    { title: "Routing", description: "Build connected networks with static routes and dynamic routing concepts." },
    { title: "Network services", description: "Work with DHCP, DNS, NAT and access control concepts found in business networks." },
    { title: "Troubleshooting", description: "Use structured checks and diagnostic commands to isolate and resolve common faults." },
  ],
  outcomes: ["Design and address a small business network", "Configure routers, switches and VLANs", "Test connectivity and diagnose network issues", "Build confidence for entry-level networking roles and CCNA preparation"],
  audience: ["Engineering students", "Diploma students", "Fresh graduates", "IT support learners", "CCNA aspirants"],
  project: { label: "Capstone lab", title: "Design and configure a multi-department campus network.", description: "Translate a business scenario into a working network with segmented departments, routing, shared services and documented troubleshooting checks.", deliverables: ["Network topology and IP addressing plan", "Router and switch configurations", "Connectivity and fault-testing report"] },
};

export const azureCourse: CourseDetails = {
  code: "AZ",
  eyebrow: "Cloud infrastructure",
  title: "Microsoft Azure Cloud",
  tagline: "Build, connect and manage reliable services in the cloud.",
  overview: "Learn cloud computing through the Azure portal and practical infrastructure exercises. Explore compute, storage, identity and networking while developing the judgement to choose and configure the right service.",
  image: azureImage,
  imageAlt: "Student working with cloud infrastructure diagrams and dashboards in a modern training lab",
  topics: [
    { title: "Cloud foundations", description: "Learn service models, deployment models, regions, availability and shared responsibility." },
    { title: "Azure navigation", description: "Work confidently with the Azure portal, subscriptions, resource groups and core services." },
    { title: "Compute services", description: "Create and manage virtual machines while understanding scaling and availability options." },
    { title: "Storage", description: "Use blob, file and disk storage with suitable access, redundancy and lifecycle choices." },
    { title: "Virtual networking", description: "Build virtual networks, subnets, security rules and connections between cloud resources." },
    { title: "Application hosting", description: "Deploy a web application and learn the essentials of monitoring, security and cost awareness." },
  ],
  outcomes: ["Navigate and organise Azure resources", "Deploy virtual machines and storage", "Configure secure cloud networks", "Host and monitor a simple cloud application"],
  audience: ["Cloud beginners", "Engineering students", "System administrators", "Developers", "Fresh graduates"],
  project: { label: "Cloud project", title: "Deploy a secure, monitored web application on Azure.", description: "Create the supporting resource structure, networking, compute and storage for an application while documenting availability, security and cost decisions.", deliverables: ["Cloud architecture diagram", "Configured application environment", "Deployment and monitoring checklist"] },
};

export const cyberCourse: CourseDetails = {
  code: "CS",
  eyebrow: "Defensive security",
  title: "Cyber Security",
  tagline: "Think like a defender and investigate risk with a structured approach.",
  overview: "Explore how systems are exposed, assessed and protected. Build responsible, job-relevant security skills through controlled labs covering reconnaissance, vulnerability analysis and practical defensive thinking.",
  image: cyberImage,
  imageAlt: "Students reviewing defensive cyber security dashboards in a supervised lab",
  topics: [
    { title: "Security fundamentals", description: "Understand threats, vulnerabilities, controls, risk and the principles behind layered defence." },
    { title: "Operating system security", description: "Review permissions, processes, logging and practical hardening for common systems." },
    { title: "OSINT", description: "Gather and evaluate publicly available information ethically and document findings clearly." },
    { title: "Network security", description: "Study traffic, common attack paths, firewalls and methods for detecting suspicious activity." },
    { title: "Security assessment", description: "Follow a controlled process to identify, validate, prioritise and report weaknesses." },
    { title: "Web & mobile awareness", description: "Recognise common application security risks and learn safer testing practices." },
  ],
  outcomes: ["Identify common security risks and controls", "Conduct structured OSINT and vulnerability checks", "Interpret basic network and system evidence", "Write a clear, responsible security findings report"],
  audience: ["Security beginners", "Engineering students", "Network learners", "IT professionals", "Fresh graduates"],
  project: { label: "Security project", title: "Complete a controlled security assessment and defence report.", description: "Assess a purpose-built lab environment, gather evidence, prioritise findings and recommend practical controls using an ethical, repeatable workflow.", deliverables: ["Assessment scope and checklist", "Evidence-backed findings", "Risk-ranked remediation report"] },
};

export const generativeAiCourse: CourseDetails = {
  code: "AI",
  eyebrow: "Applied artificial intelligence",
  title: "Generative AI",
  tagline: "Move from prompting models to building useful AI applications.",
  overview: "Understand how modern generative models work, where they add value and how to use them responsibly. Create practical text and multimodal experiences with prompts, model APIs and open-source tools.",
  image: generativeAiImage,
  imageAlt: "Students collaborating on a generative AI application in a bright technology classroom",
  topics: [
    { title: "Generative AI foundations", description: "Understand tokens, context, model capabilities, limitations and the modern AI landscape." },
    { title: "Prompt engineering", description: "Design clear instructions, examples and structured outputs for more reliable results." },
    { title: "Large language models", description: "Explore model selection, inference settings and effective application patterns." },
    { title: "Model APIs", description: "Connect an application to an AI model and handle requests, responses and errors." },
    { title: "Hugging Face ecosystem", description: "Discover open models, datasets and practical tools for experimenting with AI." },
    { title: "Responsible AI", description: "Evaluate outputs for accuracy, bias, safety, privacy and appropriate human oversight." },
  ],
  outcomes: ["Write structured prompts for repeatable tasks", "Connect model APIs to a simple application", "Evaluate model output quality and limitations", "Create a portfolio-ready generative AI prototype"],
  audience: ["Students and graduates", "Developers", "Content professionals", "Analysts", "AI beginners"],
  project: { label: "AI application", title: "Build a domain-focused generative AI assistant.", description: "Turn a real use case into a working prototype with thoughtfully designed prompts, structured outputs, basic safeguards and an evaluation plan.", deliverables: ["Use-case and prompt design", "Working AI application prototype", "Quality and responsible-use evaluation"] },
};

export const aiAgentsCourse: CourseDetails = {
  code: "AG",
  eyebrow: "Intelligent automation",
  title: "AI Agents",
  tagline: "Design AI systems that can reason, use tools and complete workflows.",
  overview: "Progress beyond standalone prompts into agentic systems. Learn how models can plan, retrieve context, call tools and coordinate steps to solve useful tasks with appropriate controls and evaluation.",
  image: aiAgentsImage,
  imageAlt: "Engineering students designing a connected AI agent workflow in an innovation lab",
  topics: [
    { title: "Agentic AI foundations", description: "Understand agents, goals, planning, feedback loops and when an agent is the right solution." },
    { title: "Tools & structured actions", description: "Enable models to choose tools, pass validated inputs and work with external capabilities." },
    { title: "Retrieval-augmented generation", description: "Ground model responses in selected knowledge with retrieval and contextual prompting." },
    { title: "Memory & context", description: "Manage conversation state, working context and longer-term information responsibly." },
    { title: "Workflow orchestration", description: "Break complex tasks into controlled steps with routing, retries and human checkpoints." },
    { title: "Evaluation & guardrails", description: "Measure task success, inspect failures and create boundaries for safer operation." },
  ],
  outcomes: ["Map a process into an agent workflow", "Connect models to tools and trusted knowledge", "Add checkpoints, fallback paths and safeguards", "Evaluate an agent for reliability and task success"],
  audience: ["Developers", "Generative AI learners", "Automation professionals", "Engineering students", "Technical founders"],
  project: { label: "Agent capstone", title: "Create a tool-using knowledge and workflow assistant.", description: "Build an agent that retrieves trusted information, selects appropriate tools, completes a multi-step task and hands control back to a person when needed.", deliverables: ["Agent architecture and workflow map", "Working tool-integrated prototype", "Evaluation results and guardrail plan"] },
};