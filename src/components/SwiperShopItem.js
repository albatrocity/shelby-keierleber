import React from 'react'
import Img from 'gatsby-image'
import { Box } from 'grommet'
import Carousel from 'nuka-carousel'
import { Next, Previous } from 'grommet-icons'

const SwiperShopItem = ({ images, title }) => {
  return (
    <Box flex focusIndicator={false}>
      <Carousel
        renderCenterLeftControls={({ previousSlide }) => (
          <Previous onClick={previousSlide} focusIndicator={false} />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Next onClick={nextSlide} focusIndicator={false} />
        )}
      >
        {images.map((x) => (
          <Img focusIndicator={false} alt={title} fluid={x.large} />
        ))}
      </Carousel>
    </Box>
  )
}

export default SwiperShopItem
