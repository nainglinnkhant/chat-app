import { useState } from 'react'
import { CREATE_ROOM } from '../../constants'
import { socket } from '../../socket'
import styles from './RoomActions.module.css'

const CreateRoomBox = () => {
  const [roomName, setRoomName] = useState<string>('')

  const createRoom = () => {
    socket.emit(CREATE_ROOM, { roomName })
  }

  return (
    <div className={styles['action-container']}>
        <input
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          className={styles['action-input']}
          type='text'
          placeholder='Room Name'
        />

        <button className={styles['action-btn']} onClick={createRoom}>
          Create a Room
        </button>
    </div>
  )
}

export default CreateRoomBox