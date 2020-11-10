import React, { useContext, useCallback } from 'react'
import { find, head, get } from 'lodash/fp'
import { Box, Text, Button } from 'grommet'
import { Close } from 'grommet-icons'
import Img from 'gatsby-image'
// import { loadStripe } from '@stripe/stripe-js'

const Cart = ({ onCart, title, price, images, id }) => {
  return (
    <Box direction="row" gap="medium" align="center">
      <Img fixed={get('thumb', head(images))} />
      <Box direction="row" justify="between" flex={true} align="center">
        <Text weight={700}>{title}</Text>
        <Text>${price}</Text>
        <Button
          onClick={() => onCart({ title, price, id })}
          icon={<Close size="medium" />}
          round={true}
          hoverIndicator={true}
        />
      </Box>
    </Box>
  )
}

export default Cart
