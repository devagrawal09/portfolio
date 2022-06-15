import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import hljs from "highlight.js"
import Layout from "../components/layout"
import { TagBadge } from "../components/portfolio/tag-badge"
import { IArticle, ITag } from "../data/blog/type"

import "highlight.js/styles/base16/dracula.css"

const ArticlePageTemplate = ({ pageContext }) => {
  const path: string = pageContext.pagePath
  const article: IArticle = pageContext.article
  const allTags: ITag[] = pageContext.tags

  const tags = allTags.filter(tag => article.frontmatter.tags?.includes(tag.id))
  const __html = article.html

  useEffect(() => {
    // @ts-ignore
    document.querySelectorAll("pre code").forEach(hljs.highlightBlock)
  }, [])

  return (
    <Layout
      title={article.frontmatter.title}
      description={article.excerpt}
      path={path}
      image={
        article.frontmatter.image
          ? `/images/blog/${article.frontmatter.id}.png`
          : undefined
      }
    >
      <section className="page-section about-heading">
        <div className="container">
          <div className="bg-faded rounded px-3 py-4 px-md-5">
            <h2 className="section-heading">
              <span className="section-heading-upper">
                {article.timeToRead} minute read
              </span>
              <span className="section-heading-lower">
                {article.frontmatter.title}
              </span>
              <span className="section-heading-upper">
                {article.frontmatter.date}
              </span>
            </h2>
            {tags.map(tag => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
            <br />
            {article.frontmatter.image && (
              <GatsbyImage
                className="img-fluid rounded project-image mb-3 mb-lg-0"
                image={getImage(article.frontmatter.image)}
                alt={article.frontmatter.title}
              />
            )}
            <div
              className="mt-4 text-justify-p"
              dangerouslySetInnerHTML={{ __html }}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ArticlePageTemplate
