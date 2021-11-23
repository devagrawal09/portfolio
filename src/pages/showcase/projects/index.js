import React from "react"
import { Link } from "gatsby"
import { Card, Row, Col } from "react-bootstrap"
import Layout from "../../../components/layout"
import {
  TSBadge,
  ReactBadge,
  AngularBadge,
  ExpressBadge,
  NestBadge,
  PostgresBadge,
  MongoBadge,
  HerokuBadge,
  DockerBadge,
  LinuxBadge,
  AWSBadge,
  JekyllBadge,
  NetlifyBadge,
  TravisBadge,
  DroneBadge,
  DiscordBadge,
  DDDBadge,
  DistributedBadge,
  CloudBadge,
  DevopsBadge,
  IntegrationBadge,
  RBACBadge,
  E2EBadge,
  MicroservicesBadge,
} from "../../../components/badges"
import hackathonImage from "../../../images/hackathon.jpg"
import osdpImage from "../../../images/osdp.png"

const ProjectsPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section">
      <div className="container">
        <h1 className="wheat-text">My Projects</h1>
        <Card className="project">
          <Card.Body>
            <Row>
              <Col xs={6}>
                <Link
                  to="hackathon"
                  style={{ color: `black` }}
                  state={{ title: `RevolutionUC Organizing` }}
                >
                  <h2 className="project-title" id="hackathon">
                    Hackathon Suite
                  </h2>
                  <img className="project-image" src={hackathonImage} />
                </Link>
              </Col>
              <Col xs={6}>
                <p>
                  A suite of applications developed to aid the organization of a
                  hackathon event.
                </p>
                <h3>Tools</h3>
                <p>
                  <TSBadge />
                  <ReactBadge />
                  <AngularBadge />
                  <NestBadge />
                  <PostgresBadge />
                  <JekyllBadge />
                  <HerokuBadge />
                  <AWSBadge />
                  <NetlifyBadge />
                  <DiscordBadge />
                  <TravisBadge />
                </p>
                <h3>Design Features</h3>
                <p>
                  <DistributedBadge />
                  <CloudBadge />
                  <IntegrationBadge />
                  <RBACBadge />
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="project">
          <Card.Body>
            <Row>
              <Col xs={6}>
                <p className="project-description">
                  A system for courts to record and analyze sentencing data
                  using the <strong>Uniform Sentencing Entry</strong> form
                </p>
                <h3>Tools</h3>
                <p>
                  <TSBadge />
                  <ReactBadge />
                  <ExpressBadge />
                  <PostgresBadge />
                  <MongoBadge />
                  <DroneBadge />
                  <DockerBadge />
                  <LinuxBadge />
                </p>
                <h3>Design Features</h3>
                <p>
                  <DDDBadge />
                  <DevopsBadge />
                  <RBACBadge />
                  <E2EBadge />
                </p>
              </Col>
              <Col xs={6}>
                <Link
                  to="osdp"
                  style={{ color: `black` }}
                  state={{ title: `RevolutionUC Organizing` }}
                >
                  <h2 className="project-title" id="osdp">
                    Ohio Sentencing Data Platform
                  </h2>
                  <img className="project-image" src={osdpImage} />
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="project">
          <Card.Body>
            <Row>
              <Col xs={6}>
                <Link
                  to="hackathon"
                  style={{ color: `black` }}
                  state={{ title: `Risk Assessment` }}
                >
                  <h2 className="project-title" id="hackathon">
                    UCCI Risk Assessment
                  </h2>
                  <img className="project-image" src={hackathonImage} />
                </Link>
              </Col>
              <Col xs={6}>
                <p>
                  A suite of applications developed to aid the organization of a
                  hackathon event.
                </p>
                <h3>Tools</h3>
                <p>
                  <TSBadge />
                  <ReactBadge />
                  <ExpressBadge />
                  <PostgresBadge />
                </p>
                <h3>Design Features</h3>
                <p>
                  <DistributedBadge />
                  <RBACBadge />
                  <DevopsBadge />
                  <MicroservicesBadge />
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="project">
          <Card.Body>
            <Row>
              <Col xs={6}>
                <p className="project-description">
                  A system for courts to record and analyze sentencing data
                  using the <strong>Uniform Sentencing Entry</strong> form
                </p>
                <h3>Tools</h3>
                <p>
                  <TSBadge />
                  <ReactBadge />
                  <ExpressBadge />
                  <PostgresBadge />
                  <MongoBadge />
                  <DroneBadge />
                  <DockerBadge />
                  <LinuxBadge />
                </p>
                <h3>Design Features</h3>
                <p>
                  <DDDBadge />
                  <DevopsBadge />
                  <RBACBadge />
                  <E2EBadge />
                </p>
              </Col>
              <Col xs={6}>
                <Link
                  to="hlo"
                  style={{ color: `black` }}
                  state={{ title: `RevolutionUC Organizing` }}
                >
                  <h2 className="project-title" id="osdp">
                    HealthyLovedOnes
                  </h2>
                  <img className="project-image" src={osdpImage} />
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </section>
  </Layout>
)

export default ProjectsPage
