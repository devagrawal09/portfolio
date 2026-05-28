import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "devto-dynamic-typing-is-obsolete",
  title: "Dynamic Typing is Obsolete",
  description: "A position piece on the evolution of typing and developer tooling.",
  displayDate: "Dec 2023",
  kind: "technical",
  tags: ["TypeScript", "Types", "JavaScript"],
  source: "DEV",
  originalUrl: "https://dev.to/devagr/dynamic-typing-is-obsolete-5404",
  markdown:
    '> _Dynamically typed languages are better than statically typed languages_\n\nThis statement used to be true for various reasons. It’s not anymore. Let’s dig into why.\n\nDynamically typed languages and frameworks like Ruby on Rails and LAMP stack blew up in popularity for various reasons. Let’s rewind the clock back a couple decades or so and look at the context.\n\nSoftware development was dominated by statically typed languages like C++, Java, and C#.\n\n1. These languages and frameworks had a big learning curve\n2.  Code was very verbose because of the ceremony of type definitions\n3. Required expensive specialized tooling that shipped in physical CDs\n4. IDEs were very slow and buggy, especially on older hardware\n5. Feedback loop was slow because of long compilation times\n6. Ecosystems were primarily stewarded by corporations and proprietary software\n7. Frameworks were primarily intended for desktop apps, web apps were an afterthought\n\nRuby on Rails and LAMP stack were positioned perfectly to sweep and dominate the ecosystem at this point.\n\n1. Languages like Ruby and PHP had a much smaller learning curve\n2. Dynamic nature and syntactic sugar made it quick and fun to program\n3. No specialized tooling was required, fire up notepad and start building your app\n4. No slow and buggy IDEs, you could literally REPL your code into the terminal\n5. No compile step means faster feedback loops, make a change, hit save, refresh the browser\n6. Ecosystems were extremely open source and community driven\n7. The sole purpose was enabling anyone to make web apps, instead of adding web capabilities to an existing stack\n\nI obviously haven’t been around that long, but those who have remember static typing not as it is today, but as it was back then. It was an indicator of ceremony, slow feedback loops, and proprietary dinosaurs.\n\nStatic typing has made a major comeback over the last decade, and almost everything that turned people away from them and towards the comfort of PHP and Ruby has been UNO reversed.\n\n1. Modern static languages like Typescript have ridiculously low learning curves\n2. Type inference takes out 95% of the ceremony and terse syntax\n3. The most powerful tools also happen to be open source and very well documented\n4. Advancements in hardware and optimization techniques have made IDEs extremely snappy\n5. Compilations are ridiculously quick, especially if the compiler knows the data types beforehand\n6. Even the big bad Microsoft has completely turned around and committed to open source\n7. Typescript is not the only static language with an ecosystem primarily geared towards web development\n\nThe factors that blew up Rails and LAMP in popularity are now the same factors that favor ecosystems that offer complete type safety. Dynamic typing has become, to put it strongly, obsolete. They are artifacts of the past.\n\nYes you can use dynamically typed languages to build real systems for scale. But you will pay the cost of maintenance, performance, and scalability, and eventually will have to rebuild using infrastructure that offers much better guarantees.\n\nDynamically typed languages are used not because they are dynamically typed, but because they have specific technical benefits (e.g. Elixir for building distributed systems) or ecosystem benefits (e.g. Python for data science).\n\nStarting off with type-safe languages will give you faster feedback loops, more helpful IDE tools, more freedom to make changes without breaking stuff, and better collaboration through internal contracts and documentation at a very low cost.\n\nThis article is essentially a summary of this talk ["Why Static Typing Came Back” by Richard Feldman](https://youtu.be/Tml94je2edk?si=KCLolsf7Iggihie). Go watch the full talk for an even bigger history lesson and so many more arguments that I couldn’t even mention here.',
} as const;

export const articleSummary = {
  slug: "devto-dynamic-typing-is-obsolete",
  title: "Dynamic Typing is Obsolete",
  description: "A position piece on the evolution of typing and developer tooling.",
} as const;

export default function devtoDynamicTypingIsObsoleteArticlePage() {
  return <ArticlePage article={article} />;
}
