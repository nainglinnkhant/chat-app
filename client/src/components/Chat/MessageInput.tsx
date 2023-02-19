import { FormEvent, useState } from 'react'

import { SEND_MESSAGE } from '../../constants/eventNames'
import { socket } from '../../socket'
import styles from '../../pages/Room.module.css'

interface MessageInputProps {
  roomName: string
  userId: string
}

const MessageInput = ({ roomName, userId }: MessageInputProps) => {
  const [message, setMessage] = useState('')

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit(SEND_MESSAGE, { roomName, senderId: userId, message })
    setMessage('')
  }

  return (
    <form className={styles['message-form']} onSubmit={sendMessage}>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        type='text'
        placeholder='Message'
      />

      <button>Send</button>
    </form>
  )
}

export default MessageInput