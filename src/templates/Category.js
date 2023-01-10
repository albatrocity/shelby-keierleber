import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, head } from 'lodash/fp'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import ContentfulRichText from '../components/ContentfulRichText'
import CollectionBrowser from '../components/CollectionBrowser'

const CategoryTemplate = ({ data, location }) => {
  console.log('data', data)
  const category = get('contentfulCategory', data)
  const collections = get('collections', category)
  const collection = head(collections)
  const artwork = head(get('work', collection) || [])
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location} category={category} collection={collection}>
      <Helmet title={`${category.title} | ${siteTitle}`}>
        <meta
          property="og:title"
          content={`${category.title} | ${siteTitle}`}
        />
        <meta
          property="og:image"
          content={get('og.src', head(artwork.images))}
        />
      </Helmet>
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

export const pageQuery = graphql`
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
            thumbnail: gatsbyImageData(layout: FULL_WIDTH)
            large: gatsbyImageData(layout: FULL_WIDTH)
            og: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
