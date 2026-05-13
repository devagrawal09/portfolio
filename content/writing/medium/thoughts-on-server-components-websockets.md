---
title: "Thoughts on Server Components and Websockets"
date: 2023-12-13
source: Medium
originalUrl: https://medium.com/stackademic/thoughts-on-server-components-websockets-ed3db4bbd8ed
tags:
  - "React"
  - "Nextjs"
  - "Websocket"
  - "Web Development"
  - "React Native"
---
I’ve been thinking about this for way too long now, and right now I am convinced that this is potentially an amazing way to build realtime applications. Would love to be proven wrong.

Currently I believe there are 2 ways to achieve it.

## Just reload the page

This is what [I have working so far](https://twitter.com/devagrawal09/status/1731095782541943161). The component listens on a live topic, and when it receives a message it just reloads the page, i.e., load all the server data again.

This is the most bare and simple integration, but also very powerful, because you get security by default. It’s like the Stripe integration — server creates a secure session, then tells the client how to connect to it. If the server component is not rendered, the client has no way to connect to a topic and receive unauthorized messages.

This is also not the most efficient — websockets are being used purely as a notification, not to transfer data. Every realtime update is causing a server fetch.

But a huge class of applications can greatly benefit from a very simple drop in “make this page realtime” solution.

## RSC over WebSockets

Getting tricker now. This is essentially an entirely different server that is also running Server Components, but with state! This is VERY different from how we use Server Components today which are designed to run in stateless environments.

The DX will be very similar — a server component will return JSX that will be sent to the client as a websocket message where its handled by React. Except there’s no navigation — the client just establishes a connection and shows a Suspense fallback, and the server decides when it needs to render the UI.

So how do these components get triggered? Well you can just listen to websocket messages, or have another http api on the side, or subscribe to rabbitmq, or connect to a cloud service.

These server components will require an entirely new concept of Routing defined on top of WebSockets instead of HTTP, and the layer of infrastructure to provide that (like Next.js).

They’re also have to be detached from Next.js — the websocket server component has to be mounted on the Client instead of on the Server, because Next.js’s routing cannot interfere with it.

(Obviously SSR is a non-issue with websockets)

I don’t think there’s any solutions to do this today, but if someone is interested in building one let me know. This is kindof a big problem because you need to build a metaframework but for websockets, but you also don’t have to deal with SSR so it’s slightly easier I guess.

## What about Serverless?

Great question.

My implementation of #1 runs on AWS and uses a combination of API Gateway and DynamoDB. “state” on the server doesn’t have to be in memory, it can be a database, especially if it’s a low latency KV, or even better, a durable object. And the websocket part can use any underlying infrastructure.

It’s the same for #2 — stateful RSCs can easily exist on serverless runtimes.

## But Why RSCs with WebSockets

The DX of Stateful RSCs is basically the exact thing you imagined when you first heard “server components”. It’s components that can useState and setState on the server.

This is a very powerful way to build interactive apps, because similar to how RSCs encapsulate the entire http layer, state RSCs can encapsulate the entire websocket layer and give you complete control over how much work is done on the server vs client, and directly connect your UI to server events. Basically if the underlying implementation completely changed from websockets to something else we wouldn’t even notice.

Let me know if I’m crazy or is this real.
