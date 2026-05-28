import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MicVocal, PenLine } from "lucide-solid";
import { PageMeta } from "~/components/PageMeta";
import { SITE } from "~/config/site";

type ExperienceIcon =
  | { label: string; href?: string; slug: string; color: string }
  | { label: string; href?: string; src: string; logo?: "ripple" | "vinxi" }
  | { label: string; href?: string; symbol: "mic" | "pen"; color: string };

const navCards = [
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Content", href: "/content/writing" },
] as const;

const experienceGroups = [
  {
    duration: "9 years",
    label: "Product Engineering",
    tags: [
      { label: "TypeScript", slug: "typescript", color: "3178C6" },
      { label: "Python", slug: "python", color: "3776AB" },
      { label: ".NET", slug: "dotnet", color: "512BD4" },
      { label: "Java", src: "/icons/java-logo.svg" },
      { label: "PHP", slug: "php", color: "777BB4" },
    ],
  },
  {
    duration: "4 years",
    label: "Technical Content Creation",
    tags: [
      { label: "YouTube", href: SITE.social.youtube, slug: "youtube", color: "FF0000" },
      { label: "Talks", href: "/content/conferences", symbol: "mic", color: "FFD166" },
      {
        label: "Twitch",
        href: "https://www.twitch.tv/devagrawal099",
        slug: "twitch",
        color: "9146FF",
      },
      { label: "Written", href: "/content/writing", symbol: "pen", color: "63E6BE" },
    ],
  },
  {
    duration: "20 months",
    label: "Framework Design and OSS",
    tags: [
      { label: "Solid", href: "https://www.solidjs.com/", slug: "solid", color: "2C4F7C" },
      {
        label: "Ripple",
        href: "https://ripplejs.com/",
        src: "/icons/ripple-logo-horizontal.png",
        logo: "ripple",
      },
      { label: "Vinxi", href: "https://vinxi.vercel.app/", src: "/icons/vinxi.ico", logo: "vinxi" },
      { label: "TanStack", href: "https://tanstack.com/", slug: "tanstack", color: "FF4154" },
    ],
  },
  {
    duration: "14 months",
    label: "AI and Agentic Engineering",
    tags: [
      { label: "OpenAI", href: "https://openai.com/", src: "/icons/openai-symbol.svg" },
      { label: "OpenCode", href: "https://opencode.ai/", src: "/icons/opencode-logo.svg" },
      { label: "Mastra", href: "https://mastra.ai/", src: "/icons/mastra-logo.svg" },
      {
        label: "OpenRouter",
        href: "https://openrouter.ai/",
        slug: "openrouter",
        color: "7C3AED",
      },
    ],
  },
] satisfies readonly {
  duration: string;
  label: string;
  tags: readonly ExperienceIcon[];
}[];

function renderExperienceIconMark(item: ExperienceIcon) {
  if ("src" in item) {
    return (
      <img
        classList={{
          "proof-icon-ripple": item.logo === "ripple",
          "proof-icon-vinxi": item.logo === "vinxi",
        }}
        src={item.src}
        alt=""
        width="32"
        height="32"
      />
    );
  }

  if ("slug" in item) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
        alt=""
        width="24"
        height="24"
        loading="lazy"
      />
    );
  }

  const iconProps = {
    "aria-hidden": true,
    color: `#${item.color}`,
    size: 30,
    strokeWidth: 2.4,
  } as const;

  const icons = {
    mic: MicVocal,
    pen: PenLine,
  } as const;

  const Icon = icons[item.symbol];
  return <Icon {...iconProps} />;
}

function renderExperienceIconBadge(item: ExperienceIcon) {
  const icon = renderExperienceIconMark(item);

  if (!item.href) {
    return (
      <span class="proof-icon" aria-label={item.label} title={item.label}>
        {icon}
      </span>
    );
  }

  if (item.href.startsWith("/")) {
    return (
      <A class="proof-icon" href={item.href} aria-label={item.label} title={item.label}>
        {icon}
      </A>
    );
  }

  return (
    <a
      class="proof-icon"
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      title={item.label}
    >
      {icon}
    </a>
  );
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

          <div class="terminal-panel" aria-label="Current developer profile">
            <div class="terminal-topbar">
              <span />
              <span />
              <span />
              <strong>devagr.me</strong>
            </div>
            <div class="terminal-body">
              <p>
                <span class="terminal-prompt">$</span> whoami
              </p>
              <p class="terminal-output">
                fullstack engineer / oss maintainer / technical educator
              </p>
              <p>
                <span class="terminal-prompt">$</span> current_focus
              </p>
              <ul>
                <li>event-sourced and AI systems</li>
                <li>Solid.js, TanStack, and reactive UI</li>
                <li>developer tools and technical education</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div class="home-proof">
            <For each={experienceGroups}>
              {(group) => (
                <article class="proof-cluster">
                  <span class="proof-number">{group.duration}</span>
                  <h2 class="proof-label">{group.label}</h2>
                  <div class="proof-tags">
                    <For each={group.tags}>{(tag) => renderExperienceIconBadge(tag)}</For>
                  </div>
                </article>
              )}
            </For>
          </div>

          <nav class="home-nav-grid" aria-label="Featured pages">
            <For each={navCards}>
              {(card) => (
                <A href={card.href} class="home-nav-card">
                  <strong>{card.label}</strong>
                </A>
              )}
            </For>
          </nav>
        </div>
      </section>
    </>
  );
}
