import { io } from 'socket.io-client'

// const SERVER = 'https://chat-app-backend-eight.vercel.app/'
const SERVER = 'http://localhost:3001'

export const socket = io(SERVER, { transports: ['websocket'] })
