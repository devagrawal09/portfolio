import { ArticlePage } from "~/components/ArticlePage";

const article = {
  slug: "medium-hitchd",
  title: "Hitch'd!",
  description: "An early Medium post about the Hitch'd app project.",
  displayDate: "Nov 2017",
  kind: "reflection",
  tags: ["Projects", "Apps"],
  source: "Medium",
  originalUrl: "https://medium.com/@devagrawal09/hitchd-27903ed39c20",
  markdown:
    "Finally… [the app](https://medium.com/@devagrawal09/my-first-app-68fdda99eb2f) has a name! My very first app is [live on Google Play](https://play.google.com/store/apps/details?id=com.davian_studios.hitchd)! This is the second pre-alpha release of the app. Changes introduced are listed below :\n\n1 — **Bookings**: Like the Invitation list, now a list of bookings is available. Users can add details like description, contact and booking cost.\n\n2 — **Android**: The application is now available on Google Play for free without any ads. Planning a wedding has never been this easy!\n\n3 — **Icons and Colors**: The app now features certain red shades as the theme colors, and icons of all sizes.\n\n## Roadmap for v0.3\n\nThe app is under active development, and new features will be constantly added. Here is a subset of the list of features and fixes planned for 0.3 :\n\n1 — **Budget and Expenses**: This admin-only feature is planned to help users keep track of the wedding budget and expenses. Also, any bookings you register will also show up in the Expenses tab automatically. The Bookings and Expenses lists will remain in sync.\n\n2 — **Spinners**: The app currently lacks loading screens for when the app/data loads, and instead shows “No data available”. This creates misconception that there is no data when actually the data is being loaded. This will be fixed with loading screens and spinners.",
} as const;

export const articleSummary = {
  slug: "medium-hitchd",
  title: "Hitch'd!",
  description: "An early Medium post about the Hitch'd app project.",
} as const;

export default function mediumHitchdArticlePage() {
  return <ArticlePage article={article} />;
}
