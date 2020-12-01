import React, { useContext, useCallback, useState } from 'react'
import { find } from 'lodash/fp'
import { Box, Layer } from 'grommet'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from '../contexts/useStore'

import ShopItem from './ShopItem'
import Cart from './Cart'

const Shop = ({ data }) => {
  const { state, dispatch } = useStore()
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const handleCheckout = useCallback(async () => {
    setSubmitting(true)
    const stripe = await loadStripe(process.env.STRIPE_KEY)
    try {
      const response = await fetch('/.netlify/functions/create-session', {
        method: 'POST',
        body: JSON.stringify(state.cartItems),
        mode: 'cors',
      })
      const session = await response.json()
      dispatch({ type: 'CLEAR_CART' })
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } catch (e) {
      console.log('ERROR', e)
      setSubmitting(false)
      setError(e)
    }
  }, [state.cartItems])

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
          responsive={false}
          position="top-right"
          round={false}
          onClickOutside={() => dispatch({ type: 'CLOSE_CART' })}
          style={{ boxShadow: '0 0 6px rgba(0,0,0,0.7)' }}
        >
          <Box width="medium" background="light-3">
            <Cart
              onCheckout={handleCheckout}
              isSubmitting={isSubmitting}
              error={error}
            />
          </Box>
        </Layer>
      )}
    </Box>
  )
}

export default Shop
