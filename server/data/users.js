let users = []

const getUser = (userId) => users.filter(user => user.id === userId)[0]

const getRoomMembers = (roomName) => users.filter(user => user.roomName === roomName)

const addUser = (user) => users.push(user)

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId)
}

module.exports = {
  getUser,
  getRoomMembers,
  addUser,
  removeUser,
}