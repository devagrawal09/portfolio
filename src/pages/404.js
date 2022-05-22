import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const NotFoundPage = ({ location }) => (
  <Layout path={location.pathname}>
    <section className="page-section clearfix">
      <div className="container">
        <h1 className="text-center wheat-text">
          You just hit a page that doesn&#39;t exist... try going back to{" "}
          <Link to="/">home</Link>?.
        </h1>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
