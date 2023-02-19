const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const { CREATE_ROOM, JOIN_ROOM, ROOM_NOT_FOUND, ROOM_JOINED, LEAVE_ROOM, ROOM_CREATE_FAIL, UPDATE_MEMBERS, SEND_MESSAGE, RECEIVE_MESSAGE } = require('./constants')
const { addUser, getRoomMembers, removeUser, getUser } = require('./data/users')
const { addMessage, getRoomMessages, deleteRoom } = require('./data/messages')
const { formatDate } = require('./utils/date')

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
  const messages = getRoomMessages(roomName, socket.id) || []
  
  const message = {
    id: uuidv4(),
    type: 'notification',
    sender: user,
    text: `${userName} has joined the room.`,
    createdAt: formatDate(Date.now()),
  }
  addMessage(message, roomName)

  socket.emit(ROOM_JOINED, { members, roomName, user, messages })
  socket.broadcast.to(roomName).emit(RECEIVE_MESSAGE, message)
  io.to(roomName).emit(UPDATE_MEMBERS, { members })
}

const leaveRoom = (socket, roomName) => {
  const user = getUser(socket.id)
  const message = {
    id: uuidv4(),
    type: 'notification',
    sender: user,
    text: `${user?.name} has left the room.`,
    createdAt: formatDate(Date.now()),
  }
  addMessage(message, roomName)

  socket.broadcast.to(roomName).emit(RECEIVE_MESSAGE, message)

  socket.leave(roomName)
  removeUser(socket.id)
  io.to(roomName).emit(UPDATE_MEMBERS, { members: getRoomMembers(roomName) })

  const members = getRoomMembers(roomName)
  if (members.length === 0) deleteRoom(roomName)
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

  socket.on(SEND_MESSAGE, ({ roomName, senderId, message }) => {
    const sender = getUser(senderId)
    const messageObj = {
      id: uuidv4(),
      type: 'message',
      sender,
      text: message,
      createdAt: formatDate(Date.now()),
    }

    addMessage(messageObj, roomName)
    io.to(roomName).emit(RECEIVE_MESSAGE, messageObj)
  })

  socket.on('disconnect', () => {
    const user = getUser(socket.id)
    if (!user) return
    leaveRoom(socket, user?.roomName)
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))