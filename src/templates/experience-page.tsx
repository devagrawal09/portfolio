import React from "react"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import Layout from "../components/layout"

import { IExperience } from "../data/showcase/experiences/type"

const ExperiencePageTemplate = ({ pageContext }) => {
  const path: string = pageContext.pagePath
  const experience: IExperience = pageContext.experience

  const __html = experience.page?.childMarkdownRemark.html
  const image = experience.pageImage ? getSrc(experience.pageImage) : ``

  return (
    <>
      <Layout
        title={experience.name}
        description={experience.description}
        image={image}
        path={path}
      >
        <section className="page-section about-heading">
          <div className="container">
            <GatsbyImage
              image={getImage(experience.pageImage)}
              alt={experience.name}
            />
            <div className="about-heading-content">
              <div className="row">
                <div className="col-xl-9 col-lg-10 mx-auto">
                  <div className="bg-faded rounded px-3 py-4 px-md-5 text-justify-p">
                    <h2 className="section-heading mb-4">
                      <span className="section-heading-upper">
                        {experience.date}
                      </span>
                      <span className="section-heading-lower">
                        {experience.name}
                      </span>
                    </h2>
                    {__html && <div dangerouslySetInnerHTML={{ __html }} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default ExperiencePageTemplate
