import MessageImages from './MessageImages'
import { NOTIFICATION, TEXT } from '../../constants/messageTypes'
import type { Message } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { sender, createdAt, data, type } = message

  return (
    <li className={styles['message-item']}>
      <MessageImages message={message} />

      {type === TEXT && (
        <>
          <h3>
            <span>{sender?.name}</span>
            <span>{createdAt}</span>
          </h3>

          <p>{data}</p>
        </>
      )}

      {type === NOTIFICATION && (
        <h3>
          <span>{data}</span>
          <span>{createdAt}</span>
        </h3>
      )}
    </li>
  )
}

export default MessageItem
