---
title: "Dynamic Typing is Obsolete"
date: 2023-12-13
source: DEV
originalUrl: https://dev.to/devagr/dynamic-typing-is-obsolete-5404
tags:
  - "ruby"
  - "typescript"
  - "dynamictyping"
  - "statictyping"
---
> _Dynamically typed languages are better than statically typed languages_

This statement used to be true for various reasons. It’s not anymore. Let’s dig into why.

Dynamically typed languages and frameworks like Ruby on Rails and LAMP stack blew up in popularity for various reasons. Let’s rewind the clock back a couple decades or so and look at the context.

Software development was dominated by statically typed languages like C++, Java, and C#.

1. These languages and frameworks had a big learning curve
2.  Code was very verbose because of the ceremony of type definitions
3. Required expensive specialized tooling that shipped in physical CDs
4. IDEs were very slow and buggy, especially on older hardware
5. Feedback loop was slow because of long compilation times
6. Ecosystems were primarily stewarded by corporations and proprietary software
7. Frameworks were primarily intended for desktop apps, web apps were an afterthought

Ruby on Rails and LAMP stack were positioned perfectly to sweep and dominate the ecosystem at this point.

1. Languages like Ruby and PHP had a much smaller learning curve
2. Dynamic nature and syntactic sugar made it quick and fun to program
3. No specialized tooling was required, fire up notepad and start building your app
4. No slow and buggy IDEs, you could literally REPL your code into the terminal
5. No compile step means faster feedback loops, make a change, hit save, refresh the browser
6. Ecosystems were extremely open source and community driven
7. The sole purpose was enabling anyone to make web apps, instead of adding web capabilities to an existing stack

I obviously haven’t been around that long, but those who have remember static typing not as it is today, but as it was back then. It was an indicator of ceremony, slow feedback loops, and proprietary dinosaurs.

Static typing has made a major comeback over the last decade, and almost everything that turned people away from them and towards the comfort of PHP and Ruby has been UNO reversed.

1. Modern static languages like Typescript have ridiculously low learning curves
2. Type inference takes out 95% of the ceremony and terse syntax
3. The most powerful tools also happen to be open source and very well documented
4. Advancements in hardware and optimization techniques have made IDEs extremely snappy
5. Compilations are ridiculously quick, especially if the compiler knows the data types beforehand
6. Even the big bad Microsoft has completely turned around and committed to open source
7. Typescript is not the only static language with an ecosystem primarily geared towards web development

The factors that blew up Rails and LAMP in popularity are now the same factors that favor ecosystems that offer complete type safety. Dynamic typing has become, to put it strongly, obsolete. They are artifacts of the past.

Yes you can use dynamically typed languages to build real systems for scale. But you will pay the cost of maintenance, performance, and scalability, and eventually will have to rebuild using infrastructure that offers much better guarantees.

Dynamically typed languages are used not because they are dynamically typed, but because they have specific technical benefits (e.g. Elixir for building distributed systems) or ecosystem benefits (e.g. Python for data science).

Starting off with type-safe languages will give you faster feedback loops, more helpful IDE tools, more freedom to make changes without breaking stuff, and better collaboration through internal contracts and documentation at a very low cost.

This article is essentially a summary of this talk ["Why Static Typing Came Back” by Richard Feldman](https://youtu.be/Tml94je2edk?si=KCLolsf7Iggihie). Go watch the full talk for an even bigger history lesson and so many more arguments that I couldn’t even mention here.
