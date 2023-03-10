import { FormEvent, useEffect, useState } from 'react'

import { CREATE_ROOM, ROOM_CREATE_FAIL } from '../../constants/eventNames'
import { socket } from '../../socket'
import styles from '../../pages/RoomActions.module.css'

const CreateRoomBox = () => {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!roomName.trim() || !userName.trim()) return setError('You need to fill in all fields.')

    socket.emit(CREATE_ROOM, { roomName, userName })
  }

  useEffect(() => {
    const handleRoomCreateFail = ({ message }: { message: string }) => {
      setError(message)
    }

    socket.on(ROOM_CREATE_FAIL, handleRoomCreateFail)

    return () => {
      socket.off(ROOM_CREATE_FAIL, handleRoomCreateFail)
    }
  }, [])

  return (
    <form className={styles['action-container']} onSubmit={createRoom}>
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
        Create a Room
      </button>
    </form>
  )
}

export default CreateRoomBox