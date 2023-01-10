import React from 'react'
import { graphql } from 'gatsby'
import { Heading } from 'grommet'
import { get, head } from 'lodash/fp'

import Layout from '../components/Layout'
import CollectionBrowser from '../components/CollectionBrowser'

const Home = ({ data, location }) => {
  const category = get('contentfulCategory', data)
  const collections = get('collections', category)
  const collection = head(collections)
  const artwork = head(get('work', collection) || [])
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout
      location={location}
      title={siteTitle}
      category={category}
      collection={collection}
    >
      <CollectionBrowser
        collections={collections}
        collection={collection}
        category={category}
        artwork={artwork}
      />
    </Layout>
  )
}

export default Home

export const categoryQuery = graphql`
  query FirstCategory {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: "paintings" }) {
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
          }
        }
      }
    }
  }
`
