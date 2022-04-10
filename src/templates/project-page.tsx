import React from "react"
import Layout from "../components/layout"

const ProjectPageTemplate = ({ pageContext, location }) => (
  <Layout location={location}>
    {console.log({ pageContext })}
    <section className="page-section about-heading">
      <div className="container">
        {/* <img
          className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          src={leadershape1}
          alt=""
        /> */}
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded p-5">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-lower">Project Name</span>
                </h2>
                <p>
                  Some Lorem Ipsum text I am too lazy to look up but am still dumb enough to type out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default ProjectPageTemplate
