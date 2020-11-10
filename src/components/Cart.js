import React, { useContext, useCallback, useMemo, memo } from 'react'
import { find, reduce } from 'lodash/fp'
import { Box, Heading, Button } from 'grommet'

import { useStore } from '../contexts/useStore'

import ShopItem from './ShopItem'
import CartItem from './CartItem'

const Cart = ({ onCheckout }) => {
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
        <Button primary color="#000" label={cartItems.length} round={true} />
      </Box>
      {cartOpen && (
        <>
          <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
            {state.cartItems.map((x) => (
              <CartItem onCart={handleCart} {...x} />
            ))}
          </Box>
          <Button
            onClick={onCheckout}
            label={`$${totalPrice} - Checkout`}
            primary
            size="large"
          />
        </>
      )}
    </Box>
  )
}

export default memo(Cart)
