import React from "react"
import Layout from "../../../components/layout"

const RevolutionUCPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section about-heading">
      <div className="container">
        <img
          className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          // src={revolutionuc1}
          alt=""
        />
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded p-5">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">Feb 2021</span>
                  <span className="section-heading-lower">
                    RevolutionUC Organizing
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default RevolutionUCPage
