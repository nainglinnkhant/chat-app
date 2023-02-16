import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CHAT_USER, JOIN_ROOM, ROOM_JOINED, ROOM_NOT_FOUND } from '../../constants'
import { socket } from '../../socket'
import styles from '../../pages/RoomActions.module.css'

const JoinRoomBox = () => {
  const navigate = useNavigate()

  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!roomName.trim() || !userName.trim()) return setError('You need to fill in all fields.')

    socket.emit(JOIN_ROOM, { roomName, userName })
  }

  useEffect(() => {
    socket.on(ROOM_NOT_FOUND, ({ message }) => {
      alert(message)
    })

    socket.on(ROOM_JOINED, ({ members, roomName, user }) => {
      localStorage.setItem(CHAT_USER, user.id)
      navigate(`/room/${roomName}`, { state: { members, roomName }, replace: true })
    })
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