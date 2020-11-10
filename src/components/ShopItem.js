import React, { useContext } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Carousel,
  Heading,
  Button,
} from 'grommet'

import ContentfulRichText from './ContentfulRichText'

const ShopItem = ({ description, images, title, price }) => {
  return (
    <Card basis="40%" flex={true} margin={{ bottom: 'medium' }}>
      <CardHeader pad="small">
        <Heading level={3} margin="none">
          {title}
        </Heading>
        <Button label={`Buy for $${price}`} primary hoverIndicator={true} />
      </CardHeader>
      <CardBody>
        <Carousel>
          {images.map((x) => (
            <Img key={x.id} alt={title} fluid={x.fluid} />
          ))}
        </Carousel>
      </CardBody>
      <CardFooter pad="small">
        {description && (
          <ContentfulRichText json={description.json} margin="none" />
        )}
      </CardFooter>
    </Card>
  )
}

ShopItem.propTypes = {
  description: PropTypes.object,
  id: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  price: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.array,
}

export default ShopItem
