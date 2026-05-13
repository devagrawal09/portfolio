---
title: "Transformations in Reactivity"
date: 2025-05-03
source: DEV
originalUrl: https://dev.to/devagr/transformations-in-reactivity-1nn5
tags:
  - "signals"
  - "solidjs"
  - "observables"
  - "rxjs"
---
*What happens when we stop treating events like second-class signals?*

---

### 1. Introduction

Signals have gone through a quiet renaissance.

Once a niche concept, they’ve become the backbone of fine-grained reactivity across modern frameworks — from SolidJS to Svelte 5, Vue’s Composition API, and beyond. With laziness, ownership, batching, and async support, signals are no longer just state — they’re a reactive architecture.

Meanwhile, events have stayed… familiar.  
Push-based systems like RxJS still dominate, with powerful abstractions — and plenty of baggage. They’re expressive, but complex. Powerful, but leaky.

This series explores a different direction:  
**What if we evolved events the way signals evolved?**  
What if push and pull reactivity didn’t require different paradigms, just different shapes?

Let’s start small — by rebuilding events from first principles.

---

### 2. From Observables to Event Graphs

RxJS gave us a model: streams of values transformed by declarative operators.  
It works. But it comes with weight.

Even trivial flows — say, responding to a button click and transforming a value — require a pipeline:

```ts
observable.pipe(
  map(x => x + 1),
  filter(x => x < 10),
  tap(console.log)
)
```

Then comes teardown logic, lifecycle handling, and the occasional “why didn’t this emit?” debugging session.

The idea behind this model isn’t to replace RxJS — it’s to explore what happens when you **stop thinking in streams** and start thinking in **reactive functions**.  
Instead of operators and pipelines, what if you just… mapped?

---

### 3. Solid as Inspiration

SolidJS didn’t invent signals — **S.js** did.  
But Solid made them practical, scalable, and fast. It took a pull-based reactive core and layered on **ownership**, **lifecycles**, and **structured scheduling** — turning signals into a system.

In Solid, signals live inside a graph that disposes itself. When a scope ends — like a component unmounting — all reactive logic inside it is automatically cleaned up. No `unsubscribe()`. No memory leaks. No manual lifecycle wiring.

That’s the leap: **reactivity that lives and dies with its context**.

This model works for signals. What happens if we apply the same ideas to events?

---

### 4. A New Default: Event Handlers as Transformers

Traditionally, push-based systems treat streams like pipelines. You create a source, then pass it through a chain of operators to get what you want.

But what if you didn’t need a chain?

What if the default behavior of an event was simply: **transform a value and hand it off**?

```ts
const onChange = onClick(() => "clicked")
```

Just like that, you've turned one event into another. No `.pipe()`, no `.map()`, no imported operators — just **function composition**.

This model simplifies everything. Here’s how you might build a derived counter from a basic event:

```ts
const [onIncrement, emitIncrement] = createEvent()
const [count, setCount] = createSignal(0)

const onNextCount = onIncrement(() => count() + 1)

onNextCount((next) => {
  console.log("Next count will be:", next)
})
```

If you’ve used signals before, this should feel instantly familiar. It’s not a stream — it’s a value transformer, scoped to a reactive lifecycle.

You can compose multiple steps, too:

```ts
const onEven = onNextCount((n) => {
  if (n % 2 !== 0) haltEvent()
  return n
})

onEven((value) => {
  console.log("Even count:", value)
})
```

Each handler returns a new transformed event. That’s it.  
No operator chain. No nested observables. No cleanup logic.

And yes, you can still pass values through:

```ts
onClick((e) => {
  console.log("Clicked at", e.clientX, e.clientY)
})
```

---

### 5. Filtering with `haltEvent()`

So if we’ve dropped `filter`, how do we stop an event from propagating?

With one helper: `haltEvent()`.

```ts
onInput((value) => {
  if (!isValid(value)) haltEvent()
  return transform(value)
})
```

Filtering becomes a conditional — not an operator. The behavior is local, readable, and imperative.  
And that’s intentional. The more we reduce the operator surface, the more intuitive the graph becomes.

This approach isn’t about losing power — it’s about making the **simple path** the default.

---

### 6. Memory & Lifecycle

Push-based systems historically struggle with memory management.

You subscribe, and then… you unsubscribe. Or you forget. Or you build a helper. Or you use `takeUntil`. Or you write a `useObservable()` hook that does the teardown for you.

In RxJS:

```ts
const subscription = observable.subscribe(fn)
onDestroy(() => subscription.unsubscribe())
```

Or maybe:

```ts
const stream = interval(1000)
  .pipe(takeUntil(destroy$))
```

Even internally, you return a cleanup function from your subscription logic:

```ts
const interval = setInterval(() => observer.next(), 1000)
return () => clearInterval(interval)
```

In an ownership model, that all disappears:

```ts
const interval = setInterval(() => observer.next(), 1000)
onCleanup(() => clearInterval(interval))
```

No teardown function needed.  
No `unsubscribe()` anywhere.  
The event lives as long as the scope that created it.

This is **reactivity with lifecycle built in**.

---

### 7. Rethinking Completion

Observables give you `.complete()` as a way to say, “I’m done.” It’s a way for the stream to manage its own lifecycle.

But in UI systems, streams rarely complete.  
A click handler doesn’t complete. A keypress doesn’t complete. An internal state change doesn’t complete.

Instead of letting streams declare themselves done, we flip the model:  
**streams live as long as they’re used.** And they stop when their owner stops.

```ts
const [onClick, emitClick] = createEvent()
onClick(() => console.log("clicked"))
```

No manual teardown. No lifecycle ceremony.  
When the scope disposes, so does the handler.

This also means events don’t need to be recreated to be reused.  
No reinitialization. No cascading unsubscribes. Just **permanent event nodes** that can be reconnected at will.

---

### 8. Higher-Order Events (Sync Only)

Yes — you can build `switchMap`. But you don’t need to.

An event can just emit another event.

```ts
const higherEvent: Handler<Handler<string>> = ...

higherEvent(innerEvent => {
  innerEvent(value => {
    console.log("Inner event value:", value)
  })
})
```

Each time `higherEvent` emits, it provides a new `innerEvent`. You subscribe to it. You decide what to do with the old one.

Want a helper?

```ts
const createDynamicEvent = (source: Handler<Handler<T>>): Handler<T> => ...
```

Now you’ve got a flattened stream of inner values. And you didn’t write a single operator.

This works great for synchronous graphs.  
Async adds more complexity — and we’ll get there. Just not today.

---

### 9. Final Transformation Example

Here’s the full pattern — from event to transformation to subscriber:

```ts
const [onIncrement, emitIncrement] = createEvent()
const onChange = onIncrement(() => count() + 1)

onChange((value) => {
  console.log("Next count will be:", value)
})
```

You’ve declared an event, transformed it, and used it — all in a few lines.

- No operators.  
- No unsubscribe.  
- No cleanup code.  
- Just pure transformation.

This is the baseline:  
**Events as composable, scoped, reactive functions.**  
And it’s only the beginning.

---

### Next Up: Scheduling

What happens when events start mutating state?  
What happens when the same event graph reads and writes at the same time?

That’s where scheduling comes in.  
And in the next post, we’ll show how phase-based execution solves the hardest problem in event reactivity: **ordering**.
