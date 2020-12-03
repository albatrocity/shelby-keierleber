const Promise = require('bluebird')
const path = require('path')
const { find, map, get } = require('lodash/fp')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const artworkTemplate = path.resolve('./src/templates/Artwork.js')
  const pageTemplate = path.resolve('./src/templates/Page.js')
  const categoryTemplate = path.resolve('./src/templates/Category.js')
  const collectionTemplate = path.resolve('./src/templates/Collection.js')

  const result = await graphql(`
    {
      artwork: allContentfulArtwork {
        edges {
          node {
            id
            slug
            collection {
              slug
              title
            }
          }
        }
      }
      categories: allContentfulCategory {
        edges {
          node {
            slug
            collections {
              slug
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

  const artworks = result.data.artwork.edges
  artworks.forEach((artwork, index) => {
    const collection = artwork.node.collection
      ? artwork.node.collection[0]
      : null

    const category = get(
      'node',
      find(
        (x) => map('slug', x.node.collections).indexOf(collection.slug) > -1,
        result.data.categories.edges
      )
    )
    if (collection) {
      const path = `/${get('slug', category)}/${collection.slug}/${
        artwork.node.slug
      }/`
      createPage({
        path,
        component: artworkTemplate,
        context: {
          slug: get('node.slug', artwork),
          categorySlug: get('slug', category),
          collectionSlug: get('slug', collection),
        },
      })
    }
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
    console.log(pagesResult.errors)
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

  const categoriesResult = await graphql(`
    {
      allContentfulCategory {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (categoriesResult.errors) {
    console.log(categoriesResult.errors)
    throw categoriesResult.errors
  }
  const categories = categoriesResult.data.allContentfulCategory.edges
  categories.forEach((x, index) => {
    const path = `/${x.node.slug}`
    createPage({
      path,
      component: categoryTemplate,
      context: {
        slug: x.node.slug,
        categorySlug: x.node.slug,
      },
    })
  })

  const collectionsResult = await graphql(`
    {
      collections: allContentfulCollection {
        edges {
          node {
            id
            slug
          }
        }
      }
      categories: allContentfulCategory {
        edges {
          node {
            slug
            collections {
              slug
            }
          }
        }
      }
    }
  `)
  if (collectionsResult.errors) {
    console.log(collectionsResult.errors)
    throw collectionsResult.errors
  }
  const collections = collectionsResult.data.collections.edges
  collections.forEach((x, index) => {
    const category = find(
      (z) => map('slug', z.node.collections).indexOf(x.node.slug) > -1,
      collectionsResult.data.categories.edges
    )
    const path = `/${get('node.slug', category)}/${get('node.slug', x)}`
    createPage({
      path,
      component: collectionTemplate,
      context: {
        slug: get('node.slug', x),
        categorySlug: get('node.slug', category),
      },
    })
  })
}
