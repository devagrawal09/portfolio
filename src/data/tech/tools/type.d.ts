import type { ImageDataLike } from 'gatsby-plugin-image';

export interface ITool {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  iconPng?: ImageDataLike;
  devicon?: string;
}