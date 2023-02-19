import { Message } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { sender, createdAt, text } = message

  return (
    <li className={styles['message-item']}>
      <h3>
        <span>{sender?.name}</span>
        <span>{createdAt}</span>
      </h3>

      <p>{text}</p>
    </li>
  )
}

export default MessageItem