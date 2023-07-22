import 'module-alias/register'

import express from 'express'
import { Server, Socket } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

import type { Message, MessagePayload } from '@/types'
import eventNames from '@/constants/eventNames'
import { formatDate } from '@/utils/date'
import { addUser, getRoomMembers, getUser, removeUser } from '@/data/users'
import { addMessage, deleteRoom, getRoomMessages } from '@/data/messages'

const app = express()

app.use(cors())

const server = http.createServer(app)

const io: Server = new Server(server)

const PORT = process.env.PORT || 3001

const {
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  RECEIVE_MESSAGE,
  ROOM_CREATE_FAIL,
  ROOM_JOINED,
  ROOM_NOT_FOUND,
  SEND_MESSAGE,
  UPDATE_MEMBERS,
} = eventNames

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

  const message: Message = {
    id: uuidv4(),
    type: 'notification',
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

  const message: Message = {
    id: uuidv4(),
    type: 'notification',
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
          message: 'The room you entered has not been created yet!',
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
    } as Message

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
