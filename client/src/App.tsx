import { io } from 'socket.io-client'

const SERVER = 'http://localhost:3001'

const socket = io(SERVER, { transports : ['websocket'] })

function App() {
  return (
    <>
      <h1>Chat App</h1>
    </>
  )
}

export default App
