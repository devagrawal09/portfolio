import type { ImageDataLike } from "gatsby-plugin-image"

export interface IExperience {
  id: string
  name: string
  date: string
  description: string
  image: ImageDataLike
  pageImage?: ImageDataLike
  page?: {
    childMarkdownRemark: { html: string }
  }
}
