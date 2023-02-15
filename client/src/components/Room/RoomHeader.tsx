import { useNavigate } from 'react-router-dom'

import { CHAT_USER, LEAVE_ROOM } from '../../constants'
import { socket } from '../../socket'
import styles from '../../pages/Room.module.css'

interface RoomHeaderProps {
  roomName: string
}

const RoomHeader = ({ roomName }: RoomHeaderProps) => {
  const navigate = useNavigate()

  const leaveRoom = () => {
    const userId = localStorage.getItem(CHAT_USER) || ''
    socket.emit(LEAVE_ROOM, { roomName, userId })
    localStorage.removeItem(CHAT_USER)
    navigate(-1)
  }

  return (
    <nav className={styles['room-header']}>
      <div className={`${styles['room-left']} ${styles['header-left']}`}>
        <h1>{roomName}</h1>
      </div>

      <div className={`${styles['room-right']} ${styles['header-right']}`}>
        <button onClick={leaveRoom}>Leave</button>
      </div>
    </nav>
  )
}

export default RoomHeader