import { FormEvent, useEffect, useState } from 'react'
import uuid from 'react-uuid'

import { CREATE_ROOM, ROOM_CREATE_FAIL } from '../../constants'
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

    const user = {
      id: uuid(),
      name: userName,
    }
    socket.emit(CREATE_ROOM, { roomName, user })
  }

  useEffect(() => {
    socket.on(ROOM_CREATE_FAIL, ({ message }) => {
      setError(message)
    })
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