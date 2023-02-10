import { FormEvent, useState } from 'react'
import { CREATE_ROOM } from '../../constants'
import { socket } from '../../socket'
import styles from './RoomActions.module.css'

const CreateRoomBox = () => {
  const [roomName, setRoomName] = useState<string>('')

  const createRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit(CREATE_ROOM, { roomName })
    setRoomName('')
  }

  return (
    <form className={styles['action-container']} onSubmit={createRoom}>
        <input
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          className={styles['action-input']}
          type='text'
          placeholder='Room Name'
        />

        <button type='submit' className={styles['action-btn']}>
          Create a Room
        </button>
    </form>
  )
}

export default CreateRoomBox