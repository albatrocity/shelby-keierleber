import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import { Main, Grommet } from 'grommet'
import theme from './theme'

const Layout = ({ children, location }) => {
  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  return (
    <Grommet theme={theme}>
      <Main>
        <Navigation />
        {children}
      </Main>
    </Grommet>
  )
}

export default Layout
