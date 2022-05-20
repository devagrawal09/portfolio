/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      projectsYaml: { projects },
      featuresYaml: { features },
      toolsYaml: { tools },
    },
  } = await graphql(`
    query ProjectsQuery {
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
    createPage({
      path: `showcase/projects/${project.id}`,
      component: require.resolve("./src/templates/project-page.tsx"),
      context: { project, features, tools },
    })
  })
}
