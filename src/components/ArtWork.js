import React from 'react'
import { Box } from 'grommet'
import Img from 'gatsby-image'

import ContentfulRichText from './ContentfulRichText'

const ArtWork = ({ slug, title, description, images = [] }) => {
  return (
    <Box>
      {images.map((x) => (
        <Img key={x.id} alt={title} fluid={x.large} />
      ))}
      {description && description.json && (
        <ContentfulRichText json={description.json} />
      )}
    </Box>
  )
}

export default ArtWork
