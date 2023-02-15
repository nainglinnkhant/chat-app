import { Route, Routes } from 'react-router-dom'
import Room from './pages/Room'
import RoomActions from './pages/RoomActions'

function App() {
  return (
    <Routes>
      <Route path='/' element={<RoomActions />} />
      <Route path='/room/:roomName' element={<Room />} />
    </Routes>
  )
}

export default App
