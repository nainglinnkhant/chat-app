import { FormEvent, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { SEND_MESSAGE } from '../../constants/eventNames'
import { socket } from '../../socket'
import EmojiIcon from '../Icons/EmojiIcon'
import ImageIcon from '../Icons/ImageIcon'
import styles from '../../pages/Room.module.css'

interface MessageInputProps {
  roomName: string
  userId: string
}

const MessageInput = ({ roomName, userId }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit(SEND_MESSAGE, { roomName, senderId: userId, message })
    setMessage('')
    setIsPickerOpen(false)
  }

  return (
    <form className={styles['message-form']} onSubmit={sendMessage}>
      {isPickerOpen && (
        <div className={styles['emoji-picker']}>
          <div
            className={styles['picker-overlay']}
            onClick={() => setIsPickerOpen(false)}
          />

          <Picker
            data={data}
            theme='dark'
            onEmojiSelect={(data: { native: string }) =>
              setMessage(prevMessage => `${prevMessage}${data.native}`)
            }
          />
        </div>
      )}

      <button
        type='button'
        onClick={() => setIsPickerOpen(prevState => !prevState)}
        style={{ marginRight: 12 }}
      >
        <EmojiIcon color='#979595' />
      </button>

      <button type='button'>
        <ImageIcon color='#979595' />
      </button>

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
