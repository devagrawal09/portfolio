import React from "react"
import { Navbar, Nav, Dropdown } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "./seo"

interface Props {
  title?: string
  description?: string
  image?: string
  path?: string
}

const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  image,
  path,
}) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
            dropdown {
              name
              link
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO
        title={title || `Home`}
        description={description}
        image={image}
        path={path}
      />
      <h1 className="site-heading text-center text-white d-none d-lg-block">
        <span className="site-heading-upper text-primary mb-3">Portfolio</span>
        <span className="site-heading-lower">Dev Agrawal</span>
      </h1>

      <Navbar expand="lg" id="mainNav" className="py-lg-4">
        <Navbar.Brand className="d-lg-none">Dev Agrawal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="mx-auto">
            {data.site.siteMetadata.menuLinks.map(node =>
              node.dropdown?.length ? (
                <Dropdown key={node.name} as={Nav.Item} className="px-lg-4">
                  <Dropdown.Toggle
                    as={Nav.Link}
                    className="text-uppercase text-expanded"
                  >
                    {node.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {node.dropdown.map(subNode => (
                      <Dropdown.Item
                        key={subNode.name}
                        as={Link}
                        to={`${node.link}${subNode.link}`}
                        state={{ title: subNode.name }}
                      >
                        {subNode.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Item key={node.name} className="px-lg-4">
                  <Nav.Link
                    as={Link}
                    className="text-uppercase text-expanded"
                    to={node.link}
                    activeClassName="active"
                    state={{ title: node.name }}
                  >
                    {node.name}
                  </Nav.Link>
                </Nav.Item>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {children}

      <footer className="footer text-faded text-center py-5">
        <div className="container">
          <p className="m-0 small">Made with Bootstrap and Gatsby</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
