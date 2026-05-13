---
title: "Most AI Chat Apps Are Broken. Sync Engines are the Fix."
date: "2026-04-10"
source: PowerSync
originalUrl: "https://powersync.com/blog/most-ai-chat-apps-are-broken-sync-engines-are-the-fix"
tags:
  - "AI"
  - "Chat"
  - "Sync"
---
This is the experience of most AI chat apps today: you start a generation, get halfway through, and if anything interrupts the connection, such as a refresh, a tab switch, or a network hiccup, you lose the response.

Gone. The entire response. The app had no memory of the generation that was literally happening seconds ago.

That's the moment I realized most AI apps are built like demos. They work perfectly in controlled conditions and fall apart the instant real users do real user things.

The problem lies not with the user, but with how we've learnt to build AI apps.

## How we usually build AI apps (and why it breaks)

The standard pattern looks like this:

1. User clicks "Generate" in your UI
2. Client sends a request to your server
3. Server calls the LLM API
4. LLM streams tokens back
5. Server forwards those tokens to the client
6. Client renders them in real-time
7. Server saves the final result to your database

This works great for screenshots. I've built apps this way myself.

But that stream in step 4-5? It's tied to a single HTTP connection. If that connection hiccups (user refreshes, switches tabs, loses WiFi for three seconds), the stream dies. Some apps try to reconnect, but they're reconstructing state from scratch, hoping the LLM will resume from the right spot (it won't, unless you're paying for expensive persistent connections).

The deeper problem: only the client that started the request sees the live output. If you open the same document on your phone while the AI is generating on your laptop, you see nothing until it's done. Your backend has the stream. Your database gets the final result. But everything in between is invisible to anyone else.

Teams solve this by adding more infrastructure. WebSockets for cross-device sync. Redis for caching partial results. Background queues for retry logic. It works, but now you're maintaining a real-time system just to show AI output that will eventually just be text in a database anyway.

There's a simpler way. But it requires thinking about AI output differently.

## State, not streams

PowerChat is a multiplayer chat app I built where AI agents can be @mentioned in channels. In this app, I tried a different approach. Instead of treating the LLM response as a stream to be forwarded, I treat it as state to be synced.

Here's what happens when a user mentions an AI agent:

```
// Client writes the message locally
await clientDb.insert(messages).values({
  id: crypto.randomUUID(),
  channelId: props.channelId,
  authorType: "user",
  authorId: username,
  content: text,
});
```

That's it. The client doesn't wait for a response. It doesn't handle streaming logic. It writes to the local SQLite database and PowerSync syncs it to Postgres.

The backend picks it up from there:

```
// Server creates placeholder agent message
await db.insert(messages).values({
  id: agentMessageId,
  channelId: message.channel_id,
  authorType: "agent",
  authorId: agentId,
  content: "Thinking...",
});
```

Notice what's happening: the AI response is just another message in the channel. From the client's perspective, there's no difference between a human typing and an AI generating.

Then the streaming happens server-side:

```
// Stream from LLM, persist as it arrives
for await (const event of stream.fullStream) {
  if (event.type === "text-delta") {
    finalText += event.text;
    await db
      .update(messages)
      .set({ content: finalText })
      .where(eq(messages.id, agentMessageId));
  }
}
```

Every connected client sees the response evolve in real-time because PowerSync syncs those writes down to everyone's local database.

The UI is dumb in the best way possible:

```
const messages = useQuery(() =>
  clientDb
    .select({ id: messages.id, content: messages.content })
    .from(messages)
    .where(eq(messages.channelId, props.channelId))
);
```

It doesn't know or care whether content came from a human or an AI. It just renders what's in the local database.

## What changes

This architecture moves complexity into a place that's easier to reason about: the data model. Instead of building separate paths for streaming, persistence, retry, reconnection, and multiplayer updates, you model the AI interaction as synced state from the start.

That gives you properties that are hard to get cleanly any other way:

- **Multiplayer by default.** Three people in the same channel all see the AI response appear simultaneously. No extra WebSocket code required.
- **Resumable everything.** Close your laptop mid-generation, reopen it on your phone, and you haven't lost anything. The response was never tied to your connection, it was in the database the whole time.
- **Offline queueing.** Write a message offline, and the AI will process it once you're back online. The "request" is just data waiting to sync.
- **Simpler client code.** No stream handlers. No connection state management. Just queries against local state.

Latency and write volume are real concerns, but they're implementation details, not reasons to fall back to a more fragile architecture. The initiating user action is still instant because it starts as a local write. For generated output, you can tune how often partial results are persisted, keep workers close to your database, and still preserve the core model: the response lives in synced state, not in a disposable connection.

In practice, that usually means flushing periodically instead of writing every token:

```
let chunksSinceFlush = 0;
for await (const event of stream.fullStream) {
  if (event.type === "text-delta") {
    finalText += event.text;
    chunksSinceFlush++;

    if (chunksSinceFlush > 20 || finalText.endsWith("\n")) {
      await db
        .update(messages)
        .set({ content: finalText })
        .where(eq(messages.id, agentMessageId));

      chunksSinceFlush = 0;
    }
  }
}
```

This is a conceptual shift: the LLM stream is an implementation detail. The database is the source of truth. The client simply renders the database.

## Try this instead

Next time you build an AI feature, start by asking: what happens when the user refreshes?

If your answer involves reconnecting to a stream, checking sequence numbers, or hoping the LLM can resume, you are focusing on transport infrastructure instead of the product.

Instead, write the request as data. Let the server generate. Persist incrementally. Sync to clients. Let your UI be a simple view of the state that happens to be changing.

The refresh, multiplayer, and even the offline problems vanish.

Ultimately, these issues vanish when you stop treating AI output as a stream and start seeing it as application state.

---

If you want to see this in action, the [PowerChat source is available](https://github.com/powersync-community/powerchat). It's built with SolidStart, PowerSync, Neon, and Mastra, mostly as an experiment in how simple collaborative AI apps can be when you stop fighting the network.
