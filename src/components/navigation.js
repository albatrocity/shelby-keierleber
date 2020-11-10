import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from './Link'
import { Nav, Heading } from 'grommet'

const Navigation = ({ category }) => {
  const data = useStaticQuery(graphql`
    query SiteNav {
      pages: allContentfulPage {
        nodes {
          id
          title
          slug
        }
      }
      categories: allContentfulCategory {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)
  const { pages, categories } = data
  return (
    <Nav direction="row">
      {categories.nodes.map((x) => (
        <Heading level={3} margin="none" key={x.id}>
          <Link
            active={category && x.id === category.id}
            path={`/${x.slug}`}
            label={x.title}
          />
        </Heading>
      ))}
      {pages.nodes.map((x) => (
        <Heading level={3} margin="none" key={x.id}>
          <Link path={`/${x.slug}`} label={x.title} />
        </Heading>
      ))}
      <Heading level={3} margin="none">
        <Link path={`/for-sale`} label="For Sale" />
      </Heading>
    </Nav>
  )
}

export default Navigation
