import React from 'react'
import { LayoutProvider } from './src/contexts/useLayout'
export const wrapRootElement = ({ element }) => (
  <LayoutProvider>{element}</LayoutProvider>
)
