import { useEffect, useState } from 'react'
import { JOIN_ROOM, ROOM_NOT_FOUND } from '../../constants'
import { socket } from '../../socket'
import styles from './RoomActions.module.css'

const JoinRoomBox = () => {
  const [roomName, setRoomName] = useState<string>('')

  const joinRoom = () => {
    socket.emit(JOIN_ROOM, { roomName })
  }

  useEffect(() => {
    socket.on(ROOM_NOT_FOUND, () => {
      alert('Room not found')
    })
  }, [])

  return (
    <div className={styles['action-container']}>
      <input
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        className={styles['action-input']}
        type='text'
        placeholder='Room Name'
      />

      <button className={styles['action-btn']} onClick={joinRoom}>
        Join a Room
      </button>
    </div>
  )
}

export default JoinRoomBox