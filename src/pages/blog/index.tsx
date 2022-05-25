import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import Layout from "../../components/layout"

const BlogHome = ({ location }) => (
  <Layout location={location}>
    <section className="page-section about-heading">
      <div className="container">
        <h1 className="wheat-text">My Blog</h1>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h1>Featured Article</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    Recent Article
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    Recent Article
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  </Layout>
)

export default BlogHome
