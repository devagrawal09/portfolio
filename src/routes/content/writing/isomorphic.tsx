import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "isomorphic",
  title: "Isomorphic Code",
  description:
    "How full-stack JavaScript enables the same code to run on client and server — from virtual DOM to SSR frameworks like Next.js, Nuxt, and SolidStart.",
  displayDate: "May 2022",
  kind: "technical",
  tags: ["SSR", "JavaScript", "Fullstack"],
  markdown:
    "Isomorphic code is code that can run on both client and server. The rise of full-stack JavaScript made this possible — any JavaScript that only uses the standard library is isomorphic by default, which is why popular utility libraries like Lodash, Moment, and RxJS work in any environment.\n\nTo build a usable application, though, we have to use platform-specific features: the DOM API to manipulate elements in the browser, or the Node HTTP API to create a server. Working with data is also different on each side — fetching from an HTTP API and storing in memory on the client, versus querying a database and sending a response on the server.\n\n## Isomorphic abstractions\n\nTo write isomorphic code for application concerns, we need abstractions. Meteor was one of the first frameworks to take this seriously. It provided shared data fetching, validation schemas, and mutation methods that could run on both client and server — so you only had to write platform-specific code for view templates or server configuration.\n\n## Is React isomorphic?\n\nReact is isomorphic, and the secret is the Virtual DOM. When you write a React component, React doesn't create real DOM nodes — it creates lightweight JavaScript objects that a companion library (react-dom) later converts into actual HTML elements. Because React never directly touches the browser DOM, it can run in Node.js too.\n\nThis means React can be used on the server to generate PDF files, power HTTP endpoints, or — most commonly — produce fully-rendered HTML before it reaches the browser.\n\n## Rendering on the server\n\nAfter the industry shifted from server-rendered PHP to client-rendered React and Angular apps, we discovered real costs: downloading hundreds of kilobytes of JavaScript before anything appeared on screen hurt both performance and SEO. So we went back to rendering on the server — but now using the same JavaScript and component model we had grown to love.\n\nFrameworks like Next.js and Gatsby (and later Nuxt for Vue, and SolidStart for Solid) were born from this insight. They abstract the boundary between client and server so you can write components that consume database-sourced data without manual HTTP fetching — the framework handles the data handoff.\n\n## Beyond React and beyond JavaScript\n\nReact pioneered the virtual DOM, but it is far from alone. Vue uses the same concept and can be server-rendered with Nuxt. Angular takes a different approach — ahead-of-time compilation — which also enables server rendering via Angular Universal.\n\nWith WebAssembly, languages beyond JavaScript can now run in the browser too. Microsoft's Blazor and Apache's UNO run C# in the browser; PyScript brings Python. These are still niche, but they point to a world where \"isomorphic\" extends beyond just JavaScript.\n\nFor now, JavaScript remains the dominant runtime on both client and server. As long as that's true, isomorphic code will remain a core design pattern in the frameworks and tooling we reach for every day.",
} as const;

export const articleSummary = {
  slug: "isomorphic",
  title: "Isomorphic Code",
  description:
    "How full-stack JavaScript enables the same code to run on client and server — from virtual DOM to SSR frameworks like Next.js, Nuxt, and SolidStart.",
} as const;

export default function isomorphicArticlePage() {
  return <ArticlePage article={article} />;
}
