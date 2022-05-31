import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FC, HTMLAttributes } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { IArticle, ITag } from "../../data/blog/type"
import { TagBadge } from "../portfolio/tag-badge"

export const ArticleCard: FC<
  { article: IArticle; allTags: ITag[] } & HTMLAttributes<any>
> = ({ article, allTags, ...props }) => {
  const tags = allTags.filter(tag => article.frontmatter.tags?.includes(tag.id))

  return (
    <>
      {/* @ts-expect-error */}
      <Link
        to={article.frontmatter.id}
        style={{ color: `black`, textDecoration: `none` }}
      >
        <Card
          {...props}
          className={`blog-article ${props.className}`}
          style={{ ...props.style }}
        >
          <Card.Header className="featured-header">Featured</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title className="mb-0">
                  {article.frontmatter.title}
                </Card.Title>
                {tags.map(tag => (
                  <TagBadge key={tag.id} tag={tag} />
                ))}
              </Col>
              <Col className="text-right">
                <Card.Subtitle className="mt-1 text-muted">
                  {article.frontmatter.date}
                </Card.Subtitle>
                <Card.Subtitle className="mt-1 text-muted">
                  {article.timeToRead} min read
                </Card.Subtitle>
              </Col>
            </Row>
            {article.frontmatter.image && (
              <GatsbyImage
                image={getImage(article.frontmatter.image)}
                alt={article.frontmatter.title}
                className="article-image mt-1"
              />
            )}
            <Card.Text className="article-excerpt mt-2">
              {article.excerpt}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}
