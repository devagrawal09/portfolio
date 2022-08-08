import { Link } from "@gatsbyjs/reach-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAward, faCode, faNewspaper } from "@fortawesome/free-solid-svg-icons"

import React from "react"
import Layout from "../components/layout"
import profileImg from "./profile.jpg"

const IndexPage = ({ location }) => (
  <Layout path={location.pathname}>
    <section className="page-section clearfix">
      <div className="container landing">
        <div className="row">
          <div className="col-sm-4 col-md-3">
            <img
              src={profileImg}
              alt="profile"
              className="img-fluid rounded-circle img-thumbnail"
            />
          </div>
          <div className="col">
            <h1 className="text-center wheat-text">Welcome!</h1>
            <p className="text-center wheat-text">
              I am a software developer and an aspiring software architect and
              content creator.
            </p>

            <div className="row">
              <div className="col">
                <Link to="showcase/projects">
                  <button className="btn btn-block btn-light">
                    See my Projects <FontAwesomeIcon icon={faCode} />
                  </button>
                </Link>
              </div>
              <div className="col">
                <Link to="blog">
                  <button className="btn btn-block btn-light">
                    Read my Blog <FontAwesomeIcon icon={faNewspaper} />
                  </button>
                </Link>
              </div>
              <div className="col">
                <Link to="showcase/experiences">
                  <button className="btn btn-block btn-light">
                    Learn about my Experiences{" "}
                    <FontAwesomeIcon icon={faAward} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
