import React, { useContext } from 'react'
import { ResponsiveContext } from 'grommet'
import { Box } from 'grommet'
import Img from 'gatsby-image'

import ContentfulRichText from './ContentfulRichText'

const ArtWork = ({ slug, title, description, images = [] }) => {
  const size = useContext(ResponsiveContext)
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
          <Img
            alt={title}
            fluid={x.large}
            objectFit="contain"
            objectPosition="left"
            imgStyle={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        </Box>
      ))}
      {description && description.json && (
        <ContentfulRichText json={description.json} />
      )}
    </Box>
  )
}

export default ArtWork
