import React from 'react'
import { Box, Sidebar } from 'grommet'

import CollectionNav from './CollectionNav'
import CollectionArtworkNav from './CollectionArtworkNav'
import ArtWork from './ArtWork'

const CollectionBrowser = ({ collections, collection, category, artwork }) => (
  <Box direction="row-responsive">
    <Sidebar width="small" pad={{ top: 'large', horizontal: 'small' }}>
      <CollectionNav
        collections={collections}
        category={category}
        collection={collection}
      />
    </Sidebar>
    <Box flex={true} pad={{ horizontal: 'small', bottom: 'small' }}>
      {collection && collection.work && collection.work.length && (
        <Box>
          <CollectionArtworkNav
            collection={collection}
            artwork={artwork}
            category={category}
          />
        </Box>
      )}
      <Box>{artwork && <ArtWork {...artwork} />}</Box>
    </Box>
  </Box>
)

export default CollectionBrowser
