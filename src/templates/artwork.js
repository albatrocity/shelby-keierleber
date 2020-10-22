import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const ArtworkTemplate = ({ data, location }) => {
  const siteTitle = get('site.siteMetadata.title', data)
  const artwork = get('contentfulArtwork', data)
  const collection = get('collection', artwork)
  const category = get('category', collection)

  return (
    <Layout location={this.props.location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${artwork.title} | ${siteTitle}`} />
      </div>
    </Layout>
  )
}

export default ArtworkTemplate

export const pageQuery = graphql`
  query ArtworkBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulArtwork(slug: { eq: $slug }) {
      title
      id
      slug
      images {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      description {
        json
      }
      collection {
        slug
        title
        category {
          slug
          title
        }
      }
    }
  }
`
