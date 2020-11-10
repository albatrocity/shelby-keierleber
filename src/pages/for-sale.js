import React from 'react'
import { Heading } from 'grommet'

import Layout from '../components/Layout'
import Shop from '../components/Shop'

const ForSale = ({ location, data }) => {
  return (
    <Layout>
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
            large: fluid {
              ...GatsbyContentfulFluid
            }
            thumb: fixed(width: 80, height: 80, cropFocus: CENTER) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

export default ForSale
