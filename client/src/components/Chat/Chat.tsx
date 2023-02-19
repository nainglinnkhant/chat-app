import MessageInput from './MessageInput'
import Messages from './Messages'
import { Message } from '../../types/types'

interface ChatProps {
  roomName: string
  userId: string
  messages: Message[]
}

const Chat = ({ roomName, userId, messages }: ChatProps) => {
  return (
    <>
      <Messages messages={messages} />
      
      <MessageInput roomName={roomName} userId={userId} />
    </>
  )
}

export default Chat