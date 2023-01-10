import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, find, head } from 'lodash/fp'

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
  const descriptionText = get(
    'value',
    head(get('content', head(get('description.content', artwork))))
  )

  return (
    <Layout location={location} category={category} collection={collection}>
      <Helmet
        title={`${artwork.title} | ${collection.title} | ${category.title} | ${siteTitle}`}
      >
        <meta property="og:title" content={`${artwork.title} | ${siteTitle}`} />
        <meta property="og:description" content={descriptionText} />
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
            content {
              content {
                value
              }
            }
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
