import { IExperience } from "./src/data/showcase/experiences/type.d"
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { mergeWithBackground } from "./src/images/merge-images"

import type { GatsbyNode } from "gatsby"
import type { IProject } from "./src/data/showcase/projects/type.d"
import type { IArticle, ITag } from "./src/data/blog/type.d"
import type { ITool } from "./src/data/tech/tools/type.d"
import type { IFeature } from "./src/data/tech/features/type.d"

const cwd = process.cwd()

const generateImageForProject = async (project: IProject) => {
  if (!project.image) {
    console.log(`No image for project ${project.name}`)
    return
  }

  console.log(`Generating og image for project ${project.name}`)

  const output = `${cwd}/static/seo-images/projects/${project.id}.png`

  return mergeWithBackground(project.image, output)
}

const generateImageForArticle = async (article: IArticle) => {
  if (!article.frontmatter.image) {
    console.log(`No image for article ${article.frontmatter.title}`)
    return
  }

  console.log(`Generating og image for article ${article.frontmatter.title}`)

  const output = `${cwd}/static/seo-images/blog/${article.frontmatter.id}.png`

  return mergeWithBackground(article.frontmatter.image, output)
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const {
    data: {
      experiencesYaml: { experiences },
      projectsYaml: { projects },
      featuresYaml: { features },
      toolsYaml: { tools },
    },
  } = await graphql<{
    experiencesYaml: { experiences: IExperience[] }
    projectsYaml: { projects: IProject[] }
    featuresYaml: { features: IFeature[] }
    toolsYaml: { tools: ITool[] }
  }>(`
    query ProjectsQuery {
      experiencesYaml {
        experiences {
          id
          name
          description
          date
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          pageImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          page {
            childMarkdownRemark {
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
      projectsYaml {
        projects {
          id
          name
          tools
          features
          description
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          page {
            childMarkdownRemark {
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
      featuresYaml {
        features {
          id
          name
          description
          color
          bgColor
        }
      }
      toolsYaml {
        tools {
          id
          name
          description
          devicon
          color
          bgColor
          iconPng {
            childImageSharp {
              gatsbyImageData(height: 15)
            }
          }
        }
      }
    }
  `)

  const {
    data: {
      allMarkdownRemark: { nodes: articles },
      tagsYaml: { tags },
    },
  } = await graphql<{
    allMarkdownRemark: { nodes: IArticle[] }
    tagsYaml: { tags: ITag[] }
  }>(`
    query BlogQuery {
      allMarkdownRemark(filter: { frontmatter: { date: { ne: null } } }) {
        nodes {
          frontmatter {
            id
            title
            date
            tags
            image {
              absolutePath
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          html
          timeToRead
          excerpt
          tableOfContents
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
  `)

  projects.forEach(async project => {
    const path = `showcase/projects/${project.id}`
    createPage({
      path,
      component: `${cwd}/src/templates/project-page.tsx`,
      context: { pagePath: path, project, features, tools },
    })
  })

  articles.forEach(async article => {
    const path = `blog/${article.frontmatter.id}`
    createPage({
      path,
      component: `${cwd}/src/templates/article-page.tsx`,
      context: { pagePath: path, article, tags },
    })
  })

  experiences.forEach(experience => {
    const path = `showcase/experiences/${experience.id}`
    createPage({
      path,
      component: `${cwd}/src/templates/experience-page.tsx`,
      context: { pagePath: path, experience },
    })
  })
}

export const onPreBuild: GatsbyNode["onPreBuild"] = async ({ graphql }) => {
  const {
    data: {
      projectsYaml: { projects },
    },
  } = await graphql<{
    projectsYaml: { projects: IProject[] }
  }>(`
    query ProjectsQuery {
      projectsYaml {
        projects {
          id
          name
          image {
            absolutePath
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  const {
    data: {
      allMarkdownRemark: { nodes: articles },
    },
  } = await graphql<{
    allMarkdownRemark: { nodes: IArticle[] }
  }>(`
    query BlogQuery {
      allMarkdownRemark(filter: { frontmatter: { date: { ne: null } } }) {
        nodes {
          frontmatter {
            id
            title
            image {
              absolutePath
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  // const generateProjectImages = []
  const generateProjectImages = projects.map(generateImageForProject)

  const generateArticleImages = articles.map(generateImageForArticle)

  await Promise.all([...generateProjectImages, ...generateArticleImages])
}
