import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FC, HTMLAttributes } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { IArticle, ITag } from "../../data/blog/type"
import { TagBadge } from "../portfolio/tag-badge"

export const FeaturedArticleCard: FC<{
  article: IArticle
  allTags: ITag[]
}> = ({ article, allTags }) => {
  const tags = allTags.filter(tag => article.frontmatter.tags?.includes(tag.id))

  return (
    <>
      {/* @ts-expect-error */}
      <Link
        to={article.frontmatter.id}
        style={{ color: `black`, textDecoration: `none` }}
      >
        <Card className="blog-article" style={{ height: `100%` }}>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title className="mb-0">
                  {article.frontmatter.title}
                </Card.Title>
              </Col>
              <Col className="text-right">
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
            {article.frontmatter.image && (
              <GatsbyImage
                image={getImage(article.frontmatter.image)}
                alt={article.frontmatter.title}
                className="article-image"
              />
            )}
            <Card.Text className="article-excerpt mt-4">
              {article.excerpt}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}
