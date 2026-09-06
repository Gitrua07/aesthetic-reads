import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import MoodBoardList from './pages/MoodBoardList'
import Book from './components/Book'
import MoodBoardSelected from './pages/MoodBoardSelected'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <div className='flex'>{/*flex*/}
        <SideBar />
        <main className='flex-1'>{/*flex-1*/}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gallery' element={<MoodBoardList />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/book/:bookId' element={<Book/>}/>
            <Route path='/moodboard/:moodBoardId' element={<MoodBoardSelected/>}/>'
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
