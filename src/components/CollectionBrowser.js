import React, { useContext } from 'react'
import { Box, Sidebar, ThemeContext, ResponsiveContext } from 'grommet'

import CollectionNav from './CollectionNav'
import CollectionArtworkNav from './CollectionArtworkNav'
import ArtWork from './ArtWork'

const CollectionBrowser = ({ collections, collection, category, artwork }) => {
  const theme = useContext(ThemeContext)
  const size = useContext(ResponsiveContext)
  const isMobile = size === 'small'
  return (
    <Box direction="row-responsive" gap="medium">
      <Sidebar width={isMobile ? '100%' : 'small'} pad="none">
        <Box style={{ position: 'sticky', top: 0 }}>
          <Box overflow="auto" fill>
            <Box pad={{ vertical: 'small' }} width="100%">
              <CollectionNav
                collections={collections}
                category={category}
                collection={collection}
              />
            </Box>
          </Box>
        </Box>
      </Sidebar>
      <Box flex={true} gap="medium">
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
}

export default CollectionBrowser
