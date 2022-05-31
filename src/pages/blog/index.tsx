import React from "react"
import { graphql } from "gatsby"
import { IArticle, ITag } from "../../data/blog/type"
import Layout from "../../components/layout"
import { Row, Col } from "react-bootstrap"
import { ArticleCard } from "../../components/blog/article-card"
import { FeaturedArticleCard } from "../../components/blog/featured-article-card"

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark(
      filter: { frontmatter: { date: { ne: null } } }
      sort: { fields: frontmatter___featured, order: ASC }
    ) {
      nodes {
        frontmatter {
          id
          title
          date
          tags
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        timeToRead
        excerpt
      }
    }

    tagsYaml {
      tags {
        id
        name
        color
        bgColor
      }
    }
  }
`

const BlogHomePage = ({ location, data }) => {
  const [first, second, third, ...articles]: IArticle[] =
    data.allMarkdownRemark.nodes
  const allTags: ITag[] = data.tagsYaml.tags

  return (
    <Layout
      title="Blog"
      description="Articles about my personal life, programming and software development, and other random things."
      path={location.pathname}
    >
      <section className="page-section">
        <div className="container">
          <h1 className="wheat-text">Blog</h1>
          <Row>
            <Col md={8}>
              <div style={{ height: `100%` }} className="pb-4">
                <ArticleCard
                  article={first}
                  allTags={allTags}
                  className="featured"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4">
                <ArticleCard article={second} allTags={allTags} />
              </div>
              <div className="mb-4">
                <ArticleCard article={third} allTags={allTags} />
              </div>
            </Col>
            {articles.map(article => (
              <Col md={4} key={article.frontmatter.id}>
                <div className="mb-4">
                  <ArticleCard article={article} allTags={allTags} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </Layout>
  )
}

export default BlogHomePage
