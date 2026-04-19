import { ssrElement, mergeProps as mergeProps$1, ssr, ssrHydrationKey, ssrStyle, escape, createComponent } from "solid-js/web";
import { u as useResolvedPath, a as useHref, b as useLocation, n as normalizePath, T as Title, M as Meta } from "../../entry-server.js";
import { mergeProps, splitProps, createMemo } from "solid-js";
import "pathe";
import "radix3";
import "seroval";
import "seroval-plugins/web";
import "h3";
import "solid-js/web/storage";
import "cookie-es";
function A(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation();
  const isActive = createMemo(() => {
    const to_ = to();
    if (to_ === void 0) return [false, false];
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = decodeURI(normalizePath(location.pathname).toLowerCase());
    return [props.end ? path === loc : loc.startsWith(path + "/") || loc === path, path === loc];
  });
  return ssrElement("a", mergeProps$1(rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...props.class && {
          [props.class]: true
        },
        [props.inactiveClass]: !isActive()[0],
        [props.activeClass]: isActive()[0],
        ...rest.classList
      };
    },
    link: true,
    get ["aria-current"]() {
      return isActive()[1] ? "page" : void 0;
    }
  }), void 0, true);
}
var _tmpl$ = ["<main", ' style="', '"><!--$-->', "<!--/--><!--$-->", '<!--/--><nav style="', '"><span style="', '">devagr.me</span><div style="', '"><!--$-->', '<!--/--><a href="https://github.com/devagrawal09" style="', '" target="_blank" rel="noopener noreferrer">GitHub</a></div></nav><section style="', '"><p style="', '">DevRel · Fullstack · OSS</p><h1 style="', '">Building demos, systems, and developer experiences for the modern web.</h1><p style="', '">I ship fullstack demos, technical content, and open source work in the Solid and TanStack ecosystems. Currently DevRel at PowerSync.</p><div style="', '"><a href="mailto:contact@devagr.me" style="', '">Get in touch</a><a href="https://github.com/devagrawal09" style="', '" target="_blank" rel="noopener noreferrer">GitHub →</a></div></section><section style="', '">', '</section><section style="', '"><h2 style="', '">Currently</h2><ul style="', '"><li>Building local-first / realtime demos at PowerSync</li><li>Maintaining TanStack Start and contributing to the Solid ecosystem</li><li>Speaking at conferences and hosting workshops on modern fullstack patterns</li><li>Exploring async UI, offline-first architecture, and developer tooling</li></ul></section><footer style="', '"><p style="', '">© <!--$-->', "<!--/--> Dev Agrawal · Built with SolidStart v2</p></footer></main>"], _tmpl$2 = ["<div", ' style="', '"><span style="', '">', '</span><span style="', '">', "</span></div>"];
const id$$ = "src/routes/index.tsx?pick=default&pick=$css";
const proofItems = [{
  label: "DevRel Engineer",
  detail: "PowerSync"
}, {
  label: "Solid Ecosystem",
  detail: "Contributor"
}, {
  label: "TanStack Start",
  detail: "Maintainer"
}, {
  label: "Conference Speaker",
  detail: "& Workshop Host"
}];
function Home() {
  return ssr(_tmpl$, ssrHydrationKey(), ssrStyle(styles.main), escape(createComponent(Title, {
    children: "Dev Agrawal — DevRel Engineer & Fullstack Builder"
  })), escape(createComponent(Meta, {
    name: "description",
    content: "Dev Agrawal — DevRel engineer shipping fullstack demos, technical content, and open source work in the Solid and TanStack ecosystems."
  })), ssrStyle(styles.nav), ssrStyle(styles.navBrand), ssrStyle(styles.navLinks), escape(createComponent(A, {
    href: "/",
    get style() {
      return styles.navLink;
    },
    children: "Home"
  })), ssrStyle(styles.navLink), ssrStyle(styles.hero), ssrStyle(styles.eyebrow), ssrStyle(styles.headline), ssrStyle(styles.subline), ssrStyle(styles.ctaRow), ssrStyle(styles.ctaPrimary), ssrStyle(styles.ctaSecondary), ssrStyle(styles.proofBar), escape(proofItems.map((item) => ssr(_tmpl$2, ssrHydrationKey(), ssrStyle(styles.proofItem), ssrStyle(styles.proofLabel), escape(item.label), ssrStyle(styles.proofDetail), escape(item.detail)))), ssrStyle(styles.nowSection), ssrStyle(styles.sectionHeading), ssrStyle(styles.nowList), ssrStyle(styles.footer), ssrStyle(styles.footerText), escape((/* @__PURE__ */ new Date()).getFullYear()));
}
const styles = {
  main: {
    "min-height": "100vh",
    "background-color": "#0d0f14",
    color: "#e2e8f0",
    "font-family": "'Inter', 'Segoe UI', system-ui, sans-serif",
    "line-height": "1.6"
  },
  nav: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    padding: "1.25rem 2rem",
    "border-bottom": "1px solid #1e2433"
  },
  navBrand: {
    "font-size": "0.95rem",
    "font-weight": "600",
    color: "#a78bfa",
    "letter-spacing": "0.03em"
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem"
  },
  navLink: {
    color: "#94a3b8",
    "text-decoration": "none",
    "font-size": "0.875rem",
    transition: "color 0.15s"
  },
  hero: {
    "max-width": "780px",
    margin: "0 auto",
    padding: "5rem 2rem 4rem"
  },
  eyebrow: {
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: "#a78bfa",
    "margin-bottom": "1rem"
  },
  headline: {
    "font-size": "clamp(2rem, 5vw, 3.25rem)",
    "font-weight": "700",
    "line-height": "1.15",
    "letter-spacing": "-0.02em",
    color: "#f1f5f9",
    "margin-bottom": "1.25rem"
  },
  subline: {
    "font-size": "1.125rem",
    color: "#94a3b8",
    "max-width": "580px",
    "margin-bottom": "2rem"
  },
  ctaRow: {
    display: "flex",
    gap: "1rem",
    "flex-wrap": "wrap"
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    "background-color": "#a78bfa",
    color: "#0d0f14",
    "text-decoration": "none",
    "border-radius": "6px",
    "font-weight": "600",
    "font-size": "0.9rem",
    transition: "opacity 0.15s"
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    border: "1px solid #2d3748",
    color: "#94a3b8",
    "text-decoration": "none",
    "border-radius": "6px",
    "font-size": "0.9rem",
    transition: "border-color 0.15s"
  },
  proofBar: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: "0",
    "border-top": "1px solid #1e2433",
    "border-bottom": "1px solid #1e2433",
    "max-width": "780px",
    margin: "0 auto"
  },
  proofItem: {
    flex: "1 1 160px",
    padding: "1.25rem 2rem",
    "border-right": "1px solid #1e2433"
  },
  proofLabel: {
    display: "block",
    "font-size": "0.8rem",
    "font-weight": "700",
    color: "#e2e8f0",
    "margin-bottom": "0.2rem"
  },
  proofDetail: {
    display: "block",
    "font-size": "0.75rem",
    color: "#64748b"
  },
  nowSection: {
    "max-width": "780px",
    margin: "0 auto",
    padding: "3.5rem 2rem"
  },
  sectionHeading: {
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: "#64748b",
    "margin-bottom": "1.25rem"
  },
  nowList: {
    "list-style": "none",
    padding: "0",
    margin: "0",
    display: "flex",
    "flex-direction": "column",
    gap: "0.75rem"
  },
  footer: {
    "border-top": "1px solid #1e2433",
    padding: "1.5rem 2rem",
    "text-align": "center"
  },
  footerText: {
    "font-size": "0.75rem",
    color: "#475569"
  }
};
export {
  Home as default,
  id$$
};
//# sourceMappingURL=index-QgCUysx0.js.map
