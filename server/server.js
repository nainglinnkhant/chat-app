const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { CREATE_ROOM, JOIN_ROOM, ROOM_NOT_FOUND, ROOM_JOINED, LEAVE_ROOM, ROOM_CREATE_FAIL, UPDATE_MEMBERS } = require('./constants')
const { addUser, getRoomMembers, removeUser, getUser } = require('./data/users')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

const PORT = 3001

const joinRoom = (socket, roomName, userName) => {
  socket.join(roomName)
  const user = {
    id: socket.id,
    name: userName,
    roomName,
  }
  addUser(user)

  const members = getRoomMembers(roomName)
  socket.emit(ROOM_JOINED, { members, roomName, user })
  io.to(roomName).emit(UPDATE_MEMBERS, { members })
}

const leaveRoom = (socket, roomName) => {
  socket.leave(roomName)
  removeUser(socket.id)
  io.to(roomName).emit(UPDATE_MEMBERS, { members: getRoomMembers(roomName) })
}

const isRoomCreated = (roomName) => {
  const rooms = [...io.sockets.adapter.rooms]
  return rooms?.some(room => room[0] === roomName)
}

io.on('connection', socket => {
  socket.on(CREATE_ROOM, ({ roomName, userName }) => {
    if (isRoomCreated(roomName)) {
      socket.emit(ROOM_CREATE_FAIL, { message: 'This room is already created.' })
    } else {
      joinRoom(socket, roomName, userName)
    }
  })

  socket.on(JOIN_ROOM, ({ roomName, userName }) => {
    if (isRoomCreated(roomName)) {
      joinRoom(socket, roomName, userName)
    } else {
      socket.emit(ROOM_NOT_FOUND, { message: 'The room you have entered in not created yet!' })
    }
  })

  socket.on(LEAVE_ROOM, ({ roomName }) => {
    leaveRoom(socket, roomName)
  })

  socket.on('disconnect', () => {
    const user = getUser(socket.id)
    if (!user) return
    leaveRoom(socket, user?.roomName)
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))