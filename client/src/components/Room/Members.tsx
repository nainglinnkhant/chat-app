import { useEffect, useState } from 'react'

import { UPDATE_MEMBERS } from '../../constants'
import { socket } from '../../socket'
import { Member } from '../../types/types'
import styles from '../../pages/Room.module.css'

interface MembersProps {
  members: Member[]
  userId: string
}

const Members = ({ members, userId }: MembersProps) => {
  const [chatMembers, setChatMembers] = useState(members || [])

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