import { io } from 'socket.io-client'

const SERVER = 'https://chat-app-backend-eight.vercel.app/'

export const socket = io(SERVER, { transports : ['websocket'] })