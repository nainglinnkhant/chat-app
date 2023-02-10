import { FormEvent, useEffect, useState } from 'react'
import { JOIN_ROOM, ROOM_NOT_FOUND } from '../../constants'
import { socket } from '../../socket'
import styles from './RoomActions.module.css'

const JoinRoomBox = () => {
  const [roomName, setRoomName] = useState<string>('')

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit(JOIN_ROOM, { roomName })
    setRoomName('')
  }

  useEffect(() => {
    socket.on(ROOM_NOT_FOUND, () => {
      alert('Room not found')
    })
  }, [])

  return (
    <form className={styles['action-container']} onSubmit={joinRoom}>
      <input
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        className={styles['action-input']}
        type='text'
        placeholder='Room Name'
      />

      <button type='submit' className={styles['action-btn']}>
        Join a Room
      </button>
    </form>
  )
}

export default JoinRoomBox