import React from "react"
import Layout from "../../components/layout"

const LeadershapePage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section about-heading">
      <div className="container">
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded p-5">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">Jan 2022</span>
                  <span className="section-heading-lower">
                    Student Leader Round Table
                  </span>
                </h2>
                <p>
                  As someone who is passionate about leadership and student
                  organizations on campus, the Student Leader Round Table was
                  the perfect opportunity for me to reflect on my experiences as
                  a leader, share my own learnings and wisdom, as well as learn
                  from other leaders in the university. Over the spring
                  semester, the round table (or the student leader illuminati as
                  I like to call it) met every other week and discussed a
                  specific issue related to running a student organization. Each
                  of us have had different approaches to the issues, so it was
                  great to hear how the specific situation of an organization
                  affects our approach of thinking about or solving an issue.
                </p>
                <h3 id="session-0">Session 0: Jan 19</h3>
                <p>
                  We met for the very first time in January to get to know each
                  other and plan out the semester. We broke out into 2 groups,
                  and each group had to come up with 5 topics to talk about
                  throughout the semester. <br />
                  This session was probably the first time I have interacted
                  with other student leaders to talk about common issues in an
                  abstract manner.
                </p>
                <h3 id="session-1">Session 1: Feb 2</h3>
                <p>
                  The first session topic was{" "}
                  <strong>Hybrid Meetings and Events</strong>. <br />
                  This is a relatively new issue for student organizations, ever
                  since COVID restrictions have relaxed. After the rise of
                  virtual meetings, organizations have discovered that the
                  convenience of attending an event from home is going to
                  forever change how we connect with our community. At the same
                  time, there are people who, after living in isolation for over
                  a year, really want to get back to face to face interaction.
                  So hybrid meetings seems like the best way to cater to every
                  audience. <br />
                  However, since hybrid meetings have never been properly
                  explored by anyone, let alone by student organizations. So we
                  discussed motivations, ideas, challenges, etc. It was a great
                  conversation that I learn a lot from, and hopefully it will
                  allow me to improve the hybrid meeting experience for my
                  organizations.
                </p>
                <h3 id="session-2">Session 2: Feb 16</h3>
                <p>
                  The topic of our second session was{" "}
                  <strong>Recruitment</strong>. <br />
                  This is one of the most elementary issues that every
                  organization has to deal with. To stay relevant in the
                  community and continue to achieve our goals, we have to spread
                  awareness about our organizations' existence and attract
                  people who can contribute to the organization. <br />
                  The recruitment process has many different aspects, including
                  (but not limited to) identifying the target audience, figuring
                  out incentives and benefits, and formualting attractive
                  marketing material. <br />
                  To exercise formualting elevator pitches, we did the classic
                  "Sell me X in a minute" activity. The presenters chose a few
                  random images, and a volunteer had to come up with an elevator
                  pitch on the spot. This was a great exercise for me
                  personally, because I am often put in a situation where I am
                  in a conversation and I want to tell them about my
                  organization and what we do and why they should get involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default LeadershapePage
