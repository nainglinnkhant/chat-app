import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useFileUpload from 'react-use-file-upload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { SEND_MESSAGE } from '../../constants/eventNames'
import { IMAGE, TEXT } from '../../constants/messageTypes'
import { socket } from '../../socket'
import LoadingIndicator from '../UI/LoadingIndicator'
import PreviewImages from './PreviewImages'
import EmojiIcon from '../Icons/EmojiIcon'
import ImageIcon from '../Icons/ImageIcon'
import type { CloudinaryImage } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessageInputProps {
  roomName: string
  userId: string
}

const MessageInput = ({ roomName, userId }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const textInputRef = useRef<HTMLInputElement | null>(null)

  const { files, setFiles, removeFile, clearAllFiles } = useFileUpload()

  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileLength = e.target.files?.length || 0
    if (fileLength > 10) {
      return toast('You can only upload 10 images at a time!', { type: 'error' })
    }

    setFiles(e as unknown as Event)
    fileInputRef.current!.value = ''
  }

  const resetForm = () => {
    clearAllFiles()
    setMessage('')
    setIsPickerOpen(false)
  }

  const uploadImages = async () => {
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

    resetForm()

    const responses = await Promise.all(promises)
    return responses.map(response => response.data)
  }

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim() && files.length === 0) return

    setIsSubmitting(true)

    try {
      const uploadedImages = await uploadImages()

      if (message.length) {
        socket.emit(SEND_MESSAGE, {
          roomName,
          senderId: userId,
          data: message,
          type: TEXT,
        })
      }

      if (files.length) {
        socket.emit(SEND_MESSAGE, {
          roomName,
          senderId: userId,
          data: uploadedImages,
          type: IMAGE,
        })
      }
    } catch (err) {
      toast('Failed to upload images!', { type: 'error' })
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <ToastContainer theme='dark' newestOnTop />

      <PreviewImages images={files} removeFile={removeFile} />

      <form
        className={`${styles['message-form']} ${
          files.length > 0 ? styles['top-radius-0'] : ''
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

        <button
          type='button'
          onClick={() => setIsPickerOpen(prevState => !prevState)}
          style={{ marginRight: 12 }}
        >
          <EmojiIcon color='#979595' />
        </button>

        <button
          type='button'
          onClick={() => {
            fileInputRef.current?.click()
            textInputRef.current?.focus()
          }}
        >
          <ImageIcon color='#979595' />
        </button>

        <input
          ref={fileInputRef}
          type='file'
          accept='.png, .jpg, .jpeg'
          multiple
          onChange={handleFileOnChange}
          className={styles['visually-hidden']}
        />

        <input
          ref={textInputRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          type='text'
          placeholder='Message'
        />

        <button disabled={isSubmitting} className={styles['send-btn']}>
          {isSubmitting ? <LoadingIndicator /> : 'Send'}
        </button>
      </form>
    </>
  )
}

export default MessageInput
