import React, { useRef } from 'react'
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
    <Box gap="small">
      <Box direction="row" align="center" justify="between">
        {artwork && (
          <Heading
            level={4}
            fontWeight={400}
            margin="none"
            style={{ fontStyle: 'italic' }}
          >
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
                size="small"
              />
            }
          />
          <Text size="small" alignSelf="center">
            {String(currentIndex + 1)}
          </Text>
          <Button
            onClick={() => dispatch({ type: 'TOGGLE_THUMBNAILS' })}
            hoverIndicator={true}
            align="center"
            alignSelf="center"
            justify="center"
            icon={<AppsRounded size="18px" />}
            size="small"
          />
          <Text size="small" alignSelf="center">
            {String(collection.work.length)}
          </Text>
          <Link
            path={nextHref}
            plain={true}
            label={
              <Button
                hoverIndicator={true}
                icon={<FormNext />}
                disabled={!next}
                size="small"
              />
            }
          />
        </Box>
      </Box>
      {state.showThumbnails && (
        <Box
          direction="row"
          gap="xsmall"
          wrap={true}
          margin={{ bottom: 'small' }}
        >
          {(collection.work || []).map((x) => (
            <Box
              key={x.slug}
              width="xsmall"
              height="xsmall"
              margin={{ bottom: 'xsmall' }}
            >
              <Link
                path={`${collectionPath}/${x.slug}`}
                active={artwork.slug === x.slug}
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
      )}
    </Box>
  )
}

export default CollectionArtworkNav
