import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Row, Col } from "react-bootstrap"
import { ToolBadge } from "./tool-badge"
import { FeatureBadge } from "./feature-badge"

import type { IProject } from "../../data/showcase/projects/type"
import type { IFeature } from "../../data/tech/features/type"
import type { ITool } from "../../data/tech/tools/type"

interface CardProps {
  project: IProject
  allTools: ITool[]
  allFeatures: IFeature[]
  i: number
}

export const ProjectTools = ({
  project,
  allTools,
}: Pick<CardProps, "project" | "allTools">) => {
  return (
    <p>
      {project.tools.map((tool, i) => {
        const toolData = allTools.find(t => t.id === tool)
        if (!toolData) {
          throw new Error(`Tool ${tool} not found in toolsData`)
        }
        return <ToolBadge key={i} tool={toolData} projectId={project.id} />
      })}
    </p>
  )
}

export const ProjectFeatures = ({
  project,
  allFeatures,
}: Pick<CardProps, "project" | "allFeatures">) => {
  return (
    <p>
      {project.features.map((feature, i) => {
        const featureData = allFeatures.find(f => f.id === feature)
        if (!featureData) {
          throw new Error(`Feature ${feature} not found in featuresData`)
        }
        return (
          <FeatureBadge key={i} feature={featureData} projectId={project.id} />
        )
      })}
    </p>
  )
}

export const ProjectCard = ({
  project,
  allFeatures,
  allTools,
  i,
}: CardProps) => {
  const col1 = (
    <Col xs={6}>
      <Link
        to={project.id}
        style={{ color: `black` }}
        state={{ title: `RevolutionUC Organizing` }}
      >
        <h2 className="project-title" id="hackathon">
          {project.name}
        </h2>
        <GatsbyImage
          image={getImage(project.image)}
          alt={project.name}
          className="project-image"
        />
      </Link>
    </Col>
  )

  const col2 = (
    <Col xs={6}>
      <p>{project.description}</p>
      <h3>Tools</h3>
      <ProjectTools project={project} allTools={allTools} />
      <h3>Design Features</h3>
      <ProjectFeatures project={project} allFeatures={allFeatures} />
    </Col>
  )

  return (
    <Card className="project">
      <Card.Body>
        <Row>
          {i % 2 === 0 ? (
            <>
              {col1}
              {col2}
            </>
          ) : (
            <>
              {col2}
              {col1}
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  )
}