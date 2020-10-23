import React, { useState } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import Img from 'gatsby-image'
import { get, head } from 'lodash/fp'
import { FormNext, FormPrevious, AppsRounded } from 'grommet-icons'
import styled from 'styled-components'

import { useLayout } from '../contexts/useLayout'
import Link from './Link'

const ThumbContainer = styled.div`
  transform: ${(p) => (p.active ? 'scale(0.85)' : 'scale(1)')};
`
const ThumbnailNav = styled.div`
  max-height: ${(p) => {
    return p.active
      ? `${
          parseInt(p.theme.global.size.xsmall) +
          parseInt(p.theme.global.edgeSize.small)
        }px`
      : '0'
  }};
  transition: max-height 0.4s ease-out;
`

const CollectionArtworkNav = ({
  collection = { work: [] },
  artwork,
  category,
}) => {
  const { state, dispatch } = useLayout()
  const currentIndex = collection.work.indexOf(artwork)
  const next = collection.work[currentIndex + 1]
  const prev = collection.work[currentIndex - 1]
  const collectionPath = `/${category.slug}/${collection.slug}`
  const nextHref = next ? `${collectionPath}/${get('slug', next)}` : undefined
  const prevHref = prev ? `${collectionPath}/${get('slug', prev)}` : undefined
  return (
    <Box>
      <Box direction="row" align="center" justify="between">
        {artwork && (
          <Heading level={3} margin="none">
            {artwork.title}
          </Heading>
        )}
        <Box direction="row" gap="xsmall">
          <Link
            path={prevHref}
            plain={true}
            label={
              <Button
                hoverIndicator={true}
                icon={<FormPrevious />}
                disabled={!prev}
              />
            }
          />
          <Text alignSelf="center">{String(currentIndex + 1)}</Text>
          <Button
            onClick={() => dispatch({ type: 'TOGGLE_THUMBNAILS' })}
            hoverIndicator={true}
            icon={<AppsRounded />}
          />
          <Text alignSelf="center">{String(collection.work.length)}</Text>
          <Link
            path={nextHref}
            plain={true}
            label={
              <Button
                hoverIndicator={true}
                icon={<FormNext />}
                disabled={!next}
              />
            }
          />
        </Box>
      </Box>
      <ThumbnailNav active={state.showThumbnails}>
        <Box direction="row" gap="xsmall" wrap={true}>
          {(collection.work || []).map((x) => (
            <Box
              key={x.slug}
              width="xsmall"
              height="xsmall"
              margin={{ bottom: 'xsmall' }}
            >
              <Link
                path={`${collectionPath}/${x.slug}`}
                label={
                  <ThumbContainer active={artwork.slug === x.slug}>
                    <Img
                      style={{ maxWidth: '100%' }}
                      fluid={get('thumbnail', head(get('images', x)))}
                    />
                  </ThumbContainer>
                }
              />
            </Box>
          ))}
        </Box>
      </ThumbnailNav>
    </Box>
  )
}

export default CollectionArtworkNav
