// I had to extract this as a component because URL.createObjectURL()
// gets a new value everytime it is executed

import { memo } from 'react'

const PreviewImage = ({ image }: { image: File }) => {
  const src = URL.createObjectURL(image)

  return <img src={src} alt={image.name} />
}

export default memo(PreviewImage)
