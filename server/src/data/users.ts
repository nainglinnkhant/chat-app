import type { User } from '../types'

let users: User[] = []

const getUser = (userId: string) => users.filter(user => user.id === userId)[0]

const getRoomMembers = (roomName: string) =>
  users.filter(user => user.roomName === roomName)

const addUser = (user: User) => users.push(user)

const removeUser = (userId: string) => {
  users = users.filter(user => user.id !== userId)
}

export { getUser, getRoomMembers, addUser, removeUser }
