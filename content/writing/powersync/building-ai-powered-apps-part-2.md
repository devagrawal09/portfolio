---
title: "Building AI-Powered Apps: Part 2"
date: "2026-05-04"
source: PowerSync
originalUrl: "https://powersync.com/blog/building-ai-powered-apps-part-2"
tags:
  - "AI"
  - "Agents"
  - "Workflows"
---
# Part 2: From Actions to Architecture

## The Agent Hype: What Are They Really?

"Agent" is the most overused word in AI right now. It communicates so much, and yet, not nearly enough about what is actually possible.

Some describe agents as "LLMs with agency to act in the real world" — which sounds more dangerous than useful. Others define them by their components: "LLM + System Prompt + Tools + Memory." While technically accurate, this doesn't explain their *architectural* purpose.

The simplest definition is "an LLM in a loop with tools." But for software engineering purposes, an **Agent** is defined by three specific characteristics:

- **Multi-step:** A single LLM call is not an agent. Agents handle tasks that naturally require executing multiple sequential steps to reach a goal.
- **Integrated:** Agents need a harness —integrations and tools that allow them to read from and write to external systems, giving them the ability to act on the world.
- **Autonomous:** The LLM decides the execution flow. Within constraints (step limits, permissions, budgets), the agent has control over *which* tool to call, *when* to call it, and *when* to stop. We rely on prompts and context to guide this autonomy.

In essence, **agents are a way to use an LLM's reasoning engine to navigate complex, unpredictable systems on behalf of a user.**

```
// Pseudo-code for a basic Agent
async function runAgent(goal) {
  let context = [{ role: 'user', content: goal }];
  while (true) {
    const decision = await llm.decide(context, availableTools);
    if (decision.isComplete) return decision.finalAnswer;

    const toolResult = await executeTool(decision.tool, decision.args);
    context.push({ role: 'tool', content: toolResult });
  }
}
```

Because they are driven by natural language, agents make complex system navigation accessible to users who otherwise couldn't (or wouldn't want to) do it themselves.

But you can't talk about agents without immediately comparing them to their traditional counterpart...

## Deterministic Workflows: The Anti-Agent

Conceptually, **Workflows** are the inverse of agents, despite the terms often being confused.

Let's look at the properties of a traditional workflow:

- **Multi-step:** Like agents, workflows orchestrate multiple steps to accomplish a high-level goal.
- **Integrated:** Like agents, workflows integrate with external services to execute those steps.
- **Deterministic:** *Unlike* agents, every step is strictly predefined. Given the same inputs and state, the execution path is guaranteed to be exactly the same.

**LLMs are to pure functions what Agents are to Workflows.**

You don't want an agent managing a predictable, procedural pipeline. And you don't want to write a rigid workflow for tasks that require fuzzy reasoning or handling unpredictable edge cases. Building durable, distributed workflows is a solved engineering problem. The real architectural challenge today is knowing when to use which.

Agents are easier to build for ambiguous tasks because you hand control to the LLM. But LLM inference is expensive and relatively slow. As a task becomes well-understood and predictable, it should be codified into a deterministic workflow, which is orders of magnitude faster, cheaper, and more reliable.

## Agentic Workflows: The Pragmatic Middle Ground

The reality is that "Agent vs. Workflow" is a false dichotomy. The most robust AI systems decompose tasks into hybrid execution graphs—sometimes orchestrated by procedural logic, sometimes by LLMs. This hybrid approach is what we call **Agentic Workflows**.

Instead of a black-and-white choice, you have a grayscale spectrum of autonomy. You can implement this in several ways:

- **Agents within Workflows:** A deterministic pipeline where specific, fuzzy steps are handed off to an LLM agent (e.g., a rigid CI/CD pipeline that uses an agent to summarize the blast radius of a PR).
- **Workflows within Agents:** An autonomous agent that can trigger predefined, deterministic workflows as tools (e.g., an agent deciding to trigger the rigid "Refund Processing" workflow).
- **Nested Hybrids:** Workflows inside agents inside workflows.

```
// Pseudo-code for an Agentic Workflow
async function processCustomerTicket(ticket) {
  // Step 1: Deterministic routing (Workflow)
  const user = await db.getUser(ticket.userId);

  // Step 2: Fuzzy reasoning (Agent)
  const resolutionPlan = await supportAgent.draftPlan(ticket, user);

  // Step 3: Deterministic execution (Workflow)
  if (resolutionPlan.requiresRefund && resolutionPlan.refundAmount < 50) {
    await billingAPI.issueRefund(user.id, resolutionPlan.refundAmount);
  }

  // Step 4: Fuzzy generation (Agent)
  return await writingAgent.draftEmail(resolutionPlan);
}
```

Agentic workflows allow you to dial in the exact level of autonomy required. Almost every existing business workflow can benefit from an LLM handling the fuzzy, undefined edge cases while keeping the core procedural logic intact. The engineering challenge is finding the right amalgamation of code and prompts to build a cohesive, reliable system.

## Key Takeaways for Part 2

- **Agents are Autonomous Loops:** They use LLMs to decide the sequence of steps and tool calls required to achieve a goal.
- **Workflows are Deterministic Pipelines:** They execute a strict, predefined sequence of steps. Use them when the path is known.
- **Agentic Workflows are the Future:** The most robust systems mix both — embedding agents in workflows for fuzzy steps, or giving agents workflows as tools for reliable execution.

---

We now have the primitives (prompts, tools, context) and the architecture (agents, workflows). But to make these systems truly useful, they need access to knowledge.

In Part 3, we'll explore how to feed large amounts of data into these architectures using Retrieval Augmented Generation (RAG) and how to evaluate if the AI is actually doing a good job.
