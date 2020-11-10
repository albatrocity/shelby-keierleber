import React from 'react'
import { LayoutProvider } from './src/contexts/useLayout'
import { StoreProvider } from './src/contexts/useStore'

export const wrapRootElement = ({ element }) => (
  <LayoutProvider>
    <StoreProvider>{element}</StoreProvider>
  </LayoutProvider>
)
