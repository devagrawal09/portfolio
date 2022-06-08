import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../components/layout"
import { IExperience } from "../../../data/showcase/experiences/type"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ExperienceCard = ({ experience }: { experience: IExperience }) => {
  return (
    <div className="experience mt-4">
      <Link
        to={experience.id}
        style={{ textDecoration: `none`, color: `black` }}
        state={{ title: experience.name }}
      >
        <div className="experience-title d-flex">
          <div className="bg-faded py-3 px-3 p-md-5 d-flex ml-auto rounded">
            <h2 className="section-heading mb-0">
              <span className="section-heading-upper">{experience.date}</span>
              <span className="section-heading-lower">{experience.name}</span>
            </h2>
          </div>
        </div>
        <div className="showcase py-3 py-md-5 px-2">
          <GatsbyImage
            className="experience-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
            image={getImage(experience.image)}
            alt={experience.name}
          />
        </div>
        <div className="experience-description d-flex mr-auto">
          <div className="bg-faded py-3 px-3 p-md-5 rounded">
            <p className="mb-0">{experience.description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export const query = graphql`
  query ExperiencesQuery {
    experiencesYaml {
      experiences {
        id
        name
        date
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

const ExperiencesPage = ({ location, data }) => {
  const experiences: IExperience[] = data.experiencesYaml.experiences

  return (
    <Layout
      title="Experiences Showcase"
      description="Self development projects and experiences done as a part of the University Honors Program"
      path={location.pathname}
    >
      <section className="page-section">
        <div className="container">
          <h1 className="wheat-text">My Honors Experiences</h1>
          {experiences.map((experience, i) => (
            <ExperienceCard experience={experience} key={i} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default ExperiencesPage
