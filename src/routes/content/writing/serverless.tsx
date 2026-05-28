import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "serverless",
  title: "Serverless Deployment",
  description:
    "A practical breakdown of Functions-as-a-Service: on-demand execution, cold vs. hot starts, elasticity trade-offs, and when serverless is (and isn't) the right call.",
  displayDate: "Jun 2022",
  kind: "technical",
  tags: ["Serverless", "Cloud", "AWS"],
  markdown:
    'Serverless Functions — also called Functions as a Service — let you write application code focused entirely on business logic, without thinking about infrastructure or runtime management. The "serverless" label is a bit misleading: there are still servers, you just never provision, configure, or pay for idle ones.\n\n## How it works\n\nIn a traditional web API, you register route handlers in a framework like Express, start a server process, and keep it running. With a platform like AWS Lambda, you instead export named handler functions and declare what events should trigger them in a configuration file. Lambda registers the function, manages the runtime, and invokes it on demand.\n\nThe key difference: you deploy logic, not a server. There is no long-running process to babysit. Lambda handles routing, scaling, and cleanup.\n\n## Execution on demand\n\nA traditional app spins up once and stays alive — consuming memory and compute even during quiet periods, just waiting for requests.\n\nA serverless function only runs when triggered. Lambda either reuses a warm container that already has the function loaded in memory (hot start) or spins up a fresh one (cold start). After execution, the container may stay warm for a while or shut down entirely.\n\nThis model is extremely elastic. One request per second means one function execution per second. A thousand concurrent requests means a thousand containers — all without any manual scaling configuration.\n\n## Cost trade-offs\n\nServerless is not universally cheaper. The per-unit cost is higher: AWS Lambda runs roughly $0.06 per hour of execution time (billed per millisecond with 1 GB memory), while an EC2 instance with equivalent memory costs $0.008–$0.01 per hour — whether or not it is handling requests.\n\nThe calculus flips depending on utilization. With highly variable or unpredictable traffic, you pay only for actual work done. With consistent high-volume traffic, a traditional server wins because you are not paying the serverless premium on every invocation.\n\n## When serverless is the right call\n\nServerless fits best when traffic is unpredictable, your functions are small and independently deployable, and you want to minimize operational overhead. It is a natural fit for event-driven workloads, background jobs, and APIs with variable load patterns.\n\nIt is a poor fit for consistently high-throughput services, long-running computations, or tightly coupled systems that do not decompose cleanly into single-responsibility functions. Like microservices — which share many of the same design principles — serverless rewards clear function boundaries and punishes spaghetti.\n\nAt its best, serverless represents the logical endpoint of cloud infrastructure\'s promise: write code, deploy it, pay only for what you use.',
} as const;

export const articleSummary = {
  slug: "serverless",
  title: "Serverless Deployment",
  description:
    "A practical breakdown of Functions-as-a-Service: on-demand execution, cold vs. hot starts, elasticity trade-offs, and when serverless is (and isn't) the right call.",
} as const;

export default function serverlessArticlePage() {
  return <ArticlePage article={article} />;
}
