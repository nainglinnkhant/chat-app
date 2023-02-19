const messages = []

const getRoomMessages = (roomName, userId) => {
  return messages[roomName]?.filter(message => {
    if (message.type === 'message') return true // All messages with type 'message' are returned
    return message.sender.id !== userId // Only 'notification' messages that does not match with userId are returned
  })
}

const addMessage = (message, roomName) => {
  if (messages[roomName]) {
    messages[roomName].push(message)
  } else {
    messages[roomName] = [message]
  }
}

const deleteRoom = (roomName) => delete messages[roomName]

module.exports = {
  getRoomMessages,
  addMessage,
  deleteRoom,
}