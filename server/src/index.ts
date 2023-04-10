import { Server, Socket } from 'socket.io'
import type { MessagePayload } from './types/types'

const express = require('express')
const http = require('http')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const {
  CREATE_ROOM,
  JOIN_ROOM,
  ROOM_NOT_FOUND,
  ROOM_JOINED,
  LEAVE_ROOM,
  ROOM_CREATE_FAIL,
  UPDATE_MEMBERS,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} = require('./constants/eventNames')
const { NOTIFICATION } = require('./constants/messageTypes')
const { addUser, getRoomMembers, removeUser, getUser } = require('./data/users')
const { addMessage, getRoomMessages, deleteRoom } = require('./data/messages')
const { formatDate } = require('./utils/date')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io: Server = new Server(server)

const PORT = process.env.PORT || 3001

const joinRoom = (socket: Socket, roomName: string, userName: string) => {
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
    type: NOTIFICATION,
    sender: user,
    data: `${userName} has joined the room.`,
    createdAt: formatDate(Date.now()),
  }
  addMessage(message, roomName)

  socket.emit(ROOM_JOINED, { members, roomName, user, messages })
  socket.broadcast.to(roomName).emit(RECEIVE_MESSAGE, message) // send join room notification
  io.to(roomName).emit(UPDATE_MEMBERS, { members })
}

const leaveRoom = (socket: Socket, roomName: string) => {
  const user = getUser(socket.id)
  if (!user) return

  const message = {
    id: uuidv4(),
    type: NOTIFICATION,
    sender: user,
    data: `${user?.name} has left the room.`,
    createdAt: formatDate(Date.now()),
  }
  addMessage(message, roomName)

  socket.broadcast.to(roomName).emit(RECEIVE_MESSAGE, message) // send leave room notification

  socket.leave(roomName)
  removeUser(socket.id)
  io.to(roomName).emit(UPDATE_MEMBERS, { members: getRoomMembers(roomName) })

  const members = getRoomMembers(roomName)
  if (members.length === 0) deleteRoom(roomName)
}

const isRoomCreated = (roomName: string) => {
  const rooms = [...io.sockets.adapter.rooms]
  return rooms?.some(room => room[0] === roomName)
}

io.on('connection', (socket: Socket) => {
  socket.on(
    CREATE_ROOM,
    ({ roomName, userName }: { roomName: string; userName: string }) => {
      if (isRoomCreated(roomName)) {
        socket.emit(ROOM_CREATE_FAIL, { message: 'This room is already created.' })
      } else {
        joinRoom(socket, roomName, userName)
      }
    }
  )

  socket.on(
    JOIN_ROOM,
    ({ roomName, userName }: { roomName: string; userName: string }) => {
      if (isRoomCreated(roomName)) {
        joinRoom(socket, roomName, userName)
      } else {
        socket.emit(ROOM_NOT_FOUND, {
          message: 'The room you have entered in not created yet!',
        })
      }
    }
  )

  socket.on(LEAVE_ROOM, ({ roomName }: { roomName: string }) => {
    leaveRoom(socket, roomName)
  })

  socket.on(SEND_MESSAGE, ({ roomName, senderId, data, type }: MessagePayload) => {
    const sender = getUser(senderId)

    if (!sender) return

    const messageObj = {
      id: uuidv4(),
      type,
      sender,
      data,
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
