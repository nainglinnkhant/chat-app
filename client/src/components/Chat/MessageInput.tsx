import styles from '../../pages/Room.module.css'

const MessageInput = () => {
  return (
    <form className={styles['message-form']}>
      <input type='text' placeholder='Message' />

      <button>Send</button>
    </form>
  )
}

export default MessageInput