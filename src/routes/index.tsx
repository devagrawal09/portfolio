import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { ProofGrid } from "~/components/ProofGrid";
import { FEATURED_PROOF } from "~/data/proof";

const navCards = [
  { label: "Resume", href: "/about", meta: "experience.log" },
  { label: "Projects", href: "/work", meta: "ship.list" },
  { label: "Content", href: "/writing", meta: "notes.md" },
] as const;

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
            <ProofGrid items={FEATURED_PROOF} />
          </div>

          <nav class="home-nav-grid" aria-label="Featured pages">
            <For each={navCards}>
              {(card) => (
                <A href={card.href} class="home-nav-card">
                  <span>{card.meta}</span>
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
