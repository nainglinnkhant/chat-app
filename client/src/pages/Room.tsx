import { useLocation } from 'react-router-dom'

import Chat from '../components/Chat/Chat'
import Members from '../components/Room/Members'
import RoomHeader from '../components/Room/RoomHeader'
import styles from './Room.module.css'

const Room = () => {
  const { state } = useLocation()
  const { members, roomName, userId, messages } = state
  
  return (
    <>
      <RoomHeader roomName={roomName} />      
      
      <div className={styles['room-main']}>
        <div className={styles['room-left']}>
          <Members members={members} userId={userId} />
        </div>

        <div className={styles['room-right']}>
          <Chat roomName={roomName} userId={userId} messages={messages} />
        </div>
      </div>
    </>
  )
}

export default Room