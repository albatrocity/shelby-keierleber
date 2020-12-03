import React, { useContext, useState } from 'react'
import { ResponsiveContext } from 'grommet'
import { Box, Stack, Text } from 'grommet'
import Img from 'gatsby-image'

import ContentfulRichText from './ContentfulRichText'
import Loading from './Loading'

const ArtWork = ({ slug, title, description, images = [] }) => {
  const size = useContext(ResponsiveContext)
  const [loading, setLoading] = useState(false)
  const isMobile = size === 'small'
  return (
    <Box>
      {images.map((x) => (
        <Box
          height={isMobile ? 'auto' : { max: '70vh' }}
          overflow="hidden"
          background="white"
          key={x.id}
        >
          <Stack anchor="center">
            <Img
              alt={title}
              fluid={x.large}
              backgroundColor="#ccc"
              onStartLoad={() => setLoading(true)}
              onLoad={() => setLoading(false)}
              objectFit="contain"
              objectPosition="left"
              imgStyle={{ objectFit: 'contain', objectPosition: 'left' }}
            />
            {loading && <Loading size="large" />}
          </Stack>
        </Box>
      ))}
      {description && description.json && (
        <ContentfulRichText json={description.json} />
      )}
    </Box>
  )
}

export default ArtWork
