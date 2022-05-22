import React from "react"
import Layout from "../../../components/layout"
import leadershape1 from "../../../images/leadershape1.jpg"
import leadershape2 from "../../../images/leadershape2.jpeg"

const LeadershapePage = ({ location }) => (
  <Layout path={location.pathname}>
    <section className="page-section about-heading">
      <div className="container">
        <img
          className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          src={leadershape1}
          alt=""
        />
        <div className="about-heading-content">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="bg-faded rounded p-5">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">Jan 2019</span>
                  <span className="section-heading-lower">Leadershape</span>
                </h2>
                <p>
                  One of the five competencies of the University Honors Program
                  is Leadership. Leadership is the ability to influence and
                  inspire a group of people and turning the group into a single
                  unit which amplifies everyone's strengths and minimized
                  weaknesses. A major mission on my way to become a Global
                  Citizen Scholar and achieve my dream is to become an effective
                  leader. And that is precisely what Leadershape Institute, a
                  6-day workshop/retreat, is meant for - to show us the path to
                  becoming effective leaders.
                </p>
                <p>
                  The approach taken by Leadershape to make us understand the
                  building blocks of a leader was interesting and effective.
                  They take a brief definition of what constitutes a leader,
                  break it apart into pieces, and expand each piece over the
                  course of an entire day so that we have a complete picture.
                  Each day brought insight into a new dimension of life, forcing
                  us to think about things in ways we never thought existed. The
                  key takeaway was as simple as putting all the pieces gained
                  throughout the course of the week together (which is much
                  easier said than done).
                </p>
                <p>
                  Perhaps the most interesting day for me was the day we were
                  talking about the term "Vision". One of the most compelling
                  attributes of a good leader is ambition, and only a person
                  with an ambition mission can become a good leader. A Vision to
                  realize, a mission to complete, these are great motivators.
                  They drive a person and their actions like nothing else can. A
                  leader needs to be driven towards a goal, only then can he
                  inpire others to follow him on his campaign. <br />I found
                  this particularly interesting because I have always considered
                  myself to be a very ambitious person. I often think about
                  where I could be 5-10 years in the future, and those scenarios
                  are sometimes not very realistic. But on this day, we had to
                  think about a specific personal vision that we always have
                  wanted to see realized. So unlike the other occasions when I
                  used to dream about my future, this one had to be a little
                  more realistic, specific and organized, so that I can easily
                  convey it. This was followed by an activity, which made us
                  write a news artice that would be published when our vision
                  would be realized, and the news artice would describe the
                  achievement.{" "}
                  <a href={leadershape2} target="new">
                    Here is the article I wrote.
                  </a>
                </p>
                <p>
                  Aside from the main objective, one important aspect of the
                  whole experience was getting to know more like-minded people
                  and talking about ideas, thoughts and feelings. On the very
                  first day, we were told that to truly develop self, we need to
                  stretch out of our comfort zone and try out new things, until
                  those new things become our comfort zone. For me, this is
                  exactly what happened throughout the week.
                </p>
                <p>
                  Being a socially anxious person, the level of social exposure
                  was something I have only experienced once in a similar
                  workshop 4 years ago, and I was not very happy with my
                  attempts at socializing. So going into Leadershape was a
                  little tough for me. But in Leadershape, we were divided into
                  what we called "Family clusters", which was a group of 6 or 7
                  students and a faculty member. And I am very grateful that
                  everyone in my family cluster accepted me for who I am, helped
                  me throughout the week in stretching myself out of my comfort
                  zone, and allowed me to help them similarly.
                </p>
                <p>
                  But that was not the limit of social interaction I was exposed
                  to. We had multiple pair and group discussion sessions, often
                  with random people, and we enjoyed many games and activities,
                  all of which really broke the ice between us. Perhaps the most
                  enjoyable aspect of the entire week was the late-night games
                  that we students played. Those late nights forced me to get
                  out of my fortress of solitude and connect with like-minded
                  people on various levels. I am looking forward to seeing how
                  these new relationships I have forged carry out of the
                  workshop and develop into something greater.
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
