import React from 'react'
import { Heading } from 'grommet'

import Layout from '../components/Layout'

const ForSale = ({ location }) => {
  const data = useStaticQuery(`
    query AllSaleItems {
  allContentfulSaleItem(filter: {active: {eq: true}}) {
    edges {
      node {
        id
        inStock
        price
        slug
        title
        description {
          json
        }
      }
    }
  }
}
`)

  return (
    <Layout>
      <Heading level={4}>For Sale</Heading>
    </Layout>
  )
}

export default ForSale
