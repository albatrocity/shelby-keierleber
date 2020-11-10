import React from 'react'
import { Box, Carousel } from 'grommet'
import Img from 'gatsby-image'

import ContentfulRichText from './ContentfulRichText'

const ArtWork = ({ slug, title, description, images = [] }) => {
  return (
    <Box gap="small">
      {images.map((x) => (
        <Box
          height={{ max: '70vh' }}
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
