---
title: "Building AI-Powered Apps: Part 1"
date: "2026-04-24"
source: PowerSync
originalUrl: "https://powersync.com/blog/building-ai-powered-apps-part-1"
tags:
  - "AI"
  - "Engineering"
  - "LLMs"
---
# Part 1: The New Primitives of AI Engineering

This post outlines everything I have learned about building AI-powered applications over the last year. In that time, I've built everything from a productivity bot that acts as an autonomous, multi-agent artificial teammate navigating organizational tools, to a no-code machine learning platform orchestrated entirely by generative UI, to a unified, multi-agent collaboration chat platform where agents interact directly alongside users in shared file systems.

Across all these projects, a central theme emerged: building AI-powered software requires a fundamental shift in how we think about system architecture. It's about moving away from strictly deterministic logic and learning how to seamlessly orchestrate probabilistic models within reliable, traditional systems.

This first part covers the foundational mental models you need to make that shift—starting with how to actually think about Large Language Models.

## Treating LLMs as Probabilistic Functions

The simplest way to think about LLMs is **pure functions**. Pure functions accept some input, and their output relies solely on the input and nothing else. Any state that should influence the output must be provided as an input.

While this is a very familiar concept, the pure functions we are used to also happen to be deterministic - the same input will always yield the same output.

LLMs, instead, are **probabilistic pure functions**, which means the same inputs might not give you the same output. They *probably* will, and even if it's not the same, it's *probably* going to be similar enough. But the exact same output is not a guarantee.

```
// Deterministic pure function
function extractName(text) {
  return text.match(/Name:\s*(.*)/)[1];
}

// Probabilistic pure function (LLM)
async function extractName(text) {
  return await llm.generate(`Extract the name from this text: ${text}`);
}
```

So while architecturally we can treat LLMs the same as deterministic pure functions, they are built to serve completely different use cases. You don't want an LLM doing something that you can do with a deterministic function better. You also don't want a deterministic function to be doing what LLMs are good at.

## Programming via Natural Language

The biggest mistake developers make is treating LLMs like humans in a chat box rather than compilers interpreting natural language.

One of the most powerful and the most misleading properties of LLMs is the ability to follow instructions and generate output in natural language.

Well duh, they are large "language" models, of course they understand natural language.

But this lets people down the path of anthropomorphizing LLMs too much. At the end of the day, LLMs are still machines, and the "prompts" are a way to "program" the machines.

When we program deterministic functions, we write procedures of specific CPU instructions that give us the result we want.

With probabilistic functions (LLMs), our "programs" (prompts) are a way to increase the probability of the desired output.

Prompting is much closer to programming a computer than to talking to a human being. It comes with its own structure and keywords. It is modularized and fed into frameworks that orchestrate their usage.

Outputs of LLMs are quite often **structured JSON or XML data** that is parsed by those frameworks and interpreted as instructions, even control flow and execution.

Every LLM has different nuances to how they interpret the provided prompts, similar to how computing platforms differ from each other in subtle ways and require different instructions for the same results.

The most important aspect of natural language instructions is that they are **orders of magnitude more accessible** than code. You can read and tweak them and change the behavior of the machines with zero prior knowledge of computer science. Any product that cares about the user in any capacity should be looking at ways to incorporate LLMs and make their products more accessible and customizable.

Writing prompts that consistently yield specific, high-value outcomes is a rigorous engineering process. It requires iteration, testing, and debugging, much like writing low-level code. In the AI era, well-crafted prompts are core application logic and should be treated as highly valuable intellectual property.

## Executing Actions via Tool Calling

If natural language instruction is the first superpower of LLMs, **Tool Calling** is the second—and arguably the most important for software engineering. Tool calling is the ability to reliably generate structured data (like JSON) based on natural language intent. Or more importantly, to convert data between arbitrary and inconsistent formats, natural textual language, and precise well-defined structures.

This allowed LLMs to interact with software applications directly rather than with a human in the middle to plug the LLM outputs into other systems manually. This is the first and crucial step towards giving LLMs some sense of "agency", where they can make requests to applications on behalf of the user, and can fetch data or submit generated data.

