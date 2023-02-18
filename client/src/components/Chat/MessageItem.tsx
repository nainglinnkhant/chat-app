import { Message } from './Messages'
import styles from '../../pages/Room.module.css'

interface MessageProps {
  message: Message
}

const MessageItem = ({ message }: MessageProps) => {
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