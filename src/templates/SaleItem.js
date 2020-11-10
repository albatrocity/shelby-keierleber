import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, find } from 'lodash/fp'

import Layout from '../components/Layout'
import SaleItem from '../components/SaleItem'

const SaleItemTemplate = ({ data, location, pageContext }) => {
  const siteTitle = get('site.siteMetadata.title', data)
  const item = get('contentfulSaleItem', data)

  return (
    <Layout location={location}>
      <Helmet title={`${item.title} | For Sale | ${siteTitle}`} />
      <SaleItem data={item} />
    </Layout>
  )
}

export default SaleItemTemplate

export const pageQuery = graphql`
  query SaleItemBySlug($slug: String!) {
    contentfulSaleItem(slug: { eq: $slug }) {
      id
      inStock
      price
      title
      description {
        json
      }
      images {
        fluid(quality: 90) {
          src
          srcSet
        }
      }
      slug
    }
  }
`
