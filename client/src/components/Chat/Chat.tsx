import MessageInput from './MessageInput'
import Messages from './Messages'
import type { Message } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface ChatProps {
  roomName: string
  userId: string
  messages: Message[]
}

const Chat = ({ roomName, userId, messages }: ChatProps) => {
  return (
    <div className={styles.chat}>
      <Messages messages={messages} />

      <MessageInput roomName={roomName} userId={userId} />
    </div>
  )
}

export default Chat
