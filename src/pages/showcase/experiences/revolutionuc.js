import React from "react"
import Layout from "../../../components/layout"
import revolutionuc1 from "../../../images/revolutionuc1.jpeg"
import revolutionuc2 from "../../../images/revolutionuc2.png"
import revolutionuc3 from "../../../images/revolutionuc3.png"
import revolutionuc4 from "../../../images/revolutionuc4.png"

const RevolutionUCPage = ({ location }) => (
  <Layout path={location.pathname}>
    <section className="page-section about-heading">
      <div className="container">
        <img
          className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          src={revolutionuc1}
          alt=""
        />
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded px-3 py-4 px-md-5 text-justify-p">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">Feb 2021</span>
                  <span className="section-heading-lower">
                    RevolutionUC Organizing
                  </span>
                </h2>
                <p>
                  <a href="https://revolutionuc.com/">RevolutionUC</a> is an
                  annual hackathon hosted by the{" "}
                  <a href="http://acmatuc.org/">ACM@UC</a> student organization.
                  I have been an executive member of the organization for 2
                  years, and I volunteered for organizing RevolutionUC both
                  years. RevolutionUC organizers are split into 4 teams –
                  Logistics, Sponsorship, Marketing, and Web. This year, I was
                  given the opportunity to be the lead of the Web team, and I
                  was equal parts excited and scared for this. But I recognize
                  that we can only learn new things and develop ourselves when
                  we do things outside our comfort zone, and that is always a
                  scary endeavor. So, I happily accepted the opportunity. And I
                  can confidently say that this has been one of the best
                  experiences of my life.
                </p>
                <p>
                  My work and responsibilities during this experience can be put
                  into three broad roles: a <strong>Developer</strong>, a{" "}
                  <strong>Leader</strong> and an <strong>Organizer</strong>.
                </p>
                <p>
                  This opportunity allowed me to explore my passion of
                  automation, software development, and problem solving. As the
                  Developer, I designed some systems and applications that
                  helped us organize the entire hackathon by automating some
                  tasks. This{" "}
                  <a href={revolutionuc2} target="_blank">
                    architecture diagram
                  </a>{" "}
                  shows all the various applications and services, and how they
                  interact with each other, and with the users. Most of these
                  were built from scratch by me and my team this year. Others
                  were built by my predecessers and have existed for a few
                  years. We just maintained them and gave them a few feature
                  upgrades.
                </p>
                <p>
                  Managing a system and a team proved to be the most difficult
                  part of the experience for me, as I have always been a solo
                  guy. But I do have a little bit of experience and exposure to
                  how management is done effectively, so I knew where to start.
                  In this age, our tools can do half the job for us, so we need
                  to know the strengths and limitations of the tools we are
                  using. I was using Microsoft Teams for meetings, notes, files
                  and updates (
                  <a href={revolutionuc3} target="_blank">
                    example
                  </a>
                  ). Trello was my choice for managing tasks. I made use of
                  columns, checklists, labels, assignments, and integrations to
                  customize the Trello board to our needs (
                  <a href={revolutionuc4} target="_blank">
                    example
                  </a>
                  ).
                </p>
                <p>
                  The day of event was a tough one, as my work started very
                  early in the morning, so I had to skip breakfast. After
                  getting done with my day-of chores like setting up the live
                  site, making sure everyone is able to check in, and everything
                  is running smoothly, I finally got a little time to grab a
                  bite and a coffee. The rest of the day was all about talking
                  to attendees on our Discord, helping participants with
                  projects, and making new connections. We had over 230
                  participants from 11 countries, in addition to representatives
                  from sponsor companies, mentors from the industry, and
                  qualified judges. A bunch of mini-events were hosted for the
                  attendees to take a break and socialize.
                </p>
                <p>
                  This experience helped me develop myself in not just one or
                  two, but all of the 5 UHP competencies. Additionally, the
                  systems I built as a part of this experience are not mere
                  hobby projects, but industry-grade software that is deployed
                  in the cloud and is expected to handle hundreds of users. I
                  can put this on my resume and showcase to potential employers.
                  I am sure they will be interested in someone who can manage a
                  system of this scale, as well as the soft skills that come
                  with leading a team and organizing an event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default RevolutionUCPage
