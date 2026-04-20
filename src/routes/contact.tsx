import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";
import { colors } from "~/styles/tokens";

const linkStyle: JSX.CSSProperties = {
  color: colors.accent,
  "text-decoration": "none",
};

export default function ContactPage() {
  const trackContactEmail = () => {
    analytics.trackEvent("cta_contact", { location: "contact_page", channel: "email" });
  };

  const trackGithub = () => {
    analytics.trackEvent("social_click", { location: "contact_page", network: "github" });
  };

  return (
    <>
      <PageMeta title="Contact" description="Get in touch with Dev Agrawal." />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Get in touch</p>
        <h1 style={pageStyles.pageHeading}>Contact</h1>
        <p style={pageStyles.bodyText}>
          Reach out via{" "}
          <a href="mailto:contact@devagr.me" style={linkStyle} onClick={trackContactEmail}>
            contact@devagr.me
          </a>{" "}
          or find me on{" "}
          <a
            href="https://github.com/devagrawal09"
            style={linkStyle}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGithub}
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </>
  );
}
