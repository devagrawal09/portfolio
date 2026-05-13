---
title: "How We Roll – Chapter 8: Sessions"
date: 2023-07-21
source: Clerk
originalUrl: "https://clerk.com/blog/how-we-roll-sessions"
tags:
  - how-we-roll
  - sessions
  - authentication
---

Welcome to How We Roll! This series is meant to help product owners, developers, and security professionals understand exactly how we implement (or, roll) authentication at Clerk.

## Chapter 8: Sessions

One of the primary objectives of Clerk is to ensure application security while providing the developer with ways to adjust it. Clerk’s auth is configured for a smooth user experience by default, but developers can enable additional layers of security like [multi-factor auth](https://clerk.com/docs/authentication/custom-flows/multifactor) depending on the needs of the business.

Sessions is another tool in the authentication toolkit that allows fine-tuning of application security and user experience. A session is an abstract concept that refers to the period of time that a user is signed-in to an application. Like most abstract concepts, it can be modeled and designed to fit your needs.

Before describing Sessions, it’s helpful to grasp the idea of Clients.

### Clients

If a Session is the period of time a user is logged in, the Client is the device with which the user is logged in. Clients can be browsers, native applications, or any other medium that is usually the requesting part in a request/response architecture.

It’s also helpful to think of a Client as a running instance of ClerkJS. When the ClerkJS library is loaded into a browser by an application, it creates an active Client instance. A Clerk Client supports connecting to multiple sessions. This allows users to be logged in to multiple accounts at the same time and easily switch between them.

To learn more about multi-session handling [read the documentation](https://clerk.com/docs/authentication/multi-session-applications).

Clerk stores information about the Client and the device it’s running on. This allows users to easily identify which devices they have logged in with and sign that device out of their account. This feature is crucial in case the device gets lost or stolen, or an account gets compromised.

![How We Roll Sessions guide illustration](./142db168fc61365864c470ef858a2001e034bc73-1818x1424.png)

### Creating a Session

To achieve the “Sign out of this device” functionality, Clerk stores the Session that is created when a user logs in. This Session object stores a reference to the Client that was used to create it. In the account security section, Clerk shows all the Sessions for the current user along with the Client information, and when the Session was created to further help identify what devices should and should not be signed in. Signing out from a Client is as simple as deleting the Session object.

Sessions have a maximum lifetime that can be adjusted on the Clerk Dashboard in the Sessions tab. If the application attempts to authenticate with an expired session, the authentication will fail and the user will have to log in again.

[Video: Creating a Session demonstration](./8a3855ff21760e0335362b4b6aee9062dee0adb3-1060x720.mp4)

Upon sign-in, a reference to the created Session is stored in the `__client` cookie. This cookie is _Secure_ and _HttpOnly_, so it’s inaccessible to [MitM](https://developer.mozilla.org/en-US/docs/Glossary/MitM) and [XSS](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss) attacks.

From here, this cookie can be used to authenticate with an application. When an HTTP request is received, the cookie can be used to fetch the Session object which has the user ID. If the Session doesn’t exist, the user has signed out of this Client, and the request would throw an Unauthorized error.

However, this process adds extra overhead to the request by introducing a database call. Usually developers attempt to mitigate this overhead by storing the Session object in memory, or in a low-latency store such as a Redis cache. This reduces the cost of fetching the Session object, but requires additional infrastructure to scale.

### Web APIs love JWTs

[JWTs](https://clerk.com/blog/guide-JWT-authentication-JSON-Web-Tokens) were invented primarily to solve this additional overhead problem. Since JWTs can be verified to have been generated on a trusted server, the contents of the JWT can be trusted. This means Clerk can encode the Session object into a JWT, which the Client will use to authenticate with the application. When the application receives an HTTP request, the verified token can be used to access the Session object and process the request, instead of having to fetch the Session object from Clerk’s Backend API. The overhead required to verify a JWT is significantly lower than fetching data over a network. This Session token is stored in the `__session` cookie where it’s accessible to the Client. Alternatively, the Client can store this Session token in the browser’s local storage or a native equivalent, and pass it to the server through the Authorization HTTP header.

> **JWKS refresher:** [JSON Web Key Set (JWKS)](https://medium.com/javarevisited/json-web-key-set-jwks-94dc26847a34) is a way for an application to advertise the public key that can be used to verify that a token was generated and signed by that application. Clerk applications expose their public keys at the `clerk.your-site.com/.well-known/jwks.json` endpoint.
>
> When an API receives a request with a token, the JWKS is used to verify that the token was generated by Clerk. The API server fetches the JWKS at startup time and stores it in memory to save the network latency of fetching JWKS on demand. JSON Web Keys are stable and don’t need to be refreshed.

However, since the Session object is now stored on the Client that created it, only this Client is able to invalidate or terminate the session. This removes the ability to remotely sign out from a specific device. So while JWT Sessions solve the extra overhead, they disable a key security feature.

### It Always Comes Down To Cache Invalidation

Since the ability to remotely sign out of devices is a crucial feature, the source of truth has to be the Session object stored on the server. It cannot be the one stored on the Client. But fetching from the database is expensive. Whereas the JWT essentially acts as a cached version of the Session object that can never be programmatically invalidated. It’s the other extreme of the spectrum.

Fortunately, JWTs have a lifetime of their own and can be set to expire at some point in the future. When Clerk generates a Session token for a sign-in, the token is set to expire 60 seconds into the future. This Session token can be used to authenticate for the next 60 seconds. A database fetch for the Session is only required once the token has expired and a new token needs to be generated.

When a Session is deleted (user signs out of a device), new tokens cannot be generated, but the most recently generated token can still be used if it was generated less than 60 seconds ago. This guarantees that authentication states in an application will never be invalid for more than 60 seconds.

This approach allows Clerk to offer highly performant authentication without compromising on the security benefits of persistent Sessions.

### Inactivity

Generating short-lived tokens for a long-lived session comes with an additional benefit - it is a great indicator of user activity. If the user stops interacting with the application for more than 60 seconds, a new Session token is not generated. The creation time of the most recent session token can be used by Clerk to determine when the user was last _using_ the application instead of just being logged in.

Clerk allows developers to enable Inactivity timeout - this is the maximum amount of time the user can be away from the application and come back to it without having to log in again. Inactivity timeout can also be set on the Clerk Dashboard in the Sessions tab.

[Video: Session token authentication demonstration](./a9662b29b31bc473213b3a21e3fe4b00c929c811-1060x720.mp4)

### Dynamic Permissions

Sessions are not only created and destroyed - they can also be mutated within their lifetime. The most common use case for mutating Sessions is changing permissions or authorization policies. While a user is logged into the application, they might get added to or removed from organizations, or their roles within an organization could change.

Clerk saves this information in the Session object and ensures it’s updated so that new Session tokens can cache it and the application can process the request without making additional calls to Clerk.

Clerk also allows customization of the Session tokens. Developers can add additional claims to the Session token in the Clerk Dashboard. Shortcodes can be used to inject user data and metadata. In this example, a new claim `verified` is added to the token. Users with an unverified email address will have this claim set to `false` in the token. Once they verify their email, the next Session token that is generated will have this set to true, so any access rules depending on this claim will work as expected.

[Video: Session token authentication demonstration](./9af974ad04a3df8a8e75110fc4d74e073000b784-1060x720.mp4)

To learn more about Session token customization [read the documentation](https://clerk.com/docs/backend-requests/making/custom-session-token).

## Summary

Sessions are a very powerful tool for enabling security capabilities like multi-sign-in, inactivity timeout, remote sign-out, and dynamic permissions. Clerk takes on the burden of implementing the complex mechanism of Session handling so that developers have access to a performant and flexible authentication system that is easy to integrate.

To learn more about the elements of session management and relevant security concerns, check out [this blog post](https://clerk.com/blog/what-is-session-management).

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
