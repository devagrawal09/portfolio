import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";

type HomeIconName =
  | "typescript"
  | "python"
  | "dotnet"
  | "java"
  | "php"
  | "youtube"
  | "talks"
  | "twitch"
  | "written"
  | "solid"
  | "kipple"
  | "tanstack"
  | "openai"
  | "opencode"
  | "openrouter"
  | "mastra";

type ProofIcon = {
  label: string;
  icon: HomeIconName;
};

const proof = [
  {
    stat: "9 years",
    label: "Product Engineering",
    icons: [
      { label: "TypeScript", icon: "typescript" },
      { label: "Python", icon: "python" },
      { label: ".NET", icon: "dotnet" },
      { label: "Java", icon: "java" },
      { label: "PHP", icon: "php" },
    ],
  },
  {
    stat: "4 years",
    label: "Technical Content Creation",
    icons: [
      { label: "YouTube", icon: "youtube" },
      { label: "Talks", icon: "talks" },
      { label: "Twitch", icon: "twitch" },
      { label: "Written", icon: "written" },
    ],
  },
  {
    stat: "20 months",
    label: "Framework Design and OSS",
    icons: [
      { label: "Solid", icon: "solid" },
      { label: "Kipple", icon: "kipple" },
      { label: "TanStack", icon: "tanstack" },
    ],
  },
  {
    stat: "14 months",
    label: "AI and Agentic Engineering",
    icons: [
      { label: "OpenAI", icon: "openai" },
      { label: "OpenCode", icon: "opencode" },
      { label: "OpenRouter", icon: "openrouter" },
      { label: "Mastra", icon: "mastra" },
    ],
  },
] as const;

const navCards = [
  { label: "Resume", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Content", href: "/writing" },
] as const;

function HomeIcon(props: ProofIcon) {
  return (
    <span class="sketch-icon" role="img" aria-label={props.label} title={props.label}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <ShowIcon name={props.icon} />
      </svg>
    </span>
  );
}

function ShowIcon(props: { name: HomeIconName }) {
  switch (props.name) {
    case "typescript":
      return (
        <>
          <rect x="5" y="5" width="22" height="22" rx="2" />
          <text x="16" y="21" text-anchor="middle">
            TS
          </text>
        </>
      );
    case "python":
      return (
        <>
          <path d="M10 16h12a5 5 0 0 0 0-10h-5v5h-6a5 5 0 0 0-1 5Z" />
          <path d="M22 16H10a5 5 0 0 0 0 10h5v-5h6a5 5 0 0 0 1-5Z" />
          <circle cx="20" cy="9" r="1.2" class="icon-fill" />
          <circle cx="12" cy="23" r="1.2" class="icon-fill" />
        </>
      );
    case "dotnet":
      return (
        <text x="16" y="20" text-anchor="middle" class="icon-word">
          .NET
        </text>
      );
    case "java":
      return (
        <>
          <path d="M11 21h10c0 3-2 5-5 5s-5-2-5-5Z" />
          <path d="M10 18h12" />
          <path d="M14 14c-3-3 5-4 2-8" />
          <path d="M18 14c-2-2 4-3 2-6" />
        </>
      );
    case "php":
      return (
        <>
          <ellipse cx="16" cy="16" rx="12" ry="7" />
          <text x="16" y="19" text-anchor="middle" class="icon-word">
            php
          </text>
        </>
      );
    case "youtube":
      return (
        <>
          <rect x="5" y="8" width="22" height="16" rx="5" />
          <path d="m14 12 7 4-7 4Z" class="icon-fill" />
        </>
      );
    case "talks":
      return (
        <>
          <path d="M12 5h8v10a4 4 0 0 1-8 0Z" />
          <path d="M8 14a8 8 0 0 0 16 0" />
          <path d="M16 22v5" />
          <path d="M11 27h10" />
        </>
      );
    case "twitch":
      return (
        <>
          <path d="M8 6h18v13l-6 6h-5l-4 4v-4H8Z" />
          <path d="M15 12v6" />
          <path d="M21 12v6" />
        </>
      );
    case "written":
      return (
        <>
          <path d="M9 6h14v20H9Z" />
          <path d="M12 12h8" />
          <path d="M12 16h8" />
          <path d="M12 20h5" />
        </>
      );
    case "solid":
      return (
        <>
          <path d="m7 14 9-6 9 6-9 6Z" />
          <path d="m7 19 9 6 9-6" />
          <path d="m7 14v5" />
          <path d="m25 14v5" />
        </>
      );
    case "kipple":
      return (
        <>
          <path d="M10 5v22" />
          <path d="m23 6-12 11 12 10" />
          <circle cx="23" cy="6" r="2" />
          <circle cx="23" cy="26" r="2" />
        </>
      );
    case "tanstack":
      return (
        <>
          <path d="M7 10h18" />
          <path d="M10 16h12" />
          <path d="M13 22h6" />
          <path d="M16 10v17" />
        </>
      );
    case "openai":
      return (
        <>
          <path d="M16 5 22 8v7l-6 4-6-4V8Z" />
          <path d="m10 15-4 3v7l6 3 6-3" />
          <path d="m22 15 4 3v7l-6 3-6-3" />
        </>
      );
    case "opencode":
      return (
        <>
          <rect x="5" y="7" width="22" height="18" rx="2" />
          <path d="m13 13-4 3 4 3" />
          <path d="m19 13 4 3-4 3" />
        </>
      );
    case "openrouter":
      return (
        <>
          <circle cx="8" cy="16" r="3" />
          <circle cx="24" cy="8" r="3" />
          <circle cx="24" cy="24" r="3" />
          <path d="M11 15 21 9" />
          <path d="M11 17 21 23" />
        </>
      );
    case "mastra":
      return (
        <>
          <path d="m16 5 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
          <path d="M16 11v10" />
          <path d="M11 16h10" />
        </>
      );
  }
}

export default function Home() {
  return (
    <>
      <PageMeta
        title="Software Engineer & Fullstack Builder"
        description="Dev Agrawal builds and teaches how to build delightful web and AI apps."
        ogImage="/og.svg"
      />

      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-main">
          <div class="home-copy">
            <h1 id="home-title" class="home-title">
              Hi, I'm Dev
              <br />
              and I'm a Dev
            </h1>
            <p class="home-subtitle">I build and teach how to build delightful web and AI apps</p>
          </div>

          <div class="paper-stack" aria-hidden="true">
            <span class="paper paper-one" />
            <span class="paper paper-two" />
            <span class="paper paper-three" />
          </div>
        </div>

        <div>
          <div class="home-proof">
            <For each={proof}>
              {(item) => (
                <div class="proof-cluster">
                  <span class="proof-number">{item.stat}</span>
                  <span class="proof-label">{item.label}</span>
                  <div class="pill-row">
                    <For each={item.icons}>{(icon) => <HomeIcon {...icon} />}</For>
                  </div>
                </div>
              )}
            </For>
          </div>

          <nav class="home-nav-grid" aria-label="Featured pages">
            <For each={navCards}>
              {(card) => (
                <A href={card.href} class="home-nav-card">
                  {card.label}
                </A>
              )}
            </For>
          </nav>
        </div>
      </section>
    </>
  );
}
