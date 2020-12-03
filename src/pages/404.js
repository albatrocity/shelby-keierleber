import React from 'react'
import { graphql } from 'gatsby'
import { Heading } from 'grommet'
import { get, head } from 'lodash/fp'

import Layout from '../components/Layout'

const PageNotFound = ({ data, location }) => {
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location}>
      <Heading level={1}>Page not found.</Heading>
    </Layout>
  )
}

export default PageNotFound

export const categoryQuery = graphql`
  query PageNotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`
