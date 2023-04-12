import TrashIcon from '../Icons/TrashIcon'
import styles from '../../pages/Room.module.css'

type Image = File & { url: string }

interface PreviewImagesProps {
  images: Image[]
  removeFile: (file: string | number) => void
}

const PreviewImages = ({ images, removeFile }: PreviewImagesProps) => {
  return (
    <>
      {images.length > 0 && (
        <ul className={styles['image-preview']}>
          {images.map((image, index) => (
            <li key={image.url} className={styles['image-container']}>
              <button type='button' onClick={() => removeFile(index)}>
                <TrashIcon size={20} color='#f23f42' />
              </button>

              <img src={image.url} alt={image.name} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PreviewImages
