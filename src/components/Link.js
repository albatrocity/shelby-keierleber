import React, { useContext } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Anchor, Text, ThemeContext } from 'grommet'
import styled from 'styled-components'

const borderColor = 'light-4'

const InternalLink = styled(GatsbyLink)`
  text-decoration: none;
  color: inherit;
  border-bottom: 2px solid transparent;
  font-family: inherit;

  :visited {
    color: inherit;
  }
  &:hover {
    text-decoration: none;

    border-bottom-color: ${(p) => {
      return p.plain ? 'transparent' : p.theme.global.colors[borderColor]
    }};

    span {
      text-decoration: none;
    }
  }
  ${(p) =>
    p.active
      ? `
    font-weight: bold;
    border-bottom: 2px solid ${p.theme.global.colors['brand']};
  `
      : ''}
`

const Link = ({ path, label, active = false, plain, color }) => {
  const Component = path
    ? InternalLink
    : ({ children }) => (
        <span style={{ fontFamily: 'inherit' }}>{children}</span>
      )
  const theme = useContext(ThemeContext)
  return (
    <Component
      to={path}
      plain={plain}
      active={active}
      activeStyle={{
        borderBottom: plain
          ? undefined
          : `2px solid ${theme.global.colors['brand']}`,
      }}
    >
      <Anchor
        style={{ fontFamily: 'inherit' }}
        as={'span'}
        color={active ? 'brand' : color}
        label={label}
      />
    </Component>
  )
}

export default Link
