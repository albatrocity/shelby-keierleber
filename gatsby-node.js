const Promise = require('bluebird')
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const artworkTemplate = path.resolve('./src/templates/artwork.js')
  const pageTemplate = path.resolve('./src/templates/page.js')

  const result = await graphql(`
    {
      allContentfulArtwork {
        edges {
          node {
            id
            slug
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
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  const artworks = result.data.allContentfulArtwork.edges
  artworks.forEach((artwork, index) => {
    const collection = artwork.node.collection[0]
    const path = `/${collection.category.slug}/${collection.slug}/${artwork.node.slug}/`
    createPage({
      path,
      component: artworkTemplate,
      context: {
        slug: artwork.node.slug,
      },
    })
  })

  const pagesResult = await graphql(`
    {
      allContentfulPage {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (pagesResult.errors) {
    console.log(result.errors)
    throw pagesResult.errors
  }
  const pages = pagesResult.data.allContentfulPage.edges
  pages.forEach((page, index) => {
    const path = `/${page.node.slug}`
    createPage({
      path,
      component: pageTemplate,
      context: {
        slug: page.node.slug,
      },
    })
  })
}
