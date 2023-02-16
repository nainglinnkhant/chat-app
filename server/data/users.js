let users = []

const getRoomMembers = (roomName) => users.filter(user => user.roomName === roomName)

const addUser = (user) => users.push(user)

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId)
}

module.exports = {
  getRoomMembers,
  addUser,
  removeUser,
}