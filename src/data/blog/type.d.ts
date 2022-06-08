import { ImageDataLike } from "gatsby-plugin-image"

export interface IArticle {
  frontmatter: {
    id: string
    title: string
    date: string
    image: ImageDataLike & { absolutePath: string }
    tags: string[]
  }
  timeToRead: number
  excerpt: string
  html: string
}

export interface ITag {
  id: string
  name: string
  color: string
  bgColor: string
}
