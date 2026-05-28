import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "medium-my-first-app-release-v0-1",
  title: "My First App - release v0.1",
  description: "An early Medium update about releasing a first app.",
  displayDate: "Nov 2017",
  kind: "reflection",
  tags: ["Projects", "Apps"],
  source: "Medium",
  originalUrl: "https://medium.com/@devagrawal09/my-first-app-release-v0-1-1ab0a0b1dfc",
  markdown:
    "The first pre-alpha release of my [Wedding Planner app](https://medium.com/@devagrawal09/my-first-app-68fdda99eb2f) is now available for use! Currently the app is the web version of what will soon be an Android app. the app is hosted on Heroku and can be found [here](https://mighty-dusk-86645.herokuapp.com/). Along with the v0.2 release, the Android (hybrid) version will be released to the Google Play store.\n\n## Features\n\nThe current release of the Wedding Planner facilitates the creation of weddings to work on, and defining 2 passwords for it. Users can register with a wedding with 2 roles — Admin or Planner. The user who created the wedding is the first Admin of the wedding. The 2 passwords set initially during creation are used by new users to register to THAT wedding. One passwords is for new Admins and another for new Planners. The admins need to share the wedding ID and one password with another user for registering as the new Admin/Planner.\n\nAs for the actual planning stage, currently the app helps you make a list of **Invitations**. You can add, remove and edit invitees. The list of invitees is updated across all the registered users in realtime, so you can modify the invitee list and other planners will instantly receive the modification on their app.\n\n## Roadmap for v0.2\n\nThese features have been either planned out or are already in development, and will be released in v0.2 :\n\n1 — An interface for registering **Bookings** similar to the Invitee list. Users will be able to register Booking details like name, description, contact and cost. Bookings will be accessible to both Admins and Planners, except the cost field of each booking.\n\n2 — An Android (apk) version of the app compiled using Cordova. The Android version will be running using the same server and database as the web version, so users can work on both platforms without loss of data.\n\n3 — Logo, icons and theme colors.",
} as const;

export const articleSummary = {
  slug: "medium-my-first-app-release-v0-1",
  title: "My First App - release v0.1",
  description: "An early Medium update about releasing a first app.",
} as const;

export default function mediumMyFirstAppReleaseV01ArticlePage() {
  return <ArticlePage article={article} />;
}
