const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { CREATE_ROOM, JOIN_ROOM, ROOM_NOT_FOUND, ROOM_JOINED, LEAVE_ROOM, ROOM_CREATE_FAIL, UPDATE_MEMBERS } = require('./constants')
const { addUser, getRoomMembers, removeUser } = require('./data/rooms')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

const PORT = 3001

const emitRoomJoin = (socket, roomName, user) => {
  const members = getRoomMembers(roomName)
  socket.emit(ROOM_JOINED, { members, roomName, user })
  io.emit(UPDATE_MEMBERS, { members })
}

const isRoomCreated = (roomName) => {
  const rooms = [...io.sockets.adapter.rooms]
  return rooms?.some(room => room[0] === roomName)
}

io.on('connection', socket => {
  socket.on(CREATE_ROOM, ({ roomName, user }) => {
    if (isRoomCreated(roomName)) {
      socket.emit(ROOM_CREATE_FAIL, { message: 'This room is already created.' })
    } else {
      socket.join(roomName)
      addUser(roomName, user)
      emitRoomJoin(socket, roomName, user)
    }
  })

  socket.on(JOIN_ROOM, ({ roomName, user }) => {
    if (isRoomCreated(roomName)) {
      socket.join(roomName)
      addUser(roomName, user)
      emitRoomJoin(socket, roomName, user)
    } else {
      socket.emit(ROOM_NOT_FOUND, { message: 'The room you have entered in not created yet!' })
    }
  })

  socket.on(LEAVE_ROOM, ({ roomName, user }) => {
    socket.leave(roomName)
    removeUser(roomName, user)
    io.emit(UPDATE_MEMBERS, { members: getRoomMembers(roomName) })
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))