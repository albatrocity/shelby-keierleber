import React, { useContext } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Anchor, Text, ThemeContext } from 'grommet'
import styled from 'styled-components'

const borderColor = 'light-4'

const InternalLink = styled(GatsbyLink)`
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid transparent;
  :visited {
    color: inherit;
  }
  &:hover {
    text-decoration: none;

    border-bottom-color: ${(p) =>
      p.plain ? 'transparent' : p.theme.global.colors[borderColor]};

    span {
      text-decoration: none;
    }
  }
  ${(p) =>
    p.active
      ? `
    font-weight: bold;
    border-bottom: 2px solid ${p.theme.global.colors[borderColor]};
  `
      : ''}
`

const Link = ({ path, label, active = false, plain }) => {
  const Component = path ? InternalLink : Text
  const theme = useContext(ThemeContext)
  return (
    <Component
      to={path}
      plain={plain}
      active={active}
      activeStyle={{
        borderBottom: plain
          ? undefined
          : `2px solid ${theme.global.colors[borderColor]}`,
      }}
    >
      <Anchor as={'span'} label={label} />
    </Component>
  )
}

export default Link
