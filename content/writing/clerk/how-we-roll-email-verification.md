---
title: "How We Roll – Chapter 4: Email Verification"
date: 2023-06-09
source: Clerk
originalUrl: "https://clerk.com/blog/how-we-roll-email-verification"
tags:
  - how-we-roll
  - email-verification
  - authentication
---

Welcome to How We Roll! This series is meant to help product owners, developers, and security professionals understand exactly how we implement (or, _roll_) authentication at Clerk.

## Chapter 4: Email Verification

Email verification is a foundational and reusable piece of modern authentication:

- **It’s used during sign-up:** usually to prevent spam accounts, or as a requirement before enrolling a user on a mailing list.
- **It’s used during sign-in:** as a workaround to forgotten password, or as an alternative to passwords altogether.
- **It’s used during account management:** as a mechanism for adding new emails or changing the email for an account.

Although many think of verification links or one-time passcodes (OTPs) as the dominant verification mechanism, both approaches have fallen out-of-favor.

Today, the fastest and most common way to verify emails is actually single-sign on (SSO)! Social SSO (like “Sign in with Google”) and enterprise SSO (like Okta) are already responsible for over half of email verifications, and their adoption continues to grow every year.

This chapter discusses when and how to verify emails, and the tradeoffs of each option. Learn how Clerk handles email verification!

### When to verify

There are two options for when to require email verification: immediately at sign-up, or sometime after completing the signup process.

The most popular approach is to verify immediately at sign-up, which ensures that users will have a valid email, and helps mitigate spam or bot accounts.

[Video: The Verify at sign-up toggle in the Clerk dashboard](./17a2d484b76b00aaa42cc46970aeb3de67f4317f-1592x1080.mp4)

In some cases, developers might want to allow signing up without email verification. This is usually done to give users access to some features immediately or for a limited time without jumping through an extra step, also called the foot-in-the-door strategy, while still keeping the bulk of the application behind an email verification check.

To achieve this, developers can turn off verify at sign-up through the Clerk dashboard, then check for email verification in the application to allow access to certain features. The email verification information is available on the [Clerk `User` object](https://clerk.com/docs/reference/clerkjs/user) which can be fetched using [the `useUser` hook](https://clerk.com/docs/reference/clerk-react/useuser) on the client, or [the `users.getUser` method](https://clerk.com/docs/references/backend/user/get-user) on the node SDK.

### How to verify

The core verification mechanism is to send a unique token to the user’s email address. The user will then give this token to the application, verifying that the user owns that email address.

We offer both verification links and one-time passcodes. Developers can enable one of them to enforce that strategy, or enable both and let the users choose during verification.

[Video: Email verification options in the Clerk dashboard](./49da6193d2c1375204585e6719fdd24b8d9ae1eb-1592x1080.mp4)

### One time codes

The more straightforward way to implement verification is with a randomly generated 6-digit code that the user manually types into the application.

[Video: One-time code email verification demonstration](./df35e4bce4b779d7052b4fcb2b2092a77964fbd8-1712x1080.mp4)

Code verification offers a benefit over links - users don’t need to be signed in to their email account to access the application on a device. Users could be using a different browser or a shared or public device that they don’t want to log into their email account on. This is also the reason why codes are seen a lot more for phone verification.

### Links

Clerk will generate a unique link with a signed JWT when using verification links. This link takes the user to the application where Clerk validates the JWT and signs in the user.

[Video: Email verification link process demonstration](./92700966f37a5818a64e6860a59031351ec8ff52-1484x1080.mp4)

The JWT carries the signup attempt information and is only valid for 10 minutes. If the signup was successful, clicking the link again shows this message instead of signing the user in again.

![How We Roll Email Verification guide illustration](./aa54595c3d97f0d6a8c3076695da5ca706e21083-944x734.png)

Verification links offer a streamlined user experience, but it’s not without tradeoffs. Security-conscious individuals and email clients are suspicious of links in emails, as they could be malicious phishing links or download harmful files. Security policies and training often teach us to be careful with links in emails.

While we offer email verification links, for the aforementioned reasons, we recommend that developers use verification codes in most cases.

### Single Sign-on

As mentioned earlier, Single Sign-On with social providers like Google and enterprise providers like Okta is actually responsible for the majority of email verifications. We ensure that the user experience of Single Sign-On is seamless across various providers with no compromises to security.

Clerk’s SSO uses the Open ID Connect protocol (OIDC), which provides an `email_verified` claim. Identity Providers are supposed to set this to `true` if they have verified the user’s email. Almost every SSO provider verifies emails, so if a user signs up with a social provider, a second email verification step is unnecessary.

> **OIDC refresher:** OpenID Connect is an identity protocol built on top of the OAuth 2.0 framework. If a request scope
> of OIDC is defined when initiating an OAuth flow, identity providers present the application an ID token along with an
> access token on a successful sign-in. The ID token is a JWT that contains some user information like name, email, and
> avatar, in the form of “claims”.

Some providers do not verify emails immediately. So if a user signs up with SSO and their email is not verified by the provider, Clerk enforces an additional email verification step.

Some providers do not adhere to the OIDC spec. We audit all providers we support to ensure they are adhering to the spec, and if not, what their own format looks like. For example, the ID token from one of the social providers contains a `verified` claim instead of `email_verified` as defined in the spec, so we check for that. If the provider does not tell us whether the email is verified or not, we assume it’s not verified and force an additional email verification step.

Ensuring SSO providers have verified the user’s email is critical. Clerk provides account linking out of the box, which means users can sign in to the same account using multiple SSO providers as long as the email is the same. However, unless every SSO login verifies the emails, the account could be left vulnerable to takeovers. A malicious user could create a new account on a service that does not verify emails immediately, and use it to log in to an application as someone else. We are very careful with auditing every provider we work with to make sure developers don’t have to worry about the nuances across various providers.

### Summary

Email verification may seem like a straightforward task, but it is a common authentication process on the web that significantly affects both the user experience and application security. Clerk provides multiple options out of the box for developers to customize when and how they enforce email verification.

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
