import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { JOIN_ROOM, ROOM_JOINED, ROOM_NOT_FOUND } from '../../constants/eventNames'
import { socket } from '../../socket'
import type { Member, Message } from '../../types/types'
import styles from '../../pages/RoomActions.module.css'

interface RoomJoinedParamsType {
  members: Member[]
  roomName: string
  user: Member
  messages: Message[]
}

const JoinRoomBox = () => {
  const navigate = useNavigate()

  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!roomName.trim() || !userName.trim()) {
      return setError('You need to fill in all fields.')
    }

    socket.emit(JOIN_ROOM, { roomName, userName })
  }

  useEffect(() => {
    const handleRoomNotFound = ({ message }: { message: string }) => {
      alert(message)
    }

    const handleRoomJoined = ({
      members,
      roomName,
      user,
      messages,
    }: RoomJoinedParamsType) => {
      navigate(`/room/${roomName}`, {
        state: { members, roomName, userId: user.id, messages },
        replace: true,
      })
    }

    socket.on(ROOM_NOT_FOUND, handleRoomNotFound)
    socket.on(ROOM_JOINED, handleRoomJoined)

    return () => {
      socket.off(ROOM_NOT_FOUND, handleRoomNotFound)
      socket.off(ROOM_JOINED, handleRoomJoined)
    }
  }, [navigate])

  return (
    <form className={styles['action-container']} onSubmit={joinRoom}>
      <input
        value={userName}
        onChange={e => setUserName(e.target.value)}
        className={styles['action-input']}
        type='text'
        placeholder='Your Name'
      />

      <input
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        className={styles['action-input']}
        type='text'
        placeholder='Room Name'
      />

      {error && <p>{error}</p>}

      <button type='submit' className={styles['action-btn']}>
        Join a Room
      </button>
    </form>
  )
}

export default JoinRoomBox
