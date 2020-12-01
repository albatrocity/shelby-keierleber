import React, { useContext, useCallback, useMemo, memo } from 'react'
import { find, reduce } from 'lodash/fp'
import { Box, Heading, Button } from 'grommet'
import styled from 'styled-components'

import { useStore } from '../contexts/useStore'

import ShopItem from './ShopItem'
import CartItem from './CartItem'
import Loading from './Loading'

const ItemCount = styled(Button)`
  border-radius: 100%;
  padding: 0;
  height: 1.4em;
  width: 1.4em;
`

const Cart = ({ onCheckout, isSubmitting, error }) => {
  const { state, dispatch } = useStore()
  const { cartOpen, cartItems } = state

  const handleCart = useCallback(
    (item) => {
      const inCart = find({ id: item.id }, state.cartItems)
      if (inCart) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item })
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: item })
      }
    },
    [dispatch, cartItems]
  )

  const handleToggle = useCallback(
    (item) => {
      if (cartOpen) {
        dispatch({ type: 'CLOSE_CART' })
      } else {
        dispatch({ type: 'OPEN_CART' })
      }
    },
    [dispatch, cartOpen]
  )

  const totalPrice = useMemo(
    () =>
      reduce(
        (mem, x) => {
          mem = mem + x.price
          return mem
        },
        0,
        cartItems
      ),
    cartItems
  )

  return (
    <Box direction="column" gap="medium" focusIndicator={false} gap="small">
      <Box
        onClick={() => handleToggle()}
        focusIndicator={false}
        pad="medium"
        flex={true}
        justify="between"
        direction="row"
        fill="horizontal"
      >
        <Heading level={3} margin="none" color="brand">
          Cart
        </Heading>
        <ItemCount primary color="#000" label={cartItems.length} />
      </Box>
      {cartOpen && (
        <>
          <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
            {state.cartItems.map((x) => (
              <CartItem key={x.id} onCart={handleCart} {...x} />
            ))}
          </Box>
          <Button
            onClick={() => onCheckout()}
            disabled={isSubmitting}
            label={`$${totalPrice} - Checkout`}
            reverse
            icon={isSubmitting ? <Loading /> : null}
            primary
            size="large"
          />
          {error && <Text color="status-critical">{error}</Text>}
        </>
      )}
    </Box>
  )
}

export default memo(Cart)
