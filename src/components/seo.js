import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, image, path }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitter
            image
            url
          }
        }
      }
    `
  )

  const metaTitle = title || `Home`
  const metaDescription = description || site.siteMetadata.description
  const metaUrl = `${site.siteMetadata.url}${path}`
  const metaImage = `${site.siteMetadata.url}${site.siteMetadata.image}`

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image:alt`,
          content: `${metaTitle} image`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitter,
        },
      ].concat(meta)}
      link={[
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "true",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "//fonts.googleapis.com/css?family=Raleway",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "//fonts.googleapis.com/css?family=Lora",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "//fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono&display=swap",
        },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
