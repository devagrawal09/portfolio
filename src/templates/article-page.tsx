import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/layout"
import { TagBadge } from "../components/portfolio/tag-badge"
import { IArticle, ITag } from "../data/blog/type"

const ArticlePageTemplate = ({ pageContext }) => {
  const path: string = pageContext.pagePath
  const article: IArticle = pageContext.article
  const allTags: ITag[] = pageContext.tags

  const tags = allTags.filter(tag => article.frontmatter.tags?.includes(tag.id))
  const __html = article.html

  console.log(article.frontmatter.image)

  return (
    <Layout
      title={article.frontmatter.title}
      description={article.excerpt}
      path={path}
    >
      <section className="page-section about-heading">
        <div className="container">
          <div className="bg-faded rounded p-5">
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
            <div className="mt-4" dangerouslySetInnerHTML={{ __html }} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ArticlePageTemplate
