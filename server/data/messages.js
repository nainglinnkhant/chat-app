const messages = []

const getRoomMessages = (roomName) => messages[roomName]

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