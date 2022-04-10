import type { ImageDataLike } from 'gatsby-plugin-image';

export interface IProject {
  id: string;
  name: string;
  description: string;
  tools: string[];
  features: string[];
  image: ImageDataLike;
  page?: {
    childMarkdownRemark: { html: string }
  }
}