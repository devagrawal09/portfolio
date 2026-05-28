import { marked } from "marked";
import { MarkdownContent } from "~/components/MarkdownContent";
import { PageMeta } from "~/components/PageMeta";
import resumeMarkdown from "../../resume.md?raw";

const resumeHtml = marked.parse(resumeMarkdown, { async: false }) as string;

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

        <MarkdownContent html={resumeHtml} />
      </div>
    </>
  );
}
