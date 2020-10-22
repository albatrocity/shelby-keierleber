// https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/
import React from 'react'
import { Text, Paragraph } from 'grommet'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const ContentfulRichText = ({ json }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Text weight={700}>{text}</Text>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    },
  }

  return documentToReactComponents(json, options)
}

export default ContentfulRichText
