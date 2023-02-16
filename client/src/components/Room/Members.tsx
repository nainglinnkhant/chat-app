import { useEffect, useState } from 'react'

import { CHAT_USER, UPDATE_MEMBERS } from '../../constants'
import { socket } from '../../socket'
import styles from '../../pages/Room.module.css'

interface Member {
  id: string
  name: string
}

interface MembersProps {
  members: Member[]
}

const Members = ({ members }: MembersProps) => {
  const [chatMembers, setChatMembers] = useState(members || [])
  const userId = localStorage.getItem(CHAT_USER)

  useEffect(() => {
    socket.on(UPDATE_MEMBERS, ({ members }) => {
      setChatMembers(members)
    })
  }, [])

  return (
    <div className={styles['members-section']}>
      <h2>Members</h2>

      {chatMembers.map(({ id, name }) => (
        <p className={userId === id ? styles['active-member'] : ''} key={id}>{name}</p>
      ))}
    </div>
  )
}

export default Members