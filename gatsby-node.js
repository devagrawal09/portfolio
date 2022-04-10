/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql }) => {
  const {
    data: {
      projectsYaml: { projects },
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
        }
      }
    }
  `)

  console.log(JSON.stringify({ projects }))
}
