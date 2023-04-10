import type { Message } from '../../types/types'
import { MESSAGE } from '../../constants/messageTypes'
import styles from '../../pages/Room.module.css'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { sender, createdAt, text, type } = message

  return (
    <li className={styles['message-item']}>
      {type === MESSAGE ? (
        <>
          <h3>
            <span>{sender?.name}</span>
            <span>{createdAt}</span>
          </h3>

          <p>{text}</p>
        </>
      ) : (
        <h3>
          <span>{text}</span>
          <span>{createdAt}</span>
        </h3>
      )}
    </li>
  )
}

export default MessageItem
