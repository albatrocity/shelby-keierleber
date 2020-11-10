import React from 'react'
import { Heading } from 'grommet'

import Layout from '../components/Layout'
import Shop from '../components/Shop'

const ForSale = ({ location, data }) => {
  return (
    <Layout>
      <Heading level={4}>For Sale</Heading>
      <Shop data={data} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AllSaleItems {
    allContentfulSaleItem(filter: { active: { eq: true } }) {
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
          images {
            id
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default ForSale
