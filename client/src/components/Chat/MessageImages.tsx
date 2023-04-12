import { IMAGE } from '../../constants/messageTypes'
import type { Message } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessageImagesProps {
  message: Message
}

const MessageImages = ({ message }: MessageImagesProps) => {
  const { sender, createdAt, data, type } = message

  if (type !== IMAGE) return null

  return (
    <li className={styles['message-item']}>
      <h3>
        <span>{sender?.name}</span>
        <span>{createdAt}</span>
      </h3>

      <ul className={styles['message-images']}>
        {data.map(image => (
          <li key={image.original_filename} className={styles['image-container']}>
            <img src={image.secure_url} alt={image.original_filename} />
          </li>
        ))}
      </ul>
    </li>
  )
}

export default MessageImages
