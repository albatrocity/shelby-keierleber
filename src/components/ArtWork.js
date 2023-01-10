import React, { useContext, useState } from 'react'
import { ResponsiveContext } from 'grommet'
import { Box, Stack, Text } from 'grommet'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useContentfulImage } from 'gatsby-source-contentful/hooks'

import ContentfulRichText from './ContentfulRichText'
import Loading from './Loading'

const ArtWork = ({ slug, title, description, images = [] }) => {
  const size = useContext(ResponsiveContext)
  const [loading, setLoading] = useState(false)
  const isMobile = size === 'small'
  return (
    <Box>
      {images.map((x) => {
        console.log(x)
        // const dynamicImage = useContentfulImage({
        //   image: {
        //     url: "//images.ctfassets.net/k8iqpp6u0ior/3BSI9CgDdAn1JchXmY5IJi/f97a2185b3395591b98008647ad6fd3c/camylla-battani-AoqgGAqrLpU-unsplash.jpg",
        //     width: 2000,
        //     height: 1000,
        //   },
        // })
        return (
          <Box
            height={isMobile ? 'auto' : { max: '70vh' }}
            overflow="hidden"
            background="white"
            style={{ position: 'relative' }}
            key={x.id}
          >
            {loading && (
              <Box
                style={{ position: 'absolute', left: 0, top: 0, zIndex: 10 }}
                fill
                background="light-1"
                align="center"
                justify="center"
              >
                <Loading size="large" />
              </Box>
            )}
            <Img
              alt={title}
              fluid={x.large}
              backgroundColor="#EDEDED"
              onStartLoad={() => setLoading(true)}
              onLoad={() => setLoading(false)}
              objectFit="contain"
              objectPosition="left"
              imgStyle={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </Box>
        )
      })}
      {description && description.json && (
        <ContentfulRichText json={description.json} />
      )}
    </Box>
  )
}

export default ArtWork
