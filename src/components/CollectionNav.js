import React from 'react'
import { Nav, Sidebar } from 'grommet'

import Link from './Link'

const CollectionNav = ({ collections = [], category, collection }) => (
  <Nav>
    {(collections || []).map((x) => (
      <Link
        active={x.slug === collection.slug}
        key={x.slug}
        path={`/${category.slug}/${x.slug}`}
        label={x.title}
      />
    ))}
  </Nav>
)

export default CollectionNav
