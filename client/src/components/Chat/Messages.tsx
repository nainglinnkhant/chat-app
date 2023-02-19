import { useEffect, useRef, useState } from 'react'

import { RECEIVE_MESSAGE } from '../../constants'
import { socket } from '../../socket'
import { Member } from '../Room/Members'
import MessageItem from './MessageItem'
import styles from '../../pages/Room.module.css'

export interface Message {
  id: string
  sender: Member
  text: string
  createdAt: string
}

interface MessagesProps {
  messages: Message[]
}

const Messages = ({ messages }: MessagesProps) => {
  const [messageList, setMessageList] = useState<Message[]>(messages || [])
  const lastItemRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    socket.on(RECEIVE_MESSAGE, (message) => {
      setMessageList(prevMessages => [...prevMessages, message])
    })
  }, [])

  useEffect(() => {
    if (messageList.length === 0) return
    lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageList])

  return (
    <div className={styles['message-container']}>
      <ul>
        {messageList.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}

        <li ref={lastItemRef}></li>
      </ul>
    </div>
  )
}

export default Messages