How does it work? In a nutshell, the LLM is asked very nicely to generate output in a very specific structured format whenever it wants certain things to happen, so that a parser that looks for that very specific structured format can pick that up. It honestly sounds very hacky, and for a long time models were very unreliable at actually following these specific structured formats. It's only been in the last couple or so months that almost every major model is good at tool calling by incorporating it in the training regime. An unfortunate consequence is that each model would be trained with different structures, so you have to rely on the model provider's syntax for tool definitions for the most reliable results. That said, there are abstractions like the AI SDK that smoothen out these differences for us.

The more important part about tools is where they fit architecturally.

Tool calls look very much like API endpoints. They are named functions that can be referenced from outside, their inputs and outputs are serialized over a network, and they facilitate communication between independent systems. Tool calls are basically endpoints that are called by an LLM on behalf of the user, instead of by an interface like UI or CLI. So instead of having to specify the exact parameters of the endpoint through forms and buttons, the user expressed their intention in natural language, then the LLM decided to call the endpoint and generated the exact parameters from the user's prompt.

Once again, this unlocks a new realm of user experience that is infinitely more accessible than what we have today, provided that the LLM's interpretation of the user's request is sound and reliable. Therefore, the major challenge with tool calls is to, surprise surprise, increase the probability of getting the right tool call and the right time with the right inputs.

At the same time, most of the challenges we already face when building APIs carry over to the realm of tool calling:

- **Authentication & Authorization:** Ensuring the LLM (and the user it represents) has permission to execute the tool.
- **Input Validation:** Verifying the structured JSON generated by the LLM is safe and formatted correctly before executing the underlying function.
- **Observability:** Tracing tool executions, failures, and latency just like standard API endpoints.

Most of the time, the same practices and patterns that we already use today are exactly what we need here. We don't need new solutions to the same problems. We need to figure out what the *new* problems are and how we might be able to solve them.

## Injecting State via Context Engineering

**Context Engineering** is simply the industry accepted term for describing the process of optimizing for a certain likelihood out of the LLM by modifying the input. "Context" describes everything that is fed into the LLM when it's given a task. This used to be "prompt" but every AI app injects a reasonably large amount of information as "context" to the LLM with the user's prompt.

It's a very wide umbrella of a concept and manifests in many different ways, and we keep discovering new ways every day. So the concept is useful as a high level idea like "software engineering" which encompasses everything from data structures to system design to relational databases to centering a div.

For example, an LLM doesn't inherently know today's date, who the user is, or what the user's database schema looks like. Context Engineering is the architectural practice of gathering that state—fetching the user's profile, querying the database for relevant records, grabbing the current timestamp—and injecting it into the prompt payload before the LLM ever sees it. If prompts are the functions, Context Engineering is how we pass the arguments.

Crucially, this context is bounded by the model's **context window** (measured in tokens). You cannot simply dump an entire database into the prompt. The art of context engineering is retrieving and injecting *only* the most relevant state needed for the immediate task without overflowing the token limit or diluting the model's reasoning capabilities.

## Key Takeaways for Part 1

- **LLMs are Probabilistic Functions:** Do not use them for logic that can be handled deterministically.
- **Prompting is Programming:** Natural language instructions are core application logic and should be version-controlled, tested, and treated as IP.
- **Tools Act as APIs:** Tool Calling translates natural language intent into structured JSON, bridging the gap between LLM reasoning and existing software endpoints.
- **Context is State:** You must engineer systems to inject the necessary user and application state into the prompt payload before the LLM can act on it.

---

These primitives—prompts, tools, and context—are powerful on their own. But the real magic happens when we wire them together into multi-step systems. What happens when an LLM is allowed to call a tool, evaluate the result, and decide what to do next entirely on its own?

In Part 2, we'll move from individual components to system architecture. We'll demystify the heavily-hyped world of **Agents**, contrast them with traditional deterministic **Workflows**, and explore how to combine the best of both worlds.
