const rooms = []

const getRoomMembers = (roomName) => rooms[roomName] || []

const addUser = (roomName, user) => {
  rooms[roomName] = rooms[roomName] || []
  rooms[roomName].push(user)
}

const removeUser = (roomName, userId) => {
  if (!rooms[roomName]) return
  
  const filteredUsers = rooms[roomName].filter(roomUser => roomUser.id !== userId)

  if (filteredUsers.length === 0) return delete rooms[roomName]

  rooms[roomName] = filteredUsers
}

module.exports = {
  getRoomMembers,
  addUser,
  removeUser,
}