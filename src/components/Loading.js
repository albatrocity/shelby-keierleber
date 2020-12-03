import React from 'react'
import './loader.css'

const centerStyle = ({ dimension }) => {
  return {
    height: `${dimension || 'auto'}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const spinnerStyle = ({
  background = 'transparent',
  foreground = '#000',
  outline = '#f0f0f0',
  size = 'small',
  theme = 'light',
  dimension = '14px',
}) => {
  let bgColor = background
  let fgColor = foreground
  let olColor = outline
  let dm = dimension
  let borderThickness = '2px'
  switch (size) {
    case 'small':
      dm = '14px'
      break
    case 'medium':
      dm = '32px'
      break
    case 'large':
      dm = '60px'
      break
    default:
      dm = dimension
  }

  switch (theme) {
    case 'light':
      bgColor = 'transparent'
      fgColor = '#000'
      outline = '#f0f0f0'
      break
    case 'dark':
      bgColor = '#000'
      fgColor = 'fff'
      outline = 'rgba(255, 255, 255, 0.2)'
    default:
      break
  }
  return {
    animation: 'loader 1.1s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    backgroundColor: bgColor,
    borderTop: `${borderThickness} solid ${fgColor}`,
    borderRight: `${borderThickness} solid ${olColor}`,
    borderBottom: `${borderThickness} solid ${olColor}`,
    borderLeft: `${borderThickness} solid ${olColor}`,
    transform: 'translateZ(0)',
    borderRadius: '50%',
    width: dm,
    height: dm,
  }
}

const Loading = (props) => {
  return props.centered ? (
    <div style={centerStyle(props)}>
      <div style={spinnerStyle(props)} />
    </div>
  ) : (
    <div style={spinnerStyle(props)} />
  )
}

export default Loading
