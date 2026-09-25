import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Dashboard(){
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn,
        authId, 
        setAuthId,
        bio,
        setBio,
        profilePic,
        setProfilePic } = useAuth()

        const LogOut = (e) => {
            e.preventDefault()
            setAuthUser(null)
            setLoggedIn(false)
            setAuthId(null)
            setBio(null)
            setProfilePic('src/assets/book-placeholder.jpg')
        }

    return (
        <div className='my-2 mx-5 text-neutral-900 flex flex-col gap-1'>
            {isLoggedIn ? <div>Logged In as {authUser} </div>: null}
            {isLoggedIn ? <button className='w-20 border border-solid rounded-xl py-1 px-2' onClick={(e) => LogOut(e)}>Log Out</button> : <Link to='/login'><button className='w-20 border border-solid rounded-xl py-1 px-2'>Login</button></Link>}
        </div>
    )
}

