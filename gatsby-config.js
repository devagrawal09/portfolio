module.exports = {
  siteMetadata: {
    title: `Dev Agrawal`,
    description: `Dev Agrawal's website`,
    author: `@devagrawal09`,
    menuLinks: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'About Me',
        link: '/about'
      },
      {
        name: 'Honors Experiences',
        link: '/experiences'
      },
      {
        name: 'Year in Review',
        link: '/review',
        dropdown: [
          {
            name: 'Freshman',
            link: '/freshman'
          },
          {
            name: 'Sophomore',
            link: '/sophomore'
          },
        ]
      },
      {
        name: 'Gateway to University Honors',
        link: '/honors',
        dropdown: [
          {
            name: 'Problem Pitch',
            link: '/pitch'
          },
          {
            name: 'Global Citizen Scholar Plan',
            link: '/gcsp'
          },
        ]
      },
      {
        name: 'Contact',
        link: '/contact'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Raleway`,
            variants: [`100`, `100i`, `200`, `200i`, `300`, `300i`, `400`, `400i`, `500`, `500i`, `600`, `600i`, `700`, `700i`, `800`, `800i`, `900`, `900i`]
          },
          {
            family: `Lora`,
            variants: [`400`, `400i`, `700`, `700i`]
          },
        ],
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
