---
id: serverless
title: "Serverless Deployment"
date: "06-15-2022"
featured: 1
image: images/serverless.png
tags: [technology, software_development]
---

This infamous depiction of serverless has been circulating around for years now. According to this image, Serverless Functions, also called "Functions as a Service", is way to write an application with a focus on business logic and not worrying about infrastructure or runtime.

## I'm new to serverless, how does this work?

Well if you're written traditional web apis before, it might look something like this -

To have a similar application on a serverless platform like AWS Lambda, your code would look like this.

Instead of express (or any other web framework) registering this function as an API handler, Lambda registers it as a handler function, which can configured to be triggered by a variety of events/conditions (including http requests).

express routing vs lambda routing config

This can now be deployed to Lambda using the AWS cli. Based on the configuration file, when a trigger event happens, a new container will spin up and execute this function.

You just wrote some code and deployed it without thinking about any infrastructure or runtime!

## Execution On Demand

While on the surface the code looks similar, your cannot simply throw out express, setup lambda routes and call it a day.

Well, technically you can, but you'll end up with a very unoptimized and wasteful mess, followed by losing trust in all cloud services and going back to buying racks and switches.

With traditional apps, you (or your trusty orchestration service) will spin up a container, start your application process inside the container, establish a network connection, and send an alert to your slack channel. This application will now wait for network requests and react to them as told. All this while, it's consuming memory and processing power, even when it does not receive any requests.

In comparison, then you deploy a serverless function, a service like Lambda will only bill you for the time your function is actually running, which only happens when it's triggered.
