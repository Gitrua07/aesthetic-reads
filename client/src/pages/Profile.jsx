import placeholder from '../assets/book-placeholder.jpg'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Profile = () => {
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn } = useAuth()

    return (
        <div>
            {isLoggedIn ? <div className='flex flex-col gap-5 my-10 mx-8 text-neutral-900'>
                <div><img className='w-30 h-30 rounded-full' src={placeholder} alt='profile' /></div>
                <div className='font-bold text-3xl'>{authUser}</div>
                <div className='font-semibold'>BIOGRAPHY:</div>
                <div className='shadow-lg py-5 px-5 rounded-xl'></div>
                <div>
                    <form>
                        <Link to='/edit-profile'>
                            <button className='rounded-2xl p-3 outline outline-solid outline-black'>Edit Profile</button>
                        </Link>
                    </form>
                </div>
            </div> : <div>You are not logged in. Click to Log In here <Link to='/login'><button>Login</button></Link></div>}
        </div>
    )
}

export default Profile
