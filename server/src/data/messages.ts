import type { Message, Messages } from '../types/types'

const { MESSAGE } = require('../constants/messageTypes')

const messages: Messages = {}

const getRoomMessages = (roomName: string, userId: string) => {
  return messages[roomName]?.filter(message => {
    if (message.type === MESSAGE) return true // All messages with type 'message' are returned
    return message.sender?.id !== userId // Only 'notification' messages that does not match with userId are returned
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

module.exports = {
  getRoomMessages,
  addMessage,
  deleteRoom,
}
