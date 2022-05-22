module.exports = {
  siteMetadata: {
    title: `Dev Agrawal`,
    description: `Dev Agrawal's website`,
    author: `@devagrawal09`,
    twitter: `@dadevil99`,
    image: `/social-card.png`,
    url: `https://devagr.me`,
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About Me",
        link: "/about",
      },
      {
        name: "Showcase",
        link: `/showcase`,
        dropdown: [
          {
            name: "Projects",
            link: "/projects",
          },
          {
            name: "Experiences",
            link: "/experiences",
          },
        ],
      },
      {
        name: "Year in Review",
        link: "/review",
        dropdown: [
          {
            name: "Freshman",
            link: "/freshman",
          },
          {
            name: "Sophomore",
            link: "/sophomore",
          },
          {
            name: "Junior",
            link: "/junior",
          },
        ],
      },
      {
        name: "University Honors",
        link: "/honors",
        dropdown: [
          {
            name: "Problem Pitch",
            link: "/pitch",
          },
          {
            name: "Global Citizen Scholar Plan",
            link: "/gcsp",
          },
        ],
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `rgb(47, 23, 15)`,
        theme_color: `rgb(47, 23, 15)`,
        display: `minimal-ui`,
        icon: `src/images/da.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: { trackingIds: ["G-ZVPSFXW1WZ"] },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
