import type { IconProps } from '../../types'

const TrashIcon = ({ size = 20, color, ...restProps }: IconProps) => (
  <svg viewBox='0 0 1920 1920' width={size} height={size} {...restProps}>
    <path
      fill={color}
      fillRule='evenodd'
      d='M1694.063 564.684v1185.813c0 93.396-76.005 169.401-169.402 169.401H395.316c-93.397 0-169.402-76.005-169.402-169.401V564.684h1468.15ZM1217.095 0l123.438 338.804H1920V451.85H0V338.804h571.223L694.66 0h522.435ZM677.652 1581.095h112.935V903.488H677.652v677.607Zm451.739 0h112.934V903.488h-112.934v677.607Z'
    />
  </svg>
)
export default TrashIcon
