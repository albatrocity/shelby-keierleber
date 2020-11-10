import React, { useContext, useCallback } from 'react'
import { find } from 'lodash/fp'
import { Box, Layer } from 'grommet'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from '../contexts/useStore'

const stripePromise = loadStripe(process.env.STRIPE_KEY)

import ShopItem from './ShopItem'
import Cart from './Cart'

const Shop = ({ data }) => {
  const { state, dispatch } = useStore()
  const handleCheckout = useCallback(async () => {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify(state.cartItems),
      mode: 'cors',
    })
    const session = await response.json()
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }, [stripePromise, state.cartItems])

  const handleCart = useCallback(
    (item) => {
      const inCart = find({ id: item.id }, state.cartItems)
      if (inCart) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item })
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: item })
        dispatch({ type: 'OPEN_CART' })
      }
    },
    [dispatch]
  )

  return (
    <Box>
      <Box direction="row-responsive" gap="medium" wrap={true}>
        {data.allContentfulSaleItem.edges.map((x) => (
          <ShopItem key={x.node.id} {...x.node} onCart={handleCart} />
        ))}
      </Box>
      {state.cartItems.length > 0 && (
        <Layer
          modal={false}
          position="top-right"
          round={false}
          onClickOutside={() => dispatch({ type: 'CLOSE_CART' })}
          style={{ boxShadow: '0 0 6px rgba(0,0,0,0.7)' }}
        >
          <Box width="medium" background="light-3">
            <Cart onCheckout={handleCheckout} />
          </Box>
        </Layer>
      )}
    </Box>
  )
}

export default Shop
