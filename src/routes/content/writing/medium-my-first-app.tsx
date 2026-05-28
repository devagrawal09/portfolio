import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "medium-my-first-app",
  title: "My First App",
  description: "An early Medium post about building a first app.",
  displayDate: "Oct 2017",
  kind: "reflection",
  tags: ["Projects", "Apps"],
  source: "Medium",
  originalUrl: "https://medium.com/@devagrawal09/my-first-app-68fdda99eb2f",
  markdown:
    "I’m happy to announce that my very first complete production-ready web and mobile application. The app is currently called “Wedding Planner”, which summarizes the purpose of the application. The application aids the planning of a typical Indian wedding by providing basic CRUD interfaces for important data like invitations, bookings, budget and expenses, to-dos, notes etc. But what makes this application really stand out is that the data is stored on the server as well as locally, and the application has a real-time connection to the server so that any changes in data are immediately reflected in the UI. This enables real-time collaboration; thus multiple users can collaboratively plan on a single wedding. Users have two types of roles to work on a wedding — Admin and Planner. An Admin has all the permissions, i.e. has access to all the data. A Planner only has access to non-sensitive data like invitations, to-dos, notes etc. but not to data like budget, expenses and bookings.\n\n## Technology Stack\n\nThe front-end app is built using JavaScript, HTML and CSS that run in the browser or in a native WebView in mobile. The back-end is written in JavaScript/Nodejs.\n\n### Frameworks Used :\n\nFront-end/UI — [**MaterializeCSS**](http://materializecss.com/)\n\nJavascript/Data — [**Meteor**](https://www.meteor.com/)\n\nMobile WebView wrapper — [**Cordova**](https://cordova.apache.org/)\n\n## Current State\n\nThe app is currently in **pre-alpha** phase, and is under active development.\n\n**UPDATE :**[The first pre-alpha release is available now!](https://medium.com/@devagrawal09/my-first-app-release-v0-1-1ab0a0b1dfc)\n\n## **Testing**\n\nAt the time of writing this post, only unit tests are being developed and used to drive the development of the application. Any integration/e2e testing suites will be developed in the alpha and beta phases.\n\n## **Licensing**\n\nThe app will soon be licensed and free to use (on the web and downloadable from Google Play Store), and is planned to be open-sourced after a successful stable release.\n\n## **Future Plans**\n\nCurrently, the application is tailored to be the most useful to a user planning a typical Indian wedding, and therefore, lacks flexibility. Future plans include :\n\n- A much more flexible system that makes the application useful to the users planning various types of events\n\n- Giving the power to admins to specify which data should be considered “sensitive” and therefore be restricted to planner\n\n## **Contribution**\n\nSince the app is not yet released or open sourced, the possible forms of contribution are showing you support by clapping, following my blog and [Github page](https://www.github.com/devagrawal09) and starring the existing repositories. Any other forms of contributions like suggestions or code examples are also heartily welcomed.",
} as const;

export const articleSummary = {
  slug: "medium-my-first-app",
  title: "My First App",
  description: "An early Medium post about building a first app.",
} as const;

export default function mediumMyFirstAppArticlePage() {
  return <ArticlePage article={article} />;
}
