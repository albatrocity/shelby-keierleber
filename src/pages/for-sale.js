import React from 'react'
import { Heading } from 'grommet'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Shop from '../components/Shop'

const ForSale = ({ location, data }) => {
  return (
    <Layout>
      <Helmet title={`For Sale | ${data.site.siteMetadata.title}`} />
      <Shop data={data} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AllSaleItems {
    site {
      siteMetadata {
        title
      }
    }
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
            content {
              content {
                value
              }
            }
          }
          images {
            id
            large: fluid(
              maxWidth: 400
              maxHeight: 400
              cropFocus: CENTER
              resizingBehavior: CROP
              quality: 80
            ) {
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
