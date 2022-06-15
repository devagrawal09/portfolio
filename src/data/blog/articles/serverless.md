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

```ts
// index.ts
import express from "express"
import Cat from "./models/cat"

const app = express()

app.get(`/`, async (req, res) => {
  const cats = await Cat.findAll()
  res.json({ cats })
})

app.listen(3000)
```

To have a similar application on a serverless platform like AWS Lambda, your code would look like this -

```ts
// handler.ts
import Cat from "./models/cat"

export const getCats = async (event) => {
  const cats = await Cat.findAll()
  return { data: { cats } }
})

```

Instead of express (or any other web framework) registering this function as an API handler, Lambda registers it as a handler function, which can configured to be triggered by a variety of events/conditions (including http requests).

```yml
# serverless.yml
functions:
  get-cats:
    handler: handler.getCats
    events:
      - http:
          path: /
          method: get
```

This can now be deployed to Lambda using the AWS cli. Based on the configuration file, when a trigger event happens, a new container will spin up and execute this function.

You just wrote some code and deployed it without thinking about any infrastructure or runtime!

## Execution On Demand

While on the surface the code looks similar, your cannot simply throw out express, setup lambda routes and call it a day.

Well, technically you can, but you'll end up with a very unoptimized and wasteful mess, followed by losing trust in all cloud services and going back to buying racks and switches.

With traditional apps, you (or your trusty orchestration service) will spin up a container, start your application process inside the container, establish a network connection, and send an alert to your slack channel. This application will now wait for network requests and react to them as told. All this while, it's consuming memory and processing power, even when it does not receive any requests.

In comparison, when you deploy a serverless function, a service like Lambda will only bill you for the time your function is actually running, which only happens when it's triggered. When there is a trigger event, Lambda will find the corresponding function for that trigger, then either spin up a new container and load the function in it (cold start) or find an existing container that has the function already loaded in memory (hot start), and execute the function. The container will then either stay on and wait for more requests, or die out.

So you can start to notice some differences here. If you receive 1 request every second, you will only have 1 running function every second. However, if you get a thousand requests at the same time, Lambda will run a thousand containers with the function. So this approach is extremely elastic. You will use and pay for only the exact resources that you use. If you have multiple functions, each function is deployed as a separate Lambda, so you also will only be using the resources required to run that one function for any trigger.
