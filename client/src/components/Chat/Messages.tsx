import { useEffect, useRef, useState } from 'react'

import { RECEIVE_MESSAGE } from '../../constants/eventNames'
import { socket } from '../../socket'
import MessageItem from './MessageItem'
import type { Message } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MessagesProps {
  messages: Message[]
}

const Messages = ({ messages }: MessagesProps) => {
  const [messageList, setMessageList] = useState<Message[]>(messages || [])
  const lastItemRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    const updateMessages = (message: Message) => {
      setMessageList(prevMessages => [...prevMessages, message])
    }

    socket.on(RECEIVE_MESSAGE, updateMessages)

    return () => {
      socket.off(RECEIVE_MESSAGE, updateMessages)
    }
  }, [])

  useEffect(() => {
    if (messageList.length === 0) return
    lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageList])

  return (
    <div className={styles['message-container']}>
      <ul className={styles['message-list']}>
        {messageList.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}

        <li ref={lastItemRef}></li>
      </ul>
    </div>
  )
}

export default Messages
