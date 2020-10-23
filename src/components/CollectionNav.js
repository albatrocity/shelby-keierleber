import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { Nav, Sidebar, ResponsiveContext, Menu, Button } from 'grommet'

import Link from './Link'

const CollectionNav = ({ collections = [], category, collection }) => {
  const size = useContext(ResponsiveContext)
  const isMobile = size === 'small'
  const getPath = (x) => `/${category.slug}/${x.slug}`

  return (
    <>
      {isMobile ? (
        <Menu
          flex={true}
          label={collection.title}
          items={collections.map((x) => ({
            label: x.title,
            onClick: () => navigate(getPath(x)),
          }))}
        />
      ) : (
        <Nav gap="small">
          {(collections || []).map((x) => (
            <Link
              active={x.slug === collection.slug}
              color="dark-3"
              key={x.slug}
              path={getPath(x)}
              label={x.title}
            />
          ))}
        </Nav>
      )}
    </>
  )
}

export default CollectionNav
