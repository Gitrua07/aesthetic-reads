import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import placeholder from '../assets/book-placeholder.jpg'
import MoodboardServices from '../services/MoodboardService.js'

export default function Dashboard(){
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        setAuthId,
        setBio,
        setProfilePic,
        setAuthStatus
        } = useAuth()

        const LogOut = async(e) => {
            e.preventDefault()
            await MoodboardServices.logout()
            setAuthStatus('anonymous')
            setAuthUser(null)
            setLoggedIn(false)
            setAuthId(null)
            setBio(null)
            setProfilePic(placeholder)
        }

    return (
        <div className='my-2 mx-5 text-neutral-900 flex flex-col gap-1'>
            {isLoggedIn ? <div>Logged In as {authUser} </div>: null}
            {isLoggedIn ? <button className='w-20 border border-solid rounded-xl py-1 px-2' onClick={(e) => LogOut(e)}>Log Out</button> : <Link to='/login'><button className='w-20 border border-solid rounded-xl py-1 px-2'>Login</button></Link>}
        </div>
    )
}

