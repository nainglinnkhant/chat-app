import PreviewImage from './PreviewImage'
import TrashIcon from '../Icons/TrashIcon'
import styles from '../../pages/Room.module.css'

interface PreviewImagesProps {
  images: File[]
  removeFile: (file: string | number) => void
}

const PreviewImages = ({ images, removeFile }: PreviewImagesProps) => {
  return (
    <div className={styles['image-preview']}>
      {images.length > 0 && (
        <ul>
          {images.map((image, index) => (
            <li key={image.name} className={styles['image-container']}>
              <button onClick={() => removeFile(index)}>
                <TrashIcon size={20} color='#f23f42' />
              </button>

              <PreviewImage image={image} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PreviewImages
