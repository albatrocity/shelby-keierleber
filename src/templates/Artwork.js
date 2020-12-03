import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, find } from 'lodash/fp'

import Layout from '../components/Layout'
import CollectionBrowser from '../components/CollectionBrowser'

const ArtworkTemplate = ({ data, location, pageContext }) => {
  const category = get('contentfulCategory', data)
  const collections = get('collections', category)
  const collection = find(
    { slug: get('collectionSlug', pageContext) },
    collections
  )
  const artwork = find(
    { slug: pageContext.slug },
    get('work', collection) || []
  )
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location} category={category} collection={collection}>
      <Helmet
        title={`${artwork.title} | ${collection.title} | ${category.title} | ${siteTitle}`}
      />
      <CollectionBrowser
        collections={collections}
        collection={collection}
        category={category}
        artwork={artwork}
      />
    </Layout>
  )
}

export default ArtworkTemplate

export const pageQuery = graphql`
  query ArtworkCategoryBySlug($categorySlug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: $categorySlug }) {
      title
      id
      slug
      collections {
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
            large: fluid(maxWidth: 1500, quality: 85) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
        }
      }
    }
  }
`
