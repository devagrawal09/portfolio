---
title: "How We Roll – Chapter 7: JWT Single Sign-On"
date: 2023-07-14
source: Clerk
originalUrl: "https://clerk.com/blog/how-we-roll-jwt-sso"
tags:
  - how-we-roll
  - jwt
  - sso
  - authentication
---

Welcome to How We Roll! This series is meant to help product owners, developers, and security professionals understand exactly how we implement (or, roll) authentication at Clerk.

## Chapter 7: JWT Single Sign-On

Clerk offers [seamless integration](https://clerk.com/docs/integration/overview) with Backend as a Service (BaaS) providers like [Firebase](https://firebase.google.com), [Supabase](https://supabase.com), and [Convex](https://www.convex.dev). BaaS providers enable developers to build applications quickly without worrying about the backend and infrastructure, similar to what Clerk does for auth. These providers abstract complex infrastructure logic and make it accessible to the front-end client through simple APIs and SDKs.

With that being said, any time you are accessing data from the client, there is a security concern; proper authentication and authorization is paramount, which is why these providers enable developers to configure security rules.

![How We Roll Jwt Sso guide illustration](./14852af290484142fa8bcd2f2d9db1925a8261cc-1346x344.png)

Clerk's officially supported integrations with these providers allow developers to seamlessly leverage Clerk for authentication in applications that depend on a BaaS. This is achieved through a concept called **JWT Single Sign-On**.

### Web APIs love JWTs

A JSON Web Token (JWT, pronounced _jot_) is a JSON string that is cryptographically signed and base64 encoded. Anyone can decode and read this key, but it can only be generated and verified using a secret key (or a private-public key pair). It’s like a passport that web apps create to give users access.

Claims are the credentials encoded in a JWT that are used to decide what resources the user has access to. If a JWT is a passport, claims are the contents of the passport, including your name, date of birth, passport number, and any stamps.

To learn more about JWTs, check out [this blog post](https://clerk.com/blog/guide-JWT-authentication-JSON-Web-Tokens). Or implement JWT auth from scratch with [this blog post](https://clerk.com/blog/adding-jwt-authentication-to-react).

### JWT Single Sign-On

JWT SSO is conceptually similar to OIDC or SAML Single Sign-On - it enables multiple services to use a single identity provider.

> **SAML refresher:** Security Assertion Markup Language is an XML-based protocol that enables Single Sign-On, similar
> to OIDC. SAML is used heavily in enterprise environments with a central auth system that issues XML tokens to
> applications when a user needs to authenticate.

OIDC and SAML providers act as a source of identity for a user. They provide information about the user, like email address, name, avatar, and roles.

JWT SSO providers essentially share the logged-in session of the user with the services. They provide a token that represents not just the user, but the fact that the user _recently_ signed in. If these tokens are short-lived, they can be regenerated, as long as the user is still logged in. JWT SSO allows the user to “be logged in” to multiple services (for example Clerk and Supabase) at the same time.

Clerk achieves this by generating a custom JWT for the signed-in user, which can then be used to make API requests to the provider. Developers can configure **JWT templates** in the Clerk Dashboard to generate these custom tokens.

```tsx
try {
  const token = await Clerk.session.getToken({ template: 'template_name' })
  // use token to call external service
} catch (e) {
  // handle error
}
```

### JWT Templates

To generate custom JWTs on the client, developers can configure a JWT template in the Clerk Dashboard. The template provides all the configurations necessary for JWT SSO to work with various providers.

[Video: JWT Templates demonstration](./ec12bfde008cd3169de44a27cfdeb6880be8c47d-1060x720.mp4)

These are some of the configuration options for JWT templates available on the Clerk Dashboard.

#### Token lifetime

Based on caching or security policies, developers can configure how long the token should be valid for. A long-lived token can be generated once, cached, and reused. A short-lived token has to be generated every time a request is made.

#### Custom signing key

Different providers have different ways to validate a JWT that they did not generate. For example, Firebase and Supabase require the tokens to be generated using their own secret. Developers can get this secret from the provider's dashboard, and configure the JWT template to use this secret key in the Clerk Dashboard.

When this token is generated and sent to the provider, the provider will be able to validate the token since it was generated using their key.

#### Issuer defined key

Other providers like Convex do not require using their own secrets. Instead, they can be configured with a public key or with **JSON Web Key Set** (JWKS).

A **JSON Web Key** is a public key that can be used to validate a token but cannot be used to generate one. An auth provider (issuer) like Clerk exposes its JSON Web Keys in the JWKS endpoint, which can be used by external providers to verify if a JWT was generated by Clerk. Similar to the JWT secret, the JWKS is unique to each application on Clerk.

Services like Convex allow developers to define an Issuer and a JWKS endpoint, which tells the service where to find the JWKS to validate the tokens. Both the Issuer URL and JWKS URL are available on the JWT Template configuration page on the Clerk DashboardTemplate page.

#### Custom Claims

Along with validating that the token was securely generated, data providers also need to know who the user is to check against security rules.

Most providers expect specific claims in the JWTs, optionally within a namespace. Clerk has pre-built JWT templates for popular services, and the templates are already configured with custom claims that the specific services look for. Within custom claims, handlebars-style templating can be used to include user information with shortcodes.

`JWT Template Custom Claims with Shortcodes`

```json
{
  "aud": "convex",
  "name": "{{user.full_name}}",
  "nickname": "{{user.username}}",
  "picture": "{{user.image_url}}",
  "given_name": "{{user.first_name}}",
  "family_name": "{{user.last_name}}",
  "email": "{{user.primary_email_address}}",
  "phone_number": "{{user.primary_phone_number}}",
  "email_verified": "{{user.email_verified}}",
  "phone_number_verified": "{{user.phone_number_verified}}",
  "updated_at": "{{user.updated_at}}"
}
```

## Summary

Clerk strives to be a complete auth solution with an exceptional developer experience, and integrating with BaaS providers is an important part. Clerk’s JWT Single Sign-On enables this through session-sharing, or sharing the logged in state of the user with the BaaS providers, so developers can focus on building applications with minimal glue code or configuration required.

To learn more about the integrations supported by JWT SSO, check out our [Integration docs](https://clerk.com/docs/integration/overview).

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
