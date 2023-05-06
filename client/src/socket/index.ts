import { io } from 'socket.io-client'

const SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://chat-app-108c.onrender.com/'
    : 'http://localhost:3001'

export const socket = io(SERVER, { transports: ['websocket'] })
