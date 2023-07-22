import type { Message, Messages } from '../types'

const { TEXT, IMAGE } = require('../constants/messageTypes')

const messages: Messages = {}

const getRoomMessages = (roomName: string, userId: string) => {
  return messages[roomName]?.filter(message => {
    // All messages with type 'text' and 'image' are returned
    if (message.type === TEXT || message.type === IMAGE) return true
    // Only 'notification' messages that does not match with userId are returned
    return message.sender?.id !== userId
  })
}

const addMessage = (message: Message, roomName: string) => {
  if (messages[roomName]) {
    messages[roomName].push(message)
  } else {
    messages[roomName] = [message]
  }
}

const deleteRoom = (roomName: string) => delete messages[roomName]

export { getRoomMessages, addMessage, deleteRoom }
