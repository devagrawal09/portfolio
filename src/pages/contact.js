import React from "react"
import Layout from "../components/layout"

const ContactPage = ({ location }) => (
  <Layout path={location.pathname}>
    <section className="page-section cta">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <div className="cta-inner text-center rounded">
              <h2 className="section-heading mb-5">
                <span className="section-heading-lower">Talk to me!</span>
              </h2>
              <p>
                I might be an Introvert, but I love talking to about anything
                from new possibilities and innovations in software development
                to metal music, or from the comic books and movies to the
                meaning and purpose of life!
              </p>
              <br />
              <p className="mb-0">
                <small>
                  <em>The most reliable form of communication - Emails!</em>
                </small>
                <br />
                agrawadv@mail.uc.edu <br /> devagrawal09@gmail.com
              </p>
              <br />
              <p className="mb-0">
                <small>
                  <em>Check out my work and stories!</em>
                </small>
                <br />
                <a href="https://github.com/devagrawal09/">Github</a> <br />
                <a href="https://www.linkedin.com/in/dev-agrawal-88449b157/">
                  LinkedIn
                </a>{" "}
                <br />
                <a href="https://medium.com/@devagrawal09">Medium</a>
              </p>
              <br />
              <p className="mb-0">
                <small>
                  <em>Social media ftw!</em>
                </small>
                <br />
                <a href="https://twitter.com/dadevil99/">Twitter</a> <br />
                <a href="https://www.facebook.com/dadevil09">Facebook</a> <br />
                <a href="https://www.instagram.com/dadevil_666/">Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default ContactPage
