---
title: "How We Roll – Chapter 9: Infrastructure"
date: 2023-08-04
source: Clerk
originalUrl: "https://clerk.com/blog/how-we-roll-infrastructure"
tags:
  - how-we-roll
  - infrastructure
  - authentication
---

Welcome to How We Roll! This series is meant to help product owners, developers, and security professionals understand exactly how we implement (or, roll) authentication at Clerk.

## Chapter 9: Infrastructure

A system that provides secure authentication with a great user experience requires a lot of complex infrastructure. This goes beyond the typical client-server systems developers are familiar with and build.

- Sensitive data needs to be protected both in transmit and at rest
- Integrations with third party services need to be configured and orchestrated
- Work needs to be delegated to background to keep the application responsive
- Failures and timeouts need to be handled and observable to developers
- Operations need to be scalable to handle millions of users

In this chapter of How We Roll, we will explore the infrastructure that is required to build and operate an authentication system, and dive into the infrastructure that allows Clerk to offer an authentication experience that can be integrated into a project within minutes.

### Self-Hosted Auth

An application that implements auth directly or through imported libraries is self hosted, which means the developers have to manage the auth infrastructure on their own.

We can imagine an application with self-hosted auth that would look like this.

![How We Roll Infrastructure setup guide](./c8dbf4c3c324efaeef80269f07617b0418861410-1200x504.png)

The client would be a web, mobile, desktop, or console application that users interact with. The server provides the ability to sign in and check passwords, and the database is where the user data is stored securely.

The ability to send emails becomes a requirement very early, and is basically table-stakes for most consumer-facing applications. SMS is usually optional but is essential to many industries, and offering flexibility to the users to choose between email and phone is great experience.

![How We Roll Infrastructure setup guide](./5fefabb160b8972d644daa3ae2b5c793a8890727-1200x508.png)

