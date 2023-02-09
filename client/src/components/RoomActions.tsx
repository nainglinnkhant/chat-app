import CreateRoomBox from './CreateRoomBox'
import JoinRoomBox from './JoinRoomBox'
import styles from './RoomActions.module.css'

const RoomActions = () => {
  return (
    <div className={styles['actions-container']}>
      <CreateRoomBox />

      <JoinRoomBox />
    </div>
  )
}

export default RoomActions