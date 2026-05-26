import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import MoodBoardList from './pages/MoodBoardList'
import Book from './components/Book'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gallery' element={<MoodBoardList />} />
            <Route path='/book/:bookId' element={<Book/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
