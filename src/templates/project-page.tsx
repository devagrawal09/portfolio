import React from "react"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import Layout from "../components/layout"
import {
  ProjectFeatures,
  ProjectTools,
} from "../components/portfolio/project-card"

import type { IProject } from "../data/showcase/projects/type"
import type { IFeature } from "../data/tech/features/type"
import type { ITool } from "../data/tech/tools/type"

const ProjectPageTemplate = ({ pageContext }) => {
  const path: string = pageContext.pagePath
  const project: IProject = pageContext.project
  const features: IFeature[] = pageContext.features
  const tools: ITool[] = pageContext.tools

  const __html = project.page?.childMarkdownRemark.html

  return (
    <Layout
      title={project.name}
      description={project.description}
      path={path}
      image={project.image ? `/images/projects/${project.id}.png` : undefined}
    >
      <section className="page-section about-heading project-page">
        <div className="container">
          <GatsbyImage
            className="img-fluid rounded project-image mb-3 mb-lg-0"
            image={getImage(project.image)}
            alt={project.name}
          />
          <div className="about-heading-content">
            <div className="row">
              <div className="col-xl-9 col-lg-10 mx-auto">
                <div className="bg-faded rounded p-5">
                  <h2 className="section-heading mb-4">
                    <span className="section-heading-upper">
                      {project.description}
                    </span>
                    <span className="section-heading-lower">
                      {project.name}
                    </span>
                  </h2>
                  <ProjectTools project={project} allTools={tools} />
                  <ProjectFeatures project={project} allFeatures={features} />
                  {__html && <div dangerouslySetInnerHTML={{ __html }} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProjectPageTemplate
