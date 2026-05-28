import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "medium-learning-software-development-part-1",
  title: "The correct approach to learning software development - Part 1",
  description: "A Medium essay on learning software development effectively.",
  displayDate: "Jan 2020",
  kind: "reflection",
  tags: ["Learning", "Software"],
  source: "Medium",
  originalUrl:
    "https://medium.com/@devagrawal09/the-correct-approach-to-learning-software-development-part-1-a4b252ff5533",
  markdown:
    "![Image 5](https://miro.medium.com/v2/resize:fit:700/1*LhQ9vp3abf8d8M1Mpma-2w.jpeg)\n\nBelieve me or not, there are still many people who think that if you know how to code, you know how to create software.\n\nI know, right?\n\nThis mindset leads people to take programming 101 courses over and over again in different languages in hopes that they will learn how to develop applications.\n\nEventually they realize that they will need to take courses on Angular, React, Express, Laravel, Rails or whatever the framework of the week is. These courses hit them with conceptual information that was not even touched in the programming 101 courses which barely taught you how to write `for` loops.\n\n_But isn’t this what courses are for? Teaching you things you don’t know?_\n\nUnfortunately, these new concepts are hidden beneath layers of code that they don’t fully understand. In those moments, it becomes hard to abstract the concepts away from the code. Beginners build this approach of directly jumping into code without a strategy or plan in mind, which is where they run into difficulties and mount stupid level of despair.\n\nI did not realize how bad of a problem this was until I met some fellow newbies at my new workplace. As soon as they were assigned some tasks, their first instinct was to jump into VS code and start typing. Senior developers did the opposite; they had UMLs, architecture diagrams and sprint boards before they even wrote a single line of code. Because of the difference in mindsets, asking for help was a nightmare for beginners: imagine asking how to use the ice-cream machine and listening to a 3 hour geek talk on the mechanics of levers and gears.\n\n> 20% of software development is writing code. 10% is talking to people. 70% is talking to yourself.\n\nThis problem does not have an easy solution, because people who teach software development are usually veterans who have a fundamentally different approach than the beginners trying to learn. Educators need to get better at separating the bare concepts from code, and present programming as a mere representation of the concepts, instead of teaching the concepts as something that can be done in code.\n\nSo what are these “concepts” that I have been going on about? If you are a beginner developer reading this, you probably related to some of the things I talked about. In the next post, I will go over some concepts that beginner developers should try to understand before they can fully jump into the part where we write code.\n\nThanks for reading!",
} as const;

export const articleSummary = {
  slug: "medium-learning-software-development-part-1",
  title: "The correct approach to learning software development - Part 1",
  description: "A Medium essay on learning software development effectively.",
} as const;

export default function mediumLearningSoftwareDevelopmentPart1ArticlePage() {
  return <ArticlePage article={article} />;
}
