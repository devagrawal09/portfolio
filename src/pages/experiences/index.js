import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import leadershapeLogo from "../../images/leadershape.png"

const ExperiencesPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section">
      <div className="container">
          <h1 className="wheat-text">My Honors Experiences</h1>
        <div className="product-item">
          <Link to="leadershape" style={{ textDecoration: `none`, color: `black` }} state={{ title: `Leadershape` }}>
            <div className="product-item-title d-flex">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Jan 2019</span>
                  <span className="section-heading-lower">LeaderShape Institute</span>
                </h2>
              </div>
            </div>
            <img className="leadershape product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0" src={leadershapeLogo} alt="" />
            <div className="product-item-description d-flex mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0">
                  Blooming leaders of tomorrow!
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
)

export default ExperiencesPage
