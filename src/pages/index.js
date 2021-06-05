import React from "react"
import Layout from "../components/layout"

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section clearfix">
      <div className="container">
        <h1 className="text-center wheat-text">Welcome to my site!</h1>
      </div>
    </section>
  </Layout>
)

export default IndexPage
