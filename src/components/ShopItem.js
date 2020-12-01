import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from 'grommet'

import ContentfulRichText from './ContentfulRichText'
import SwiperShopItem from './SwiperShopItem'

const ShopItem = ({ description, images, title, price, onCart, id }) => {
  return (
    <Card
      basis="45%"
      flex={{ grow: 0, shrink: 1 }}
      margin={{ bottom: 'medium' }}
      focusIndicator={false}
    >
      <CardHeader pad="small">
        <Heading level={3} margin="none">
          {title}
        </Heading>
        <Button
          label={`Buy for $${price}`}
          primary
          hoverIndicator={true}
          role="link"
          onClick={() => onCart({ id, description, images, title, price })}
        />
      </CardHeader>
      <CardBody focusIndicator={false}>
        <SwiperShopItem images={images} title={title} />
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