This adds the infrastructure cost of either self-hosted servers or integrating with third-parties like [Sendgrid](https://sendgrid.com) and [Twilio](https://www.twilio.com).

Along with the development cost spent into the integration, sending email and text notifications is often high latency and failure-prone. If these operations are performed in the regular request-response cycle, it results in bad user experience since requests take too long to get a response.

![How We Roll Infrastructure setup guide](./832787cf55ca55b172cbe0da0c52ff262f687fe5-1200x554.png)

Delegating these operations to asynchronously-scheduled background jobs becomes necessary to ensure the application is snappy and responds to user interactions quickly. The jobs must ensure that all notifications are delivered, retried on failure, and offer developers observability into failures and bottlenecks. This can also be delegated to a provider like [Upstash](https://upstash.com), which again adds more cost of integration.

OAuth integration requires acquiring credentials and building adapters for each OAuth provider. The latter can usually be delegated to an open-source library like [NextAuth](https://next-auth.js.org).

This is not an exhaustive list. Some use-cases require additional infrastructure like SAML integration, blockchain adapters, compliance guarantees, or bot detection.

### Clerk-Hosted Auth

Clerk is designed to allow developers to build applications that look like this.

![How We Roll Infrastructure setup guide](./c07d33983423a94d4161a25b242ad4af255d3440-1200x339.png)

Clerk offers complete authentication capabilities directly on the client. Developers are not required to host a server to enable Clerk’s auth. This also allows Clerk to offer a great user experience and developer experience through pre-built components.

That said, many applications will have their own server and database. However, all auth-related responsibilities are delegated to Clerk, and Clerk’s backend package makes integration on the server easier and supports all non-node environments.

![How We Roll Infrastructure setup guide](./bb3661a1bd785eecaba37c2323a94239af4d73d3-1200x463.png)

But since the server is optional, developers can decide to not host one at all, and leverage a Backend-as-a-Service solution like [Firebase](https://firebase.com). Clerk also offers integrations to popular BaaS providers through [JWT Single Sign-On](https://clerk.com/blog/how-we-roll-jwt-sso).

![How We Roll Infrastructure setup guide](./e53ed34009c8057fc66521edb69b09c7846222b3-1200x350.png)

Let’s zoom into the diagram and explore the infrastructure that powers the Client-Server integrations.

![How We Roll Infrastructure setup guide](./b9f130f6f7268d2037d6ff77cd3edf63b7dfaf8b-1200x630.png)

The [Javascript library](https://clerk.com/docs/reference/clerkjs/installation) and [pre-built components](https://clerk.com/docs/components/overview) interact with Clerk’s [Frontend API](https://clerk.com/docs/reference/frontend-api), which is where the user signs in. For magic-link and OAuth based flows, the API redirects the user back to the Client after a sign in. Clerk is responsible for syncing the sign-in session with the Client.

The [Backend API](https://clerk.com/docs/reference/backend-api) powers the [backend SDKs](https://clerk.com/docs/references/javascript/overview) that authenticate client requests and access user data stored in Clerk’s database. The backend also delivers events to the application Server through [Webhooks](https://clerk.com/docs/integrations/webhooks/overview) to enable asynchronous and event-based systems.

![How We Roll Infrastructure setup guide](./6e05d46aeec5d06570e9db1d684142c8cda6d648-1200x630.png)

Internally Clerk is split into the Frontend and Backend API services that run on the highly scalable and efficient runtime of [Google Cloud Run](https://cloud.google.com/run). The API services share access to the data, which is managed by [Google Cloud SQL](https://cloud.google.com/sql) and stored with security and integrity guarantees. Clerk also manages background jobs to delegate any non-critical work to. The background jobs also leverage Cloud Run and are configured with various priority levels, which are determined by the urgency of the operation being delegated (e.g. sending a message is high priority, cleanup tasks are low priority). This helps Clerk provide extremely responsive APIs, which is essential to ensure the authentication UX is fast and snappy.

![How We Roll Infrastructure setup guide](./32a8c39a636852fc2ee6866f4b28720d9b0e4ab9-1200x696.png)

Clerk also takes on the cost of integrating with other external services. SMS, Emails, and Webhooks are automatically delivered through [Sendgrid](https://sendgrid.com), [Twilio](https://www.twilio.com), and [Svix](https://www.svix.com) respectively, without any additional cost of integration. OAuth provisioning is also completely eliminated, as Clerk provides shared OAuth credentials and adapters for most popular OAuth services that can be enabled with a simple switch.

Since Clerk powers the complete end-to-end authentication flow, any additional infrastructure that might be required for special use-cases, like SAML, blockchain, or security compliance, can be added by Clerk without developers having to build any extra integrations. [A recent release](https://clerk.com/blog/changelog-2023-07-07) of Clerk included built-in bot detection, that allows developers to build AI applications that offer free credit to new users, while Clerk ensures that malicious actors cannot spam create new accounts and abuse free credits.

![How We Roll Infrastructure setup guide](./12bacf949d2dd15dcdb8cd4acb5dcb238632efe5-1200x786.png)

Bot detection capabilities are enabled by a combination of Clerk’s in-house countermeasures and [Cloudflare](https://cloudflare.com), which are made available to Client applications out of the box.

### Bring your own Infra

Thanks to this infrastructure, getting up and running with fully functional auth in an application is a matter of minutes with Clerk. However, for various reasons, developers will prefer to leverage some of their own infrastructure. Clerk can be configured to not deliver messages if the developers wish to use their existing Email or SMS servers. Clerk sends webhook events for those messages to the application server, which can then integrate with self-provisioned Email and SMS servers to deliver the message to the user.

### Bring your own Configuration

Another contributor to Clerk’s quick onboarding experience is shared DNS and OAuth configurations.

![How We Roll Infrastructure setup guide](./9e7145464a1c7845cb548d9d7e621c4962f3d8c2-1200x630.png)

In a development instance, Clerk’s Frontend API is hosted on a subdomain of `accounts.dev`. This subdomain is a randomly generated slug unique to each application, e.g. `random-dove-45.accounts.dev`. The API is fully functional cross-origin, so the client application can be running on any domain, including `localhost` and [preview deployments](https://clerk.com/docs/deployments/vercel), and will have full access to all of Clerk’s auth. Emails are automatically sent from an address like `no-reply@accounts.dev`, and OAuth flows use shared credentials.

While the cross-origin authentication capability contributes to the extremely quick onboarding DX of Clerk, it opens up vulnerabilities to certain cross-site scripting attacks, since sensitive authentication tokens are being shared across origins. This also means that [magic links](https://clerk.com/blog/magic-links) and emails use a Clerk-owned `accounts.dev` URL instead of the application URL, which is a non-starter for production applications. Similarly, OAuth consents are provided to a third-party (Clerk) instead of to the application directly.

In a [production instance](https://clerk.com/docs/deployments/overview), Clerk requires developers to add some DNS settings to their production domain, which allows Clerk to host the Frontend API at a subdomain of the application’s own origin. This eliminates cross-site vulnerabilities and guarantees absolute security of the application across all authentication flows. All links and email addresses also use the application’s domain so the risk of users mistaking

Clerk also requires production instances to have their own OAuth credentials so that all OAuth consents are provided directly to the application owner.

![How We Roll Infrastructure setup guide](./2e3b8c93ba1f2a09ed6364463caf39a8b54845f4-1200x630.png)

In addition to full security, hosting the API as a subdomain of the Client origin allows any other subdomain to access the same sign-in sessions as the primary Client. Users only need to sign-in once, and the session is automatically made available Clients on any subdomain by the Frontend API.

![How We Roll Infrastructure setup guide](./fa6fe5bacac768babc9a82ae80521aaeb3c9c1b3-1200x630.png)

## Summary

Clerk is designed not only to serve all the authentication needs of modern web applications, but to provide developers with an extremely easy onboarding experience along with the flexibility to turn off certain parts and integrate with their own systems. Clerk goes above and beyond with infrastructure to ensure that no compromises are made in terms of user and developer experience.

## How We Roll Series Index

- [How We Roll – Chapter 1: Passwords](https://clerk.com/blog/how-we-roll-passwords)
- [How We Roll – Chapter 2: Avatars](https://clerk.com/blog/how-we-roll-avatars)
- [How We Roll – Chapter 3: Multifactor](https://clerk.com/blog/how-we-roll-multifactor)
- [How We Roll – Chapter 4: Email Verification](https://clerk.com/blog/how-we-roll-email-verification)
- [How We Roll – Chapter 5: Customization](https://clerk.com/blog/how-we-roll-customization)
- [How We Roll – Chapter 6: User Profile](https://clerk.com/blog/how-we-roll-user-profile)
- [How We Roll – Chapter 7: JWT Single Sign-On](https://clerk.com/blog/how-we-roll-jwt-sso)
- [How We Roll – Chapter 8: Sessions](https://clerk.com/blog/how-we-roll-sessions)
- [How We Roll – Chapter 9: Infrastructure](https://clerk.com/blog/how-we-roll-infrastructure)
- [How We Roll – Chapter 10: Roundup](https://clerk.com/blog/how-we-roll-roundup)
