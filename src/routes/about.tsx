import { For } from "solid-js";
import { PageMeta } from "~/components/PageMeta";

const summary = [
  "Product engineering for 9 years in TypeScript, Python, .NET, Java, and PHP",
  "Technical content creation for 4 years across conference talks, videos, and blogs",
  "Framework design and open source contributions for 20 months",
  "Agentic engineering and building agentic apps for 14 months",
] as const;

const experience = [
  {
    title: "Developer Relations Engineer",
    company: "PowerSync",
    period: "Dec 2025 - May 2026",
    points: [
      "Raised visibility and engagement within the developer community",
      "Made technical content for the PowerSync blog, YouTube, and conference talks",
      "Brainstormed and executed AI strategy for product improvement, growth, and internal use",
    ],
  },
  {
    title: "Software Engineer",
    company: "Xolvio",
    period: "Apr 2025 - Dec 2025",
    points: [
      "Built a machine learning platform for analysts running quantum algorithms",
      "Prototyped agentic apps and experiences for researchers and engineers",
      "Worked with Event Sourcing, GraphQL, and AI technologies",
    ],
  },
  {
    title: "Software Engineer",
    company: "SmartData",
    period: "Apr 2024 - Apr 2025",
    points: [
      "Built an AI-powered project management assistant",
      "Built a next-generation member application for a healthcare company",
      "Improved performance, developer experience, and cost efficiency",
    ],
  },
  {
    title: "Developer Advocate",
    company: "Clerk.com",
    period: "May 2023 - Feb 2024",
    points: [
      "Supported a Discord community of 8k members and Twitter community of 14k followers",
      "Represented Clerk through talks, workshops, demos, and product walkthroughs",
      "Built starter kits and demos on Next.js, React, TailwindCSS, and Vercel",
    ],
  },
] as const;

const education = {
  title: "Bachelor's Degree",
  school: "University of Cincinnati",
  period: "Aug 2018 - May 2023",
  details: ["BS in Information Technology, Software Development track", "Minor in Psychology"],
} as const;

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="Resume"
        description="Resume for Dev Agrawal, a software engineer and technical content creator building web, AI, and open-source systems."
        ogImage="/og/about.svg"
      />

      <div class="sketch-page sketch-page-narrow">
        <div class="resume-top">
          <h1 class="sketch-heading">Resume</h1>
          <a class="sketch-button" href="/resume.pdf" download="dev-agrawal-resume.pdf">
            Download PDF
          </a>
        </div>

        <section class="resume-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading" class="sketch-section-title">
            Summary
          </h2>
          <div class="resume-copy">
            <For each={summary}>{(item) => <p>{item}</p>}</For>
          </div>
        </section>

        <section class="resume-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading" class="sketch-section-title">
            Experience
          </h2>
          <div class="resume-list">
            <For each={experience}>
              {(job) => (
                <article class="resume-item">
                  <h3 class="resume-item-title">
                    {job.title}, {job.period}
                  </h3>
                  <p class="resume-meta">{job.company}</p>
                  <ul>
                    <For each={job.points}>{(point) => <li>{point}</li>}</For>
                  </ul>
                </article>
              )}
            </For>
          </div>
        </section>

        <section class="resume-section" aria-labelledby="education-heading">
          <h2 id="education-heading" class="sketch-section-title">
            Education
          </h2>
          <article class="resume-item">
            <h3 class="resume-item-title">
              {education.title}, {education.period}
            </h3>
            <p class="resume-meta">{education.school}</p>
            <ul>
              <For each={education.details}>{(detail) => <li>{detail}</li>}</For>
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}
