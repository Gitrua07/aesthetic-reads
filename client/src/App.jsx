import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import MoodBoardList from './pages/MoodBoardList'
import Book from './components/Book'
import MoodBoardSelected from './pages/MoodBoardSelected'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Edit from './pages/Edit'
import './App.css'
//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
// import { AuthProvider } from './auth/AuthProvider'
// import Dashboard from './components/Dashboard'
//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----


function App() {

  return (
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
    // <AuthProvider>
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----

    <BrowserRouter>
      <div className='flex'>{/*flex*/}
        <SideBar />
        <main className='flex-1'>{/*flex-1*/}
          {
            //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
            /* <Dashboard /> */
            //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
          }
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gallery' element={<MoodBoardList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/book/:bookId' element={<Book />} />
            <Route path='/moodboard/:moodBoardId' element={<MoodBoardSelected />} />'
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit-profile' element={<Edit />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
    // </AuthProvider>
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----

  )
}

export default App
