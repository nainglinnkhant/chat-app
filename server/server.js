const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

const PORT = 3001
const CREATE_ROOM = 'create room'
const JOIN_ROOM = 'join room'
const ROOM_NOT_FOUND = 'room not found'

io.on('connection', socket => {
  socket.on(CREATE_ROOM, ({ roomName }) => {
    socket.join(roomName)
  })

  socket.on(JOIN_ROOM, ({ roomName }) => {
    const rooms = [...io.sockets.adapter.rooms]
    const isRoomCreated = rooms?.some(room => room[0] === roomName)

    if (isRoomCreated) {
      socket.join(roomName)
    } else {
      socket.emit(ROOM_NOT_FOUND)
    }
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))