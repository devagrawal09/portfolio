import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MicVocal, PenLine } from "lucide-solid";
import { PageMeta } from "~/components/PageMeta";

type ExperienceIcon =
  | { label: string; slug: string; color: string }
  | { label: string; src: string; logo?: "ripple" }
  | { label: string; symbol: "mic" | "pen"; color: string };

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
      { label: "YouTube", slug: "youtube", color: "FF0000" },
      { label: "Talks", symbol: "mic", color: "FFD166" },
      { label: "Twitch", slug: "twitch", color: "9146FF" },
      { label: "Written", symbol: "pen", color: "63E6BE" },
    ],
  },
  {
    duration: "20 months",
    label: "Framework Design and OSS",
    tags: [
      { label: "Solid", slug: "solid", color: "2C4F7C" },
      { label: "Ripple", src: "/icons/ripple-logo-horizontal.png", logo: "ripple" },
      { label: "TanStack", slug: "tanstack", color: "FF4154" },
    ],
  },
  {
    duration: "14 months",
    label: "AI and Agentic Engineering",
    tags: [
      { label: "OpenAI", src: "/icons/openai-symbol.svg" },
      { label: "OpenCode", src: "/icons/opencode-logo.svg" },
      { label: "OpenRouter", slug: "openrouter", color: "7C3AED" },
    ],
  },
] satisfies readonly {
  duration: string;
  label: string;
  tags: readonly ExperienceIcon[];
}[];

function ExperienceIconMark(props: { item: ExperienceIcon }) {
  if ("src" in props.item) {
    return (
      <img
        classList={{ "proof-icon-ripple": props.item.logo === "ripple" }}
        src={props.item.src}
        alt=""
        width="32"
        height="32"
      />
    );
  }

  if ("slug" in props.item) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${props.item.slug}/${props.item.color}`}
        alt=""
        width="24"
        height="24"
        loading="lazy"
      />
    );
  }

  const iconProps = {
    "aria-hidden": true,
    color: `#${props.item.color}`,
    size: 30,
    strokeWidth: 2.4,
  } as const;

  const icons = {
    mic: MicVocal,
    pen: PenLine,
  } as const;

  const Icon = icons[props.item.symbol];
  return <Icon {...iconProps} />;
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
                    <For each={group.tags}>
                      {(tag) => (
                        <span class="proof-icon" aria-label={tag.label} title={tag.label}>
                          <ExperienceIconMark item={tag} />
                        </span>
                      )}
                    </For>
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
