import { useNavigate } from 'react-router-dom'

import { LEAVE_ROOM } from '../../constants/eventNames'
import { socket } from '../../socket'
import styles from '../../pages/Room.module.css'

interface RoomHeaderProps {
  roomName: string
}

const RoomHeader = ({ roomName }: RoomHeaderProps) => {
  const navigate = useNavigate()

  const leaveRoom = () => {
    socket.emit(LEAVE_ROOM, { roomName })
    navigate('/', { replace: true })
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