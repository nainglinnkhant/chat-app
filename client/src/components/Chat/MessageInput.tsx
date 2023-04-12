import { FormEvent, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useFileUpload from 'react-use-file-upload'

import { SEND_MESSAGE } from '../../constants/eventNames'
import { IMAGE, MESSAGE } from '../../constants/messageTypes'
import { socket } from '../../socket'
import EmojiIcon from '../Icons/EmojiIcon'
import ImageIcon from '../Icons/ImageIcon'
import TrashIcon from '../Icons/TrashIcon'
import type { CloudinaryImage } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessageInputProps {
  roomName: string
  userId: string
}

const MessageInput = ({ roomName, userId }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { files, setFiles, removeFile, clearAllFiles } = useFileUpload()

  const images = files.map(image => ({ ...image, url: URL.createObjectURL(image) }))

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim() && files.length === 0) return

    const promises: Promise<AxiosResponse<CloudinaryImage>>[] = []

    files.forEach(file => {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET!)

      promises.push(
        axios.post<CloudinaryImage>(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ENV}/image/upload`,
          formData
        )
      )
    })

    const responses = await Promise.all(promises)
    const uploadedImages = [...responses.map(response => response.data)]

    if (images.length) {
      socket.emit(SEND_MESSAGE, {
        roomName,
        senderId: userId,
        data: uploadedImages,
        type: IMAGE,
      })
    } else {
      socket.emit(SEND_MESSAGE, {
        roomName,
        senderId: userId,
        data: message,
        type: MESSAGE,
      })
    }

    clearAllFiles()
    setMessage('')
    setIsPickerOpen(false)
  }

  return (
    <form
      className={`${styles['message-form']} ${
        images.length > 0 ? styles['top-radius-0'] : ''
      }`}
      onSubmit={sendMessage}
    >
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

      {images.length > 0 && (
        <ul className={styles['image-preview']}>
          {images.map((image, index) => (
            <li key={image.url} className={styles['image-container']}>
              <button type='button' onClick={() => removeFile(index)}>
                <TrashIcon size={20} color='#f23f42' />
              </button>

              <img src={image.url} alt={image.name} />
            </li>
          ))}
        </ul>
      )}

      <button
        type='button'
        onClick={() => setIsPickerOpen(prevState => !prevState)}
        style={{ marginRight: 12 }}
      >
        <EmojiIcon color='#979595' />
      </button>

      <button type='button' onClick={() => fileInputRef.current?.click()}>
        <ImageIcon color='#979595' />
      </button>

      <input
        ref={fileInputRef}
        type='file'
        accept='.png, .jpg, .jpeg'
        multiple
        onChange={e => {
          setFiles(e as unknown as Event)
        }}
        className={styles['visually-hidden']}
      />

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        type='text'
        placeholder='Message'
      />

      <button className={styles['send-btn']}>Send</button>
    </form>
  )
}

export default MessageInput
