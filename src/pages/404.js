import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <section className="page-section clearfix">
        <div className="container">
          <h1 className="text-center wheat-text">You just hit a route that doesn&#39;t exist... the sadness.</h1>
        </div>
      </section>
  </Layout>
)

export default NotFoundPage
