import React from "react"
import { graphql } from "gatsby"
import Layout from "../../../components/layout"
import { ProjectCard } from "../../../components/portfolio/project-card"

import type { IProject } from '../../../data/showcase/projects/type'
import type { IFeature } from '../../../data/tech/features/type'
import type { ITool } from '../../../data/tech/tools/type'

export const query = graphql`
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
`

const ProjectsPage = ({ location, data }) => {
  const projects: IProject[] = data.projectsYaml.projects
  const features: IFeature[] = data.featuresYaml.features
  const tools: ITool[] = data.toolsYaml.tools

  return <Layout location={location}>
    <section className="page-section">
      <div className="container">
        <h1 className="wheat-text">My Projects</h1>
        {projects.map((project, i) =>
          <ProjectCard
            key={project.id}
            project={project}
            allFeatures={features}
            allTools={tools}
            i={i}
          />
        )}
      </div>
    </section>
  </Layout>
}

export default ProjectsPage
