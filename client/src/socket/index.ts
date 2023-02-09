import { io } from 'socket.io-client'

const SERVER = 'http://localhost:3001'

export const socket = io(SERVER, { transports : ['websocket'] })