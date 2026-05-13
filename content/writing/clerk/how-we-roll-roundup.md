---
title: "How We Roll – Chapter 10: Roundup"
date: 2023-08-11
source: Clerk
originalUrl: "https://clerk.com/blog/how-we-roll-roundup"
tags:
  - how-we-roll
  - authentication
---

Welcome to How We Roll! This series is meant to help product owners, developers, and security professionals understand exactly how we implement (or, _roll_) authentication at Clerk.

## **Chapter 10: Roundup**

Clerk is more than just a set of authentication APIs - it’s a tool that offers a comprehensive solution for user management with **User Experience**, **Application Security**, and **Developer Experience** as the core tenets. The last nine chapters of How We Roll have been in-depth explorations into Clerk’s auth implementation. For this 10th chapter, we will round up all the topics described thus far and see how everything fits together through the lens of these three core tenets.

If this is your first time reading a post in our How We Roll series, this chapter will serve as an index to this series and the topics covered within. From here, you can choose which topics you want to learn more about and visit the chapters dedicated to those topics.

## User Experience

Let’s jump into the shoes of a user and experience Clerk from a user’s perspective.

Clerk’s embeddable components handle every authentication-related user interaction. This goes beyond sign-up, password reset, and OAuth flows – the User Profile is one of Clerk's most comprehensive authentication components. We believe that the user should have complete control over their authentication data and sessions, which is reflected in the self-service capabilities of the User Profile. Users can access and modify their profile, OAuth accounts, passwords, multi-factor steps, and active devices, all from a single `<UserProfile />` component.

[Video: User Experience demonstration](./8b1e82005e85f3594de6c54e39949a2a63050868-960x769.mp4)

[Learn how Clerk rolls the User Profile](https://clerk.com/blog/how-we-roll-user-profile)

Every embeddable component provided by Clerk is also used on [dashboard.clerk.com](https://dashboard.clerk.com), which allows us to study and optimize every interaction in depth and offer the best possible out-of-the-box experience. However, we also acknowledge that every company and product must assert its brand identity on every user interface. This is reflected in the extensive customization options provided for Clerk’s components.

[Video: User Experience demonstration](./6a24c0e6ddfdce81475a005bec8d7931d89899ed-1200x630.mp4)

[Learn how Clerk rolls Customization](https://clerk.com/blog/how-we-roll-customization)

Avatars are a critical component of user identity but are usually treated as an afterthought. Clerk brings a lot of care into ensuring that user avatars are high quality and are present throughout the authentication interactions to build a sense of user identity. Little details like the shimmer effect on hover and beautifully marbled default avatars elevate the user experience.

[Video: Authentication feature demonstration](./529a7f508c60cf20344cda57924e73ccfac763d4-1200x630.mp4)

[Learn how Clerk rolls Avatars](https://clerk.com/blog/how-we-roll-avatars)

## Application Security

While user experience is something we put a lot of effort into, the biggest priority for an auth provider like Clerk is application security.

The web has been slowly moving towards a passwordless application experience by embracing various forms of Single Sign-On. However, passwords are still the most familiar form of authentication. While over half of all signups happen through Single Sign-On providers like Google, Clerk ensures that the users and developers who prefer passwords are not under-served. Clerk’s default password requirements ensure that passwords are strong and compliant with NIST guidelines, implement countermeasures to detect breached passwords, and provide developers the flexibility to configure password rules.

![How We Roll Roundup guide illustration](./a43eae985fcc2f06e8c87db46569fa470ff85f50-2400x1260.png)

[Learn how Clerk rolls Passwords](https://clerk.com/blog/how-we-roll-passwords)

Email verification is an essential piece of authentication. Password reset, account management, and team invitations require the presence of an email, and verification is necessary to mitigate spam or bot accounts. Clerk is configured by default to verify user emails before allowing sign-ups and employs both link-based and OTP-based verifications. For OAuth flows, if there is a question as to whether the OAuth provider verified the user’s email, Clerk requires an additional email verification step.

[Video: Application Security demonstration](./df35e4bce4b779d7052b4fcb2b2092a77964fbd8-1712x1080.mp4)

[Learn how Clerk rolls Email Verification](https://clerk.com/blog/how-we-roll-email-verification)

Clerk’s implementation of Sessions enables various security capabilities. Clerk tracks the client devices used to sign in, along with the timestamps of the most recent sign-in and user activity, so users can quickly identify devices that are not supposed to be signed into their account and promptly sign out of them. Clerk also ensures that the application will never be in an invalid auth state (signed out, changed permissions, etc.) for more than 60 seconds through short-lived tokens.

![How We Roll Roundup guide illustration](./eefb254ce7a5410af709348cd9ee05250aa25cad-2400x1260.png)

[Learn how Clerk rolls Sessions](https://clerk.com/blog/how-we-roll-sessions)

Clerk provides Multifactor Auth through SMS verification, Authenticator apps, and physical security keys for the more security-conscious folks. Users can choose to use their preferred factor for MFA within the options developers enable.

[Video: Authentication feature demonstration](./a41d5f481d46b077c3a063f89bd027a4c8e74f4a-1624x1080.mp4)

[Learn how Clerk rolls Multifactor](https://clerk.com/blog/how-we-roll-multifactor)

## Developer Experience

Authentication should not be a hassle for developers to implement. Clerk makes it ridiculously easy for developers to get up and running with fully functioning auth.

A secure and scalable authentication infrastructure goes beyond simple client-server systems. Clerk’s robust infrastructure delivers the end-to-end authentication user experience and makes onboarding extremely easy for front-end developers. Clerk also eliminates specific configuration steps until developers are ready to release to production, ensuring absolute security across all authentication flows.

![How We Roll Roundup guide illustration](./145b05891db45736be24882aa1ac20a187db1fe6-1200x671.png)

[Learn how Clerk rolls Infrastructure](https://clerk.com/blog/how-we-roll-infrastructure).

While Clerk’s SDKs provide easy integration with backend applications, developers might wish to leverage a Backend-as-a-Service provider like Supabase instead of building their own. Clerk also offers seamless integration with these providers with minimal effort from the developers through JWT Single Sign-On.

[Video: Developer Experience demonstration](./ec12bfde008cd3169de44a27cfdeb6880be8c47d-1060x720.mp4)

[Learn how Clerk rolls JWT SSO](https://clerk.com/blog/how-we-roll-jwt-sso)

## Summary

The nine topics covered in this series are by no means an exhaustive list of how Clerk implements authentication. However, these topics demonstrate the care and effort put into making Clerk applications secure, easy to start, and a great user experience.
