import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, head } from 'lodash/fp'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import ContentfulRichText from '../components/ContentfulRichText'
import CollectionBrowser from '../components/CollectionBrowser'

const CategoryTemplate = ({ data, location }) => {
  const category = get('contentfulCategory', data)
  const collections = get('collection', category)
  const collection = head(collections)
  const artwork = head(get('work', collection) || [])
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location} category={category} collection={collection}>
      <Helmet title={`${category.title} | ${siteTitle}`} />
      <CollectionBrowser
        collections={collections}
        collection={collection}
        category={category}
        artwork={artwork}
      />
    </Layout>
  )
}

export default CategoryTemplate

export const categoryQuery = graphql`
  query CategoryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: $slug }) {
      title
      id
      slug
      collection {
        slug
        title
        work {
          slug
          title
          description {
            json
          }
          images {
            id
            thumbnail: fluid(
              maxWidth: 200
              quality: 80
              cropFocus: CENTER
              maxHeight: 200
              resizingBehavior: THUMB
            ) {
              ...GatsbyContentfulFluid
            }
            large: fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
