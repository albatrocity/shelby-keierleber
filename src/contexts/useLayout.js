import React, { useMemo, useReducer, useContext, createContext } from 'react'

const LayoutContext = createContext({})

const LayoutReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'TOGGLE_THUMBNAILS':
      return { ...state, showThumbnails: !state.showThumbnails }
    default:
      return state
  }
}

const initialState = {
  showThumbnails: false,
}

function LayoutProvider(props) {
  const [state, dispatch] = useReducer(LayoutReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])
  return <LayoutContext.Provider value={value} {...props} />
}

function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  const [state, dispatch] = context

  return {
    state,
    dispatch,
  }
}

export { LayoutProvider, useLayout }
