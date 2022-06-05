import React from "react"
import Layout from "../components/layout"
import resume from "./resume.pdf"
import me from "../images/about.jpg"

const AboutPage = ({ location }) => (
  <Layout path={location.pathname}>
    <section class="page-section about-heading">
      <div class="container">
        <img
          className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          src={me}
          alt=""
        />
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded px-3 py-4 px-md-5 text-justify-p">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-lower">About me</span>
                </h2>
                <p>
                  I am Dev Agrawal (The name 'Dev' translates to 'God', but I
                  don't let that get to my head :P ). I am a third-year
                  Information Technology major at the University of Cincinnati.
                  I am also a software developer, and currently I work at the UC
                  IT Solutions Center.
                </p>
                <p>
                  I was introduced into this world on the 9th of May 1999, the
                  last summer of the millenium, in the beautiful and diverse
                  country of India. I was born to highly socially active
                  parents, with a large age gap between me and all of my older
                  cousins, including my brother. These factors made me a very
                  socially-awkward person. So I spent most of my life trying to
                  overcome my social anxiety, but never truly succeeded.
                </p>
                <p>
                  I got interested into the field of computer science very
                  early, when my brother introduced my to something called
                  "C++". The power of making a computer do whatever I wanted
                  through text commands felt amazing. That's when my love of
                  learning kicked in, which made me spend hours everyday
                  learning about programming and software development. School
                  was boring, so I had a lot of time to dedicate to my newfound
                  love.
                </p>
                <p>
                  I am a problem solver. I have always been attracted to puzzles
                  and riddles. I like how they compel you to move all the gears
                  of your brain for one purpose - search for a solution. And
                  successfully finding the solution is highly rewarding. This is
                  why I was attracted to the Information Technology program -
                  most of it is problem solving.
                </p>
                <p className="text-center">
                  <a href={resume} target="_blank">
                    Check out my resume here!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutPage
