import React, { useMemo, useReducer, useContext, createContext } from 'react'
import session from 'sessionstorage'
import { filter, uniqBy } from 'lodash/fp'

const StoreContext = createContext({})

const StoreReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'ADD_TO_CART':
      session.setItem(
        'shelby-cartItems',
        JSON.stringify(uniqBy('id', [...state.cartItems, payload]))
      )
      return {
        ...state,
        cartItems: uniqBy('id', [...state.cartItems, payload]),
      }
    case 'REMOVE_FROM_CART':
      session.setItem(
        'shelby-cartItems',
        JSON.stringify(filter((x) => x.id !== payload.id, state.cartItems))
      )
      return {
        ...state,
        cartItems: filter((x) => x.id !== payload.id, state.cartItems),
      }
    case 'CLEAR_CART':
      session.removeItem('shelby-cartItems')
      return {
        ...state,
        cartItems: [],
      }
    case 'CLOSE_CART':
      return { ...state, cartOpen: false }
    case 'OPEN_CART':
      return { ...state, cartOpen: true }
    default:
      return state
  }
}

const initialState = {
  cartItems: session.getItem('shelby-cartItems')
    ? JSON.parse(session.getItem('shelby-cartItems'))
    : [],
  cartOpen: false,
}

function StoreProvider(props) {
  const [state, dispatch] = useReducer(StoreReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])
  return <StoreContext.Provider value={value} {...props} />
}

function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  const [state, dispatch] = context

  return {
    state,
    dispatch,
  }
}

export { StoreProvider, useStore }
