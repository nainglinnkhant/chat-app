const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

const PORT = 3001

io.on('connection', socket => {
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))