import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import MoodBoardList from './pages/MoodBoardList'
import home from './assets/home.png'
import apps from './assets/apps.png'
import profile from './assets/circle-user.png'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen overflow-hidden'>
        <SideBar />
        <main className='flex-1 min-h-0'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gallery' element={<MoodBoardList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
