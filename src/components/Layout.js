import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Navigation from './Navigation'
import Link from './Link'
import { Main, Grommet, Header, Box, Heading } from 'grommet'
import { get } from 'lodash/fp'
import theme from './theme'
import styled from 'styled-components'

const HeaderContents = styled(Box)`
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

const Layout = ({ children, location, category, collection }) => {
  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const title = get('site.siteMetadata.title', data)

  return (
    <Grommet theme={theme} full>
      <Box
        width={{ max: '1200px' }}
        margin="auto"
        pad={{ horizontal: 'medium' }}
      >
        <Box pad={{ top: 'medium' }} margin={{ bottom: 'small' }}>
          <Header border={{ side: 'bottom', color: 'light-3', size: 'small' }}>
            <HeaderContents
              direction="row-responsive"
              align="center"
              gap="medium"
              justify="between"
              fill
            >
              <Navigation
                category={category}
                collection={collection}
                flex={{ grow: true }}
              />
              <Heading margin="none" level={4}>
                <Link path="/" label={title} plain />
              </Heading>
            </HeaderContents>
          </Header>
        </Box>
        <Box as="main">{children}</Box>
      </Box>
    </Grommet>
  )
}

export default Layout
