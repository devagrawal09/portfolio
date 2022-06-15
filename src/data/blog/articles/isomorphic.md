---
id: isomorphic
title: "Isomorphic Code"
date: "05-31-2022"
featured: 2
image: images/isomorphic.png
tags: [technology, software_development]
---

## Isomorphic Javascript

Isomorphic code is code that can run on both client and server side.

The rise of full stack JavaScript made isomorphic code possible. By default, all Javascript code that only uses the standard library is isomorphic. This means popular utility libraries like Lodash, Moment, RxJS etc are also isomorphic, because they only use the standard Javascript features.

However, to build a usable application, we have to inevitable use some platform-specific features, like the DOM api to manipulate elements on a webpage, or the HTTP api to create a server files and data over the web. Working with data is also usually different on the client and server. On the client, you would fetch data from an HTTP api and store it in memory, and on the server you would fetch data from a database and send it as a response to the client.

## My entire application logic is Isomorphic

To be able to write isomorphic code for application concerns, we need to create abstractions. [Meteor](https://www.meteor.com/) is one of the first and most popular frameworks that utilized isomorphic abstractions to a good extent. Meteor has abstractions that allow us to write code for data fetching, validation schemas, and mutation methods that can run on both the client and server. Since this is what makes up a bulk of the application logic, you would only have things like view templates or server configuration that would be platform-specific.

## Is React Isomorphic?

While [React](https://reactjs.org/) claims to be _a JavaScript library for building user interfaces_, it can be used for much more than that, because React happens to be isomorphic.

The secret ingredient that differentiated React among its peers when it first came out was the [Virtual DOM](https://reactjs.org/docs/faq-internals.html). To quickly explain the virtual DOM, when you create an HTML element like `<p>Sample Paragraph</p>` in a React component, React doesn't actually create a paragraph element in your HTML. It just created a dummy object that will be later converted into a `<p>` HTML element by it's accompanying library `react-dom`. If you ever wondered why you had to install `react-dom` from npm along with `npm`, this is why. React doesn't interact with the browser DOM on it's own. Which just happens to be the criteria to being isomorphic.

This means that React can be used in Nodejs to describe HTTP endpoints, generate PDF and DOCX files, and much more! However, the most common use of React on the server is server-rendered apps.

## Rendering on the server

After a huge shift from rendering HTML traditionally with PHP to client-rendered apps with React and Angular, we realized that there might be some performance and SEO costs of downloading hundreds of KBs of Javascript code before showing anything on the screen. So we went back to rendering on the server, but still using our new favorite language and framework. And thus frameworks like [Nextjs](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.com/) were born.

These frameworks abstract the concepts of client and server when writing React components. So we can write components that use data from the server without having to fetch it through an HTTP api, and show that data using HTML elements. Weird, right? After a few years of writing client-rendered apps, Nextjs felt a little like magic to me, very similar to Meteor's sorcery.

## But what if I don't like React?

Tough luck.

Just kidding.

While React pioneered the virtual DOM, it is far from the only library that uses this concept. Most new frontend frameworks that came after React like [Vue](https://vuejs.org/) also make use of virtual DOM, and thus can be rendered on the server using [Nuxt](https://nuxtjs.org/). [Angular](https://angular.io/) does not use a virtual DOM, but uses an entirely different beast called [ahead-of-time compilation](https://angular.io/guide/aot-compiler), that also allows Angular code to be run on the server ([Angular Universal](https://angular.io/guide/universal) is it's server rendering framework).

## But what if I don't like Javascript?

Tough luck.

Well, only kinda kidding this time.

Since the advent of [Webassembly](https://webassembly.org/), it is possible to write code in languages other than Javascript that can run on the browser. Microsoft's [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) and Apache's [UNO](https://platform.uno/) are some of the most popular frameworks that makes use of webassembly to run C# code in the browser, which means you can use much of your C# code on both the client and server side. [PyScript](https://pyscript.net/) is a very new framework that runs python in the browser. And there's also a dinosaur called [Google Web Toolkit](https://www.gwtproject.org/) that allows creating browser applications in Java (Can you imagine Java in the browser? In 2022?).

While these approaches exist, the most preferred way to build client applications is still through Javascript. And as long as that is true, we will keep finding ways to make the same code run everywhere. While the term "Isomorphic Javascript" has lost a little bit of it's buzzword status, it is a powerful technique that is still implemented in the most popular frameworks and applications.
