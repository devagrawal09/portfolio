/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      experiencesYaml: { experiences },
      projectsYaml: { projects },
      featuresYaml: { features },
      toolsYaml: { tools },
    },
  } = await graphql(`
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

  projects.forEach(project => {
    const path = `showcase/projects/${project.id}`
    createPage({
      path,
      component: require.resolve("./src/templates/project-page.tsx"),
      context: { pagePath: path, project, features, tools },
    })
  })

  experiences.forEach(experience => {
    const path = `showcase/experiences/${experience.id}`
    createPage({
      path,
      component: require.resolve("./src/templates/experience-page.tsx"),
      context: { pagePath: path, experience },
    })
  })
}
