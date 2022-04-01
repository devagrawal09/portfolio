import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import leadershapeLogo from "../../images/leadershape.png"
import revucLogo from "../../images/revolutionuc.png"
import mentorshipLogo from "../../images/mentorship.png"
import roundtableLogo from "../../images/roundtable.png"

const ExperiencesPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section">
      <div className="container">
        <h1 className="wheat-text">My Honors Experiences</h1>
        <div className="product-item">
          <Link
            to="roundtable"
            style={{ textDecoration: `none`, color: `black` }}
            state={{ title: `Student Leader Round Table` }}
          >
            <div className="product-item-title d-flex">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Jan 2022</span>
                  <span className="section-heading-lower">
                    Student Leader Round Table
                  </span>
                </h2>
              </div>
            </div>
            <div className="showcase">
              <img
                className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
                src={roundtableLogo}
                alt=""
              />
            </div>
            <div className="product-item-description d-flex mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0">The student leader illuminati</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="product-item">
          <Link
            to="mentorship"
            style={{ textDecoration: `none`, color: `black` }}
            state={{ title: `UHP Welcome Experience Mentorship` }}
          >
            <div className="product-item-title d-flex">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">August 2021</span>
                  <span className="section-heading-lower">
                    UHP Welcome Experience Mentorship
                  </span>
                </h2>
              </div>
            </div>
            <div className="showcase">
              <img
                className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
                src={mentorshipLogo}
                alt=""
                width={270}
              />
            </div>
            <div className="product-item-description d-flex mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0">Mentoring the next generation of honors</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="product-item">
          <Link
            to="revolutionuc"
            style={{ textDecoration: `none`, color: `black` }}
            state={{ title: `RevolutionUC Organizing` }}
          >
            <div className="product-item-title d-flex">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Feb 2021</span>
                  <span className="section-heading-lower">
                    RevolutionUC Organizing
                  </span>
                </h2>
              </div>
            </div>
            <div className="showcase">
              <img
                className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
                src={revucLogo}
                alt=""
              />
            </div>
            <div className="product-item-description d-flex mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0">
                  A hackathon hosted at the University of Cincinnati
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="product-item">
          <Link
            to="leadershape"
            style={{ textDecoration: `none`, color: `black` }}
            state={{ title: `Leadershape` }}
          >
            <div className="product-item-title d-flex">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Jan 2019</span>
                  <span className="section-heading-lower">
                    LeaderShape Institute
                  </span>
                </h2>
              </div>
            </div>
            <div className="showcase">
              <img
                className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
                src={leadershapeLogo}
                alt=""
              />
            </div>
            <div className="product-item-description d-flex mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0">Blooming leaders of tomorrow!</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
)

export default ExperiencesPage
