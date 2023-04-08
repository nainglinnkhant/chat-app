import type { IconProps } from '../../types/types'

const ImageIcon = ({ size = 20, color, ...restProps }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 32 32' {...restProps}>
    <path
      fill={color}
      d='M0 26.016q0 2.496 1.76 4.224T6.016 32h20q2.464 0 4.224-1.76T32 26.016v-20q0-2.496-1.76-4.256T26.016 0h-20Q3.52 0 1.76 1.76T0 6.016v20zm4 0v-20q0-.832.576-1.408T6.016 4h20q.8 0 1.408.608T28 6.016v20q0 .832-.576 1.408T26.016 28h-20q-.832 0-1.44-.576T4 26.016zM6.016 24q0 .832.576 1.44T8 26.016h16q.832 0 1.408-.576t.608-1.44v-.928q-.224-.448-1.12-2.688t-1.6-3.584-1.28-2.112q-.544-.576-1.12-.608t-1.152.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088.448q-.576 0-1.664-1.44-.16-.192-.48-.608-1.12-1.504-1.6-1.824-.768-.512-1.184.352-.224.512-.928 2.24t-1.056 2.56V24zm0-14.976q0 1.248.864 2.112T8.992 12t2.144-.864T12 9.024t-.864-2.144-2.144-.864-2.112.864-.864 2.144z'
    />
  </svg>
)

export default ImageIcon
