const Promise = require('bluebird')
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const artworkTemplate = path.resolve('./src/templates/Artwork.js')
  const pageTemplate = path.resolve('./src/templates/Page.js')
  const categoryTemplate = path.resolve('./src/templates/Category.js')
  const collectionTemplate = path.resolve('./src/templates/Collection.js')
  const saleItemTemplate = path.resolve('./src/templates/SaleItem.js')

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
    const collection = artwork.node.collection
      ? artwork.node.collection[0]
      : null
    if (collection) {
      const path = `/${collection.category.slug}/${collection.slug}/${artwork.node.slug}/`
      createPage({
        path,
        component: artworkTemplate,
        context: {
          slug: artwork.node.slug,
          categorySlug: collection.category.slug,
          collectionSlug: collection.slug,
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
      allContentfulCollection {
        edges {
          node {
            id
            slug
            category {
              slug
              id
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
  const collections = collectionsResult.data.allContentfulCollection.edges
  collections.forEach((x, index) => {
    const path = `/${x.node.category.slug}/${x.node.slug}`
    createPage({
      path,
      component: collectionTemplate,
      context: {
        slug: x.node.slug,
        categorySlug: x.node.category.slug,
      },
    })
  })

  const saleItemsResult = await graphql(`
    {
      allContentfulSaleItem(filter: { active: { eq: true } }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (saleItemsResult.errors) {
    console.log(saleItemsResult.errors)
    throw saleItemsResult.errors
  }
  const saleItems = saleItemsResult.data.allContentfulSaleItem.edges
  saleItems.forEach((x, index) => {
    const path = `/for-sale/${x.node.slug}`
    createPage({
      path,
      component: saleItemTemplate,
      context: {
        slug: x.node.slug,
      },
    })
  })
}
