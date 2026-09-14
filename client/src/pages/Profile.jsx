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
            </div> : 
            <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
                </div>}
        </div>
    )
}

export default Profile
