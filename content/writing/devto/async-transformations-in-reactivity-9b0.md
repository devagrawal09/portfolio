---
title: "Async Transformations in Reactivity"
date: 2025-05-15
source: DEV
originalUrl: https://dev.to/devagr/async-transformations-in-reactivity-9b0
---
*Bringing structure to async events — lifecycles, retries, and transactions without losing composability*

> This is part of the **Transformations in Reactivity** series.  
> In Part 1, we focused on composability. In Part 2, we introduced structured scheduling.  
> In this chapter, we tackle **async coordination**: giving events the same structured lifecycle semantics Solid’s signals gained with `createAsync` — without losing the essence of push-based flows.

## 1. The Async Gap: Signals vs Events

Signals model **current state**. They’re synchronously derived and perfectly suited for reflecting application state in the UI. But when you introduce async data (like fetches), signals had to evolve mechanisms to handle suspension, pending states, and errors structurally.

Solid 2.0’s `createAsync` solved this with a structural approach:
- Signals throw during unresolved state (Suspense).
- Errors propagate up naturally.
- Async dependencies remain composable.

Events, however, are inherently **push-based** and asynchronous. They represent **mutations, interactions, and side effects**. Yet, they lack the structured semantics signals now enjoy:
- No built-in way to track pending state.
- No structured error handling.
- No notion of scoped retries or isolation.

If signals got structured async reactivity, why not events?

## 2. What Structured Async for Events Means

In stream-centric systems like RxJS, streams offer `next()`, `error()`, and `complete()`. Useful, but flat. They don’t express:
- Pending/loading state.
- Scoped retries.
- Predictable execution order across async flows.

We need a structural lifecycle for events, much like signals have.

The key:
- `wait()`: Emitted when async work starts.
- `next()`: Emitted for resolved values (once or many times).
- `error()`: Propagates failures structurally.
- No `complete()`: Events are tied to ownership, not upstream closing.

This turns fire-and-forget events into structured flows.

## 3. `createAsyncEvent`: Declarative Async in the Event Graph

`createAsyncEvent` models async operations structurally.

### Single result:
```ts
const onValidated = createAsyncEvent(onSubmit, async (form) => {
  await validateForm(form)
  return form.id
})
```

- Emits `wait()` at start.
- Emits `next(result)` when resolved.
- Emits `error(err)` on failure.

### Multiple results with AsyncIterable:
```ts
const onProgress = createAsyncEvent(onStart, async (input) => {
  async function* progress() {
    for (let i = 0; i <= 100; i += 10) {
      await delay(100)
      yield i
    }
  }
  return progress()
})
```

- Emits multiple `next()` values.
- No imperative observer API. Just return values.

## 4. What About switchMap, concatMap, mergeMap, exhaustMap?

In RxJS:
- `switchMap` cancels previous.
- `concatMap` queues.
- `mergeMap` runs all concurrently.
- `exhaustMap` ignores overlaps.

For **events**:
- We care about **mutations**, not derived state.
- Every mutation should flow through.

Thus:
- **merge behavior** is default.
- All handlers run concurrently.

`concat`, `exhaust`, and `switch` can be built in userland:
- Queueing.
- Busy flags.
- Disposing previous subscriptions.

Signals handle derived state with switchMap-like patterns.  
Events handle side effects — and merge fits naturally.

## 5. Observing Async Events Structurally

### `createSyncEvent`: Promises from Events
Transforms `Handler<T>` into `Handler<Promise<T>>`:
```ts
const onSubmitPromise = createSyncEvent(onValidated)

createListener(onSubmitPromise, async (promise) => {
  const result = await promise
  console.log("Validated ID:", result)
})
```
Every emission creates a new promise reflecting `wait`, `next`, `error`.

### `createSyncStream`: AsyncIterables from Events
For multiple emissions:
```ts
const onProgressStream = createSyncStream(onProgress)

createListener(onProgressStream, async (stream) => {
  for await (const progress of stream) {
    console.log("Progress:", progress, "%")
  }
})
```

- Each trigger yields an AsyncIterable.
- Errors throw during iteration.
- Declarative consumption of event-driven streams.

## 6. Scoped Retry with Event Context

Signals retry by re-accessing. Events propagate downstream.  
To enable retries:
- Async handlers register `retry()` into the event context.
- Downstream listeners can access:
  ```ts
  createListener(onValidated, {
    error: (err) => getEventContext()?.retry()
  })
  ```

This allows isolated, structural retries without global event re-emission.

Event contexts are cloned and propagated across async boundaries, maintaining isolation.

## 7. Transactions: Deferred Work with `runTransaction`

`runTransaction` wraps an event flow so that:
- `wait()` and `next()` are deferred until the transaction completes.
- Errors are surfaced via the returned promise.
- Side effects batch after completion.

```ts
const result = await runTransaction(() => {
  emitSubmit()
  emitOtherAction()
})
```

Unlike global transitions in React/Solid, each transaction here is fully scoped and supports concurrency.

For full UI transactional updates:
- Use `runTransaction` for event flows.
- Use `startTransition` for signal state forks.
- Compose both for predictable isolation.

## 8. Events as First-Class Async Structures

By giving events:
- Structured lifecycles (`wait`, `next`, `error`)
- Scoped retries
- Transactional isolation

We reach parity with signals in composability and predictability — while keeping the push-based essence.

The API remains minimal:
- Return a Promise or AsyncIterable.
- Observe flows declaratively.
- No boilerplate.

This lets events fully participate in fine-grained, async-reactive UI architectures.

## Next:
Granular propagation.  
Not every listener needs every event.  
Next chapter explores **Topics** — bringing fine-grained updates to event graphs, like stores and projections did for signals.
