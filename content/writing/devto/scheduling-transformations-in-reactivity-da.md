---
title: "Scheduling Transformations in Reactivity"
date: 2025-05-03
source: DEV
originalUrl: https://dev.to/devagr/scheduling-transformations-in-reactivity-da
tags:
  - "signals"
  - "observables"
  - "reactivity"
  - "solidjs"
---
*From pure event graphs to safely mutating state*

---

### 1. Introduction: The Real-World Punch

There’s a saying:  
> “Every plan is perfect until you get punched in the face.”

In software, that punch often comes the moment your pure logic has to interact with the real world.

In our last post, we built a clean, composable model for events — one based on transformations, ownership, and simplicity. But so far, everything has been pure. We transform values, we log them, we react — but we haven’t changed anything.

That changes now.

Let’s take this innocent-looking example:

```ts
const [onEvent, emitEvent] = createEvent()
onEvent(() => console.log(state()))
onEvent(() => setState("world"))
onEvent(() => console.log(state()))
```

What should this log?

- `"hello"` and then `"world"`?
- `"world"` twice?
- Or `"hello"` twice?

The answer depends entirely on **execution order**. And without clear rules, even small graphs like this become hard to reason about.

Push-based systems often run into this:  
**If you mutate state mid-propagation, every downstream listener sees a different world.**

So now we ask: how do we bring **consistency and predictability** to a reactive event system — even when it mutates?

The answer lies in something we borrowed from signals: **phased execution**.

---

### 2. Mutation Hazards in Push-Based Systems

Push-based reactivity doesn’t have phases. It has flow.

As soon as you emit a value, every subscriber runs immediately — in the order they were defined. That’s fine when you’re just transforming data. But once you introduce **mutations**, the cracks start to show.

Take this setup:

```ts
onEvent(() => console.log(state()))
onEvent(() => setState("world"))
onEvent(() => console.log(state()))
```

Depending on how these handlers were registered, and in what order they run, the logs might print:

- `"hello"`, then `"world"` — which seems logical
- or worse: `"world"` twice — because the state was changed mid-propagation

There’s no real “before and after” in this model. Everything is firing during the same tick, and nothing is scheduled — so side effects collide with each other, and **reads become unpredictable**.

Push-based graphs become fragile when reads and writes happen in the same pass.

If we want predictable behavior — if we want to reason about event graphs like pure functions — we need to **separate mutation from computation**.

Just like signals did.

---

### 3. Lessons from Signals — Phased Execution

Signals hit the same wall events do: mixing computation and side effects creates unpredictable behavior.

Solid’s answer was **phased execution**.

In Solid 2.0, reactivity happens in **layers**, not all at once:

1. **Pure derivations** (memos, derived signals)  
   - These run first and synchronously during a synthetic "clock cycle".
   - No side effects. Just computation.

2. **Side effects** (`createEffect`)  
   - These are deferred until after the graph stabilizes.
   - Used to read from the DOM, notify external systems, or manage local resources.

> “All changes to the DOM or outside world happen after all pure computations are complete.”

Even though some reactive work runs immediately, Solid 2.0 internally queues it and flushes the graph once it’s fully consistent. This guarantees that **the entire reactive graph stabilizes in a single clock cycle**, and only then do effects run.

It’s a small shift, but a powerful one:  
**Separate pure logic from side effects, and you get predictability.**

That’s what we want for events, too.

---

### 4. Bringing Phases to Events

If signals needed phased execution to stay predictable, **events need the same** — maybe even more.

Here’s the structure we adopt for event execution:

#### **Phase 1: Pure event graph**
- All event handlers (transformers) run immediately.
- No state changes, no side effects — just pure mapping.

#### **Phase 2: Mutations**
- Instead of calling `setState()` directly inside handlers, you **schedule it**.
- You use `createMutation(handler, effectFn)` — the handler runs in phase 1, and `effectFn` is deferred to phase 2.

#### **Phase 3+: Signals and UI**
- After mutations, the rest of Solid’s reactive system proceeds as usual.
- Signals notify, DOM updates happen, effects fire — all downstream of a clean update.

This lets you build composable flows like this:

```ts
const onNext = onClick(() => count() + 1)
createMutation(onNext, setCount)
```

You now know:
- `onClick` runs
- `onNext` transforms the value
- `setCount(...)` is **queued**, not run immediately
- The UI updates **after** all pure logic completes

---

### 5. Blocking Unsafe Patterns

For phased execution to work, we need **clear boundaries** — but we don’t want to over-restrict expressive patterns either.

> **State mutations (`setState`) must never happen in phase 1.**

If `setState()` happens during the pure event phase, downstream handlers may see a changed world — and that breaks everything.

To enforce this, any `setState()` inside a pure event handler should either:
- Throw a dev-time error, or
- Be automatically scheduled as a mutation

```ts
onClick(() => setState(count() + 1))  // ❌ not allowed directly
```

Instead, use:

```ts
createMutation(onClick, () => setCount(count() + 1))
```

What about `emit()`? Emitting from inside a handler is **pure** — it just expands the graph.  
Still, it should be used thoughtfully. Overusing nested emits can make graphs harder to trace.

> Mutation breaks the phase model.  
> Emission just grows the graph.

---

### 6. `createMutation` in Practice

This is your gateway to phase 2 — safe, scheduled mutation.

```ts
const onNext = onClick(() => count() + 1)
createMutation(onNext, setCount)
```

Want to perform multiple updates?

```ts
createMutation(onSubmit, () => {
  setLoading(true)
  setStatus("submitted")
})
```

You can also inject logging, analytics, or cleanups — all scoped, all deferred.

---

### 7. Sync Parity with Signals

Solid 2.0 uses **auto-batching** — effects run only after the graph stabilizes.  
To match this behavior, we flush all queued mutations automatically after every `emit()`.

```ts
emitIncrement()  // queues the mutation
// mutation is flushed right after emit completes
```

Need to group multiple emits?

```ts
batchEvents(() => {
  emitAdd()
  emitSubtract()
})
```

The queue flushes after the batch — keeping mutation and UI updates consistent with signal behavior.

| Mechanism        | Signals (2.0)      | Events             |
|------------------|--------------------|--------------------|
| Default          | Auto-batched       | Auto-flushed       |
| Manual control   | `flushSync()`      | `batchEvents()`    |

---

### 8. Final Example — Predictable Flow

```ts
const [onIncrement, emitIncrement] = createEvent()
const [count, setCount] = createSignal(0)

const onNext = onIncrement(() => count() + 1)
createMutation(onNext, setCount)
```

1. `emitIncrement()` fires.
2. `onIncrement` computes `count() + 1`.
3. `setCount(...)` is queued.
4. The mutation is flushed after the event cycle.

Want logging?

```ts
const onLog = onNext((next) => {
  console.log("Next count:", next)
  return next
})

createMutation(onLog, setCount)
```

Want to batch updates?

```ts
batchEvents(() => {
  emitSave()
  emitClear()
})
```

**Pure. Predictable. Phased.**

---

Next time: async, errors, retries, and full integration with suspense.
