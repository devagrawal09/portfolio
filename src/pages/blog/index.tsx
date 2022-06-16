import React, { FC, HTMLAttributes } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { IArticle, ITag } from "../../data/blog/type"
import Layout from "../../components/layout"
import { Row, Col, Card } from "react-bootstrap"
import { TagBadge } from "./../../components/portfolio/tag-badge"

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

const ArticleCard: FC<
  { article: IArticle; allTags: ITag[]; image?: boolean } & HTMLAttributes<any>
> = ({ article, allTags, image, ...props }) => {
  const tags = allTags.filter(tag => article.frontmatter.tags?.includes(tag.id))

  return (
    <>
      <Link
        to={article.frontmatter.id}
        style={{ color: `black`, textDecoration: `none` }}
      >
        <Card
          className="blog-article"
          {...props}
          style={{ ...props.style, marginBottom: `2rem` }}
        >
          <Card.Body>
            <Row>
              <Col>
                <Card.Title className="mb-0">
                  {article.frontmatter.title}
                </Card.Title>
              </Col>
              <Col className="text-right mt-2">
                <Card.Subtitle className="mb-2 text-muted">
                  Published on {article.frontmatter.date}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted">
                  {article.timeToRead} minute read
                </Card.Subtitle>
              </Col>
            </Row>
            {tags.map(tag => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
            {article.frontmatter.image && image && (
              <GatsbyImage
                image={getImage(article.frontmatter.image)}
                alt={article.frontmatter.title}
                className="article-image"
              />
            )}
            <Card.Text className="article-excerpt mt-3">
              {article.excerpt}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}

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
            <Col lg={6}>
              <ArticleCard
                article={first}
                allTags={allTags}
                className="featured-article-card"
                image
              />
            </Col>
            <Col lg={6}>
              <ArticleCard
                article={second}
                allTags={allTags}
                className="article-card"
              />
              <ArticleCard
                article={third}
                allTags={allTags}
                className="article-card"
              />
            </Col>
            {articles.map(article => (
              <Col lg={6} key={article.frontmatter.id}>
                <ArticleCard
                  article={article}
                  allTags={allTags}
                  className="article-card"
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </Layout>
  )
}

export default BlogHomePage
