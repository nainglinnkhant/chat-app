import CreateRoomBox from '../components/RoomActions/CreateRoomBox'
import JoinRoomBox from '../components/RoomActions/JoinRoomBox'
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